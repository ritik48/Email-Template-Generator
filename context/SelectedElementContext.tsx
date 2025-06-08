import { DragElement, LayoutType } from "@/types";
import { createContext, Dispatch, ElementType, SetStateAction } from "react";

type SelectedElementContextType = {
  selectedElement:
    | (DragElement & { meta_data: { layoutId: number; index: number } })
    | null;
  setSelectedElement: Dispatch<
    SetStateAction<
      (DragElement & { meta_data: { layoutId: number; index: number } }) | null
    >
  >;
};

export const SelectedElementContext =
  createContext<SelectedElementContextType | null>(null);
