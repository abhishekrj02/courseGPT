import { UserButton } from "@clerk/nextjs";
import { Codesandbox } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import logo from

function Header() {
  return (
    <div className="flex justify-between items-center p-4 shadow-sm">
      <Link href={'/dashboard'}>
        {/* <Image src={"/logo.png"} alt="logo" width={40} height={40} /> */}
        <Codesandbox className="h-8 w-8 " />
      </Link>
      <UserButton />
    </div>
  );
}

export default Header;
