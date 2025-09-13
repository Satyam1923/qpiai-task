"use client";
import { Card, CardContent } from "@/components/ui/card";
import ProjectInfo from "@/components/ProjectInfo";
import { useState, useEffect } from "react";
import FileUpload from "@/components/FileUpload";
import FileGallery from "@/components/FileGallery";
import { ChevronDown, ChevronRight } from "lucide-react";

type View = "Upload" | "Preview";

const filters: { key: View; label: string }[] = [
  { key: "Upload", label: "Upload Documents" },
  { key: "Preview", label: "Preview" },
];

export default function Project() {
  const [activeView, setActiveView] = useState<View>("Upload");
  const [collapse, setCollapse] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(true);
  const [uploadSuccess,setUploadSuccess] = useState<boolean>(false); 

  useEffect(() => {
    if (activeView === "Preview") {
      setCollapse(false);
    }
  }, [activeView]);

  return (
    <div className="flex flex-col gap-2 h-full">
      <ProjectInfo collapse={collapse} setCollapse={setCollapse} />
      <div className="flex flex-1 overflow-hidden">
        <Card className="w-56 flex flex-col rounded-none">
          <CardContent className="flex flex-col flex-1 p-4">
            <div
              className="flex items-center justify-between mb-4 cursor-pointer"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {menuOpen ? (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                )}
                <p className="font-medium">Data Management</p>
              </div>
            </div>
            {menuOpen && (
              <div className="flex flex-col pl-6 gap-2 text-sm">
                {filters.map((filter) => (
                  <div
                    key={filter.key}
                    className="flex justify-between items-center"
                  >
                    <p
                      className={`cursor-pointer ${
                        activeView === filter.key ? "font-semibold" : ""
                      } ${
                        filter.key === "Upload" && uploadSuccess
                          ? "text-green-600"
                          : activeView === filter.key
                          ? "text-indigo-700"
                          : "text-indigo-600"
                      }`}
                      onClick={() => {
                        setActiveView(filter.key);
                        if (filter.key === "Upload") {
                          setUploadSuccess(false);
                        }
                      }}
                    >
                      {filter.label}
                    </p>

                    {activeView === filter.key && (
                      <span
                        className={`text-lg ${
                          filter.key === "Upload" && uploadSuccess
                            ? "text-green-600"
                            : "text-indigo-600"
                        }`}
                      >
                        ●
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex-1 p-4 overflow-y-auto">
          {activeView === "Upload" && (
            <FileUpload
              collapse={collapse}
              setUploadSuccess={setUploadSuccess}
              setActiveView={setActiveView}
              setCollapse={setCollapse}
            />
          )}
          {activeView === "Preview" && <FileGallery />}
        </div>
      </div>
    </div>
  );
}
