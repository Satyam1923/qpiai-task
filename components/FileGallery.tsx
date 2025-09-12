"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FileText, File as FileIcon } from "lucide-react";
import { fetchFiles } from "@/lib/supabase/supbaseStorage";

interface RemoteFile {
  name: string;
  url: string;
  type: string;
  size: number;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function FileGallery({
  folder = "uploads",
}: {
  folder?: string;
}) {
  const [files, setFiles] = useState<RemoteFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        setLoading(true);
        const fetched = await fetchFiles(folder);
        const mapped: RemoteFile[] = fetched.map((f) => {
          const ext = (f.name.split(".").pop() || "").toLowerCase();
          let type = "other";
          if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext))
            type = "image";
          else if (["csv", "json"].includes(ext)) type = ext;
          return { ...f, type };
        });
        setFiles(mapped);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch files");
      } finally {
        setLoading(false);
      }
    };
    loadFiles();
  }, [folder]);

 if (loading)
   return (
     <div className="flex flex-col items-center justify-center h-64 gap-4">
       <div className="w-12 h-12 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"></div>
       <p className="text-gray-500 text-sm font-medium">
         Fetching your files...
       </p>
     </div>
   );

  if (error) return <p className="text-red-500">Error: {error}</p>;

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-2">Preview</h2>
        <div className="mb-4 text-sm text-gray-700 flex gap-8">
          <div>
            No. of Images: <span className="font-medium">{files.length}</span>
          </div>
          <div>
            Size: <span className="font-medium">{formatBytes(totalSize)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map((file) => (
            <div key={file.url} className="flex flex-col items-center w-full">
              <div className="w-40 h-40 border flex items-center justify-center overflow-hidden bg-gray-50">
                {file.type === "image" ? (
                  <Image
                    src={file.url}
                    alt={file.name}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                ) : file.type === "csv" || file.type === "json" ? (
                  <FileText className="w-16 h-16 text-gray-500" />
                ) : (
                  <FileIcon className="w-16 h-16 text-gray-500" />
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600 truncate w-40 text-center">
                {file.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-64 shrink-0 border-l pl-4 sticky top-4 self-start h-fit">
        <h3 className="text-md font-semibold mb-4">Explore Data</h3>
        <p className="text-sm text-gray-500 mb-4">
          What kind of action do you want to perform for this data?
        </p>
        <div className="flex flex-col gap-3">
          <button className="px-4 py-2 text border rounded-md hover:bg-gray-100 text-center">
            Explore
          </button>
          <button className="px-4 py-2 text border rounded-md hover:bg-gray-100 text-center">
            Dataset Insights
          </button>
          <button className="px-4 py-2 text border rounded-md hover:bg-gray-100 text-center">
            Auto-Annotate
          </button>
          <button className="px-4 py-2 text border rounded-md hover:bg-gray-100 text-center">
            Annotate
          </button>
        </div>
      </div>
    </div>
  );
}
