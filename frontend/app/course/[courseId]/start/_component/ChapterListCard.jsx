import { Clock3Icon } from 'lucide-react';
import React from 'react';

function ChapterListCard({ chapter, index, active }) {
  return (
    <div className={`flex items-start gap-3 px-4 py-3.5 border-b border-border transition-all duration-200
      ${active ? 'bg-primary/10 dark:bg-primary/20' : 'hover:bg-muted/60'}`}
    >
      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5
        ${active ? 'bg-blue-500 text-white' : 'bg-muted text-muted-foreground'}`}
      >
        {index + 1}
      </div>
      <div className="min-w-0">
        <p className={`text-sm font-medium leading-snug ${active ? 'text-foreground' : 'text-muted-foreground'}`}>
          {chapter.chapterName}
        </p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground/70 mt-0.5">
          <Clock3Icon className="h-3 w-3" />
          {chapter.duration}
        </p>
      </div>
    </div>
  );
}

export default ChapterListCard;
