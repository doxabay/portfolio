"use client";

import { useEffect, useState } from "react";

const words = [
  "Hello",
  "Hola",
  "Bonjour",
  "こんにちは",
  "你好",
  "Ciao",
  "Hallo",
  "Olá",
  "Привет",
  "안녕하세요",
  "مرحبا",
  "Habari",
  "Bawo",
];

const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const PAUSE = 5000;

export default function TypewriterHello({ className }: { className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];

    if (!deleting && displayed === current) {
      const t = setTimeout(() => setDeleting(true), PAUSE);
      return () => clearTimeout(t);
    }

    if (deleting && displayed === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => {
        setDisplayed(
          deleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1)
        );
      },
      deleting ? DELETE_SPEED : TYPE_SPEED
    );

    return () => clearTimeout(t);
  }, [displayed, deleting, index]);

  return (
    <span className={className}>
      {displayed.toUpperCase()}
      <span className="animate-pulse [animation-duration:0.6s]">_</span>
    </span>
  );
}
