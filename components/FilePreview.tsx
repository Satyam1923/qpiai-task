"use client";

import Image from "next/image";
import { FileText, File as FileIcon, X, RefreshCw } from "lucide-react";


interface FilePreviewProps {
  file: File;
  previewUrl?: string;
  onReplace?: (file: File) => void;
  onDelete?: (file: File) => void;
}

export default function FilePreview({
  file,
  previewUrl,
  onReplace,
  onDelete,
}: FilePreviewProps) {
  const handleReplace = () => {
    if (onReplace) onReplace(file);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(file);
  };

  return (
    <div className="relative flex flex-col items-center w-full">
      <div className="w-44 h-44 border flex items-center justify-center overflow-hidden bg-gray-50">
        {file.type.startsWith("image/") && previewUrl ? (
          <Image
            loader={() => previewUrl}
            src={previewUrl}
            alt={file.name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        ) : file.type === "text/csv" || file.type === "application/json" ? (
          <FileText className="w-44 h-44 text-gray-500" />
        ) : (
          <FileIcon className="w-44 h-44 text-gray-500" />
        )}
      </div>
      <p className="mt-2 text-sm text-gray-600 truncate w-40 text-center">
        {file.name}
      </p>
      <div className="absolute top-1 right-5 flex gap-1">
        {onReplace && (
          <button
            onClick={handleReplace}
            className="bg-yellow-200 p-2 rounded hover:bg-yellow-300 text-xs"
            title="Replace File"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={handleDelete}
            className="bg-red-200 p-2 rounded hover:bg-red-300 text-xs"
            title="Delete File"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
