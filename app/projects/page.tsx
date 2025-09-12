"use client";
import { Card, CardContent } from "@/components/ui/card";
import ProjectInfo from "@/components/ProjectInfo";
import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import FileGallery from "@/components/FileGallery";

type View = "Upload" | "Preview";

const filters: { key: View; label: string }[] = [
  { key: "Upload", label: "Upload Documents" },
  { key: "Preview", label: "Preview" },
];

export default function Project() {
  const [activeView, setActiveView] = useState<View>("Upload");

  return (
    <div className="flex flex-col gap-2 h-full">
      <ProjectInfo />
      <div className="flex flex-1 overflow-hidden">
        <Card className="w-56 flex flex-col rounded-none">
          <CardContent className="flex flex-col flex-1 p-4">
            <div className="flex items-center gap-2 mb-4">
              <span>📂</span>
              <p className="font-medium">Data Management</p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              {filters.map((filter) => (
                <p
                  key={filter.key}
                  className={`cursor-pointer ${
                    activeView === filter.key
                      ? "text-blue-700 font-semibold underline"
                      : "text-blue-600 hover:underline"
                  }`}
                  onClick={() => setActiveView(filter.key)}
                >
                  {filter.label}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="flex-1 p-4 overflow-y-auto">
          {activeView === "Upload" && <FileUpload />}
          {activeView === "Preview" && <FileGallery />}
        </div>
      </div>
    </div>
  );
}
