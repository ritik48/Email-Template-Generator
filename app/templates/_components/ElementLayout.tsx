import { DragElement } from "@/types";
import { ButtonComponent } from "./ButtonComponent";
import { TextComponent } from "./TextComponent";
import { ImageComponent } from "./ImageElement";
import { DividerElement } from "./DividerElement";

export function ElementLayout({
  item,
  index,
  layoutId,
}: {
  item: DragElement;
  index: number;
  layoutId: number;
}) {
  if (item.item === "button") {
    return <ButtonComponent item={item} />;
  }
  if (item.item === "text") {
    return <TextComponent item={item} />;
  }
  if (item.item === "image") {
    return <ImageComponent item={item} />;
  }
  if (item.item === "divider") {
    return <DividerElement item={item} />;
  }

  return item ? <div>{item.label}</div> : null;
}
