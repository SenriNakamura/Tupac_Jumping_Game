export function BrokenHeart({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left half of broken heart */}
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09"
        fill="#8B1A1A"
        stroke="#8B1A1A"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right half of broken heart - offset slightly */}
      <path
        d="M12 5.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35"
        fill="#8B1A1A"
        stroke="#8B1A1A"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(0.5, 0)"
      />
      {/* Crack line through the middle */}
      <path
        d="M12 3v18.35"
        stroke="#5A0F0F"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Additional crack details */}
      <path
        d="M10 8l2 2 M14 12l-2 2"
        stroke="#5A0F0F"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
