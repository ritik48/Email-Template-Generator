export function ImageComponent({ item }: { item: any }) {
  return <img style={item.style} src={item.style.src} alt="Image" />;
}
