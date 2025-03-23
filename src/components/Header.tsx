
import React, { useState, useEffect } from 'react';
import Button from './Button';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-display font-bold text-foreground flex items-center gap-2"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <div className="flex items-center">
            <span className="text-primary">easy</span>
            <span>web</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/templates">Templates</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#team">Team</NavLink>
          <Button 
            variant="primary" 
            className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/20"
            onClick={() => window.open('https://calendly.com/your-booking-link', '_blank')}
          >
            Book Consultation
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className={cn(
            "w-6 h-0.5 bg-foreground transition-all", 
            isMobileMenuOpen && "transform rotate-45 translate-y-2"
          )}></span>
          <span className={cn(
            "w-6 h-0.5 bg-foreground transition-all", 
            isMobileMenuOpen && "opacity-0"
          )}></span>
          <span className={cn(
            "w-6 h-0.5 bg-foreground transition-all", 
            isMobileMenuOpen && "transform -rotate-45 -translate-y-2"
          )}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-lg p-4 z-40 transform transition-transform ease-in-out duration-300",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="flex flex-col gap-6 p-4">
          <MobileNavLink to="/templates" onClick={() => setIsMobileMenuOpen(false)}>Templates</MobileNavLink>
          <MobileNavLink href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
          <MobileNavLink href="#team" onClick={() => setIsMobileMenuOpen(false)}>Team</MobileNavLink>
          <Button 
            className="w-full mt-4 bg-gradient-to-r from-primary to-accent" 
            variant="primary"
            onClick={() => {
              window.open('https://calendly.com/your-booking-link', '_blank');
              setIsMobileMenuOpen(false);
            }}
          >
            Book Consultation
          </Button>
        </nav>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href?: string;
  to?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ href, to, children }: NavLinkProps) => {
  if (to) {
    return (
      <Link 
        to={to} 
        className="relative text-foreground/80 hover:text-foreground transition-colors font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
      >
        {children}
      </Link>
    );
  }
  
  return (
    <a 
      href={href} 
      className="relative text-foreground/80 hover:text-foreground transition-colors font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
    >
      {children}
    </a>
  );
};

const MobileNavLink = ({ href, to, children, onClick }: NavLinkProps) => {
  if (to) {
    return (
      <Link 
        to={to} 
        className="text-foreground/80 hover:text-foreground text-xl font-medium py-2 border-b border-white/10 transition-colors"
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
  
  return (
    <a 
      href={href} 
      className="text-foreground/80 hover:text-foreground text-xl font-medium py-2 border-b border-white/10 transition-colors"
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default Header;
