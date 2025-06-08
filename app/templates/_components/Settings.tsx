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
  Settings as SettingsIcon,
  MousePointer,
} from "lucide-react";

export function Settings() {
  return (
    <div className="w-[300px] h-full overflow-y-auto bg-white border-r border-gray-200 p-4">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <SettingsIcon className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
        </div>
      </div>
    </div>
  );
}
