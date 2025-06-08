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

export function ItemSelectionSideBar() {
  const layoutItems = [
    { id: "column", icon: Columns, label: "Column", description: "1 Column" },
    {
      id: "2column",
      icon: Columns,
      label: "2 Column",
      description: "2 Column",
      selected: true,
    },
    {
      id: "3column",
      icon: Columns3,
      label: "3 Column",
      description: "3 Column",
    },
    {
      id: "4column",
      icon: Columns4,
      label: "4 Column",
      description: "4 Column",
    },
  ];

  const elementItems = [
    { id: "button", icon: MousePointer, label: "Button" },
    { id: "text", icon: Type, label: "Text" },
    { id: "image", icon: Image, label: "Image" },
    { id: "logo", icon: Hash, label: "Logo" },
    { id: "divider", icon: Minus, label: "Divider" },
    { id: "social", icon: Zap, label: "Social" },
  ];

  return (
    <div className="w-[400px] h-full overflow-y-auto bg-white border-r border-gray-200 p-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Layouts</h2>
        <div className="grid grid-cols-2 gap-3">
          {layoutItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={item.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  item.selected ? "ring-2 ring-blue-500 border-blue-200" : ""
                }`}
              >
                <CardContent className="p-3 text-center">
                  <IconComponent
                    className={`w-6 h-6 mx-auto mb-2 ${
                      item.selected ? "text-blue-600" : "text-gray-600"
                    }`}
                  />
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
                key={item.id}
                className="cursor-pointer transition-all hover:shadow-md hover:bg-gray-50"
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
