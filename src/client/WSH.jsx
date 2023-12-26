import { useState, useContext } from "react";
import date from "date-and-time";
import ScrollingTitle from "./ScrollingTitle";
import Context from "./Context";

export default function (props) {
  const global = useContext(Context);

  const href = () => {
    let hour = "0700";
    if (props.Date > "20230323") hour = "0700";
    else if (props.Date > "20221105") hour = "0800";

    if (props.IOTD === true)
      return (
        "https://www.bing.com/search?q=" +
        props.Query.toLowerCase() +
        "&filters=HpDate:%22" +
        props.Date +
        "_" +
        hour +
        "%22"
      );
    else return "https://www.bing.com/search?q=" + props.Query.toLowerCase();
  };

  // function post() {
  //   fetch(
  //     "/" +
  //       (!liked ? "like?" : "unlike?") +
  //       props.Date.slice(0, 4) +
  //       "=" +
  //       props._id,
  //     {
  //       method: "POST",
  //     }
  //   )
  //     // .then((response) => response.json())
  //     // .then((json) => {
  //     //   if (json[0] == true)
  //     // })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  const [isDownloaded, setIsDownloaded] = useState(false);

  const download = async () => {
    setIsDownloaded(true);
    try {
      const response = await fetch(
        "https://th.bing.com/th?id=OHR." +
          props.JPG +
          "_" +
          global.WallpaperSize +
          ".jpg"
      );
      const b = await response.blob();
      const e = document.createElement("a");
      e.href = URL.createObjectURL(b);
      e.download = props.JPG + ".jpg";
      e.style.display = "none";
      document.body.appendChild(e);
      e.click();
      document.body.removeChild(e);
    } catch {
      window.alert(
        "Failed to download image " +
          (props.Caption !== null ? props.Caption : props.Title) +
          "."
      );
    }
  };

  // zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
  // const [liked, setLiked] = useState(
  //   localStorage.getItem(props.Date.slice(0, 4) + "." + props._id)
  //     ? true
  //     : false
  // );
  // const [likesCount, setLikesCount] = useState(props.Likes ? props.Likes : 0);
  // const setLike = () => {
  //   liked
  //     ? localStorage.removeItem(props.Date.slice(0, 4) + "." + props._id)
  //     : localStorage.setItem(props.Date.slice(0, 4) + "." + props._id, true);
  //   post();
  //   setLikesCount(
  //     liked
  //       ? likesCount
  //         ? likesCount - 1
  //         : 0
  //       : likesCount
  //       ? likesCount + 1
  //       : 1
  //   );
  //   setLiked(!liked);
  // };

  // const formatedLikes = () => {
  //   if (likesCount < 1e3) return likesCount;
  //   else if (likesCount < 1e6) return Math.floor(likesCount / 1e2) / 10 + " K";
  //   else if (likesCount < 1e9) return Math.floor(likesCount / 1e5) / 10 + " M";
  //   else return "1 B +";
  // };
  // zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz

  return (
    <li>
      <div className="title">
        <ScrollingTitle
          title={props.Caption !== null ? props.Caption : props.Title}
          href={(props.Query.includes("https")
            ? props.Query
            : href()
          ).replaceAll(" ", "+")}
        />
      </div>
      <span className="date">
        {date.format(new Date(props.Date), "DD MMMM YYYY")}
      </span>

      <div className="container">
        <div className="noselect btns">
          {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}
          {/* <div
            className={"btn b2" + (liked ? " active" : "")}
            onClick={setLike}
            onKeyPress={(e) => e.key === "Enter" && setLike()}
            tabIndex="0"
          >
            <a>
              <svg viewBox="1 1 22 22">
                <path
                  d={
                    liked
                      ? "M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"
                      : "M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"
                  }
                />
              </svg>
            </a>
            <span>{formatedLikes()}</span>
          </div> */}
          {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}
          {props.JPG && (
            <div
              className={"btn b1" + (isDownloaded ? " active" : "")}
              onClick={download}
              onKeyPress={(e) => e.key === "Enter" && download()}
              tabIndex="0"
            >
              <a>
                <svg viewBox="0 0 16 16">
                  <path
                    d={
                      isDownloaded
                        ? "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"
                        : "M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"
                    }
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
        <img
          className="noselect content"
          src={
            props.SVG.Light?.includes("@")
              ? "https://ueso.000webhostapp.com/svgs/dsb/" +
                props.SVG.Light.replace("@", "") +
                ".svg"
              : "https://th.bing.com/th?id=ODSWG." + props.SVG.Light + "&pid=dsb"
          }
          onError={({ currentTarget }) => (currentTarget.style.opacity = "0")}
        />
      </div>
    </li>
  );
}
