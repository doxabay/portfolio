import type { Metadata } from "next";
import AboutContent from "./about-content";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return <AboutContent />;
}
