export type AlgorithmId =
  | "floyd-steinberg"
  | "bayer"
  | "atkinson"
  | "jarvis"
  | "stucki"
  | "sierra"
  | "burkes";

export type BayerSize = 2 | 4 | 8;

export interface DitherSettings {
  algorithm: AlgorithmId;
  threshold: number;      // 0–255
  invert: boolean;
  errorStrength: number;  // 0–1
  serpentine: boolean;
  bayerSize: BayerSize;
  scale: number;          // 0.25–2
  contrast: number;       // -100–100
  gamma: number;          // 0.1–3
  highlights: number;     // 0–100
  blurRadius: number;     // 0–10
  cornerRadius: number;   // 0–50 (% of shorter side)
  circularMask: boolean;
  bgColor: string;        // hex
}

export const DEFAULT_SETTINGS: DitherSettings = {
  algorithm: "floyd-steinberg",
  threshold: 128,
  invert: false,
  errorStrength: 1,
  serpentine: true,
  bayerSize: 4,
  scale: 1,
  contrast: 0,
  gamma: 1,
  highlights: 0,
  blurRadius: 0,
  cornerRadius: 0,
  circularMask: false,
  bgColor: "#ffffff",
};

export const ALGO_LABELS: Record<AlgorithmId, string> = {
  "floyd-steinberg": "Floyd–Steinberg",
  "bayer":           "Ordered Bayer",
  "atkinson":        "Atkinson",
  "jarvis":          "Jarvis–Judice–Ninke",
  "stucki":          "Stucki",
  "sierra":          "Sierra",
  "burkes":          "Burkes",
};
