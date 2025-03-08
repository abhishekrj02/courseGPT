import localFont from "next/font/local";
import {Outfit} from "next/font/google"
import "./globals.css";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const outfit = Outfit({subsets: ["latin"]});

export const metadata = {
  title: "Code3",
  description: "Generated Free AI courses",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      {/* <GoogleOneTap /> */}
      
        <body className={outfit.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
