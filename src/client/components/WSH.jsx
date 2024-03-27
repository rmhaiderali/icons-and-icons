import { useState } from "react";
import date from "date-and-time";
import { DateTime } from "luxon";
import ScrollingTitle from "./ScrollingTitle";
import { wallpaperSize } from "../constants/wsh";
import downloadAsFetch from "../common/downloadFile";
import formatString from "../../server/utils/formatString";
import Button from "./Button";

export default function (props) {
  const offsetInHours = (offsetInMinutes) => {
    const Hours24 = Math.abs((24 - Math.floor(offsetInMinutes / 60)) % 24)
      .toString()
      .padStart(2, "0");

    const Minutes = Math.abs(offsetInMinutes % 60)
      .toString()
      .padStart(2, "0");

    const final = Hours24 + Minutes;

    return isNaN(final) ? null : final;
  };

  const getBingUrl = () => {
    const date = DateTime.fromISO(props.Date, { setZone: true })
      //
      .setZone("US/Pacific", { keepLocalTime: true });

    const formatedDate = JSON.stringify(
      date.toFormat("yyyyMMdd_") + offsetInHours(date.offset)
    );

    const url = "https://www.bing.com/search?q=" + props.Query.toLowerCase();

    return url + (props.IOTD === true ? "&filters=HpDate:" + formatedDate : "");
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
  //     //   if (json[0] === true)
  //     // })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  const [isDownloaded, setIsDownloaded] = useState(false);

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
            : getBingUrl()
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
            onKeyDown={(e) => e.key === "Enter" && this.onClick()}
            tabIndex="0"
          >
            <a>
              <svg viewBox="1 1 22 22">
                <path
                  d={
                    liked
                      ? 
                  }
                />
              </svg>
            </a>
            <span>{formatedLikes()}</span>
          </div> */}
          {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}
          {props.JPG && (
            <Button
              buttonType={"download"}
              isActive={isDownloaded}
              handler={() =>
                downloadAsFetch(
                  formatString(
                    "https://th.bing.com/th?id=OHR.{0}_{1}.jpg",
                    props.JPG,
                    wallpaperSize
                  ),
                  formatString(
                    "Failed to download image {0}.",
                    props.Caption ?? props.Title
                  ),
                  props.JPG + ".jpg",
                  setIsDownloaded
                )
              }
            />
          )}
        </div>
        <img
          className="noselect content"
          src={
            props.SVG.Light?.includes("@")
              ? "https://ueso.000webhostapp.com/svgs/dsb/" +
                props.SVG.Light.replace("@", "") +
                ".svg"
              : "https://th.bing.com/th?id=ODSWG." +
                props.SVG.Light +
                "&pid=dsb"
          }
          onError={({ currentTarget }) => (currentTarget.style.opacity = "0")}
        />
      </div>
    </li>
  );
}
