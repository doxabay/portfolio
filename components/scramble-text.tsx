"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export default function ScrambleText({
  text,
  trigger,
}: {
  text: string;
  trigger: boolean;
}) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number | null>(null);
  const iterRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    iterRef.current = 0;

    function tick() {
      const iter = iterRef.current;
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iter) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iter < text.length) {
        iterRef.current += 0.4;
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    }

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [trigger, text]);

  return <>{display}</>;
}
