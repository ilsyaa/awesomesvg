import { Suspense } from "react";
import { IconGrid } from "@/components/icons";

export default function Icons() {
  return (
    <div className="max-w-5xl px-5 mx-auto pt-5 pb-28">
      <Suspense fallback={<div>Loading icons...</div>}>
        <IconGrid />
      </Suspense>
    </div>
  );
}
