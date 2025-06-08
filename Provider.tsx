"use client";

import { useContext, useState } from "react";
import { ScreenContext } from "./context/ScreenContext";

export function Provider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<"desktop" | "mobile">("desktop");

  return (
    <ScreenContext.Provider value={{ screen, setScreen }}>
      {children}
    </ScreenContext.Provider>
  );
}

export const useScreen = () => {
  const context = useContext(ScreenContext);
  if (!context) {
    throw new Error("useScreen must be used within a ScreenProvider");
  }
  return context;
};
