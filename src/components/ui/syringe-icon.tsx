"use client";

import * as React from "react";
import { cn } from "@/components/ui/utils";

type SyringeIconProps = {
  size?: number;
  side: "left" | "right"; 
  className?: string;
};

export function SyringeIcon({ size = 28, side, className }: SyringeIconProps) {
  const barrelColor = side === "left" ? "#000000" : "#FFFFFF"; // black on white, white on black
  const stripeColor = side === "left" ? "#FFFFFF" : "#000000"; // opposite of barrel

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn(className)}
      fill="none"
      stroke={barrelColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="rotate(-45 12 12)">
      {/* Plunger T-handle */}
        <rect
          x={9.5}
          y={3}
          width={5}
          height={0.1}
          rx={0.3}
          fill={barrelColor}
        />
        <rect
          x={11.5}
          y={4}
          width={0.8}
          height={2}
          fill={barrelColor}
        />

        {/* Barrel body */}
        <rect x="10.5" y="6" width="3" height="10" rx=".7" fill={barrelColor} />

       {/* Measurement markings: invert against barrel using mix-blend-mode */}
        {[
          { y: 7, opacity: 1 },
          { y: 8.5, opacity: 1 },
          { y: 10, opacity: 1 },
          { y: 11.5, opacity: 1 },
          { y: 13, opacity: 1 },
          { y: 14.5, opacity: 1 },
        ].map((mark, i) => (
          <line
            key={i}
            x1={8.5}
            x2={11.5}
            y1={mark.y}
            y2={mark.y}
            stroke={stripeColor}
            strokeWidth={.7}
            opacity={mark.opacity}
          />
        ))}
        {/* Neck + needle */}
        <line x1={12} y1={17} x2={12} y2={23.5} strokeWidth={1} />
      </g>
    </svg>
  );
}
