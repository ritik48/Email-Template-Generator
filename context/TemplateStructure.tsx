import { ElementType, LayoutType } from "@/types";
import { createContext, Dispatch, SetStateAction } from "react";

export type TemplateStructureType = {
  type: "layout" | "element";
  id: number;
  label: string;
  description: string;
  col: number;
  children: {
    type: "element" | "layout";
    item: ElementType;
    id: number;
    label: string;
    description?: string;
    col?: number;
    style: any;
  }[];
};

export type TemplateStructureContextType = {
  templateStructure: TemplateStructureType[];
  setTemplateStructure: Dispatch<SetStateAction<TemplateStructureType[]>>;
};

const initialTemplateStrcture = {
  templateStructure: [],
  setTemplateStructure: () => {},
};

export const TemplateStructureContext =
  createContext<TemplateStructureContextType>(initialTemplateStrcture);
