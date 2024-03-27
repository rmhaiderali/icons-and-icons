import { useState, useContext } from "react";
import ScrollingTitle from "./ScrollingTitle";
import formatedDate from "../common/formatedDate";
import Context from "./Context";
import Button from "./Button";

export default function (props) {
  const twitterCDN = "https://abs.twimg.com/hashflags/";
  const { changeHashfetti } = useContext(Context);

  const hashtag = props.hashtags[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  function playOrStop() {
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
      <div className="container">
        <img
          className="noselect content"
          src={twitterCDN + props.hashfetti}
          onError={({ currentTarget }) => (currentTarget.style.opacity = "0")}
        />
      </div>
      <div className="title">
        <ScrollingTitle
          title={"#" + hashtag}
          href={"https://twitter.com/hashtag/" + hashtag}
        />
        <div className="noselect btns">
          <Button
            buttonType={"play"}
            isActive={isPlaying}
            handler={playOrStop}
          />
        </div>
      </div>
    </li>
  );
}
