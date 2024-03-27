import buttonPaths from "../common/buttonPaths";

export default function ({ buttonType, isActive, handler, count }) {
  return (
    <div
      className={"btn " + buttonType + (isActive ? " active" : "")}
      onClick={handler}
      onKeyDown={(e) => e.key === "Enter" && handler()}
      tabIndex="0"
    >
      <a>
        <svg viewBox="0 0 16 16">
          <path d={buttonPaths[buttonType][isActive]} />
        </svg>
      </a>
      {count}
    </div>
  );
}
