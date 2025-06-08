"use client";

import { TemplateStructureType } from "@/context/TemplateStructure";
import { itemsStyleMap } from "@/itemStyles";
import {
  useCanvasRef,
  useDragElement,
  useScreen,
  useTemplateStructure,
} from "@/Provider";
import clsx from "clsx";
import { useRef, useState } from "react";
import { ColumnLayout } from "./ColumnLayout";

export function Canvas() {
  const { screen } = useScreen();
  const { dragElement, setDragElement } = useDragElement();
  const { templateStructure, setTemplateStructure } = useTemplateStructure();
  const canvasRef = useCanvasRef();

  console.log({ templateStructure });

  const [dragOver, setDragOver] = useState(false);

  const size = screen === "desktop" ? "w-[80%]" : "w-[50%]";

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    setDragOver(true);
    e.preventDefault();
  };

  const handleOnDrop = () => {
    setDragOver(false);

    const cols = dragElement!.col!;

    const type = dragElement?.type;
    if (type === "layout") {
      const emptyChildren = Array.from({ length: cols }).map((_, i) => ({}));
      setTemplateStructure((prev) => [
        ...prev,
        { ...dragElement, children: emptyChildren } as TemplateStructureType,
      ]);
    }
    setDragElement(null);
  };

  const getElement = (item: TemplateStructureType) => {
    if (item.type === "layout") {
      return <ColumnLayout layout={item} />;
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-gray-200">
      <div
        className={clsx(
          "p-6 mx-auto my-10 rounded-none shadow-lg",
          size,
          dragOver ? "bg-blue-200 p-6" : "bg-white"
        )}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={handleOnDrop}
        ref={canvasRef}
      >
        {templateStructure.map((item) => getElement(item))}

        {templateStructure.length === 0 && (
          <div className="text-center text-gray-500 p-4 bg-">
            <p>Add Element Here</p>
          </div>
        )}
      </div>
    </div>
  );
}
