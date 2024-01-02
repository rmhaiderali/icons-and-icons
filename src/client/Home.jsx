import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import mapToObject from "array-map-to-object";
import date from "date-and-time";
import Footer from "./Footer";
import Popup from "./Popup";

const components = {
  TBL: lazy(() => import("./TBL.jsx")),
  THF: lazy(() => import("./THF.jsx")),
  WSH: lazy(() => import("./WSH.jsx")),
};

export default function () {
  const global = useRef({
    scrollTop: 0,
    scrollLeft: 0,
    vendor: null,
    renderer: null,
    buttonEnabled: true,
  });

  const navigate = useNavigate();
  const replaceAndNavigate = (to) => navigate(to, { replace: true });

  const { service, year, month } = useParams();

  const services = {
    tbl: {
      fullName: "Twitter Branded Likes",
      sortBy: "startsAt",
      reverseItems: true,
    },
    thf: {
      fullName: "Twitter Hashfettis",
      sortBy: "startsAt",
      reverseItems: true,
    },
    wsh: {
      fullName: "Windows Search Highlights",
      sortBy: "Date",
      reverseItems: false,
    },
  };

  const loading = (
    <div className="loading grow">
      <svg viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14"></circle>
        <circle cx="16" cy="16" r="14"></circle>
      </svg>
    </div>
  );

  const error = (
    <div className="error grow">
      <p>Please check your internet</p>
      <p>connection and try again.</p>
      <div
        className="noselect button reload"
        onClick={() => fetchData(service, year)}
      >
        Reload
      </div>
    </div>
  );

  let [view, setView] = useState(loading);

  function renderItems(items, Component) {
    const { sortBy, reverseItems } = services[service];

    items.sort((a, b) => (b[sortBy] > a[sortBy] ? -1 : 0));
    if (reverseItems) items.reverse();

    setView(
      <div className="body grow">
        <ul className={service}>
          {items.map((item, index) => (
            <Component key={index} {...item} />
          ))}
        </ul>
      </div>
    );
  }

  function renderButtons(name, data) {
    if (name === "Service") {
      replaceAndNavigate("/");
      data = mapToObject(data, (service) => [
        service,
        services[service].fullName,
      ]);
    }
    //
    else if (name === "Year") {
      replaceAndNavigate(["", service].join("/"));
    }
    //
    else if (name === "Month") {
      replaceAndNavigate(["", service, year].join("/"));
      data = mapToObject(data, (month) => [
        month,
        date.format(new Date(year, month - 1), "MMM YYYY"),
      ]);
    }

    const isDataArray = Array.isArray(data);

    setView(
      <div className="years grow">
        <div>
          <span>Choose {name}</span>
        </div>
        {(isDataArray ? data : Object.keys(data)).map((e) => {
          return (
            <Link className="noselect button" to={"./" + e} key={e}>
              {isDataArray ? e : data[e]}
            </Link>
          );
        })}
      </div>
    );
  }

  async function clintInfo() {
    let charging, level;

    if (!global.current.renderer || !global.current.vendor) {
      let canvas = document.getElementById("glcanvas");
      let gl = canvas.getContext("experimental-webgl");
      try {
        let ext = gl.getExtension("WEBGL_debug_renderer_info");
        global.current.renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
        global.current.vendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL);
      } catch (e) {
        global.current.renderer = gl.getParameter(gl.RENDERER);
        global.current.vendor = gl.getParameter(gl.VENDOR);
      }
    }

    if (typeof navigator.getBattery === "function") {
      let battery = await navigator.getBattery();
      charging = battery.charging;
      level = parseInt(battery.level * 100);
    }

    return {
      "Battery-Charging": charging,
      "Battery-Level": level,
      "CPU-Cores": navigator.hardwareConcurrency,
      "Device-Memory": navigator.deviceMemory,
      "Graphics-Renderer": global.current.renderer,
      "Graphics-Vendor": global.current.vendor,
      "Max-Touch-Points": navigator.maxTouchPoints,
    };
  }

  function uppercaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async function fetchData(service, year, month) {
    setView(loading);
    const path = [service, year, month].filter(Boolean).join("/");

    fetch("/api/v1/" + path, { headers: await clintInfo() })
      .then((response) => response.json())
      .then((data) => {
        //
        if (data.type === "items")
          renderItems(data.result, components[service.toUpperCase()]);
        //
        else if (["months", "years"].includes(data.type))
          renderButtons(
            uppercaseFirstLetter(data.type).slice(0, -1),
            data.result
          );
        //
      })
      .catch((err) => {
        setView(error);
        console.log(err);
      });
  }

  useEffect(() => {
    if (!Object.keys(services).includes(service))
      renderButtons("Service", Object.keys(services));
    //
    else fetchData(service, year, month);
  }, [service, year, month]);

  useEffect(() => {
    let themePrimary;

    if (["wsh"].includes(service)) themePrimary = "#ff7a5c";
    //
    else if (["tbl", "thf"].includes(service)) themePrimary = "#1da1f2";
    //
    else themePrimary = "#7b8d9f";

    document
      .querySelector(".app")
      .style.setProperty("--theme-primary", themePrimary);
  }, [service]);

  const [scrollbar] = useState(
    navigator.userAgent.match(/(Windows|Macintosh)/)
  );
  const [preview, setPreview] = useState(
    localStorage.getItem("preview")
      ? JSON.parse(localStorage.getItem("preview"))
      : navigator.userAgent.match(/((Windows|Macintosh).*Chrome|Firefox)/)
  );
  const handlePreview = () => {
    setPreview(!preview);
    localStorage.setItem("preview", !preview);
  };

  function toggle() {
    theme
      ? document.querySelector(".app").classList.toggle("dark")
      : document.querySelector(".clip .app").classList.toggle("dark");
  }

  const [theme, setTheme] = useState(
    localStorage.getItem("dark")
      ? JSON.parse(localStorage.getItem("dark"))
      : window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const handleTheme = () => {
    if (!global.current.buttonEnabled) return;
    global.current.buttonEnabled = false;

    setTheme(!theme);
    localStorage.setItem("dark", !theme);

    const app = document.querySelector(".app");

    if (!preview) {
      app.classList.toggle("dark");
      return (global.current.buttonEnabled = true);
    }

    const appWidth = app.clientWidth;
    const headerWidth = document.querySelector("header").clientWidth;
    const boxMarginX = Math.max(0, (appWidth - headerWidth) / 2);

    document
      .querySelector(".clip")
      .style.setProperty(
        "--origin",
        boxMarginX + headerWidth - 40 - app.scrollLeft + "px"
      );

    document
      .querySelector(".clip")
      .style.setProperty(
        "--side",
        parseInt(
          Math.sqrt(
            document.body.clientWidth ** 2 + document.body.clientHeight ** 2
          )
        ) + "px"
      );

    document.body.classList.add("pause");

    document.querySelector(".clip").innerHTML = app.outerHTML;
    // [...document.querySelectorAll(".clip img")].map((e) => (e.outerHTML = ""));
    scrollbind(document.querySelector(".clip .app"));
    document.querySelector(".clip .app").scrollTop = global.current.scrollTop;
    document.querySelector(".clip .app").scrollLeft = global.current.scrollLeft;
    toggle();
    document.querySelector(".clip").classList.add("anim");
    if (theme) document.querySelector(".clip").classList.add("reverse");
  };

  const onAnimationEnd = () => {
    document.querySelector(".clip").classList.remove("anim");
    if (!theme) document.querySelector(".clip").classList.remove("reverse");
    const app = document.querySelector(".app");
    toggle();
    scrollbind(app);
    app.scrollTop = global.current.scrollTop;
    app.scrollLeft = global.current.scrollLeft;
    document.querySelector(".clip").innerHTML = "";

    document.body.classList.remove("pause");
    global.current.buttonEnabled = true;
  };

  useEffect(() => {
    if (theme) document.querySelector(".app").classList.add("dark");
    scrollbind(document.querySelector(".app"));
  }, []);

  const scrollbind = (e) => {
    e.addEventListener("scroll", function () {
      global.current.scrollTop = this.scrollTop;
      global.current.scrollLeft = this.scrollLeft;
      Array.from(document.querySelectorAll(".app")).forEach((e) => {
        e.scrollTop = global.current.scrollTop;
        e.scrollLeft = global.current.scrollLeft;
      });
    });
  };

  useEffect(() => {
    document.documentElement.style =
      "color-scheme:" + (theme ? "dark" : "light");
    // document.querySelector("link[rel='icon']").href = theme
    //   ? "favicon-dark.svg"
    //   : "favicon-light.svg";
    // document.querySelector("meta[name='theme-color']").content = theme
    //   ? "#f78166"
    //   : "#1da1f2";
  }, [theme]);

  return (
    <>
      <canvas id="glcanvas" width="0" height="0"></canvas>
      <div className={"app" + (scrollbar ? " scrollbar" : "")}>
        <div className="box">
          <header>
            <Link
              to={
                window.location.pathname.split("/").slice(0, -1).join("/") ||
                "/"
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                <path
                  fill="var(--theme-primary)"
                  fillOpacity=".5"
                  d="M1.693 20.088a5.78 5.78 0 0 1 0-8.176l10.22-10.219a5.78 5.78 0 0 1 8.175 0l10.219 10.22a5.78 5.78 0 0 1 0 8.175l-10.22 10.219a5.78 5.78 0 0 1-8.175 0L1.693 20.087Z"
                />
                <rect
                  fill="var(--theme-primary)"
                  width="26"
                  height="26"
                  x="3"
                  y="3"
                  rx="5.778"
                />
                <path
                  fill="#fff"
                  d="M22.67 13.96c-1.4 0-2.3 1.56-2.5 1.56-.2 0-1.05-1.56-2.52-1.56a2.73 2.73 0 0 0-2.67 2.6c-.04.81.22 1.42.58 1.98.73 1.11 3.94 3.79 4.6 3.79.7 0 3.87-2.67 4.6-3.79.37-.56.63-1.17.59-1.98a2.73 2.73 0 0 0-2.68-2.6"
                />
                <path
                  fill="#fff"
                  d="M14.8 19.04a4.05 4.05 0 0 1-.73-2.52 3.7 3.7 0 0 1 1.1-2.44 3.52 3.52 0 0 1 2.48-1.03c1.09 0 1.66.36 2.2.88.11.12.26.03.28-.13a3.56 3.56 0 0 0-3.46-4.13c-1.83 0-2.99 2.05-3.26 2.05-.25 0-1.36-2.05-3.27-2.05a3.56 3.56 0 0 0-3.49 3.4 4.08 4.08 0 0 0 .76 2.57c.96 1.45 5.12 4.93 6 4.93.3 0 .93-.36 1.69-.91.04-.03.1-.1.02-.2a3 3 0 0 1-.31-.42z"
                />
              </svg>
            </Link>
            <div className="grow"></div>
            <div
              className={"noselect toggle" + (preview ? " enabled" : "")}
              onClick={handlePreview}
              onKeyPress={(e) => e.key === "Enter" && handlePreview()}
              tabIndex="0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 16 16"
              >
                <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
              </svg>
            </div>
            <div
              className="noselect toggle"
              onClick={handleTheme}
              onKeyPress={(e) => e.key === "Enter" && handleTheme()}
              tabIndex="0"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={
                    theme
                      ? "M9 0a.82.82 0 0 0-.82.82v1.17a.82.82 0 1 0 1.64 0V.82A.82.82 0 0 0 9 0zm5.79 2.4a.82.82 0 0 0-.59.23l-.82.82a.82.82 0 1 0 1.16 1.16l.83-.81a.82.82 0 0 0-.58-1.4zm-11.57 0c-.07 0-.15 0-.22.02a.82.82 0 0 0-.37 1.38l.82.82c.16.15.37.23.58.23a.82.82 0 0 0 .59-1.4l-.82-.82a.82.82 0 0 0-.58-.24zM9 4.1a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8zM.82 8.17a.82.82 0 0 0 0 1.64h1.17a.82.82 0 1 0 0-1.64H.82zm15.2 0a.82.82 0 0 0 0 1.64h1.16a.82.82 0 1 0 0-1.64h-1.17zm-2.06 4.95a.82.82 0 0 0-.58 1.4l.82.83c.15.15.36.23.58.23a.82.82 0 0 0 .58-1.4l-.82-.81a.82.82 0 0 0-.58-.25zm-9.92 0a.82.82 0 0 0-.58.25l-.82.82a.82.82 0 0 0 0 1.16c.16.15.37.23.58.23.22 0 .43-.08.58-.23l.82-.82a.82.82 0 0 0-.58-1.4zM9 15.2a.81.81 0 0 0-.82.82v1.17a.82.82 0 0 0 1.64 0v-1.17A.82.82 0 0 0 9 15.2z"
                      : "M15.68 10.55a.5.5 0 0 0-.59 0 5.02 5.02 0 0 1-6.44-7.69.5.5 0 0 0-.4-.86 7.03 7.03 0 1 0 7.6 9.1.5.5 0 0 0-.17-.55z"
                  }
                ></path>
              </svg>
            </div>
          </header>
          <Suspense fallback={loading}>{view}</Suspense>
          <Footer />
          <Popup />
        </div>
      </div>
      <div className="clip" onAnimationEnd={onAnimationEnd}></div>
    </>
  );
}
