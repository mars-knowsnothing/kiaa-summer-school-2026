"use client";

import {useCallback, useRef, useState, type DragEvent} from "react";

type FileDropzoneProps = {
  accept: string;
  onFile: (file: File) => void;
  error?: string | null;
  label: string;
  hint: string;
  dropText: string;
  dropActiveText: string;
};

export function FileDropzone({
  accept,
  onFile,
  error,
  label,
  hint,
  dropText,
  dropActiveText,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      setFileName(file.name);
      onFile(file);
    },
    [onFile]
  );

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const onDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setDragging(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[var(--foreground)]">{label}</label>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`glass-dropzone ${
          dragging
            ? "glass-dropzone--active"
            : error
              ? "glass-dropzone--error"
              : ""
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <p className="text-sm text-[var(--muted)]">
          {dragging ? dropActiveText : fileName ?? dropText}
        </p>
      </div>
      <p className="text-xs text-[var(--muted-soft)]">{hint}</p>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
