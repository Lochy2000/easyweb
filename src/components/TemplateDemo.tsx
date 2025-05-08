import React, { useEffect } from 'react';
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
  demoUrl?: string; // URL to the actual demo for HTML templates
  component?: React.ComponentType; // React component for TSX templates
  type: 'html' | 'react'; // Template type
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
            <iframe
              src={demoUrl}
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              title={`${template.title} demo`}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              referrerPolicy="no-referrer"
              loading="eager"
              style={{ 
                backgroundColor: 'white', 
                display: 'block',
                width: '100%', 
                height: '100%',
                border: 'none'
              }}
            />
          )}
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
            {isReactTemplate ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={() => window.open(`/legacy-templates/${template.title.toLowerCase().replace(/\s+/g, '-')}`, '_blank')}
              >
                Open in New Tab
                <ExternalLink className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={() => window.open(demoUrl, '_blank')}
              >
                Open in New Tab
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => window.open(isReactTemplate ? 
                `/legacy-templates/${template.title.toLowerCase().replace(/\s+/g, '-')}` : 
                demoUrl, '_blank')}
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