import { Interface } from "node:readline";

interface Status {
  key: "full-time" | "part-time" | "intern" | "contractor" | "freelance";
  title: "Full Time" | "Part Time" | "Intern" | "Contractor" | "Freelance";
}


export interface Item {
  id: number | string;
  firstname: string;
  lastname: string;
  created_at: string;
  pivot: any;
  is_admin: boolean;
  email: string;
}

