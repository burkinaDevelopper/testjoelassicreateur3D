import { Interface } from "node:readline";

interface Status {
  key: "full-time" | "part-time" | "intern" | "contractor" | "freelance";
  title: "Full Time" | "Part Time" | "Intern" | "Contractor" | "Freelance";
}


export interface Item {
  id: number | string;
  title?: string;
  slug: string;
  url: string;
  created_at: string;
  description: string;
  price: string;
  duration: any;
}

