import React from "react";
import Image from "next/image";
import logo from "../../public/logo.svg";
import {Button} from "../../components/ui/button"
import Link from "next/link";
import { Codesandbox } from "lucide-react";


function Header() {
    return (
        <>
            <div className="flex justify-between px-12 py-2 shadow-sm">
            {/* <Image src={logo} alt="logo" width={38} height={38} /> */}
            <Codesandbox className="w-8 h-8 text-sky-900"/>
            <Link href='/dashboard'>
            <Button>Get Started</Button>
            </Link>
            </div>
        </>
    );
}

export default Header;
