"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GrDeploy, } from "react-icons/gr";
import { LuFileBox } from "react-icons/lu";
import { IoIosHelpCircleOutline } from "react-icons/io";
import Link from "next/link";
import { FaRegBell } from "react-icons/fa6";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-between h-screen w-20 p-3 border-r bg-white">
      <div className="flex flex-col gap-6">
        <Button
          className="
    w-12 h-12 
    rounded-md             
    font-bold text-white    
    bg-gradient-to-br
    from-pink-500 via-fuchsia-600 to-indigo-600
    hover:opacity-90  
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
  "
        >
          QP
        </Button>
        <div className="flex justify-center items-center flex-col gap-6 text-sm">
          <Link
            href="/projects"
            className={`flex flex-col items-center gap-1 ${
              pathname === "/projects"
                ? "text-indigo-600 font-semibold"
                : "hover:text-indigo-800"
            }`}
          >
            <LuFileBox size={22} />
            Projects
          </Link>
          <Link
            href="/deploy"
            className={`flex flex-col items-center gap-1 ${
              pathname === "/deploy"
                ? "text-indigo-600 font-semibold"
                : "hover:text-indigo-800"
            }`}
          >
            <GrDeploy size={22} />
            Deploy
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="w-full h-[1px] bg-neutral-300"></div>
        <div className="flex flex-col items-center gap-6 text-sm">
          <IoIosHelpCircleOutline size={20} />
          <FaRegBell size={20} />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
