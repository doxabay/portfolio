"use client";

import { useEffect, useRef } from "react";

export default function ViewportVideo({
  src,
  className,
  loop = false,
  plain = false,
  playbackRate = 1,
}: {
  src: string;
  className?: string;
  loop?: boolean;
  /** plain: just autoplay + loop at playbackRate, no viewport observer */
  plain?: boolean;
  playbackRate?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (playbackRate !== 1) video.playbackRate = playbackRate;

    if (plain) return;

    let rafId = 0;

    const tick = () => {
      if (video.currentTime >= 8) video.currentTime = 3;
      rafId = requestAnimationFrame(tick);
    };

    const handleEnded = () => {
      video.currentTime = 3;
      video.play();
      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
          if (!loop) rafId = requestAnimationFrame(tick);
        } else {
          video.pause();
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.2 }
    );

    if (!loop) video.addEventListener("ended", handleEnded);
    observer.observe(video);

    return () => {
      if (!loop) video.removeEventListener("ended", handleEnded);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [loop, plain, playbackRate]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      loop={loop || plain}
      autoPlay={plain}
      className={className}
    />
  );
}
