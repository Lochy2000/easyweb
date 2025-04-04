import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { X, ExternalLink, Maximize2, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Template = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  demoUrl?: string; // URL to the actual demo
};

interface TemplateDemoProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template | null;
  setLoading?: (loading: boolean) => void;
}

const TemplateDemo: React.FC<TemplateDemoProps> = ({
  isOpen,
  onClose,
  template,
  setLoading,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  // If no template is provided, don't render anything
  if (!template) return null;

  // Use the template's demoUrl if available, or fall back to demo-template.html
  const demoUrl = template.demoUrl || `/demo-template.html?template=${encodeURIComponent(template.title)}`;

  const handleIframeLoad = () => {
    setIsLoading(false);
    if (setLoading) setLoading(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent
        className={cn(
          "sm:max-w-[90vw] max-h-[90vh] p-0 gap-0 bg-background/95 backdrop-blur-xl border-white/10",
          isFullscreen ? "w-screen h-screen max-w-none max-h-none !rounded-none" : ""
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <DialogTitle className="text-xl font-bold">{template.title}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Interactive demo - Explore this template
            </DialogDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleFullscreen} 
              className="hover:bg-white/10"
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-10">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              <p className="mt-4 text-foreground/80">Loading template demo...</p>
            </div>
          </div>
        )}

        {/* Demo iframe */}
        <div className="relative w-full overflow-hidden" style={{ height: "calc(90vh - 130px)" }}>
          <iframe
            src={demoUrl}
            className="w-full h-full border-0"
            onLoad={handleIframeLoad}
            title={`${template.title} demo`}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={() => window.open(demoUrl, '_blank')}
            >
              Open in New Tab
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => window.open(demoUrl, '_blank')}
            >
              Use This Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDemo; 