"use server";

import {applicationSchema, type ActionResult} from "@/lib/schemas/application";
import {createSupabaseServerClient} from "@/lib/supabase/server";

/** Build a storage-safe path: folder/timestamp-random.ext */
function safeStoragePath(folder: string, originalName: string): string {
  const ext = originalName.includes(".")
    ? originalName.slice(originalName.lastIndexOf("."))
    : "";
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `${folder}/${id}${ext}`;
}

export async function submitRegistration(
  formData: FormData
): Promise<ActionResult> {
  // --- 1. Parse scalar fields ---
  const raw = {
    applicationType: formData.get("applicationType"),
    fullName: formData.get("fullName"),
    gender: formData.get("gender"),
    idNumber: formData.get("idNumber"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    institution: formData.get("institution"),
    isHalal: formData.get("isHalal") === "true",
    hotelNeeded: formData.get("hotelNeeded") === "true",
    refereeName: formData.get("refereeName") ?? undefined,
  };

  const result = applicationSchema.safeParse(raw);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0]?.toString();
      if (key) fieldErrors[key] = issue.message;
    }
    return {success: false, error: "validation", fieldErrors};
  }

  const data = result.data;

  // --- 2. Upload registration file ---
  const registrationFile = formData.get("applicationFile") as File | null;
  if (!registrationFile || registrationFile.size === 0) {
    return {
      success: false,
      error: "validation",
      fieldErrors: {applicationFile: "required"},
    };
  }

  const supabase = await createSupabaseServerClient();
  const filePath = safeStoragePath("registrations", registrationFile.name);

  const {error: uploadError} = await supabase.storage
    .from("uploads")
    .upload(filePath, registrationFile, {
      contentType: registrationFile.type,
      upsert: false,
    });

  if (uploadError) {
    return {success: false, error: `Upload failed: ${uploadError.message}`};
  }

  // --- 3. Upload funding file (optional, workshop only) ---
  let fundingFilePath: string | null = null;
  let fundingFileName: string | null = null;

  if (data.applicationType === "school_and_workshop") {
    const fundingFile = formData.get("fundingFile") as File | null;
    if (fundingFile && fundingFile.size > 0) {
      const fundPath = safeStoragePath("funding", fundingFile.name);
      const {error: fundErr} = await supabase.storage
        .from("uploads")
        .upload(fundPath, fundingFile, {
          contentType: fundingFile.type,
          upsert: false,
        });
      if (fundErr) {
        return {success: false, error: `Funding file upload failed: ${fundErr.message}`};
      }
      fundingFilePath = fundPath;
      fundingFileName = fundingFile.name;
    }
  }

  // --- 4. Insert into registrations table ---
  const jsonData: Record<string, unknown> = {
    gender: data.gender,
    id_number: data.idNumber,
    is_halal: data.isHalal,
    hotel_needed: data.hotelNeeded,
    file_path: filePath,
    file_name: registrationFile.name,
    funding_file_path: fundingFilePath,
    funding_file_name: fundingFileName,
  };

  if (data.applicationType === "school_and_workshop") {
    jsonData.referee_name = data.refereeName;
  }

  const {data: inserted, error: insertError} = await supabase
    .from("registrations")
    .insert({
      registration_type: data.applicationType,
      status: "submitted",
      applicant_name: data.fullName,
      applicant_email: data.email,
      applicant_phone: data.phone,
      institution: data.institution,
      data: jsonData,
      submitted_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (insertError) {
    return {success: false, error: `Database error: ${insertError.message}`};
  }

  // --- 5. Create recommendation record (workshop only) ---
  if (data.applicationType === "school_and_workshop" && inserted) {
    const {error: recError} = await supabase.from("recommendations").insert({
      registration_id: inserted.id,
      referee_name: data.refereeName,
      status: "pending",
    });

    if (recError) {
      console.error("Failed to create recommendation record:", recError);
    }
  }

  return {success: true};
}

export async function submitRecommendation(
  token: string,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient();

  // --- 1. Look up recommendation by token ---
  const {data: rec, error: lookupError} = await supabase
    .from("recommendations")
    .select("id, status, registration_id")
    .eq("token", token)
    .single();

  if (lookupError || !rec) {
    return {success: false, error: "invalidToken"};
  }

  if (rec.status === "received") {
    return {success: false, error: "alreadyUploaded"};
  }

  // --- 2. Upload file ---
  const file = formData.get("letterFile") as File | null;
  if (!file || file.size === 0) {
    return {
      success: false,
      error: "validation",
      fieldErrors: {letterFile: "required"},
    };
  }

  const filePath = safeStoragePath("recommendations", file.name);
  const {error: uploadError} = await supabase.storage
    .from("uploads")
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return {success: false, error: `Upload failed: ${uploadError.message}`};
  }

  // --- 3. Update recommendation record ---
  const {error: updateError} = await supabase
    .from("recommendations")
    .update({
      status: "received",
      file_path: filePath,
      file_name: file.name,
      uploaded_at: new Date().toISOString(),
    })
    .eq("id", rec.id);

  if (updateError) {
    return {success: false, error: `Database error: ${updateError.message}`};
  }

  return {success: true};
}
