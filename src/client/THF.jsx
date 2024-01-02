import React, { useState, useContext } from "react";
import ScrollingTitle from "./ScrollingTitle";
import Context from "./Context";
import { formatedDate } from "./Common";

export default function (props) {
  const twitterCDN = "https://abs.twimg.com/hashflags/";
  const { changeHashfetti } = useContext(Context);

  const hashtag = Array.isArray(props.hashtags)
    ? props.hashtags[0]
    : props.hashtags;

  const [isPlaying, setIsPlaying] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  function action() {
    clearTimeout(timeoutId);

    if (isPlaying) {
      changeHashfetti();
      setIsPlaying(false);
    } else {
      setTimeoutId(setTimeout(() => setIsPlaying(false), 4500));
      changeHashfetti(twitterCDN + props.hashfetti, setIsPlaying);
      setIsPlaying(true);
    }
  }

  return (
    <li>
      <span className="date">{formatedDate(props.startsAt, props.endsAt)}</span>
      {/* start */}
      <div className="container">
        <img
          className="noselect content"
          src={twitterCDN + props.hashfetti}
          onError={({ currentTarget }) => (currentTarget.style.opacity = "0")}
        />
      </div>
      {/* end */}
      <div className="title">
        <ScrollingTitle
          title={"#" + hashtag}
          href={"https://twitter.com/search?q=%23" + hashtag}
        />
        <div className="noselect btns">
          {/* start */}
          <div
            className={"btn b1" + (isPlaying ? " active" : "")}
            onClick={action}
            onKeyPress={(e) => e.key === "Enter" && action()}
            tabIndex="0"
          >
            <a>
              <svg viewBox="0 0 16 16">
                <path
                  d={
                    isPlaying
                      ? "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5z"
                      : "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"
                  }
                />
              </svg>
            </a>
          </div>
          {/* end */}
        </div>
      </div>
    </li>
  );
}
