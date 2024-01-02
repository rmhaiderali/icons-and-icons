import { useEffect, useState, useRef } from "react";
import ScrollingTitle from "./ScrollingTitle";
import { formatedDate } from "./Common";
import Lottie from "lottie-react";

export default function (props) {
  const twitterCDN = "https://abs.twimg.com/hashflags/";

  const hashtag = Array.isArray(props.hashtags)
    ? props.hashtags[0]
    : props.hashtags;

  const [download, setDownload] = useState(false);

  const downloadAnimation = async () => {
    try {
      const response = await fetch(twitterCDN + props.animation);
      const b = await response.blob();
      const e = document.createElement("a");
      e.href = URL.createObjectURL(b);
      e.download = props.animation;
      e.style.display = "none";
      document.body.appendChild(e);
      e.click();
      document.body.removeChild(e);
    } catch {
      window.alert("Failed to download animation " + hashtag + ".");
    }
  };

  const handleDownload = () => {
    setDownload(true);
    downloadAnimation();
  };

  const animation = useRef();
  const pausesAt = props.pausesAt ?? 0;

  useEffect(() => {
    animation.current?.goToAndStop(pausesAt, true);
    return () => animation.current?.destroy();
  }, []);

  return (
    <li>
      <span className="date">{formatedDate(props.startsAt, props.endsAt)}</span>
      {/* start */}
      <div
        className="container"
        onMouseEnter={() => animation.current.play()}
        onMouseLeave={() => animation.current.goToAndStop(pausesAt, true)}
        onFocus={() => animation.current.play()}
        onBlur={() => animation.current.goToAndStop(pausesAt, true)}
        tabIndex="0"
      >
        <Lottie
          className="content"
          // animationData={}
          autoplay={false}
          loop={true}
          path={
            props.animation.includes("sakura_0")
              ? twitterCDN + props.animation
              : "https://hashflags.000webhostapp.com/animations/" +
                props.animation
          }
          renderer={"svg"}
          lottieRef={animation}
        />
        {/* <div className="" ref={ref}></div> */}
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
            className={"btn b1" + (download ? " active" : "")}
            onClick={handleDownload}
            onKeyPress={(e) => e.key === "Enter" && handleDownload()}
            tabIndex="0"
          >
            <a>
              <svg viewBox="0 0 16 16">
                <path
                  d={
                    download
                      ? "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"
                      : "M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"
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
