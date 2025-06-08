export function ImageComponent({ item }: { item: any }) {
  return (
    <div style={item.outerStyle}>
      <img style={item.style} src={item.style.src} alt="Image" />
    </div>
  );
}
