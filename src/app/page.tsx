"use client";

import { useMemo, useState } from "react";
import ShaderPreview from "@/components/shader-preview";
import { cn } from "@/lib/utils";
import { TextEditor } from "@/components/text-editor";
import { ShaderEditor } from "@/components/shader-editor";

type Align = "left" | "center" | "right";
type FontChoice = "sans" | "serif";

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
  const [align, setAlign] = useState<Align>("left");
  const [font, setFont] = useState<FontChoice>("sans");
  const [headingSize, setHeadingSize] = useState<number>(48); // px
  const [subSize, setSubSize] = useState<number>(14); // px
  const [textColor, setTextColor] = useState<string>("#ffffff");

  // Derived alignment classes
  const alignClass = useMemo(() => {
    switch (align) {
      case "center":
        return "items-start justify-center text-center";
      case "right":
        return "items-start justify-end text-right";
      default:
        return "items-start justify-start text-left";
    }
  }, [align]);

  const headingFontClass = font === "serif" ? "instrument" : "font-sans";

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
        align,
        font,
        headingSize,
        subSize,
        textColor,
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
            align={align}
            font={font}
            headingSize={headingSize}
            subSize={subSize}
            textColor={textColor}
            onHeadingChange={setHeading}
            onSubheadingChange={setSubheading}
            onAlignChange={setAlign}
            onFontChange={setFont}
            onHeadingSizeChange={setHeadingSize}
            onSubSizeChange={setSubSize}
            onTextColorChange={setTextColor}
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
            >
              <div
                className={cn("absolute inset-0 p-6 md:p-10 flex", alignClass)}
              >
                <div className="max-w-xl ">
                  <div
                    className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
                    )}
                    style={{
                      filter: "url(#glass-effect)",
                    }}
                  >
                    <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                    <span className="text-white/90 text-xs font-light relative z-10">
                      Live Shader Preview
                    </span>
                  </div>

                  <h1
                    className={cn(
                      "tracking-tight  font-light mb-3",
                      headingFontClass
                    )}
                    style={{
                      fontSize: `${headingSize}px`,
                      color: textColor,
                      lineHeight: 1.1,
                    }}
                  >
                    {heading}
                  </h1>
                  <p
                    className="font-light"
                    style={{
                      fontSize: `${subSize}px`,
                      color: textColor + "cc",
                    }}
                  >
                    {subheading}
                  </p>
                </div>
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
