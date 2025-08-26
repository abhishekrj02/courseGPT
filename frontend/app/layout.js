import localFont from "next/font/local";
import { Outfit } from "next/font/google";
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
const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
    title: "CourseGPT",
    description: "Generated Free AI courses",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                {/* <GoogleOneTap /> */}

                <body className={outfit.className}>
                    {children}
                    <div className="fixed bottom-4 right-4 z-50">
                        <img
                            src="https://visitor-badge.laobi.icu/badge?page_id=abhishekrj02.coursegpt&format=true&left_color=%23171717&right_color=%23141278"
                            alt="visitor badge"
                            className="w-auto h-auto"
                        />
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
