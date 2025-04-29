import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

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
      <DialogContent className="w-[95%] max-w-full sm:max-w-[500px] md:max-w-[600px] bg-[#0f0f12] border border-white/10 p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-lg text-primary/90 mb-6">{quickView}</p>
          <div className="space-y-4">
            <p className="text-foreground/80">{details.description}</p>
            <ul className="space-y-2">
              {details.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-foreground/70">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 