import { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import ScrollingTitle from "./ScrollingTitle";
import formatedDate from "../common/formatedDate";
import { ErrorBoundary } from "react-error-boundary";
import downloadFile from "../common/downloadFile";
import formatString from "../../server/utils/formatString";
import Button from "./Button";

export default function (props) {
  const hashtag = props.hashtags[0];
  const fallback = <div className="content fallback">⚠️</div>;

  const [isPathAnimDownloaded, setIsPathAnimDownloaded] = useState(false);
  const [isDataAnimDownloaded, setIsDataAnimDownloaded] = useState(false);

  const pathAnim = useRef();
  const dataAnim = useRef();
  const pausesAt = props.pausesAt ?? 20;

  useEffect(() => {
    pathAnim.current?.goToAndStop(pausesAt, true);
    dataAnim.current?.goToAndStop(pausesAt, true);
    return () => {
      pathAnim.current?.destroy();
      dataAnim.current?.destroy();
    };
  }, []);

  const hasAnimationPath = Boolean(props.animation);
  const hasAnimationData = Boolean(props.animationData);

  return (
    <li>
      <span className="date">
        {formatedDate(props.startsAt, props.endsAt)}
        {props.isHidden && " (Hidden)"}
        {props.hashmoji?.endsWith("mp4") && " (mp4)"}
      </span>
      <div className="container">
        {hasAnimationPath && (
          <div>
            {props.debug && (
              <div className="debug" title={props.animation}>
                Path
              </div>
            )}
            <ErrorBoundary fallback={fallback}>
              <Lottie
                loop={true}
                tabIndex="0"
                renderer={"svg"}
                autoplay={false}
                className="content"
                lottieRef={pathAnim}
                path={props.animation}
                onFocus={() => pathAnim.current.play()}
                onMouseEnter={() => pathAnim.current.play()}
                onBlur={() => pathAnim.current.goToAndStop(pausesAt, true)}
                onMouseLeave={() =>
                  pathAnim.current.goToAndStop(pausesAt, true)
                }
              />
            </ErrorBoundary>
          </div>
        )}

        {hasAnimationData && (
          <div>
            {props.debug && <div className="debug">Data</div>}
            <ErrorBoundary fallback={fallback}>
              <Lottie
                loop={true}
                tabIndex="0"
                renderer={"svg"}
                autoplay={false}
                className="content"
                lottieRef={dataAnim}
                animationData={props.animationData}
                onFocus={() => dataAnim.current.play()}
                onMouseEnter={() => dataAnim.current.play()}
                onBlur={() => dataAnim.current.goToAndStop(pausesAt, true)}
                onMouseLeave={() =>
                  dataAnim.current.goToAndStop(pausesAt, true)
                }
              />
            </ErrorBoundary>
          </div>
        )}
      </div>
      <div className="title">
        <ScrollingTitle
          title={"#" + hashtag}
          href={"https://twitter.com/hashtag/" + hashtag}
        />
        <div className="noselect btns">
          {hasAnimationPath && (
            <Button
              buttonType={"download"}
              isActive={isPathAnimDownloaded}
              handler={() =>
                downloadFile(
                  props.animation,
                  props.animation,
                  setIsPathAnimDownloaded,
                  formatString("Failed to download animation {0}.", hashtag),
                  true
                )
              }
            />
          )}
          {hasAnimationData && (
            <Button
              buttonType={"download"}
              isActive={isDataAnimDownloaded}
              handler={() =>
                downloadFile(
                  JSON.stringify(props.animationData),
                  hashtag + ".json",
                  setIsDataAnimDownloaded,
                  formatString("Failed to download animation {0}.", hashtag)
                )
              }
            />
          )}
        </div>
      </div>
    </li>
  );
}
