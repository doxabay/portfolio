"use client";

import { Agentation } from "agentation";

export default function AgentationProvider() {
  return process.env.NODE_ENV === "development" ? (
    <Agentation endpoint="http://localhost:4747" />
  ) : null;
}
