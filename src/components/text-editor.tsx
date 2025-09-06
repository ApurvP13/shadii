import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type Align = "left" | "center" | "right";
type FontChoice = "sans" | "serif";

interface TextEditorProps {
  heading: string;
  subheading: string;
  align: Align;
  font: FontChoice;
  headingSize: number;
  subSize: number;
  textColor: string;
  onHeadingChange: (value: string) => void;
  onSubheadingChange: (value: string) => void;
  onAlignChange: (value: Align) => void;
  onFontChange: (value: FontChoice) => void;
  onHeadingSizeChange: (value: number) => void;
  onSubSizeChange: (value: number) => void;
  onTextColorChange: (value: string) => void;
}

export function TextEditor({
  heading,
  subheading,
  align,
  font,
  headingSize,
  subSize,
  textColor,
  onHeadingChange,
  onSubheadingChange,
  onAlignChange,
  onFontChange,
  onHeadingSizeChange,
  onSubSizeChange,
  onTextColorChange,
}: TextEditorProps) {
  return (
    <div className="space-y-10 bg-white/10 p-4 h-screen overflow-hidden rounded-3xl">
      <section className="flex overflow-y-auto flex-col h-screen justify-evenly">
        <h2 className="text-lg text-center border-b border-neutral-100 pb-4 font-medium">
          Text Overlay
        </h2>

        <div className="space-y-2 ">
          <Label htmlFor="heading">Heading</Label>
          <Input
            id="heading"
            value={heading}
            onChange={(e) => onHeadingChange(e.target.value)}
            className="bg-white/20 border-0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subheading">Subheading</Label>
          <Input
            id="subheading"
            value={subheading}
            onChange={(e) => onSubheadingChange(e.target.value)}
            className="bg-white/20 border-0"
          />
        </div>

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

          <div className="space-y-2">
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

        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Alignment</Label>
            <div className="flex flex-col gap-2">
              {(["left", "center", "right"] as Align[]).map((a) => (
                <Button
                  key={a}
                  type="button"
                  variant={align === a ? "default" : "secondary"}
                  size="sm"
                  onClick={() => onAlignChange(a)}
                  className="w-full"
                >
                  {a.charAt(0).toUpperCase() + a.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Font</Label>
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant={font === "sans" ? "default" : "secondary"}
                size="sm"
                onClick={() => onFontChange("sans")}
                className="w-full"
              >
                Sans (Figtree)
              </Button>
              <Button
                type="button"
                variant={font === "serif" ? "default" : "secondary"}
                size="sm"
                onClick={() => onFontChange("serif")}
                className="w-full"
              >
                Serif (Instrument)
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
