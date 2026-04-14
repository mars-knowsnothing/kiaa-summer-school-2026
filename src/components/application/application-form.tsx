"use client";

import {useCallback, useState, useTransition} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {useTranslations} from "next-intl";

import {FileDropzone} from "@/components/application/file-dropzone";
import {
  validateApplicationFile,
  validateFundingFile,
  type ActionResult,
  type ApplicationType,
} from "@/lib/schemas/application";
import {submitRegistration} from "@/app/[locale]/registration/actions";

type ApplicationFormProps = {
  locale: string;
};

export function ApplicationForm({locale}: ApplicationFormProps) {
  const t = useTranslations("application");
  const [applicationType, setApplicationType] =
    useState<ApplicationType>("school_only");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  const [appFile, setAppFile] = useState<File | null>(null);
  const [appFileError, setAppFileError] = useState<string | null>(null);
  const [fundingFile, setFundingFile] = useState<File | null>(null);
  const [fundingFileError, setFundingFileError] = useState<string | null>(null);

  const handleAppFile = useCallback(
    (file: File) => {
      const err = validateApplicationFile(file, applicationType);
      setAppFileError(err ? t(err) : null);
      setAppFile(err ? null : file);
    },
    [applicationType, t]
  );

  const handleFundingFile = useCallback(
    (file: File) => {
      const err = validateFundingFile(file);
      setFundingFileError(err ? t(err) : null);
      setFundingFile(err ? null : file);
    },
    [t]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.currentTarget;
      const formData = new FormData(form);
      formData.set("applicationType", applicationType);

      if (appFile) {
        formData.set("applicationFile", appFile);
      }
      if (fundingFile) {
        formData.set("fundingFile", fundingFile);
      }

      startTransition(async () => {
        const res = await submitRegistration(formData);
        setResult(res);
      });
    },
    [applicationType, appFile, fundingFile]
  );

  const switchType = useCallback((type: ApplicationType) => {
    setApplicationType(type);
    setAppFile(null);
    setAppFileError(null);
    setFundingFile(null);
    setFundingFileError(null);
    setResult(null);
  }, []);

  if (result?.success) {
    return (
      <div className="glass-panel mx-auto max-w-2xl p-8 text-center">
        <h2 className="relative z-10 text-2xl font-semibold">
          {t("successTitle")}
        </h2>
        <p className="relative z-10 mt-4 text-[var(--muted)]">
          {t("successMessage")}
        </p>
      </div>
    );
  }

  const isWorkshop = applicationType === "school_and_workshop";

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-8">
      {/* Type selector */}
      <div className="grid gap-4 sm:grid-cols-2">
        <TypeCard
          selected={applicationType === "school_only"}
          onClick={() => switchType("school_only")}
          title={t("schoolOnly")}
          description={t("schoolOnlyDesc")}
          quota={t("quotaSchool")}
        />
        <TypeCard
          selected={applicationType === "school_and_workshop"}
          onClick={() => switchType("school_and_workshop")}
          title={t("schoolAndWorkshop")}
          description={t("schoolAndWorkshopDesc")}
          quota={t("quotaWorkshop")}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.fieldset
          key={applicationType}
          initial={{opacity: 0, y: 12}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -12}}
          transition={{duration: 0.2}}
          disabled={isPending}
          className="glass-panel space-y-6 p-6"
        >
          <div className="relative z-10 grid gap-5 sm:grid-cols-2">
            <TextInput name="fullName" label={t("fullName")} required error={result?.fieldErrors?.fullName} />
            <RadioGroup
              name="gender"
              label={t("gender")}
              hint={t("genderHint")}
              options={[
                {value: "male", label: t("genderMale")},
                {value: "female", label: t("genderFemale")},
              ]}
              defaultValue="male"
            />
          </div>

          <div className="relative z-10 grid gap-5 sm:grid-cols-2">
            <TextInput name="institution" label={t("institution")} required error={result?.fieldErrors?.institution} />
            <TextInput name="email" label={t("email")} type="email" required error={result?.fieldErrors?.email} />
          </div>

          <div className="relative z-10 grid gap-5 sm:grid-cols-2">
            <TextInput name="phone" label={t("phone")} hint={t("phoneHint")} required error={result?.fieldErrors?.phone} />
            <TextInput name="idNumber" label={t("idNumber")} hint={t("idNumberHint")} required error={result?.fieldErrors?.idNumber} />
          </div>

          <div className="relative z-10">
            <RadioGroup
              name="isHalal"
              label={t("dietary")}
              options={[
                {value: "false", label: t("dietaryRegular")},
                {value: "true", label: t("dietaryHalal")},
              ]}
              defaultValue="false"
            />
          </div>

          <div className="relative z-10">
            <RadioGroup
              name="hotelNeeded"
              label={t("hotelBooking")}
              hint={t("hotelBookingDesc")}
              options={[
                {value: "false", label: t("hotelNo")},
                {value: "true", label: t("hotelYes")},
              ]}
              defaultValue="false"
            />
          </div>

          <div className="relative z-10">
            <FileDropzone
              accept=".zip"
              onFile={handleAppFile}
              error={appFileError ?? (result?.fieldErrors?.applicationFile ? t("required") : null)}
              label={t("fileUpload")}
              hint={isWorkshop ? t("fileUploadWorkshopHint") : t("fileUploadSchoolHint")}
              dropText={t("dropzoneText")}
              dropActiveText={t("dropzoneActive")}
            />
          </div>

          <AnimatePresence>
            {isWorkshop && (
              <motion.div
                initial={{opacity: 0, height: 0}}
                animate={{opacity: 1, height: "auto"}}
                exit={{opacity: 0, height: 0}}
                transition={{duration: 0.2}}
                className="relative z-10 space-y-6 overflow-hidden"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextInput name="refereeName" label={t("refereeName")} required error={result?.fieldErrors?.refereeName} />
                  <TextInput
                    name="refereeEmail"
                    label={t("refereeEmail")}
                    type="email"
                    hint={t("refereeEmailHint")}
                    required
                    error={result?.fieldErrors?.refereeEmail}
                  />
                </div>

                <FileDropzone
                  accept=".zip,.pdf"
                  onFile={handleFundingFile}
                  error={fundingFileError}
                  label={t("fundingUpload")}
                  hint={t("fundingUploadHint")}
                  dropText={t("dropzoneText")}
                  dropActiveText={t("dropzoneActive")}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <p className="relative z-10 text-xs text-[var(--muted-soft)]">{t("feeNote")}</p>

          {result?.error && result.error !== "validation" && (
            <p className="glass-error relative z-10">{result.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="glass-btn-primary relative z-10 w-full"
          >
            {isPending ? t("submitting") : t("submit")}
          </button>
        </motion.fieldset>
      </AnimatePresence>
    </form>
  );
}

// ── Sub-components ──

function TypeCard({
  selected,
  onClick,
  title,
  description,
  quota,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  quota?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`glass-card-specular flex cursor-pointer flex-col gap-2 p-5 text-left transition-all duration-200 ${
        selected ? "glass-card-selected" : "hover:border-black/10"
      }`}
    >
      <p className="relative z-10 text-lg font-semibold">{title}</p>
      <p className="relative z-10 text-sm leading-6 text-[var(--muted)]">{description}</p>
      {quota && <p className="relative z-10 mt-auto text-xs text-[var(--accent)]">{quota}</p>}
    </button>
  );
}

function TextInput({
  name,
  label,
  hint,
  type = "text",
  required,
  error,
}: {
  name: string;
  label: string;
  hint?: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-[var(--foreground)]">
        {label}
        {required && <span className="ml-0.5 text-red-400/80">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={`glass-input ${error ? "glass-input--error" : ""}`}
      />
      {hint && <p className="text-xs text-[var(--muted-soft)]">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

function RadioGroup({
  name,
  label,
  hint,
  options,
  defaultValue,
}: {
  name: string;
  label: string;
  hint?: string;
  options: {value: string; label: string}[];
  defaultValue?: string;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-[var(--foreground)]">{label}</legend>
      {hint && <p className="text-xs text-[var(--muted-soft)]">{hint}</p>}
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-2 text-sm text-[var(--muted)]"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              defaultChecked={opt.value === defaultValue}
              className="accent-[var(--accent)]"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
