import { createContext } from "react";

type ScreenContextType = {
  screen: "desktop" | "mobile";
  setScreen: (screen: "desktop" | "mobile") => void;
};

const initialScreen: ScreenContextType = {
  screen: "desktop",
  setScreen: () => {},
};

export const ScreenContext = createContext<ScreenContextType>(initialScreen);
