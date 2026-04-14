"use client";

import {useTransition, useState} from "react";

import {logout, exportRegistrationsCsv, getFileDownloadUrls, type RegistrationRow} from "@/lib/console/actions";

const TYPE_LABELS: Record<string, string> = {
  school_only: "Summer School",
  school_and_workshop: "School + Workshop",
};

const STATUS_COLORS: Record<string, string> = {
  submitted: "bg-blue-500/15 text-blue-300",
  under_review: "bg-amber-500/15 text-amber-300",
  approved: "bg-emerald-500/15 text-emerald-300",
  rejected: "bg-red-500/15 text-red-300",
  draft: "bg-white/[0.06] text-[var(--muted)]",
};

type Props = {
  registrations: RegistrationRow[];
};

export function DashboardClient({registrations}: Props) {
  const [exporting, startExport] = useTransition();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function handleExport() {
    startExport(async () => {
      const csv = await exportRegistrationsCsv();
      if (!csv) return;
      const blob = new Blob(["\uFEFF" + csv], {type: "text/csv;charset=utf-8"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `registrations_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Registrations</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {registrations.length} total
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleExport}
            disabled={exporting || registrations.length === 0}
            className="glass-btn !py-2 !px-4 !text-sm"
          >
            {exporting ? "Exporting..." : "Export CSV"}
          </button>
          <form action={logout}>
            <button type="submit" className="glass-btn !py-2 !px-4 !text-sm">
              Logout
            </button>
          </form>
        </div>
      </div>

      {/* Table */}
      {registrations.length === 0 ? (
        <div className="glass-panel p-12 text-center">
          <p className="text-lg text-[var(--muted)]">No registrations yet.</p>
        </div>
      ) : (
        <div className="glass-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="relative z-10 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-4 py-3 font-semibold text-[var(--muted-soft)]">Name</th>
                  <th className="px-4 py-3 font-semibold text-[var(--muted-soft)]">Email</th>
                  <th className="px-4 py-3 font-semibold text-[var(--muted-soft)]">Phone</th>
                  <th className="px-4 py-3 font-semibold text-[var(--muted-soft)]">Institution</th>
                  <th className="px-4 py-3 font-semibold text-[var(--muted-soft)]">Type</th>
                  <th className="px-4 py-3 font-semibold text-[var(--muted-soft)]">Status</th>
                  <th className="px-4 py-3 font-semibold text-[var(--muted-soft)]">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((row) => {
                  const isExpanded = expandedId === row.id;
                  return (
                    <RegistrationRow
                      key={row.id}
                      row={row}
                      isExpanded={isExpanded}
                      onToggle={() =>
                        setExpandedId(isExpanded ? null : row.id)
                      }
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const FILE_PATH_KEYS = ["file_path", "funding_file_path"];
const FILE_NAME_MAP: Record<string, string> = {
  file_path: "file_name",
  funding_file_path: "funding_file_name",
};

function RegistrationRow({
  row,
  isExpanded,
  onToggle,
}: {
  row: RegistrationRow;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [downloadUrls, setDownloadUrls] = useState<Record<string, string>>({});
  const [loadingUrls, setLoadingUrls] = useState(false);
  const statusClass = STATUS_COLORS[row.status] ?? "bg-gray-100 text-gray-600";

  function handleToggle() {
    if (!isExpanded && !downloadUrls._loaded && row.data) {
      const hasFiles = FILE_PATH_KEYS.some(
        (k) => typeof row.data[k] === "string" && row.data[k]
      );
      if (hasFiles) {
        setLoadingUrls(true);
        getFileDownloadUrls(row.id, row.applicant_name, row.data).then((urls) => {
          setDownloadUrls({...urls, _loaded: "true"});
          setLoadingUrls(false);
        });
      }
    }
    onToggle();
  }

  return (
    <>
      <tr
        className="cursor-pointer border-b border-white/[0.04] transition-colors hover:bg-white/[0.03]"
        onClick={handleToggle}
      >
        <td className="px-4 py-3 font-medium text-[var(--foreground)]">
          {row.applicant_name}
        </td>
        <td className="px-4 py-3 text-[var(--muted)]">{row.applicant_email}</td>
        <td className="px-4 py-3 text-[var(--muted)]">{row.applicant_phone}</td>
        <td className="px-4 py-3 text-[var(--muted)]">{row.institution}</td>
        <td className="px-4 py-3">
          <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs font-medium text-[var(--foreground)]">
            {TYPE_LABELS[row.registration_type] ?? row.registration_type}
          </span>
        </td>
        <td className="px-4 py-3">
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusClass}`}>
            {row.status}
          </span>
        </td>
        <td className="px-4 py-3 text-[var(--muted)]">
          {row.submitted_at
            ? new Date(row.submitted_at).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "—"}
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={7} className="bg-white/[0.02] px-4 py-4">
            <div className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(row.data ?? {}).map(([key, value]) => {
                const isFilePath = FILE_PATH_KEYS.includes(key);
                const signedUrl = isFilePath ? downloadUrls[key] : undefined;
                const displayName = isFilePath
                  ? (row.data?.[FILE_NAME_MAP[key]] as string) ?? String(value)
                  : undefined;

                return (
                  <div key={key} className="glass-card px-3 py-2">
                    <span className="text-xs font-medium text-[var(--muted-soft)]">{key}</span>
                    {isFilePath && typeof value === "string" && value ? (
                      <p className="mt-0.5 break-all">
                        {loadingUrls ? (
                          <span className="text-[var(--muted)]">Loading link...</span>
                        ) : signedUrl ? (
                          <a
                            href={signedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent)] underline hover:opacity-80"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {displayName}
                          </a>
                        ) : (
                          <span className="text-[var(--foreground)]">{String(value)}</span>
                        )}
                      </p>
                    ) : (
                      <p className="mt-0.5 break-all text-[var(--foreground)]">
                        {value == null ? "—" : String(value)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
