"use client";

import { useScreen } from "@/Provider";

export function Canvas() {
  const { screen } = useScreen();

  const size = screen === "desktop" ? "w-[80%]" : "w-[50%]";

  return (
    <div className="h-full w-full overflow-y-auto bg-gray-200">
      <div
        className={`min-h-[800px] mx-auto my-10 rounded-none bg-white shadow-lg ${size}`}
      ></div>
    </div>
  );
}
