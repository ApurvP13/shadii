import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, Download, Github, Dices } from "lucide-react";

interface FixedToolbarProps {
  onCopyConfig: () => void;
  onDownload: () => void;
  Randomise: () => void;
}

export function FixedToolbar({
  onCopyConfig,
  onDownload,
  Randomise,
}: FixedToolbarProps) {
  const handleShareOnX = () => {
    const text =
      "Check out this amazing hero section I created with live shader preview!";
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const handleGithubRedirect = () => {
    window.open("https://github.com/ApurvP13/shadii", "_blank");
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-4xl px-4 py-3 shadow-2xl">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={Randomise}
                className="h-10 w-10 text-white hover:bg-white/20 hover:text-white rounded-xl transition-all duration-200"
              >
                <Dices className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Randomize</p>
            </TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onCopyConfig}
                className="h-10 w-10 text-white hover:bg-white/20 hover:text-white rounded-xl transition-all duration-200"
              >
                <Copy className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy Configuration</p>
            </TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-6 bg-white/20" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onDownload}
                className="h-10 w-10 text-white hover:bg-white/20 hover:text-white rounded-xl transition-all duration-200"
              >
                <Download className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download Render</p>
            </TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-6 bg-white/20" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShareOnX}
                className="h-10 w-10 text-white hover:bg-white/20 hover:text-white rounded-xl transition-all duration-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share on X</p>
            </TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleGithubRedirect}
                className="h-10 w-10 text-white hover:bg-white/20 hover:text-white rounded-xl transition-all duration-200"
              >
                <Github className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View on GitHub</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
