// PlayerStickFigure.tsx
export function PlayerStickFigure({
  size = 50,
  color = "black",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {/* Head */}
      <circle cx="50" cy="18" r="14" />

      {/* Body */}
      <rect x="45" y="30" width="10" height="28" rx="4" />

      {/* Right Arm */}
      <path d="M50 35 L78 50 L72 58 L48 42" />

      {/* Left Arm */}
      <path d="M50 35 L22 50 L28 58 L52 42" />

      {/* Right Leg */}
      <path d="M50 58 L70 90 L60 94 L45 62" />

      {/* Left Leg */}
      <path d="M50 58 L32 90 L40 94 L55 62" />
    </svg>
  );
}
