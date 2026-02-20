import { Sparkles } from "lucide-react";
import React from "react";

function Upgrade() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
        <Sparkles className="h-7 w-7 text-purple-500" />
      </div>
      <span className="text-xs font-semibold uppercase tracking-widest text-purple-500 border border-purple-500/30 bg-purple-500/10 px-3 py-1 rounded-full mb-4">
        Testing Phase
      </span>
      <h2 className="text-2xl font-bold text-foreground mb-2">Free for Everyone</h2>
      <p className="text-sm text-muted-foreground max-w-sm">
        CourseGPT is currently in testing. All features are completely free while we build out the full platform.
      </p>
    </div>
  );
}

export default Upgrade;
