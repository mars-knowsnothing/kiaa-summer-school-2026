import {z} from "zod";

export const applicationTypes = ["school_only", "school_and_workshop"] as const;
export type ApplicationType = (typeof applicationTypes)[number];

const SCHOOL_ONLY_FILENAME_RE = /^暑期学校申请材料-.+-.+\.zip$/;
const WORKSHOP_FILENAME_RE = /^暑期学校和讨论班申请材料-.+-.+\.zip$/;
const REFEREE_FILENAME_RE = /^讨论班-.+-.+\.(zip|pdf)$/i;

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

// ---------- shared base ----------

const baseFields = {
  fullName: z.string().trim().min(1),
  idNumber: z.string().trim().min(1),
  phone: z.string().trim().min(1),
  email: z.string().trim().email(),
  institution: z.string().trim().min(1),
  isHalal: z.boolean(),
  hotelNeeded: z.boolean(),
};

// ---------- Category 1: school only ----------

export const schoolOnlySchema = z.object({
  ...baseFields,
  applicationType: z.literal("school_only"),
});

export type SchoolOnlyInput = z.infer<typeof schoolOnlySchema>;

// ---------- Category 2: school + workshop ----------

export const schoolAndWorkshopSchema = z.object({
  ...baseFields,
  applicationType: z.literal("school_and_workshop"),
  refereeName: z.string().trim().min(1),
  refereeEmail: z.string().trim().email(),
});

export type SchoolAndWorkshopInput = z.infer<typeof schoolAndWorkshopSchema>;

// ---------- unified application schema ----------

export const applicationSchema = z.discriminatedUnion("applicationType", [
  schoolOnlySchema,
  schoolAndWorkshopSchema,
]);

export type ApplicationInput = z.infer<typeof applicationSchema>;

// ---------- file validation helpers ----------

export function validateApplicationFile(
  file: File,
  applicationType: ApplicationType
): string | null {
  if (file.size > MAX_FILE_SIZE) return "fileTooLarge";
  const regex =
    applicationType === "school_only"
      ? SCHOOL_ONLY_FILENAME_RE
      : WORKSHOP_FILENAME_RE;
  if (!regex.test(file.name)) return "invalidFilename";
  return null;
}

export function validateFundingFile(file: File): string | null {
  if (file.size > MAX_FILE_SIZE) return "fileTooLarge";
  return null;
}

export function validateRefereeFile(file: File): string | null {
  if (file.size > MAX_FILE_SIZE) return "fileTooLarge";
  if (!REFEREE_FILENAME_RE.test(file.name)) return "invalidFilename";
  return null;
}

// ---------- server-side action result ----------

export type ActionResult = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};
