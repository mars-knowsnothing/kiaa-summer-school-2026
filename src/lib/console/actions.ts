"use server";

import {redirect} from "next/navigation";

import {
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  getSession,
  verifyCredentials,
} from "@/lib/console/auth";
import {createSupabaseServerClient} from "@/lib/supabase/server";

// ── Login ──

export async function login(
  _prev: {error?: string},
  formData: FormData
): Promise<{error?: string}> {
  const username = formData.get("username")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!verifyCredentials(username, password)) {
    return {error: "用户名或密码错误"};
  }

  const token = createSessionToken();
  await setSessionCookie(token);
  redirect("/console/dashboard");
}

// ── Logout ──

export async function logout() {
  await clearSessionCookie();
  redirect("/console/login");
}

// ── Fetch registrations ──

export type RegistrationRow = {
  id: string;
  registration_type: string;
  status: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  institution: string;
  data: Record<string, unknown>;
  submitted_at: string | null;
  created_at: string;
};

export async function fetchRegistrations(): Promise<RegistrationRow[]> {
  const session = await getSession();
  if (!session.authenticated) redirect("/console/login");

  const supabase = await createSupabaseServerClient();
  const {data, error} = await supabase
    .from("registrations")
    .select("*")
    .order("submitted_at", {ascending: false});

  if (error) throw new Error(`Failed to fetch registrations: ${error.message}`);
  return (data ?? []) as RegistrationRow[];
}

// ── File URL helpers ──

const FILE_PATH_KEYS = ["file_path", "funding_file_path"];
const SIGNED_URL_EXPIRY = 7 * 24 * 60 * 60; // 7 days

const FILE_NAME_MAP: Record<string, string> = {
  file_path: "file_name",
  funding_file_path: "funding_file_name",
};

function buildDownloadName(id: string, applicantName: string, originalName: string): string {
  const shortId = id.slice(0, 8);
  return `${shortId}-${applicantName}-${originalName}`.replace(/[/\\:*?"<>|]/g, "_");
}

async function generateSignedUrls(
  rows: RegistrationRow[]
): Promise<Map<string, string>> {
  const supabase = await createSupabaseServerClient();

  // Map: storagePath -> desired download filename (with applicant name)
  const entries: {path: string; downloadName: string}[] = [];
  const seen = new Set<string>();

  for (const row of rows) {
    for (const key of FILE_PATH_KEYS) {
      const val = row.data?.[key];
      if (typeof val === "string" && val && !seen.has(val)) {
        seen.add(val);
        const originalName = (row.data?.[FILE_NAME_MAP[key]] as string) ?? val.split("/").pop()!;
        entries.push({
          path: val,
          downloadName: buildDownloadName(row.id, row.applicant_name, originalName),
        });
      }
    }
  }

  const urlMap = new Map<string, string>();
  if (entries.length === 0) return urlMap;

  await Promise.all(
    entries.map(async ({path, downloadName}) => {
      const {data} = await supabase.storage
        .from("uploads")
        .createSignedUrl(path, SIGNED_URL_EXPIRY, {download: downloadName});
      if (data?.signedUrl) {
        urlMap.set(path, data.signedUrl);
      }
    })
  );

  return urlMap;
}

// ── CSV export ──

export async function exportRegistrationsCsv(): Promise<string> {
  const rows = await fetchRegistrations();

  if (rows.length === 0) return "";

  const urlMap = await generateSignedUrls(rows);

  // Collect all JSONB keys across rows
  const jsonKeys = new Set<string>();
  for (const row of rows) {
    if (row.data && typeof row.data === "object") {
      Object.keys(row.data).forEach((k) => jsonKeys.add(k));
    }
  }
  const sortedJsonKeys = [...jsonKeys].sort();

  const baseColumns = [
    "id",
    "registration_type",
    "status",
    "applicant_name",
    "applicant_email",
    "applicant_phone",
    "institution",
    "submitted_at",
  ];
  const allColumns = [...baseColumns, ...sortedJsonKeys];

  const escape = (val: unknown): string => {
    const str = val == null ? "" : String(val);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const lines: string[] = [allColumns.join(",")];

  for (const row of rows) {
    const base = baseColumns.map((col) =>
      escape((row as Record<string, unknown>)[col])
    );
    const json = sortedJsonKeys.map((key) => {
      const val = row.data?.[key];
      // Replace file paths with signed download URLs
      if (FILE_PATH_KEYS.includes(key) && typeof val === "string" && val) {
        return escape(urlMap.get(val) ?? val);
      }
      return escape(val);
    });
    lines.push([...base, ...json].join(","));
  }

  return lines.join("\n");
}

// ── Generate signed URLs for a single registration ──

export async function getFileDownloadUrls(
  id: string,
  applicantName: string,
  data: Record<string, unknown>
): Promise<Record<string, string>> {
  const session = await getSession();
  if (!session.authenticated) redirect("/console/login");

  const supabase = await createSupabaseServerClient();
  const result: Record<string, string> = {};

  for (const key of FILE_PATH_KEYS) {
    const val = data[key];
    if (typeof val === "string" && val) {
      const originalName = (data[FILE_NAME_MAP[key]] as string) ?? val.split("/").pop()!;
      const downloadName = buildDownloadName(id, applicantName, originalName);
      const {data: urlData} = await supabase.storage
        .from("uploads")
        .createSignedUrl(val, SIGNED_URL_EXPIRY, {download: downloadName});
      if (urlData?.signedUrl) {
        result[key] = urlData.signedUrl;
      }
    }
  }

  return result;
}
