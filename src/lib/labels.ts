import type { Level, Surface } from "../types";

export const levelLabel: Record<Level, string> = {
  starter: "入门",
  intermediate: "进阶",
  advanced: "高阶",
};

export const surfaceLabel: Record<Surface, string> = {
  cli: "CLI",
  app: "桌面",
  ide: "IDE",
  cloud: "Cloud",
  ci: "CI",
};
