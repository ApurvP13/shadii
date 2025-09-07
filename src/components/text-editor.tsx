import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface TextEditorProps {
  heading: string;
  subheading: string;
  badgeText: string;
  position: GridPosition;
  font: FontState;
  headingSize: number;
  subSize: number;
  textColor: string;
  showSubheading: boolean;
  showBadge: boolean;
  snapToGrid: boolean;
  onHeadingChange: (value: string) => void;
  onSubheadingChange: (value: string) => void;
  onBadgeTextChange: (value: string) => void;
  onPositionChange: (value: GridPosition) => void;
  onFontChange: (value: FontState) => void;
  onHeadingSizeChange: (value: number) => void;
  onSubSizeChange: (value: number) => void;
  onTextColorChange: (value: string) => void;
  onShowSubheadingChange: (value: boolean) => void;
  onShowBadgeChange: (value: boolean) => void;
  onSnapToGridChange: (value: boolean) => void;
}

const GRID_POSITIONS: { position: GridPosition; label: string }[] = [
  { position: "top-left", label: "Top Left" },
  { position: "top-center", label: "Top Center" },
  { position: "top-right", label: "Top Right" },
  { position: "center-left", label: "Center Left" },
  { position: "center-center", label: "Center" },
  { position: "center-right", label: "Center Right" },
  { position: "bottom-left", label: "Bottom Left" },
  { position: "bottom-center", label: "Bottom Center" },
  { position: "bottom-right", label: "Bottom Right" },
];

