"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Columns,
  Columns3,
  Columns4,
  Type,
  Image,
  Hash,
  Minus,
  Zap,
  Settings,
  MousePointer,
} from "lucide-react";
import { useDragElement } from "@/Provider";

export function ItemSelectionSideBar() {
  const layoutItems = [
    {
      type: "layout",
      icon: Columns,
      label: "Column",
      description: "1 Column",
      col: 1,
    },
    {
      type: "layout",
      icon: Columns,
      label: "2 Column",
      description: "2 Column",
      col: 2,
    },
    {
      type: "layout",
      icon: Columns3,
      label: "3 Column",
      description: "3 Column",
      col: 3,
    },
    {
      type: "layout",
      icon: Columns4,
      label: "4 Column",
      description: "4 Column",
      col: 4,
    },
  ];

  const elementItems = [
    {
      type: "element",
      item: "button",
      icon: MousePointer,
      label: "Button",
      style: {
        backgroundColor: "#007AFF",
        color: "#ffffff",
        borderRadius: "4px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        width: "40%",
        height: "auto",
      },
    },
    {
      type: "element",
      item: "text",
      icon: Type,
      label: "Text",
      style: {
        backgroundColor: "#fff",
        color: "#000",
        width: "100%",
        height: "auto",
        textAlign: "center",
      },
    },
    {
      type: "element",
      item: "image",
      icon: Image,
      label: "Image",
      style: {
        src: "/file.svg", // image URL here
        width: "100%",
        height: "auto",
      },
    },
    {
      type: "element",
      item: "divider",
      icon: Minus,
      label: "Divider",
      style: {
        height: "1px",
        backgroundColor: "#000",
        margin: "10px 0",
        width: "100%",
      },
    },
  ];

  const { dragElement, setDragElement } = useDragElement();

  const handleDragStart = (item: any) => {
    const { icon, ...restItem } = item;
    setDragElement({
      ...restItem,
      id: Date.now(),
    });
  };
  return (
    <div className="w-[400px] h-full overflow-y-auto bg-white border-r border-gray-200 p-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Layouts</h2>
        <div className="grid grid-cols-2 gap-3">
          {layoutItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={item.col}
                className={`cursor-pointer transition-all hover:shadow-md`}
                draggable
                onDragStart={(e) => handleDragStart(item)}
              >
                <CardContent className="p-3 text-center">
                  <IconComponent className={`w-6 h-6 mx-auto mb-2`} />
                  <div className="text-xs text-gray-600">
                    {item.description}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Elements</h2>
        <div className="grid grid-cols-2 gap-3">
          {elementItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={item.item}
                className="cursor-pointer transition-all hover:shadow-md hover:bg-gray-50"
                draggable
                onDragStart={(e) => handleDragStart(item)}
              >
                <CardContent className="p-3 text-center">
                  <IconComponent className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <div className="text-xs text-gray-600">{item.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
