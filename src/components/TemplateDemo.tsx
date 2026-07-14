import React, { useEffect } from 'react';
import {
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  CustomDialog,
  CustomDialogContent 
} from "@/components/ui/custom-dialog";
import { X, ExternalLink, Maximize2, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import './TemplateResponsive.css';

export type Template = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  demoUrl?: string; // URL to the actual demo for HTML templates
  component?: React.ComponentType; // React component for TSX templates
  type: 'html' | 'react'; // Template type
};

interface TemplateDemoProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template | null;
  setLoading?: (loading: boolean) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const TemplateDemo: React.FC<TemplateDemoProps> = ({
  isOpen,
  onClose,
  template,
  setLoading,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen, template]);

  useEffect(() => {
    // Add a timeout to ensure proper loading
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        if (setLoading) setLoading(false);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [isLoading, setLoading]);

  // If no template is provided, don't render anything
  if (!template) return null;

  // For React components, we won't need loading state
  const isReactTemplate = template.type === 'react';

  // Use the template's demoUrl if available, or fall back to demo-template.html
  const demoUrl = !isReactTemplate && template.demoUrl ? 
    template.demoUrl : 
    `/templates/demo-template.html?template=${encodeURIComponent(template.title)}`;

  const handleIframeLoad = () => {
    setIsLoading(false);
    if (setLoading) setLoading(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Render the React component if this is a React template
  const ReactTemplateComponent = isReactTemplate && template.component ? template.component : null;

  return (
    <CustomDialog open={isOpen} onOpenChange={() => onClose()}>
      <CustomDialogContent
        className={cn(
          "responsive-dialog sm:max-w-[90vw] max-h-[90vh] p-0 gap-0 bg-background/95 backdrop-blur-xl border-white/10",
          isFullscreen ? "w-screen h-screen sm:max-w-none sm:max-h-none max-w-none max-h-none !rounded-none" : ""
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <DialogTitle className="text-xl font-bold text-white">{template.title}</DialogTitle>
            <DialogDescription className="text-sm text-white/60">
              Interactive demo - Explore this template
            </DialogDescription>
          </div>
          <div className="flex items-center gap-2">
            {/* React-component demos only exist inside this modal — there's no
                standalone page for them, so no "open in new tab" link (that
                used to point at a /legacy-templates/* route that never
                existed, which is why it 404'd). HTML templates do have a real
                demo page, so they keep the link. */}
            {!isReactTemplate && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1 border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white"
                onClick={() => window.open(demoUrl, '_blank')}
              >
                Open in New Tab
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-white/80 hover:bg-white/10 hover:text-white"
              aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white/80 hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Loading overlay - only show for HTML templates */}
        {!isReactTemplate && isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-10">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              <p className="mt-4 text-foreground/80">Loading template demo...</p>
            </div>
          </div>
        )}

        {/* Demo content */}
        <div className="relative w-full overflow-hidden bg-white" style={{ height: "calc(90vh - 130px)" }}>
          {isReactTemplate && ReactTemplateComponent ? (
            <div className="w-full h-full overflow-auto">
              <ReactTemplateComponent />
            </div>
          ) : (
            <div className="template-iframe-container" style={{ overflowX: "hidden" }}>
              <iframe
                src={demoUrl}
                className="template-iframe"
                onLoad={handleIframeLoad}
                title={`${template.title} demo`}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                referrerPolicy="no-referrer"
                loading="eager"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white disabled:opacity-30"
              onClick={onPrevious}
              disabled={!hasPrevious}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white disabled:opacity-30"
              onClick={onNext}
              disabled={!hasNext}
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CustomDialogContent>
    </CustomDialog>
  );
};

export default TemplateDemo;