import { useRef } from "react";
import { useSize } from "./ResizeObserver";

export default function ({ title, href }) {
  const target = useRef(null);
  const size = useSize(target);
  const child = target.current?.children[0];

  return (
    <div ref={target} className="marquee">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        style={
          child?.clientWidth > Math.round(size?.width)
            ? { animationDuration: child?.clientWidth / 100 + "s" }
            : {}
        }
      >
        <div>{title}</div>
      </a>
    </div>
  );
}
