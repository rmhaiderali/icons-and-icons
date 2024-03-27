import { useState, useEffect } from "react";

export default function ({ onIconClick }) {
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkTheme) document.documentElement.classList.add("dark");
  }, []);

  function handleThemeChange() {
    document.documentElement.classList[isDarkTheme ? "remove" : "add"]("dark");
    localStorage.setItem("theme", isDarkTheme ? "light" : "dark");
    setIsDarkTheme(!isDarkTheme);
  }

  return (
    <header>
      <div className="logo">
        <div tabIndex={0}>
          <svg width="32" height="32" onClick={onIconClick}>
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
        </div>
      </div>
      <div className="grow"></div>
      <div
        className="noselect toggle"
        onClick={handleThemeChange}
        onKeyDown={(e) => e.key === "Enter" && handleThemeChange()}
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
              isDarkTheme
                ? "M15.68 10.55a.5.5 0 0 0-.59 0 5.02 5.02 0 0 1-6.44-7.69.5.5 0 0 0-.4-.86 7.03 7.03 0 1 0 7.6 9.1.5.5 0 0 0-.17-.55z"
                : "M9 0a.82.82 0 0 0-.82.82v1.17a.82.82 0 1 0 1.64 0V.82A.82.82 0 0 0 9 0zm5.79 2.4a.82.82 0 0 0-.59.23l-.82.82a.82.82 0 1 0 1.16 1.16l.83-.81a.82.82 0 0 0-.58-1.4zm-11.57 0c-.07 0-.15 0-.22.02a.82.82 0 0 0-.37 1.38l.82.82c.16.15.37.23.58.23a.82.82 0 0 0 .59-1.4l-.82-.82a.82.82 0 0 0-.58-.24zM9 4.1a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8zM.82 8.17a.82.82 0 0 0 0 1.64h1.17a.82.82 0 1 0 0-1.64H.82zm15.2 0a.82.82 0 0 0 0 1.64h1.16a.82.82 0 1 0 0-1.64h-1.17zm-2.06 4.95a.82.82 0 0 0-.58 1.4l.82.83c.15.15.36.23.58.23a.82.82 0 0 0 .58-1.4l-.82-.81a.82.82 0 0 0-.58-.25zm-9.92 0a.82.82 0 0 0-.58.25l-.82.82a.82.82 0 0 0 0 1.16c.16.15.37.23.58.23.22 0 .43-.08.58-.23l.82-.82a.82.82 0 0 0-.58-1.4zM9 15.2a.81.81 0 0 0-.82.82v1.17a.82.82 0 0 0 1.64 0v-1.17A.82.82 0 0 0 9 15.2z"
            }
          ></path>
        </svg>
      </div>
    </header>
  );
}
