"use client";

import { useMemo, useState } from "react";
import ShaderPreview from "@/components/shader-preview";
import { cn } from "@/lib/utils";
import { TextEditor } from "@/components/text-editor";
import { ShaderEditor } from "@/components/shader-editor";

type GridPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center-center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

const fontClassMap = {
  sans: "font-sans",
  mono: "font-mono",
  instrument: "font-instrument",
  onest: "font-onest",
  inter: "font-inter",
  space: "font-space",
  man: "font-man",
} as const;

type FontChoice =
  | "sans"
  | "mono"
  | "instrument"
  | "onest"
  | "inter"
  | "space"
  | "man";

type FontState = {
  heading: FontChoice;
  subheading: FontChoice;
};

const PRESET_PALETTES: string[][] = [
  // 3-5 colours each to follow the colour-system rules
  ["#000000", "#8b5cf6", "#ffffff", "#1e1b4b", "#4c1d95"], // violet night
  ["#000000", "#00e5ff", "#00ffaa", "#ffffff"], // neon cyan/green on black
  ["#000000", "#ff6b00", "#ffd166", "#ffffff"], // warm amber/orange
  ["#000000", "#7dd3fc", "#38bdf8", "#ffffff"], // cool blue/cyan
  ["#000000", "#f43f5e", "#ffffff", "#0ea5e9"], // red/blue pop
];

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function HeroEditorPage() {
  // Background state
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [baseColors, setBaseColors] = useState<string[]>(PRESET_PALETTES[0]);
  const [overlayColors, setOverlayColors] = useState<string[]>([
    "#000000",
    "#ffffff",
    "#8b5cf6",
    "#000000",
  ]);
  const [baseSpeed, setBaseSpeed] = useState<number>(0.3);
  const [overlaySpeed, setOverlaySpeed] = useState<number>(0.2);
  const [wireframe, setWireframe] = useState<boolean>(true);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(0.6);

  // Text state
  const [heading, setHeading] = useState<string>("Design your Hero");
  const [subheading, setSubheading] = useState<string>(
    "Tweak colours, motion, and typography in real-time."
  );
  const [badgeText, setBadgeText] = useState<string>("Live Shader Preview");
  const [position, setPosition] = useState<GridPosition>("center-left");
  const [font, setFont] = useState<FontState>({
    heading: "sans",
    subheading: "sans",
  });
  const [headingSize, setHeadingSize] = useState<number>(48); // px
  const [subSize, setSubSize] = useState<number>(14); // px
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [snapToGrid, setSnapToGrid] = useState<boolean>(true);

  // Toggle states for text elements
  const [showSubheading, setShowSubheading] = useState<boolean>(true);
  const [showBadge, setShowBadge] = useState<boolean>(true);

  // Derived positioning classes based on grid position
  const positionClasses = useMemo(() => {
    const [vertical, horizontal] = position.split("-");

    let containerClasses = " p-6 md:p-10 flex ";
    let textClasses = "";

    // Vertical alignment
    switch (vertical) {
      case "top":
        containerClasses += "items-start ";
        break;
      case "center":
        containerClasses += "items-center ";
        break;
      case "bottom":
        containerClasses += "items-end ";
        break;
    }

    // Horizontal alignment
    switch (horizontal) {
      case "left":
        containerClasses += "justify-start ";
        textClasses += "text-left ";
        break;
      case "center":
        containerClasses += "justify-center ";
        textClasses += "text-center ";
        break;
      case "right":
        containerClasses += "justify-end ";
        textClasses += "text-right ";
        break;
    }

    return { containerClasses, textClasses };
  }, [position]);

  // Shader control functions
  function randomizePalette() {
    const pick =
      PRESET_PALETTES[Math.floor(Math.random() * PRESET_PALETTES.length)];
    setBaseColors(pick);
    // Create a related overlay: shuffled subset with black for contrast
    const overlay = Array.from(new Set(["#000000", ...pick])).slice(
      0,
      Math.max(3, Math.min(5, pick.length))
    );
    setOverlayColors(overlay);
  }

  function addColor(target: "base" | "overlay") {
    if (target === "base") {
      if (baseColors.length >= 5) return;
      setBaseColors([...baseColors, "#ffffff"]);
    } else {
      if (overlayColors.length >= 5) return;
      setOverlayColors([...overlayColors, "#ffffff"]);
    }
  }

  function removeColor(target: "base" | "overlay", index: number) {
    if (target === "base") {
      if (baseColors.length <= 3) return;
      setBaseColors(baseColors.filter((_, i) => i !== index));
    } else {
      if (overlayColors.length <= 3) return;
      setOverlayColors(overlayColors.filter((_, i) => i !== index));
    }
  }

  function updateColor(
    target: "base" | "overlay",
    index: number,
    value: string
  ) {
    if (target === "base") {
      setBaseColors(baseColors.map((c, i) => (i === index ? value : c)));
    } else {
      setOverlayColors(overlayColors.map((c, i) => (i === index ? value : c)));
    }
  }

  function copyConfig() {
    const config = {
      background: {
        backgroundColor,
        baseColors,
        overlayColors,
        baseSpeed,
        overlaySpeed,
        wireframe,
        overlayOpacity,
      },
      text: {
        heading,
        subheading,
        badgeText,
        position,
        font,
        headingSize,
        subSize,
        textColor,
        showSubheading,
        showBadge,
        snapToGrid,
      },
    };
    const txt = JSON.stringify(config, null, 2);
    navigator.clipboard?.writeText(txt);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grid grid-cols-5 gap-6 p-6">
        {/* Text Editor Panel */}
        <aside className="col-span-1">
          <TextEditor
            heading={heading}
            subheading={subheading}
            badgeText={badgeText}
            position={position}
            font={font}
            headingSize={headingSize}
            subSize={subSize}
            textColor={textColor}
            showSubheading={showSubheading}
            showBadge={showBadge}
            snapToGrid={snapToGrid}
            onHeadingChange={setHeading}
            onSubheadingChange={setSubheading}
            onBadgeTextChange={setBadgeText}
            onPositionChange={setPosition}
            onFontChange={setFont}
            onHeadingSizeChange={setHeadingSize}
            onSubSizeChange={setSubSize}
            onTextColorChange={setTextColor}
            onShowSubheadingChange={setShowSubheading}
            onShowBadgeChange={setShowBadge}
            onSnapToGridChange={setSnapToGrid}
          />
        </aside>

        {/* Preview */}
        <section className="col-span-3">
          <div className="rounded-lg overflow-hidden border border-white/10">
            <ShaderPreview
              className="w-full h-[60vh]"
              baseColors={baseColors}
              overlayColors={overlayColors}
              baseSpeed={baseSpeed}
              overlaySpeed={overlaySpeed}
              wireframe={wireframe}
              overlayOpacity={overlayOpacity}
              backgroundColor={backgroundColor}
              containerClassName={positionClasses.containerClasses}
            >
              <div className={cn("max-w-xl", positionClasses.textClasses)}>
                {showBadge && (
                  <div
                    className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
                    )}
                    style={{
                      filter: "url(#glass-effect)",
                    }}
                  >
                    <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                    <span className="text-white/90  text-xs font-light relative z-10">
                      {badgeText}
                    </span>
                  </div>
                )}

                <h1
                  className={cn(
                    "tracking-tight font-light mb-3",
                    fontClassMap[font.heading]
                  )}
                  style={{
                    fontSize: `${headingSize}px`,
                    color: textColor,
                    lineHeight: 1.1,
                  }}
                >
                  {heading}
                </h1>

                {showSubheading && (
                  <p
                    className={cn("font-light", fontClassMap[font.subheading])}
                    style={{
                      fontSize: `${subSize}px`,
                      color: textColor + "cc",
                    }}
                  >
                    {subheading}
                  </p>
                )}
              </div>
            </ShaderPreview>
          </div>
        </section>

        {/* Shader Editor Panel */}
        <aside className="col-span-1">
          <ShaderEditor
            backgroundColor={backgroundColor}
            baseColors={baseColors}
            overlayColors={overlayColors}
            baseSpeed={baseSpeed}
            overlaySpeed={overlaySpeed}
            wireframe={wireframe}
            overlayOpacity={overlayOpacity}
            onBackgroundColorChange={setBackgroundColor}
            onBaseColorsChange={setBaseColors}
            onOverlayColorsChange={setOverlayColors}
            onBaseSpeedChange={(speed) => setBaseSpeed(clamp01(speed))}
            onOverlaySpeedChange={(speed) => setOverlaySpeed(clamp01(speed))}
            onWireframeChange={setWireframe}
            onOverlayOpacityChange={(opacity) =>
              setOverlayOpacity(clamp01(opacity))
            }
            onAddColor={addColor}
            onRemoveColor={removeColor}
            onUpdateColor={updateColor}
            onRandomizePalette={randomizePalette}
            onCopyConfig={copyConfig}
          />
        </aside>
      </div>
    </div>
  );
}
