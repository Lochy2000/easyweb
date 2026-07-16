import React, { Suspense, useEffect } from 'react';
import {
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  CustomDialog,
  CustomDialogContent
} from "@/components/ui/custom-dialog";
import { X, ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  // Render the React component if this is a React template
  const ReactTemplateComponent = isReactTemplate && template.component ? template.component : null;

  return (
    <CustomDialog open={isOpen} onOpenChange={() => onClose()}>
      <CustomDialogContent
        className="left-0 top-0 translate-x-0 translate-y-0 w-screen h-[100dvh] max-w-none max-h-none rounded-none border-0 p-0 gap-0 flex flex-col overflow-hidden overflow-y-hidden bg-background"
      >
        {/* Slim navbar */}
        <div className="flex items-center justify-between gap-2 px-3 sm:px-4 h-12 sm:h-14 flex-shrink-0 border-b border-white/10">
          <div className="min-w-0">
            <DialogTitle className="text-sm sm:text-base font-semibold text-white truncate">
              {template.title}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Interactive demo - Explore this template
            </DialogDescription>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={onPrevious}
              disabled={!hasPrevious}
              className="text-white/80 hover:bg-white/10 hover:text-white disabled:opacity-30 h-8 w-8 sm:h-9 sm:w-9"
              aria-label="Previous template"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              disabled={!hasNext}
              className="text-white/80 hover:bg-white/10 hover:text-white disabled:opacity-30 h-8 w-8 sm:h-9 sm:w-9"
              aria-label="Next template"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
            {/* React-component demos only exist inside this modal — there's no
                standalone page for them, so no "open in new tab" link (that
                used to point at a /legacy-templates/* route that never
                existed, which is why it 404'd). HTML templates do have a real
                demo page, so they keep the link. */}
            {!isReactTemplate && (
              <Button
                variant="ghost"
                size="icon"
                className="text-white/80 hover:bg-white/10 hover:text-white h-8 w-8 sm:h-9 sm:w-9"
                onClick={() => window.open(demoUrl, '_blank')}
                aria-label="Open in new tab"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white/80 hover:bg-white/10 hover:text-white h-8 w-8 sm:h-9 sm:w-9"
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

        {/* Demo content fills all remaining space */}
        <div className="relative flex-1 min-h-0 w-full overflow-hidden bg-white">
          {isReactTemplate && ReactTemplateComponent ? (
            <div className="w-full h-full overflow-auto">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full">
                    <div className="w-12 h-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                  </div>
                }
              >
                <ReactTemplateComponent />
              </Suspense>
            </div>
          ) : (
            <iframe
              src={demoUrl}
              className="w-full h-full border-0 block"
              onLoad={handleIframeLoad}
              title={`${template.title} demo`}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          )}
        </div>
      </CustomDialogContent>
    </CustomDialog>
  );
};

export default TemplateDemo;