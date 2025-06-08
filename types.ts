export type LayoutType = "1column" | "2column" | "3column" | "4column";

export type ElementType =
  | "button"
  | "text"
  | "image"
  | "logo"
  | "divider"
  | "social";

export type DragElement = {
  type: "layout" | "element";
  item: ElementType;
  id: number;
  label: string;
  description?: string;
  col?: number;
  style: any;
};
