"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Link
        href="/projects"
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Head to Projects
      </Link>
    </div>
  );
}
