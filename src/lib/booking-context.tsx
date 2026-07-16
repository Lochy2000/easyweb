import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { trackEvent } from './analytics';

interface BookingPrefill {
  name?: string;
  email?: string;
  notes?: string;
}

interface BookingContextValue {
  isOpen: boolean;
  prefill: BookingPrefill;
  openBooking: (prefill?: BookingPrefill) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill>({});

  const openBooking = useCallback((next?: BookingPrefill) => {
    setPrefill(next ?? {});
    setIsOpen(true);
    trackEvent('booking_open');
  }, []);

  const closeBooking = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, prefill, openBooking, closeBooking }),
    [isOpen, prefill, openBooking, closeBooking]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return ctx;
};
