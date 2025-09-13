"use client";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MoreVertical, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectInfoProps {
  collapse: boolean;
  setCollapse: (value: boolean) => void;
}

export default function ProjectInfo({
  collapse,
  setCollapse,
}: ProjectInfoProps) {
  return (
    <Card className="w-full shadow-sm rounded-none">
      <CardContent>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 cursor-pointer" />
            <h2 className="text-lg font-semibold">Activity_Name</h2>
            <button
              onClick={() => setCollapse(!collapse)}
              className="ml-1 p-1 hover:bg-gray-100 rounded"
              title={collapse ? "Hide details" : "Show details"}
            >
              {collapse ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
          <MoreVertical className="w-5 h-5 cursor-pointer" />
        </div>

        {collapse && (
          <div>
            <div className="text-xs text-muted-foreground mb-4 flex gap-6">
              <span>
                Created By:{" "}
                <span className="font-medium text-foreground">Alex Jamson</span>
              </span>
              <span>Created On: 01/01/2024, 06:30pm</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200 rounded-none">
                Tag 1
              </Badge>
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 rounded-none">
                sub-tag 1
              </Badge>
              <Badge
                variant="outline"
                className="border-purple-400 hover:bg-purple-200 text-purple-600 rounded-none"
              >
                Tag2
              </Badge>
              <Badge
                variant="outline"
                className="border-purple-400 hover:bg-purple-200 text-purple-600 rounded-none"
              >
                Tag3
              </Badge>
              <Badge
                variant="outline"
                className="border-purple-400 hover:bg-purple-200 text-purple-600 rounded-none"
              >
                Tag4
              </Badge>
            </div>

            <p className="text-sm mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s stand...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
