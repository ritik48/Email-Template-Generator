export function TextComponent({ item }: { item: any }) {
  return <div style={item.style}>{item.style.label || item.label}</div>;
}
