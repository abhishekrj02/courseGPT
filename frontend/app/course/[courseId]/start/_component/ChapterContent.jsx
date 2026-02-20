import React from "react";
import Markdown from "react-markdown";
import YouTube from "react-youtube";

function ChapterContent({ chapter, content }) {
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: { autoplay: 0 },
  };

  return (
    <div className="md:p-10 p-4 pb-20">
      {chapter ? (
        <>
          <h2 className="font-bold text-2xl text-foreground">{chapter?.chapterName}</h2>
          <p className="text-muted-foreground mt-2">{chapter?.description}</p>
        </>
      ) : (
        <div className="h-16 bg-muted animate-pulse rounded-xl mb-4" />
      )}

      {/* Video */}
      {content?.videoId && content.videoId !== "" && (
        <div className="flex justify-center my-6">
          <div className="w-full sm:w-[70%] lg:w-[60%]">
            <YouTube
              className="h-64 rounded-xl overflow-hidden"
              key={content.chapterId}
              videoId={content.videoId}
              opts={opts}
            />
          </div>
        </div>
      )}

      {/* Content sections */}
      <div className="space-y-6 mt-4">
        {content?.content?.map((item, index) => (
          <div key={index} className="p-5 bg-primary/10 dark:bg-primary/20 border border-primary/20 rounded-xl">
            <h2 className="font-semibold text-lg text-foreground mb-3">{item.title}</h2>
            <div className="text-sm text-foreground/80 leading-relaxed prose prose-sm dark:prose-invert max-w-none">
              <Markdown>{item.explanation}</Markdown>
            </div>

            {item.code && (
              <div className="mt-4 p-4 bg-gray-950 text-gray-100 rounded-lg overflow-auto text-xs font-mono">
                <pre><code>{item.code}</code></pre>
              </div>
            )}

            {item.additionalResources && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">Additional Resources</h3>
                <div className="space-y-1">
                  {Array.isArray(item.additionalResources) ? (
                    item.additionalResources.map((link, i) => (
                      <div key={i}>
                        {typeof link === "string" ? (
                          <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">{link}</a>
                        ) : link && typeof link === "object" ? (
                          <>
                            {link.title && <p className="text-xs text-muted-foreground">{link.title}:</p>}
                            <a href={link.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">{link.link}</a>
                          </>
                        ) : null}
                      </div>
                    ))
                  ) : typeof item.additionalResources === "string" ? (
                    <a href={item.additionalResources} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">{item.additionalResources}</a>
                  ) : item.additionalResources && typeof item.additionalResources === "object" ? (
                    <>
                      {item.additionalResources.title && <p className="text-xs text-muted-foreground">{item.additionalResources.title}:</p>}
                      <a href={item.additionalResources.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">{item.additionalResources.link}</a>
                    </>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {!content && chapter && (
        <div className="mt-6 space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-40 bg-muted animate-pulse rounded-xl" />)}
        </div>
      )}
    </div>
  );
}

export default ChapterContent;
