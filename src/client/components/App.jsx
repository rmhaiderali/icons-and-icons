import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import mapToObject from "array-map-to-object";
import date from "date-and-time";
import Header from "./Header";
import Footer from "./Footer";
import Popup from "./Popup";

const components = {
  TBL: lazy(() => import("./TBL")),
  THF: lazy(() => import("./THF")),
  WSH: lazy(() => import("./WSH")),
};

export default function () {
  const global = useRef({
    vendor: null,
    renderer: null,
  });

  const navigate = useNavigate();
  const replaceAndNavigate = (to) => navigate(to, { replace: true });

  const { service, year, month } = useParams();

  const services = {
    tbl: {
      fullName: "Twitter Branded Likes",
      sortBy: "startsAt",
      reverseItems: true,
      pathDepth: 2,
    },
    thf: {
      fullName: "Twitter Hashfettis",
      sortBy: "startsAt",
      reverseItems: true,
      pathDepth: 3,
    },
    wsh: {
      fullName: "Windows Search Highlights",
      sortBy: "Date",
      reverseItems: false,
      pathDepth: 3,
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
    const { sortBy, reverseItems, pathDepth } = services[service];

    const path = ["", service, year, month].slice(0, pathDepth + 1);
    replaceAndNavigate(path.join("/"));

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
      <div className="buttons grow">
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
        if (data.type === "items")
          renderItems(data.result, components[service.toUpperCase()]);
        else if (["months", "years"].includes(data.type))
          renderButtons(
            uppercaseFirstLetter(data.type).slice(0, -1),
            data.result
          );
      })
      .catch((err) => {
        setView(error);
        console.log(err);
      });
  }

  useEffect(() => {
    if (!Object.keys(services).includes(service))
      renderButtons("Service", Object.keys(services));
    else fetchData(service, year, month);
  }, [service, year, month]);

  useEffect(() => {
    let themePrimary;

    if (["wsh"].includes(service)) themePrimary = "#ff7a5c";
    else if (["tbl", "thf"].includes(service)) themePrimary = "#1da1f2";
    else themePrimary = "#7b8d9f";

    document.documentElement.style.setProperty("--theme-primary", themePrimary);
  }, [service]);

  return (
    <>
      <canvas
        width="0"
        height="0"
        id="glcanvas"
        style={{ position: "fixed" }}
      ></canvas>
      <div className="box">
        <Header
          onIconClick={() => {
            const currentPath = window.location.pathname;
            const newPath = "/" + currentPath.split("/").slice(1, -1).join("/");
            if (newPath !== currentPath) navigate(newPath);
          }}
        />
        <Suspense fallback={loading}>{view}</Suspense>
        <Footer />
        <Popup />
      </div>
    </>
  );
}
