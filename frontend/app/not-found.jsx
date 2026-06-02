import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 inline-flex p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
        <BookOpen className="h-10 w-10 text-blue-500" />
      </div>
      <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
        404
      </h1>
      <h2 className="text-2xl font-bold text-foreground mb-3">Page Not Found</h2>
      <p className="text-muted-foreground max-w-sm leading-relaxed mb-8">
        Looks like this page went off-curriculum. The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/">
        <Button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-semibold rounded-xl">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Button>
      </Link>
    </div>
  );
}
