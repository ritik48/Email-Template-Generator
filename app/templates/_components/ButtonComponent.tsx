export function ButtonComponent({ item }: { item: any }) {
  return (
    <div style={item.outerStyle}>
      <button style={item.style}>{item.style.label || item.label}</button>
    </div>
  );
}
