import { useState } from "react";

export default function () {
  const [event, setEvent] = useState(null);
  const [visibility, setVisibility] = useState(false);

  window.addEventListener("beforeinstallprompt", (e) => {
    setEvent(e);
    setVisibility(true);
  });

  function close() {
    setEvent(null);
    setVisibility(false);
  }

  window.addEventListener("appinstalled", () => {
    close();
  });

  async function install() {
    event.prompt();
    const { outcome } = await event.userChoice;
    if (outcome === "accepted") close();
  }

  return (
    visibility && (
      <div className="u1 noselect css-1dbjc4n r-1p0dtai r-1xcajam">
        <div className="u2 css-1dbjc4n r-l5o3uw">
          <div className="css-1dbjc4n r-1rks9hb">
            <div className="css-1dbjc4n r-18u37iz">
              <div className="r-jwli3a r-37j5jr r-1b6yd1w r-7ptqe7">
                <span>App is now available</span>
              </div>
            </div>
            <div className="r-jwli3a r-37j5jr r-1b43r93 r-16dba41 r-hjklzo r-1b3ntt7">
              <span>
                Experience a new level of convenience with our app. Install now
                to quickly access it from your homescreen.
              </span>
            </div>
          </div>
          <div className="css-1dbjc4n r-18u37iz r-1wtj0ep r-1t982j2 r-1atloto">
            <div
              onClick={close}
              onKeyDown={(e) => e.key === "Enter" && this.onClick()}
              tabIndex="0"
              className="u3 css-18t94o4 css-1dbjc4n r-sdzlij r-1phboty r-rs99b7 r-15zivkp r-1ii58gl r-25kp3t r-1j3t67a r-o7ynqc r-6416eg r-lrvibr"
            >
              <div className="r-1awozwy r-jwli3a r-6koalj r-18u37iz r-16y2uox r-37j5jr r-1b43r93 r-b88u0q r-hjklzo">
                <span className="r-1b43r93 r-hjklzo">Not now</span>
              </div>
            </div>
            <div
              onClick={install}
              onKeyDown={(e) => e.key === "Enter" && this.onClick()}
              tabIndex="0"
              className="u4 css-18t94o4 css-1dbjc4n r-42olwf r-sdzlij r-1phboty r-rs99b7 r-15zivkp r-1ii58gl r-25kp3t r-1j3t67a r-o7ynqc r-6416eg r-lrvibr"
            >
              <div className="r-1awozwy r-6koalj r-18u37iz r-16y2uox r-37j5jr r-1b43r93 r-b88u0q r-hjklzo">
                <span className="r-1b43r93 r-hjklzo">Install app</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
