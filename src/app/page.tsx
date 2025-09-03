"use client";

import { useMemo, useState } from "react";
import ShaderPreview from "@/components/shader-preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type Align = "left" | "center" | "right";
type FontChoice = "sans" | "serif";

const PRESET_PALETTES: string[][] = [
  // 3-5 colors each to follow the color-system rules
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
  // Background controls
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

  // Text overlay controls
  const [heading, setHeading] = useState<string>("Design your Hero");
  const [subheading, setSubheading] = useState<string>(
    "Tweak colors, motion, and typography in real-time."
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
      <div className="grid md:grid-cols-5 gap-6 p-6">
        {/* Controls */}
        <aside className="md:col-span-2 space-y-8">
          {/* Background group */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium">Background</h2>

            <div className="space-y-2">
              <Label htmlFor="bg">Background color</Label>
              <div className="flex items-center gap-3">
                <input
                  id="bg"
                  aria-label="Background color"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="h-9 w-12 bg-transparent border border-white/20 rounded cursor-pointer"
                />
                <Input
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="bg-transparent"
                />
              </div>
            </div>

            {/* Base colors */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Base colors</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => addColor("base")}
                    disabled={baseColors.length >= 5}
                  >
                    Add
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {baseColors.map((c, i) => (
                  <div key={`base-${i}`} className="flex items-center gap-2">
                    <input
                      aria-label={`Base color ${i + 1}`}
                      type="color"
                      value={c}
                      onChange={(e) => updateColor("base", i, e.target.value)}
                      className="h-9 w-12 bg-transparent border border-white/20 rounded cursor-pointer"
                    />
                    <Input
                      value={c}
                      onChange={(e) => updateColor("base", i, e.target.value)}
                      className="bg-transparent"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeColor("base", i)}
                      disabled={baseColors.length <= 3}
                      aria-label={`Remove base color ${i + 1}`}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Overlay colors */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Overlay colors</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => addColor("overlay")}
                    disabled={overlayColors.length >= 5}
                  >
                    Add
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {overlayColors.map((c, i) => (
                  <div key={`overlay-${i}`} className="flex items-center gap-2">
                    <input
                      aria-label={`Overlay color ${i + 1}`}
                      type="color"
                      value={c}
                      onChange={(e) =>
                        updateColor("overlay", i, e.target.value)
                      }
                      className="h-9 w-12 bg-transparent border border-white/20 rounded cursor-pointer"
                    />
                    <Input
                      value={c}
                      onChange={(e) =>
                        updateColor("overlay", i, e.target.value)
                      }
                      className="bg-transparent"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeColor("overlay", i)}
                      disabled={overlayColors.length <= 3}
                      aria-label={`Remove overlay color ${i + 1}`}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Motion and blend */}
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Base speed</Label>
                <Slider
                  value={[baseSpeed]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={(v) => setBaseSpeed(clamp01(v[0] ?? 0))}
                />
                <div className="text-xs text-white/70">
                  Current: {baseSpeed.toFixed(2)}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Overlay speed</Label>
                <Slider
                  value={[overlaySpeed]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={(v) => setOverlaySpeed(clamp01(v[0] ?? 0))}
                />
                <div className="text-xs text-white/70">
                  Current: {overlaySpeed.toFixed(2)}
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label>Wireframe overlay</Label>
                  <div className="text-xs text-white/70">
                    Renders the mesh edges to add structure
                  </div>
                </div>
                <Switch
                  checked={wireframe}
                  onCheckedChange={setWireframe}
                  aria-label="Toggle wireframe overlay"
                />
              </div>
              <div className="space-y-2">
                <Label>Overlay opacity</Label>
                <Slider
                  value={[overlayOpacity]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={(v) => setOverlayOpacity(clamp01(v[0] ?? 0))}
                />
                <div className="text-xs text-white/70">
                  Current: {overlayOpacity.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={randomizePalette} variant="default">
                Randomize palette
              </Button>
              <Button onClick={copyConfig} variant="secondary">
                Copy JSON config
              </Button>
            </div>
          </section>

          {/* Text overlay group */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium">Text Overlay</h2>

            <div className="space-y-2">
              <Label htmlFor="heading">Heading</Label>
              <Input
                id="heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subheading">Subheading</Label>
              <Input
                id="subheading"
                value={subheading}
                onChange={(e) => setSubheading(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label>Heading size</Label>
                <Slider
                  value={[headingSize]}
                  min={24}
                  max={96}
                  step={1}
                  onValueChange={(v) => setHeadingSize(Math.round(v[0] ?? 48))}
                />
                <div className="text-xs text-white/70">{headingSize}px</div>
              </div>
              <div className="space-y-2">
                <Label>Subtext size</Label>
                <Slider
                  value={[subSize]}
                  min={12}
                  max={24}
                  step={1}
                  onValueChange={(v) => setSubSize(Math.round(v[0] ?? 14))}
                />
                <div className="text-xs text-white/70">{subSize}px</div>
              </div>
              <div className="space-y-2">
                <Label>Text color</Label>
                <div className="flex items-center gap-3">
                  <input
                    aria-label="Text color"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="h-9 w-12 bg-transparent border border-white/20 rounded cursor-pointer"
                  />
                  <Input
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="bg-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Alignment</Label>
                <div className="flex items-center gap-2">
                  {(["left", "center", "right"] as Align[]).map((a) => (
                    <Button
                      key={a}
                      type="button"
                      variant={align === a ? "default" : "secondary"}
                      size="sm"
                      onClick={() => setAlign(a)}
                    >
                      {a}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Font</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant={font === "sans" ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setFont("sans")}
                  >
                    Sans (Figtree)
                  </Button>
                  <Button
                    type="button"
                    variant={font === "serif" ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setFont("serif")}
                  >
                    Serif (Instrument)
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </aside>

        {/* Preview */}
        <section className="md:col-span-3">
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
      </div>
    </div>
  );
}
