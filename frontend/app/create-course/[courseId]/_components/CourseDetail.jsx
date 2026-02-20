import { BarChart4, Clock10Icon, Notebook, VideoIcon } from "lucide-react";
import React from "react";

function CourseDetail({ course }) {
  const stats = [
    { icon: BarChart4,    label: "Difficulty",     value: course?.difficulty },
    { icon: Clock10Icon,  label: "Duration",        value: course?.courseOutput?.totalDuration },
    { icon: Notebook,     label: "Chapters",        value: course?.courseOutput?.noOfChapters },
    { icon: VideoIcon,    label: "Video Included",  value: course?.includeVideo },
  ];

  return (
    <div className="border border-border bg-card p-5 rounded-2xl mt-3 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value }, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 flex-shrink-0">
              <Icon className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="font-semibold text-sm text-foreground mt-0.5">{value ?? "—"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDetail;
