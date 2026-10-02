"use client";

import { Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileSelect?: (files: FileList | null) => void;
  multiple?: boolean;
  accept?: string;
  maxSizeMB?: number;
  children?: React.ReactNode;
}

export function FileUploadButton({
  onFileSelect,
  multiple = false,
  accept = "image/*",
  maxSizeMB = 5,
  children,
}: FileUploadProps) {
  // 1. Create reference to hidden input
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 2. Trigger click on hidden input when button is clicked
  const handleButtonClick = () => {
    setError(null);
    fileInputRef.current?.click();
  };

  // 3. Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      setSelectedFileName(null);
      return;
    }

    // Optional File Size Validation
    const file = files[0];
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      // Reset input value so user can retry selecting the same file
      event.target.value = "";
      return;
    }

    // Display selected file name
    if (files.length === 1) {
      setSelectedFileName(files[0].name);
    } else {
      setSelectedFileName(`${files.length} files selected`);
    }

    // Pass files to parent handler or API upload logic
    if (onFileSelect) {
      onFileSelect(files);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple={multiple}
        accept={accept}
        className="hidden"
      />

      {/* Styled Visible Button */}
      <div className="flex items-center gap-3">
        <Button type="button" onClick={handleButtonClick}>
          <Upload />
          {children}
        </Button>
      </div>

      {/* Validation Error Message */}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
