import localFont from "next/font/local";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./_context/ThemeContext";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "CourseGPT",
  description: "Generate free AI-powered courses instantly",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={outfit.className}>
          <ThemeProvider>
            {children}
            {/* Sits to the left of the chat toggle button (right-5, w-12) */}
            <div className="fixed bottom-5 right-20 z-40">
              <img
                src="https://visitor-badge.laobi.icu/badge?page_id=abhishekrj02.coursegpt&format=true&left_color=%23171717&right_color=%23141278"
                alt="visitor badge"
                className="max-w-[110px] h-auto"
              />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
