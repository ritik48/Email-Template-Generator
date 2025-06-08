export function TextComponent({ item }: { item: any }) {
  return <div style={item.style}>{item.label}</div>;
}
