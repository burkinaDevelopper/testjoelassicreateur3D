'use client';

import type { Metadata } from "next";
import { APP_NAME } from "@/constants/app";
import Header from "./Header";
import { HRTable } from "./HRTable";
import { useStoreChapters } from "../../stores/chapters";
import { useEffect } from "react";

// export const metadata: Metadata = {
//   title: `Organization - ${APP_NAME}`,
// };

export default function page() {
  const getChapters = useStoreChapters((s) => s.getChapters);
  const chapters = useStoreChapters((s) => s.chapters);
  

  useEffect(() => {
    void getChapters();
  }, [getChapters]);
  console.log("chapters", chapters);

  return (
    <div className="transition-content w-full px-(--margin-x) pt-0 lg:pt-0">
      <Header />
      <HRTable chapters={chapters} />
    </div>
  );
}
