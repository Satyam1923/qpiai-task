"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="flex h-screen w-full items-center justify-center border border-dashed border-gray-300 rounded-lg text-center p-6">
        <p className="text-gray-500 font-medium">
          📱 Please switch to a laptop for the best experience.
        </p>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <main className="flex-1 h-lvh p-2">{children}</main>
    </>
  );
}
