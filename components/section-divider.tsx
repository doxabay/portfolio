export default function SectionDivider() {
  return (
    <div
      className="w-full h-[12px]"
      style={{
        backgroundImage: `repeating-linear-gradient(
          315deg,
          transparent,
          transparent 7px,
          #e5e5e5 7px,
          #e5e5e5 8px
        )`,
      }}
    />
  );
}
