export function TextComponent({ item }: { item: any }) {
  return (
    <div style={item.outerStyle}>
      <div style={item.style}>{item.style.label || item.label}</div>
    </div>
  );
}
{
  /* <div className="bg-red-500 w-full h-full flex items-center justify-center"></div> */
}
