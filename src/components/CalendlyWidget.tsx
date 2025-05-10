import React, { useEffect } from 'react';

interface CalendlyWidgetProps {
  url: string;
  text?: string;
  color?: string;
  textColor?: string;
  branding?: boolean;
}

declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (config: {
        url: string;
        text: string;
        color: string;
        textColor: string;
        branding: boolean;
      }) => void;
    };
  }
}

const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({
  url,
  text = 'Schedule time with me',
  color = '#0069ff',
  textColor = '#ffffff',
  branding = true,
}) => {
  useEffect(() => {
    // Load Calendly CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);

    // Load Calendly JS
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url,
          text,
          color,
          textColor,
          branding,
        });
      }
    };
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, [url, text, color, textColor, branding]);

  // This component doesn't render anything visible directly
  return null;
};

export default CalendlyWidget;
