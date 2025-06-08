import {
  useDragElement,
  useSelectedElement,
  useTemplateStructure,
} from "@/Provider";
import { DragElement, ElementType } from "@/types";
import { useState } from "react";
import { ElementLayout } from "./ElementLayout";
import ActionButtons from "./ActionButtons";

type ColumnLayoutProps = {
  layout: {
    id: number;
    col: number;
    label: string;
    type: "layout" | "element";
    description: string;
    children: {
      item: ElementType;
      type: "layout" | "element";
      id: number;
      style: any;
      label: string;
      col?: number;
      description?: string;
    }[];
  };
};

export function ColumnLayout({ layout }: ColumnLayoutProps) {
  const [dragOver, setDragOver] = useState<{
    index: number;
    layoutId: number;
  } | null>(null);
  const { dragElement } = useDragElement();
  const { templateStructure, setTemplateStructure } = useTemplateStructure();
  const { setSelectedElement, selectedElement } = useSelectedElement();

  const handleDragOver = (index: number) => {
    if (dragElement?.type !== "element") return;

    setDragOver({ index, layoutId: layout.id });
  };
  const handleDragLeave = (index: number) => {
    setDragOver(null);
  };

  const handleDrop = (index: number) => {
    if (dragElement?.type !== "element") return;

    const newChildren = [
      ...layout.children.slice(0, index),
      dragElement as any,
      ...layout.children.slice(index),
    ];

    setTemplateStructure((prev) => {
      const newLayout = {
        ...layout,
        children: newChildren,
      };
      return prev.map((item) => {
        if (item.id === layout.id) {
          return newLayout;
        }
        return item;
      });
    });

    setDragOver(null);
  };

  const getElement = (item: DragElement, index: number, layoutId: number) => {
    if (Object.keys(item).length === 0) return null;
    return <ElementLayout item={item} index={index} layoutId={layoutId} />;
  };

  const handleSelectElement = (layoutId: number, index: number) => {
    const currentSelected = selectedElement?.id;
    if (currentSelected === layout.children[index].id) {
      setSelectedElement(null);
      return;
    }

    const requiredLayout = templateStructure.find(
      (layout) => layout.id === layoutId
    );
    if (!requiredLayout) return;

    if (Object.keys(requiredLayout.children[index]).length === 0) return;

    setSelectedElement({
      ...(requiredLayout.children[index] as any),
      meta_data: { layoutId, index },
    });
  };
  console.log({ selectedElement });

  const selectedLayout = selectedElement?.meta_data.layoutId === layout.id;

  return (
    <div>
      <div
        className={`relative ${selectedLayout ? "border border-blue-200" : ""}`}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout.col}, 1fr)`,
          gap: "0px",
        }}
      >
        {Array.from({ length: layout.col }).map((_, index) => {
          const isDragOver =
            dragOver?.index === index && layout.id === dragOver.layoutId;
          const isSelected =
            selectedElement?.meta_data?.layoutId === layout.id &&
            selectedElement?.meta_data?.index === index;
          const hasChild = !!layout.children[index]?.type;

          const bgColor = isDragOver
            ? "bg-green-200"
            : hasChild
            ? "bg-white"
            : "bg-gray-100";

          const borderClass = isSelected
            ? "border-2 border-blue-500"
            : hasChild
            ? "border-0"
            : "border-1 border-gray-400";

          return (
            <div
              key={index}
              className={` border-dashed ${bgColor} ${borderClass} ${
                hasChild ? "p-0" : "p-2"
              }`}
              onDragOver={() => handleDragOver(index)}
              onDragLeave={() => handleDragLeave(index)}
              onDrop={() => handleDrop(index)}
              onClick={() => handleSelectElement(layout.id, index)}
            >
              {getElement(layout.children[index], index, layout.id) ||
                `Col ${index + 1}`}
            </div>
          );
        })}

        {selectedLayout && <ActionButtons />}
      </div>
    </div>
  );
}
