"use client";

import { useContext, useRef, useState } from "react";
import { ScreenContext } from "./context/ScreenContext";
import { CurrentDragElementContext } from "./context/CurrentDragElement";
import { DragElement } from "./types";
import {
  TemplateStructureContext,
  TemplateStructureContextType,
  TemplateStructureType,
} from "./context/TemplateStructure";
import { SelectedElementContext } from "./context/SelectedElementContext";
import { CanvasRefContext } from "./context/CanvasRefContext";

export function Provider({
  children,
  initialTemplateStructure = [],
}: {
  children: React.ReactNode;
  initialTemplateStructure?: TemplateStructureType[];
}) {
  const [screen, setScreen] = useState<"desktop" | "mobile">("desktop");
  const [dragElement, setDragElement] = useState<DragElement | null>(null);
  const [templateStructure, setTemplateStructure] = useState<
    TemplateStructureType[]
  >(initialTemplateStructure);

  const [selectedElement, setSelectedElement] = useState<
    (DragElement & { meta_data: { layoutId: number; index: number } }) | null
  >(null);

  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <CanvasRefContext.Provider value={ref}>
      <TemplateStructureContext.Provider
        value={{ templateStructure, setTemplateStructure }}
      >
        <ScreenContext.Provider value={{ screen, setScreen }}>
          <CurrentDragElementContext.Provider
            value={{ dragElement, setDragElement }}
          >
            <SelectedElementContext.Provider
              value={{ selectedElement, setSelectedElement }}
            >
              {children}
            </SelectedElementContext.Provider>
          </CurrentDragElementContext.Provider>
        </ScreenContext.Provider>
      </TemplateStructureContext.Provider>
    </CanvasRefContext.Provider>
  );
}

export const useScreen = () => {
  const context = useContext(ScreenContext);
  if (!context) {
    throw new Error("useScreen must be used within a ScreenProvider");
  }
  return context;
};

export const useDragElement = () => {
  const context = useContext(CurrentDragElementContext);
  if (!context) {
    throw new Error(
      "useDragElement must be used within a CurrentDragElementProvider"
    );
  }
  return context;
};

export const useTemplateStructure = () => {
  const context = useContext(TemplateStructureContext);
  if (!context) {
    throw new Error(
      "useTemplateStructure must be used within a TemplateStructureProvider"
    );
  }
  return context as TemplateStructureContextType;
};

export const useSelectedElement = () => {
  const context = useContext(SelectedElementContext);
  if (!context) {
    throw new Error(
      "useSelectedElement must be used within a SelectedElementProvider"
    );
  }
  return context;
};

export const useCanvasRef = () => {
  return useContext(CanvasRefContext);
};
