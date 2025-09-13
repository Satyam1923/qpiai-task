"use client";
import { useState, useEffect } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import FilePreview from "./FilePreview";
import { Upload, FolderOpen } from "lucide-react";
import { uploadFile } from "@/lib/supabase/supbaseStorage";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
type View = "Upload" | "Preview";

interface ProjectInfoProps {
  collapse: boolean;
  setActiveView: (value: View) => void;
  setCollapse: (value: boolean) => void;
  setUploadSuccess:(value:boolean)=>void;
}

export default function FileUpload({
  setCollapse,
  setActiveView,
  setUploadSuccess,
}: ProjectInfoProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const acceptedMimeTypes = [
    "image/jpeg",
    "image/png",
    "application/json",
    "text/csv",
    "image/jpg",
  ];

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setError(null);
    setSuccessMessage(null);
    if (fileRejections.length > 0) {
      setError(`File rejected: ${fileRejections[0].errors[0].message}`);
      return;
    }
    setCollapse(false);
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "application/json": [".json"],
      "text/csv": [".csv"],
    },
    maxSize: MAX_FILE_SIZE,
    multiple: true,
    noClick: true,
    noKeyboard: true,
  });

  const openFolderPicker = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.webkitdirectory = true;
    (input as HTMLInputElement & { directory?: boolean }).directory = true;
    input.multiple = true;

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.files) return;

      const selectedFiles = Array.from(target.files);
      const filteredFiles = selectedFiles.filter(
        (file) =>
          acceptedMimeTypes.includes(file.type) && file.size <= MAX_FILE_SIZE
      );

      if (filteredFiles.length < selectedFiles.length) {
        setError(
          "Some files were rejected due to unsupported type or exceeding 10MB."
        );
      } else {
        setError(null);
      }
      setCollapse(false);
      setFiles((prev) => [...prev, ...filteredFiles]);
      setSuccessMessage(null);
    };
    input.click();
  };

  useEffect(() => {
    const newPreviews: { [key: string]: string } = {};
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        newPreviews[file.name] = URL.createObjectURL(file);
      }
    });
    setPreviews(newPreviews);

    return () => {
      Object.values(newPreviews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const replaceFile = (oldFile: File) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = acceptedMimeTypes.join(",");
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.files || target.files.length === 0) return;

      const newFile = target.files[0];
      setFiles((prev) =>
        prev.map((f) => (f.name === oldFile.name ? newFile : f))
      );
      setSuccessMessage(null);
    };
    input.click();
  };

  const deleteFile = (fileToDelete: File) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileToDelete.name));
    setSuccessMessage(null);
  };

  const handleUpload = async () => {
    setError(null);
    setSuccessMessage(null);
    setUploading(true);
    setUploadCount(0);

    const uploadPromises = files.map(async (file) => {
      try {
        await uploadFile(file);
        setUploadCount((prev) => prev + 1);
      } catch (err) {
        if (err instanceof Error) {
          console.error(`Failed to upload ${file.name}:`, err.message);
          setError((prev) =>
            prev
              ? prev + `\nFailed to upload ${file.name}: ${err.message}`
              : `Failed to upload ${file.name}: ${err.message}`
          );
        } else {
          console.error(`Failed to upload ${file.name}:`, err);
          setError((prev) =>
            prev
              ? prev + `\nFailed to upload ${file.name}`
              : `Failed to upload ${file.name}`
          );
        }
      }
    });

    await Promise.all(uploadPromises);

    if (!error) {
      setSuccessMessage("All files uploaded successfully! ");
      setTimeout(() => {
      setUploadSuccess(true);
        setActiveView("Preview");
      }, 1500);
    }
    setFiles([]);
    setUploading(false);
  };

  return (
    <div className="space-y-2 p-4 w-full">
      <h1 className="font-bold text-2xl">Upload Datasets</h1>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed border-indigo-400 rounded-lg ${
          files.length > 0
            ? "h-34 gap-4 justify-center items-center"
            : "h-96 flex-col"
        } flex  items-center justify-center text-center p-6 cursor-pointer hover:bg-indigo-50`}
      >
        <input {...getInputProps()} />
        <Upload size={24} />
        <p className="text-gray-700 font-medium">
          {files.length > 0
            ? "Upload more datasets"
            : "Drag and drop files from your computer"}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={open}
            className="px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200"
          >
            Select Files
          </button>
          <button
            type="button"
            onClick={openFolderPicker}
            className="px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200 flex items-center gap-1"
          >
            <FolderOpen className="w-4 h-4" />
            Select Folder
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-400">
          (JPG, JPEG, PNG, JSON, CSV )
        </p>
      </div>
      <div className="w-full flex flex-col gap-2">
        <label className="text-xs text-gray-500">
          Import from cloud/public repositories
        </label>

        <div className="flex">
          <input
            type="text"
            placeholder="Paste URL here..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="button"
            className="px-4 py-2 bg-gray-200  text-sm font-medium rounded-r-md hover:bg-gray-300"
          >
            Import
          </button>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-2">
          {successMessage}
        </div>
      )}

      {files.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-96 overflow-y-auto p-2 border rounded">
            {files.map((file) => (
              <FilePreview
                key={file.name}
                file={file}
                previewUrl={previews[file.name]}
                onReplace={replaceFile}
                onDelete={deleteFile}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              {"Save & Upload"}
            </button>

            <button
              type="button"
              onClick={() => setFiles([])}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Clear All
            </button>
          </div>
        </>
      )}

      {uploading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative rounded-lg bg-white p-6 shadow-2xl w-[20rem] h-fit">
            <h3 className="mb-1 text-lg font-semibold">Saving files</h3>
            <p className="mb-5 text-sm text-gray-600">
              This might take a while to upload.
            </p>
            <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all duration-300"
                style={{ width: `${(uploadCount / files.length) * 100}%` }}
              />
            </div>
            <div className="mb-4 text-xs font-medium text-gray-500 text-right">
              {uploadCount} / {files.length}
            </div>
            <button
              type="button"
              onClick={() => setUploading(false)}
              className="rounded border border-gray-300 px-4 py-1 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
