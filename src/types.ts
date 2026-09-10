export type Surface = "cli" | "app" | "ide" | "cloud" | "ci";
export type Level = "starter" | "intermediate" | "advanced";

export type CategoryId =
  | "mindset"
  | "prompt"
  | "agents-md"
  | "config"
  | "sandbox"
  | "commands"
  | "session"
  | "skills"
  | "mcp"
  | "subagents"
  | "hooks"
  | "automation"
  | "cloud"
  | "security"
  | "debug"
  | "recipes";

export interface Category {
  id: CategoryId;
  chapter: string;
  name: string;
  blurb: string;
}

export interface Source {
  label: string;
  url: string;
}

export interface Tip {
  id: string;
  no: number;
  title: string;
  summary: string;
  body: string;
  category: CategoryId;
  level: Level;
  surfaces: Surface[];
  tags: string[];
  featured?: boolean;
  sources: Source[];
  related?: string[];
}

export interface CheatRow {
  cmd: string;
  meaning: string;
}

export interface CheatSection {
  id: string;
  title: string;
  rows: CheatRow[];
}

export interface Template {
  id: string;
  title: string;
  filename: string;
  summary: string;
  code: string;
}
