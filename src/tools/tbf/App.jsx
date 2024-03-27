import { useState, useEffect } from "react";
import TBL from "../../client/components/TBL";
import Header from "../../client/components/Header";
import Footer from "../../client/components/Footer";
import { asyncTryCatch } from "../../server/utils/tryCatch";
import readFile from "./readFile";
import "../../client/css/app.css";
import "./App.scss";

export default function () {
  const [step, setStep] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [sortedLikes, setSortedLikes] = useState({});

  const input = (
    <input
      id="file"
      className="form-control"
      type="file"
      onChange={async () => {
        const file = document.getElementById("file").files[0];
        if (!file) return window.alert("No file selected");

        let data = await readFile(file);

        const [json, error] = await asyncTryCatch(() => JSON.parse(data));
        if (error)
          return window.alert("Selected file is not a vaild JSON file.");

        const likes = {};
        const hashfettis = [];

        Object.keys(json).forEach((key) => {
          const item = json[key];

          if (
            item.animation ||
            item.isAnimated ||
            item.assetUrl?.endsWith("sakura_0.json")
          ) {
            const year = new Date(item.startsAt).getFullYear();
            if (!likes[year]) likes[year] = [];
            likes[year].push({
              hashmoji: key,
              isHidden: item.hidden,
              animation: item.assetUrl,
              animationData: item.animation,
              hashtags: item.hashtags || [item.hashtag],
              startsAt: item.startsAt,
              endsAt: item.endsAt,
            });
          }

          if (key.match(/hashfetti/i) || item.assetUrl?.match(/hashfetti/i))
            hashfettis.push(json[key]);
        });

        setSortedLikes(likes);
        setStep(1);
        // console.log(likes);
        // console.log(hashfettis);
      }}
    />
  );

  useEffect(() => {
    document.documentElement.style.setProperty("--theme-primary", "#1da1f2");
  }, []);

  return (
    <div className="box">
      <Header onIconClick={() => location.reload()} />
      {step === 0 && <div className="body file grow">{input}</div>}
      {step === 1 && (
        <div className="buttons grow">
          <div>
            <span>Choose Year</span>
          </div>
          {Object.keys(sortedLikes).map((year) => (
            <a
              key={year}
              className="noselect button"
              onClick={() => {
                setSelectedYear(year);
                setStep(2);
              }}
            >
              {year}
            </a>
          ))}
        </div>
      )}
      {step === 2 && (
        <div className="body grow">
          <ul className="tbl">
            {sortedLikes[selectedYear]
              .sort((a, b) => b.startsAt - a.startsAt)
              // I know using index as key is not a good
              // practice but it's okay for this case
              .map((props, index) => (
                <TBL {...props} debug={true} key={index} />
              ))}
          </ul>
        </div>
      )}
      <Footer />
    </div>
  );
}
