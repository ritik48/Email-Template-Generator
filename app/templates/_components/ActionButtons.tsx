import { useSelectedElement, useTemplateStructure } from "@/Provider";
import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";

export default function ActionButtons() {
  const { selectedElement } = useSelectedElement();
  const { templateStructure, setTemplateStructure } = useTemplateStructure();

  function moveLayoutUpDown(move: number) {
    const fromIndex = templateStructure.findIndex(
      (item) => item.id === selectedElement?.meta_data?.layoutId
    );

    const toIndex = fromIndex + move;

    const updated = [...templateStructure];

    if (
      fromIndex < 0 ||
      fromIndex >= templateStructure.length ||
      toIndex < 0 ||
      toIndex >= templateStructure.length
    )
      return updated;

    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);

    setTemplateStructure(updated);
  }

  function removeLayout() {
    const layoutId = selectedElement?.meta_data?.layoutId;
    if (!layoutId) return;

    setTemplateStructure((prev) => prev.filter((item) => item.id !== layoutId));
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 absolute -right-10 -top-10">
      <button
        className="p-1 hover:bg-gray-500 bg-gray-400 rounded-full cursor-pointer"
        onClick={() => moveLayoutUpDown(-1)}
      >
        <ArrowUp size={18} />
      </button>
      <button
        className="p-1 hover:bg-gray-500 bg-gray-400 rounded-full cursor-pointer"
        onClick={() => moveLayoutUpDown(1)}
      >
        <ArrowDown size={18} />
      </button>
      <button
        className="p-1 hover:bg-red-200 rounded cursor-pointer"
        onClick={removeLayout}
      >
        <Trash2 size={18} className="text-red-600" />
      </button>
    </div>
  );
}
