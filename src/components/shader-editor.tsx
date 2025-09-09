import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface ShaderEditorProps {
  backgroundColor: string;
  baseColors: string[];
  overlayColors: string[];
  baseSpeed: number;
  overlaySpeed: number;
  wireframe: boolean;
  overlayOpacity: number;
  onBackgroundColorChange: (value: string) => void;
  onBaseColorsChange: (colors: string[]) => void;
  onOverlayColorsChange: (colors: string[]) => void;
  onBaseSpeedChange: (speed: number) => void;
  onOverlaySpeedChange: (speed: number) => void;
  onWireframeChange: (wireframe: boolean) => void;
  onOverlayOpacityChange: (opacity: number) => void;
  onAddColor: (target: "base" | "overlay") => void;
  onRemoveColor: (target: "base" | "overlay", index: number) => void;
  onUpdateColor: (
    target: "base" | "overlay",
    index: number,
    value: string
  ) => void;
}

export function ShaderEditor({
  backgroundColor,
  baseColors,
  overlayColors,
  baseSpeed,
  overlaySpeed,
  wireframe,
  overlayOpacity,
  onBackgroundColorChange,
  onBaseSpeedChange,
  onOverlaySpeedChange,
  onWireframeChange,
  onOverlayOpacityChange,
  onAddColor,
  onRemoveColor,
  onUpdateColor,
}: ShaderEditorProps) {
  return (
    <div className="bg-white/10 p-4 pr-0 h-screen rounded-3xl overflow-hidden">
      <section className="h-full overflow-y-auto flex flex-col justify-evenly gap-8 pr-2">
        <h2 className="text-lg text-center border-b border-neutral-100 pb-4 font-medium">
          Background
        </h2>

        <div className="space-y-2">
          <Label htmlFor="bg">Background colour</Label>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                id="bg"
                aria-label="Background colour"
                type="color"
                value={backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div
                className="h-9 w-9 rounded-full border-2 border-white/20 cursor-pointer"
                style={{ backgroundColor: backgroundColor }}
              />
            </div>
            <Input
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="bg-white/20 border-0 text-xs"
            />
          </div>
        </div>

        {/* Base colours */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Base colours</h3>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onAddColor("base")}
              disabled={baseColors.length >= 5}
              className="text-xs"
            >
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {baseColors.map((c, i) => (
              <div key={`base-${i}`} className="flex items-center gap-2">
                <div className="relative">
                  <input
                    aria-label={`Base colour ${i + 1}`}
                    type="color"
                    value={c}
                    onChange={(e) => onUpdateColor("base", i, e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div
                    className="h-8 w-8 rounded-full border-2 border-white/20 cursor-pointer flex-shrink-0"
                    style={{ backgroundColor: c }}
                  />
                </div>
                <Input
                  value={c}
                  onChange={(e) => onUpdateColor("base", i, e.target.value)}
                  className="bg-white/20 border-0 text-xs flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveColor("base", i)}
                  disabled={baseColors.length <= 3}
                  aria-label={`Remove base colour ${i + 1}`}
                  className="px-2 text-xs flex-shrink-0"
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Overlay colours */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Overlay colours</h3>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onAddColor("overlay")}
              disabled={overlayColors.length >= 5}
              className="text-xs"
            >
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {overlayColors.map((c, i) => (
              <div key={`overlay-${i}`} className="flex items-center gap-2">
                <div className="relative">
                  <input
                    aria-label={`Overlay colour ${i + 1}`}
                    type="color"
                    value={c}
                    onChange={(e) =>
                      onUpdateColor("overlay", i, e.target.value)
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div
                    className="h-8 w-8 rounded-full border-2 border-white/20 cursor-pointer flex-shrink-0"
                    style={{ backgroundColor: c }}
                  />
                </div>
                <Input
                  value={c}
                  onChange={(e) => onUpdateColor("overlay", i, e.target.value)}
                  className="bg-white/20 border-0 text-xs flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveColor("overlay", i)}
                  disabled={overlayColors.length <= 3}
                  aria-label={`Remove overlay colour ${i + 1}`}
                  className="px-2 text-xs flex-shrink-0"
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Motion and blend */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Base speed</Label>
            <Slider
              value={[baseSpeed]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => onBaseSpeedChange(v[0] ?? 0)}
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
              onValueChange={(v) => onOverlaySpeedChange(v[0] ?? 0)}
            />
            <div className="text-xs text-white/70">
              Current: {overlaySpeed.toFixed(2)}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="space-y-1 flex-1">
              <Label>Wireframe overlay</Label>
              <div className="text-xs text-white/70">
                Renders the mesh edges to add structure
              </div>
            </div>
            <Switch
              checked={wireframe}
              onCheckedChange={onWireframeChange}
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
              onValueChange={(v) => onOverlayOpacityChange(v[0] ?? 0)}
            />
            <div className="text-xs text-white/70">
              Current: {overlayOpacity.toFixed(2)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
