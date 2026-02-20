import { CheckCircle2, TimerIcon } from "lucide-react";
import React from "react";

function ChapterList({ course }) {
  const chapters = course?.courseOutput?.Chapters ?? [];

  return (
    <div className="mt-4">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-blue-500" />
        Chapters
      </h2>
      <div className="space-y-2">
        {chapters.map((chapter, index) =>
          chapter?.chapterName && chapter?.description ? (
            <div
              key={index}
              className="border border-border bg-card p-4 rounded-xl flex items-start gap-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/15 border border-primary/30 text-foreground text-sm font-semibold flex items-center justify-center">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-foreground leading-snug">{chapter.chapterName}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{chapter.description}</p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground/70 mt-2">
                  <TimerIcon className="h-3.5 w-3.5" />
                  {chapter.duration}
                </p>
              </div>
              <CheckCircle2 className="h-4 w-4 text-blue-400/50 flex-shrink-0 mt-0.5" />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default ChapterList;
