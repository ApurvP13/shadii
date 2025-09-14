"use client";

import type React from "react";
import { MeshGradient } from "@paper-design/shaders-react";

type ShaderPreviewProps = {
  className?: string;
  baseColors: string[];
  overlayColors: string[];
  baseSpeed: number;
  overlaySpeed: number;
  wireframe: boolean;
  overlayOpacity: number;
  backgroundColor: string;
  containerClassName?: string;
  children?: React.ReactNode;
};

export default function ShaderPreview({
  className,
  baseColors,
  overlayColors,
  baseSpeed,
  overlaySpeed,
  wireframe,
  overlayOpacity,
  backgroundColor,
  containerClassName,
  children,
}: ShaderPreviewProps) {
  return (
    <div className={["relative", className].filter(Boolean).join(" ")}>
      {/* Base gradient */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={baseColors}
        speed={baseSpeed}
        // backgroundColor={backgroundColor}
      />
      {/* Overlay gradient */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={overlayColors}
        speed={overlaySpeed}
        {...(wireframe ? { wireframe: "true" as const } : {})}
        // backgroundColor="transparent"
        style={{ opacity: overlayOpacity }}
      />
      {/* Overlay children (text, controls portals, etc.) with positioning */}
      <div
        className={[
          "absolute inset-0 z-10", // Add absolute and inset-0 to fill parent
          containerClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
