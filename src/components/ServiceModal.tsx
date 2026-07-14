import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  quickView: string;
  details: {
    description: string;
    features: string[];
  };
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  title,
  quickView,
  details
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] max-w-full sm:max-w-[560px] bg-paper-raised border border-line p-5 sm:p-7 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-serif font-medium text-xl sm:text-2xl text-ink">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-3 sm:mt-4">
          <p className="text-base sm:text-lg text-ew-accent-ink mb-4 sm:mb-6">{quickView}</p>
          <div className="space-y-3 sm:space-y-4">
            <p className="text-ink-soft">{details.description}</p>
            <ul className="space-y-2">
              {details.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-ew-accent">•</span>
                  <span className="text-ink-soft">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
