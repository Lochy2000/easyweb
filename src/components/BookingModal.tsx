import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useBooking } from '@/lib/booking-context';

const CALENDLY_URL = 'https://calendly.com/lochlann_oht';

const BookingModal = () => {
  const { isOpen, prefill, closeBooking } = useBooking();

  useEffect(() => {
    if (!isOpen) return;

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [isOpen]);

  const params = new URLSearchParams();
  if (prefill.name) params.set('name', prefill.name);
  if (prefill.email) params.set('email', prefill.email);
  const calendlyUrl = params.toString() ? `${CALENDLY_URL}?${params.toString()}` : CALENDLY_URL;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeBooking()}>
      <DialogContent className="w-[95%] sm:max-w-[640px] bg-paper-raised border border-line p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.05em] text-ew-accent">EasyWebs</span>
          <DialogTitle className="font-serif text-xl text-ink">Book a discovery call</DialogTitle>
          <DialogDescription className="text-ink-soft text-sm">
            {prefill.notes
              ? "We'll use what you told us in the self-audit to prep for the call."
              : "Pick a time that works — we'll confirm by email."}
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 pt-4">
          <div
            className="calendly-inline-widget"
            data-url={calendlyUrl}
            style={{ minWidth: '320px', height: '650px' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