export function TextEditor({
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
  onHeadingChange,
  onSubheadingChange,
  onBadgeTextChange,
  onPositionChange,
  onFontChange,
  onHeadingSizeChange,
  onSubSizeChange,
  onTextColorChange,
  onShowSubheadingChange,
  onShowBadgeChange,
  onSnapToGridChange,
}: TextEditorProps) {
  const getGridButtonClass = (gridPos: GridPosition) => {
    const isActive = position === gridPos;
    const baseClass = "w-8 h-8 rounded border transition-all duration-200";

    if (isActive) {
      return `${baseClass} bg-white border-white`;
    }
    return `${baseClass} bg-transparent border-white/30 hover:border-white/60 hover:bg-white/10`;
  };

  const getGridIcon = (gridPos: GridPosition) => {
    const isActive = position === gridPos;
    return (
      <div
        className={`w-3 h-3 rounded-full ${
          isActive ? "bg-black" : "bg-white/60"
        }`}
      />
    );
  };

  return (
    <div className="space-y-8 scroll-p-0 bg-white/10 p-4 h-screen rounded-3xl overflow-hidden">
      <section className="flex flex-col justify-evenly gap-4 h-full overflow-y-auto scrollbar-hide">
        <h2 className="text-lg font-medium">Text Editor</h2>

        {/* Heading */}
        <div className="space-y-4">
          <Label htmlFor="heading">Heading</Label>
          <Input
            id="heading"
            value={heading}
            onChange={(e) => onHeadingChange(e.target.value)}
            className="bg-transparent"
          />
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Heading Font</Label>
            <select
              value={font.heading}
              onChange={(e) =>
                onFontChange({
                  ...font,
                  heading: e.target.value as FontChoice,
                })
              }
              className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="sans">Geist Sansf</option>
              <option value="mono">Geist Mono</option>
              <option value="instrument">Instrument Serif</option>
              <option value="onest">Onest</option>
              <option value="inter">Inter</option>
              <option value="space">Space Mono</option>
              <option value="man">Manrope</option>
            </select>
          </div>
        </div>

        {showBadge ? (
          <div className="space-y-4 p-3 rounded-lg border border-white/10 bg-white/5">
            <div className="flex items-center justify-between">
              <Label htmlFor="badge-text" className="text-sm font-medium">
                Badge
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onShowBadgeChange(false)}
                className="h-6 w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10"
              >
                <X size={14} />
              </Button>
            </div>
            <div className="space-y-2">
              <Input
                id="badge-text"
                value={badgeText}
                onChange={(e) => onBadgeTextChange(e.target.value)}
                className="bg-transparent"
                placeholder="Enter badge text..."
              />
            </div>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() => onShowBadgeChange(true)}
            className="w-full border-dashed bg-black border-white/20 text-white/70 hover:bg-neutral-800 hover:text-white hover:border-white/40"
          >
            <Plus size={16} className="mr-2" />
            Add Badge
          </Button>
        )}

        {/* Subheading Section */}
        {showSubheading ? (
          <div className="space-y-3 p-3 rounded-lg border border-white/10 bg-white/5">
            <div className="flex items-center justify-between">
              <Label htmlFor="subheading" className="text-sm font-medium">
                Subheading
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onShowSubheadingChange(false)}
                className="h-6 w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10"
              >
                <X size={14} />
              </Button>
            </div>
            <div className="space-y-2">
              <Input
                id="subheading"
                value={subheading}
                onChange={(e) => onSubheadingChange(e.target.value)}
                className="bg-transparent"
                placeholder="Enter subheading..."
              />
            </div>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() => onShowSubheadingChange(true)}
            className="w-full border-dashed bg-black border-white/20 text-white/70 hover:bg-neutral-800 hover:text-white hover:border-white/40"
          >
            <Plus size={16} className="mr-2" />
            Add Subheading
          </Button>
        )}

        {showSubheading && (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Subheading Font</Label>
              <select
                value={font.subheading}
                onChange={(e) =>
                  onFontChange({
                    ...font,
                    subheading: e.target.value as FontChoice,
                  })
                }
                className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <option value="sans">Geist Sansf</option>
                <option value="mono">Geist Mono</option>
                <option value="instrument">Instrument Serif</option>
                <option value="onest">Onest</option>
                <option value="inter">Inter</option>
                <option value="space">Space Mono</option>
                <option value="man">Manrope</option>
              </select>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Heading size</Label>
            <Slider
              value={[headingSize]}
              min={24}
              max={96}
              step={1}
              onValueChange={(v) => onHeadingSizeChange(Math.round(v[0] ?? 48))}
            />
            <div className="text-xs text-white/70">{headingSize}px</div>
          </div>

          {showSubheading && (
            <div className="space-y-2">
              <Label>Subtext size</Label>
              <Slider
                value={[subSize]}
                min={12}
                max={24}
                step={1}
                onValueChange={(v) => onSubSizeChange(Math.round(v[0] ?? 14))}
              />
              <div className="text-xs text-white/70">{subSize}px</div>
            </div>
          )}

          <div className="space-y-4">
            <Label>Text colour</Label>
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  aria-label="Text colour"
                  type="color"
                  value={textColor}
                  onChange={(e) => onTextColorChange(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div
                  className="h-9 w-9 rounded-full border-2 border-white/20 cursor-pointer"
                  style={{ backgroundColor: textColor }}
                />
              </div>
              <Input
                value={textColor}
                onChange={(e) => onTextColorChange(e.target.value)}
                className="bg-white/20 border-0 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Position Section */}
        <div className="space-y-6">
          <div className="flex w-full text-center items-center justify-between">
            <Label>Position</Label>
          </div>

          {/* 3x3 Grid */}
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-1 h-48 w-full">
              {GRID_POSITIONS.map((gridPos) => (
                <Button
                  key={gridPos.position}
                  variant="ghost"
                  className={cn(
                    "h-full border border-white/20 hover:border-white/40 hover:bg-white/10",
                    "transition-all duration-200",
                    position === gridPos.position && "border-white bg-white/20"
                  )}
                  onClick={() => onPositionChange(gridPos.position)}
                  title={gridPos.label}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      position === gridPos.position
                        ? "bg-orange-500"
                        : "bg-white/0"
                    }`}
                  />
                </Button>
              ))}
            </div>

            {/* Current position label */}
            <div className="text-xs text-white/70 text-center">
              {GRID_POSITIONS.find((p) => p.position === position)?.label}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
