import React, { useState, useEffect } from 'react';
import Button from './Button';
import { cn } from '@/lib/utils';
import { Globe, Menu, X } from 'lucide-react';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 w-full mobile-header",
        isScrolled || isMobileMenuOpen ? "bg-background/90 backdrop-blur-md border-b border-white/10" : "bg-background/50 backdrop-blur-sm"
      )}
    >
      <div className="container-custom flex items-center justify-between relative max-w-[1200px] px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Logo - Centered for balance */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-foreground flex items-center gap-2 group ml-0 lg:ml-1"
          style={{ fontFamily: "'Exo 2', sans-serif" }}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
            <Globe className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="flex items-center">
            <span 
              className="text-[#8b5cf6] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#8b5cf6] group-hover:via-[#d946ef] group-hover:to-[#8b5cf6] group-hover:bg-[length:200%_auto] group-hover:animate-gradient-x" 
              style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800 }}
            >
              easy
            </span>
            <span 
              className="text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#8b5cf6] group-hover:via-[#d946ef] group-hover:to-[#8b5cf6] group-hover:bg-[length:200%_auto] group-hover:animate-gradient-x" 
              style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800 }}
            >
              web
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav key={location.pathname} className="hidden md:flex items-center md:gap-6 lg:gap-8">
          <NavLink to="/templates">Templates</NavLink>
          <NavLink to="/blog">Resources</NavLink>
          <NavLink to="/about">About</NavLink>
          <Button 
            variant="3d"
            className="mr-0 lg:mr-1"
            onClick={() => window.open('https://calendly.com/lochlann_oht/discussion', '_blank')}
          >
            Book Consultation
          </Button>
        </nav>

        {/* Mobile Menu Button with Text Label */}
        <div className="md:hidden flex items-center gap-2">
          <span className="text-sm font-medium text-white">Menu</span>
          <button 
            className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 p-2 z-50 relative bg-primary/20 hover:bg-primary/30 rounded-md border border-primary/30 transition-colors duration-200 mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {/* Icon fallback that shows if spans are invisible */}
            <div className="absolute inset-0 flex items-center justify-center">
              {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </div>
            
            {/* Original hamburger spans */}
            <span className={cn(
              "w-6 h-0.5 bg-white transition-all duration-300 absolute z-10 menu-bar", 
              isMobileMenuOpen ? "transform rotate-45" : "transform translate-y-[-4px]"
            )}></span>
            <span className={cn(
              "w-6 h-0.5 bg-white transition-all duration-300 z-10 menu-bar",
              isMobileMenuOpen && "opacity-0 transform scale-0"
            )}></span>
            <span className={cn(
              "w-6 h-0.5 bg-white transition-all duration-300 absolute z-10 menu-bar",
              isMobileMenuOpen ? "transform -rotate-45" : "transform translate-y-[4px]"
            )}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-x-0 top-[72px] bottom-auto max-h-[calc(100vh-80px)] overflow-y-auto bg-background backdrop-blur-lg transform transition-all duration-300 ease-in-out z-40 border-t border-white/10 shadow-xl",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible translate-y-[-10px]"
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsMobileMenuOpen(false);
          }
        }}
      >
        <nav className="flex flex-col divide-y divide-white/10">
          <MobileNavLink to="/templates" onClick={() => setIsMobileMenuOpen(false)}>Templates</MobileNavLink>
          <MobileNavLink to="/blog" onClick={() => setIsMobileMenuOpen(false)}>Resources</MobileNavLink>
          <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
          <div className="py-4 px-2">
            <Button 
              className="w-full"
              variant="3d"
              onClick={() => {
                window.open('https://calendly.com/lochlann_oht/discussion', '_blank');
                setIsMobileMenuOpen(false);
              }}
            >
              Book Consultation
            </Button>
          </div>
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

const NavLink = ({ href, to, children, ...props }: NavLinkProps) => {
  if (to) {
    return <RouterNavLink to={to} className={({ isActive }: any) => cn("text-foreground/70 hover:text-foreground transition-colors font-medium", isActive && "text-primary")} {...props}>{children}</RouterNavLink>;
  } 
  return <a href={href} className="text-foreground/70 hover:text-foreground transition-colors font-medium" {...props}>{children}</a>;
};

const MobileNavLink = ({ href, to, children, onClick }: NavLinkProps) => {
  if (to) {
    return (
      <Link 
        to={to} 
        className="text-white text-lg font-medium py-3 px-4 flex items-center hover:bg-white/5 transition-colors"
        onClick={onClick}
      >
        {children}
      </Link>
    );
  } 
  
  return (
    <a 
      href={href} 
      className="text-white text-lg font-medium py-3 px-4 flex items-center hover:bg-white/5 transition-colors"
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default Header;
