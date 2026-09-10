import type { Tip } from "../types";
import { coreTips } from "./tips-core";
import { configTips } from "./tips-config";
import { cliTips } from "./tips-cli";
import { extendTips } from "./tips-extend";
import { opsTips } from "./tips-ops";

export const tips: Tip[] = [
  ...coreTips,
  ...configTips,
  ...cliTips,
  ...extendTips,
  ...opsTips,
].sort((a, b) => a.no - b.no);

export const tipMap = new Map(tips.map((tip) => [tip.id, tip]));

export const featuredTips = tips.filter((tip) => tip.featured);

export function tipsByCategory(id: Tip["category"]): Tip[] {
  return tips.filter((tip) => tip.category === id);
}

export function relatedTips(tip: Tip): Tip[] {
  const fromIds = (tip.related ?? [])
    .map((id) => tipMap.get(id))
    .filter((item): item is Tip => Boolean(item));
  if (fromIds.length >= 3) return fromIds.slice(0, 4);

  const extra = tips.filter(
    (item) =>
      item.id !== tip.id &&
      (item.category === tip.category ||
        item.tags.some((tag) => tip.tags.includes(tag))),
  );
  const seen = new Set(fromIds.map((item) => item.id));
  for (const item of extra) {
    if (seen.has(item.id)) continue;
    fromIds.push(item);
    if (fromIds.length >= 4) break;
  }
  return fromIds;
}
