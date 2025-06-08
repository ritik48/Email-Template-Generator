export function ButtonComponent({ item }: { item: any }) {
  return <button style={item.style}>{item.style.label || item.label}</button>;
}
