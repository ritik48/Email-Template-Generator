import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputFieldStyleProps = {
  label: string;
  styleKey: string;
  value: string | number;
  onChange: (value: string) => void;
  type: "text" | "number" | "color";
};

export function InputFieldStyle({
  label,
  styleKey,
  value,
  onChange,
  type,
}: InputFieldStyleProps) {
  return (
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor={styleKey}>{label}</Label>
      <Input
        id={styleKey}
        value={value.toString().replace("px", "")}
        type={type}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
