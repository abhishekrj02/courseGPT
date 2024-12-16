import Link from "next/link";
import React from "react";
import Markdown from "react-markdown";
import YouTube from "react-youtube";

function ChapterContent({ chapter, content }) {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  return (
    <div className="md:p-10 p-2">
      <h2 className="font-medium text-2xl">{chapter?.chapterName}</h2>
      <p className="text-gray-500">{chapter?.description}</p>

      {/* video */}
      {content?.videoId == "" ? null : (
         <div className="flex justify-center items-center my-4">
      <div className="w-full sm:w-[60%] md:w-[75%] lg:w-[60%] xl:w-[50%] 2xl:w-[45%] px-2">
            <YouTube
              className="h-64"
              key={content?.chapterId}
              videoId={content?.videoId}
              opts={opts}
            />
            </div>
        </div>
      )}

      {/* content */}
      <div>
        {content?.content?.map((item, index) => (
          <div className="p-5 bg-sky-50 my-8 rounded-lg">
            <h2 className="font-medium text-2xl mb-3">{item.title}</h2>

            <p>
              <Markdown>{item.explanation}</Markdown>
            </p>

            {item.code && (
              <div className="p-4 bg-black text-white mt-5 rounded-sm sm:overflow-auto overflow-scroll">
                <pre>
                  <code>{item.code}</code>
                </pre>
              </div>
            )}

            {item.additionalResources && (
              <div className="mt-5">
                <h2 className="text-lg font-semibold">Additional Resoures: </h2>
                <div>
                  {typeof item.additionalResources === "string" ? (
                    <a
                      href={item.additionalResources}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      {item.additionalResources}
                    </a>
                  ) : (
                    item.additionalResources.map((link, index) => (
                      <div key={index} className=" gap-4">
                        {typeof link === "string" ? (
                          <>
                            <a
                              href={link}
                              target="_blank"
                              className="text-blue-600 underline"
                            >
                              {link}
                            </a>
                          </>
                        ) : (
                          <>
                            <p>{link.title}:</p>
                            <a
                              href={link.link}
                              target="_blank"
                              className="text-blue-600 underline"
                            >
                              {link.link}
                            </a>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
