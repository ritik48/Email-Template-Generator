"use client";

import React from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { useSelectedElement, useTemplateStructure } from "@/Provider";
import { InputFieldStyle } from "./InputFieldStyle";
import { Slider } from "@/components/ui/slider";

export function Settings() {
  const { selectedElement, setSelectedElement } = useSelectedElement();
  const { templateStructure, setTemplateStructure } = useTemplateStructure();

  if (!selectedElement) {
    return (
      <div className="w-[300px] h-full overflow-y-auto bg-white border-r border-gray-200 p-4 text-gray-500">
        <p>No item selected</p>
      </div>
    );
  }

  const handleStyleChange = (key: string, value: string) => {
    const { layoutId, index } = (selectedElement as any).meta_data;
    const requiredLayout = templateStructure.find(
      (layout) => layout.id === layoutId
    );

    if (!requiredLayout) return;

    const newChildren = [...requiredLayout.children];

    const updatedChild = {
      ...newChildren[index],
      style: {
        ...newChildren[index].style,
        [key]: value,
      },
    };

    newChildren[index] = updatedChild;

    setTemplateStructure((prev) =>
      prev.map((item) =>
        item.id === layoutId
          ? {
              ...requiredLayout,
              children: newChildren,
            }
          : item
      )
    );

    setSelectedElement({
      ...selectedElement,
      style: { ...updatedChild.style },
    });
  };

  const renderCommonControls = () => (
    <>
      <InputFieldStyle
        label={"Background Color"}
        styleKey={"color"}
        value={selectedElement.style.backgroundColor || "#ffffff"}
        type={"color"}
        onChange={(value) => handleStyleChange("backgroundColor", value)}
      />

      {/* Width Slider */}
      <label className="block text-sm font-medium text-gray-700">Width</label>
      <div className="flex items-center gap-2">
        <Slider
          min={0}
          max={100}
          step={1}
          value={[parseInt(selectedElement.style.width || "100", 10)]}
          onValueChange={([val]) => handleStyleChange("width", `${val}%`)}
          className="w-full"
        />

        <span className="text-sm text-gray-600">
          {selectedElement.style.width || "100%"}
        </span>
      </div>

      {/* Height Slider */}
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Height
      </label>
      <div className="flex items-center gap-2">
        <Slider
          min={0}
          max={500}
          step={1}
          value={[parseInt(selectedElement.style.height || "50", 10)]}
          onValueChange={([val]) => handleStyleChange("height", `${val}px`)}
          className="w-full"
        />

        <span className="text-sm text-gray-600">
          {selectedElement.style.height || "50px"}
        </span>
      </div>
    </>
  );

  const renderTypeSpecificControls = () => {
    switch (selectedElement.item) {
      case "button":
      case "text":
        return (
          <>
            <InputFieldStyle
              label={"Font Size"}
              styleKey={"fontSize"}
              value={selectedElement.style.fontSize || ""}
              type={"number"}
              onChange={(value) => handleStyleChange("fontSize", `${value}px`)}
            />

            <InputFieldStyle
              label={"Text Color"}
              styleKey={"color"}
              value={selectedElement.style.color || "#000000"}
              type={"color"}
              onChange={(value) => handleStyleChange("color", value)}
            />

            <InputFieldStyle
              label={"Label"}
              styleKey={"label"}
              value={selectedElement.style.label || ""}
              type={"text"}
              onChange={(value) => handleStyleChange("label", value)}
            />
          </>
        );

      case "image":
        return (
          <>
            <InputFieldStyle
              label={"Image URL"}
              styleKey={"src"}
              value={selectedElement.style.src || ""}
              type={"text"}
              onChange={(value) => handleStyleChange("src", value)}
            />
          </>
        );

      case "divider":
        return (
          <>
            <label className="block text-sm font-medium text-gray-700">
              Divider Color
            </label>
            <input
              type="color"
              value={selectedElement.style.backgroundColor || "#000000"}
              onChange={(e) =>
                handleStyleChange("backgroundColor", e.target.value)
              }
              className="w-full mb-2"
            />

            <label className="block text-sm font-medium text-gray-700">
              Thickness
            </label>
            <input
              type="text"
              value={selectedElement.style.height || "1px"}
              onChange={(e) => handleStyleChange("height", e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1 mb-2"
              placeholder="e.g., 2px"
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-[300px] h-full overflow-y-auto bg-white border-r border-gray-200 p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <SettingsIcon className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
      </div>
      <hr />
      <div className="space-y-4">
        {renderCommonControls()}
        {renderTypeSpecificControls()}
      </div>
    </div>
  );
}
