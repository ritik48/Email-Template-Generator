import { DragElement, LayoutType } from "@/types";
import { createContext, Dispatch, ElementType, SetStateAction } from "react";

type CurrentDragElementContextType = {
  dragElement: DragElement | null;
  setDragElement: Dispatch<SetStateAction<DragElement | null>>;
};

export const CurrentDragElementContext =
  createContext<CurrentDragElementContextType | null>(null);
