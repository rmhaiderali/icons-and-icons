import { useRef } from "react";
import { useSize } from "../hooks/resizeObserver";

export default function ({ title, href }) {
  const target = useRef(null);
  const size = useSize(target);
  const child = target.current?.children[0];

  return (
    <div ref={target} className="marquee" tabIndex={0}>
      <a
        tabIndex={-1}
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        style={
          child?.clientWidth > Math.round(size?.width)
            ? { animationDuration: child?.clientWidth / 50 + "s" }
            : {}
        }
      >
        <div>{title}</div>
      </a>
    </div>
  );
}
