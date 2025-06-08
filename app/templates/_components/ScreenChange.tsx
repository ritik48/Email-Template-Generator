"use client";

import { useScreen } from "@/Provider";
import { MonitorCheck, Smartphone } from "lucide-react";

export function ScreenChange() {
  const { screen, setScreen } = useScreen();

  console.log("Current screen:", screen);

  return (
    <div className="flex items-center gap-4">
      <div
        className={`cursor-pointer flex items-center gap-1 text-sm text-gray-700 px-4 py-2 rounded-md ${
          screen === "desktop" && "bg-blue-200"
        }`}
        onClick={() => setScreen("desktop")}
      >
        <MonitorCheck className="w-5 h-5" />
        <div>Desktop</div>
      </div>

      <div
        className={`cursor-pointer flex items-center gap-1 text-sm text-gray-700 px-4 py-2 rounded-md ${
          screen === "mobile" && "bg-blue-200"
        }`}
        onClick={() => setScreen("mobile")}
      >
        <Smartphone className="w-5 h-5" />
        <div>Mobile</div>
      </div>
    </div>
  );
}
