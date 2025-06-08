import { createContext, useContext, useRef, RefObject } from "react";

export const CanvasRefContext =
  createContext<RefObject<HTMLDivElement | null> | null>(null);
