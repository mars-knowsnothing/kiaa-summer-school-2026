"use client";

import {useCallback, useState, useTransition} from "react";
import {useTranslations} from "next-intl";

import {FileDropzone} from "@/components/application/file-dropzone";
import {submitRecommendation} from "@/app/[locale]/registration/actions";
import {validateRefereeFile, type ActionResult} from "@/lib/schemas/application";

type RefereeFormProps = {
  token: string;
};

export function RefereeForm({token}: RefereeFormProps) {
  const t = useTranslations("referee");
  const tApp = useTranslations("application");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFile = useCallback(
    (f: File) => {
      const err = validateRefereeFile(f);
      setFileError(err ? tApp(err) : null);
      setFile(err ? null : f);
    },
    [tApp]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!file) {
        setFileError(tApp("required"));
        return;
      }

      const formData = new FormData();
      formData.set("letterFile", file);

      startTransition(async () => {
        const res = await submitRecommendation(token, formData);
        setResult(res);
      });
    },
    [file, token, tApp]
  );

  if (result?.success) {
    return (
      <div className="glass-panel p-8 text-center">
        <h2 className="text-2xl font-semibold">{t("successTitle")}</h2>
        <p className="mt-4 text-[var(--muted)]">{t("successMessage")}</p>
      </div>
    );
  }

  if (result?.error === "invalidToken") {
    return (
      <div className="glass-panel border-red-400/20 p-8 text-center">
        <p className="relative z-10 text-lg text-red-600">{t("invalidToken")}</p>
      </div>
    );
  }

  if (result?.error === "alreadyUploaded") {
    return (
      <div className="glass-panel border-amber-500/20 p-8 text-center">
        <p className="relative z-10 text-lg text-amber-700">{t("alreadyUploaded")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel space-y-6 p-6">
      <FileDropzone
        accept=".zip,.pdf"
        onFile={handleFile}
        error={fileError ?? (result?.fieldErrors?.letterFile ? tApp("required") : null)}
        label={t("fileUpload")}
        hint={t("fileUploadHint")}
        dropText={tApp("dropzoneText")}
        dropActiveText={tApp("dropzoneActive")}
      />

      {result?.error && result.error !== "validation" && result.error !== "invalidToken" && result.error !== "alreadyUploaded" && (
        <p className="glass-error">
          {result.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="glass-btn-primary w-full"
      >
        {isPending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
