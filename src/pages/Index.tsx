import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Services } from '@/components/Services';
import { ProcessSteps } from '@/components/ProcessSteps';
import { Testimonials } from '@/components/Testimonials';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { MarqueeText } from '@/components/MarqueeText';
import '@/styles/animations.css';

const Index = () => {
  return (
    <div className="min-h-screen bg-background/50 relative isolate">
      <BackgroundEffects />
      <Header />
      <main className="relative">
        <Hero />
        <MarqueeText />
        <Services />
        <ProcessSteps />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
