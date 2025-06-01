import React, { useState, useEffect } from 'react';
import Button from './Button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium relative py-2",
          isActive && "text-foreground after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-accent-cyan after:rounded-full"
        )
      }
    >
      {children}
    </RouterNavLink>
  );

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 w-full mobile-header",
        isScrolled || isMobileMenuOpen ? "bg-background/90 backdrop-blur-md border-b border-white/10" : "bg-background/50 backdrop-blur-sm"
      )}
    >
      <div className="container-custom flex items-center justify-between relative max-w-[1200px] px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Logo - Updated to use PNG logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group ml-0 lg:ml-1 hover:scale-105 transition-transform duration-300"
        >
          <img 
            src="/easyweb-logo.png" 
            alt="Easywebs Logo" 
            className="h-8 sm:h-10 w-auto object-contain group-hover:brightness-110 transition-all duration-300"
          />
          <span 
            className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-accent-cyan group-hover:to-primary group-hover:bg-[length:200%_auto] group-hover:animate-gradient-x" 
            style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800 }}
          >
            easywebs
          </span>
        </Link>
        {/* Desktop Navigation */}
        <nav key={location.pathname} className="hidden md:flex items-center md:gap-6 lg:gap-8">
          <NavLink to="/templates">Templates</NavLink>
          <NavLink to="/blog">Resources</NavLink>
          <NavLink to="/about">About</NavLink>
          <Link to="/book">
            <Button 
              variant="3d"
              className="mr-0 lg:mr-1"
            >
              <span className="text-sm font-semibold">BOOK CONSULTATION</span>
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg mobile-menu-button transition-colors duration-200 p-2"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 menu-bar" />
          ) : (
            <Menu className="w-5 h-5 menu-bar" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden transition-all duration-300 overflow-hidden bg-background/95 backdrop-blur-md border-b border-white/10",
        isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="container-custom px-4 sm:px-6 lg:px-8 mx-auto py-4 space-y-4">
          <Link 
            to="/templates" 
            className="block py-2 text-foreground/80 hover:text-foreground transition-colors font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Templates
          </Link>
          <Link 
            to="/blog" 
            className="block py-2 text-foreground/80 hover:text-foreground transition-colors font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Resources
          </Link>
          <Link 
            to="/about" 
            className="block py-2 text-foreground/80 hover:text-foreground transition-colors font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/book" 
            className="block py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Button 
              variant="3d"
              className="w-full justify-center"
            >
              <span className="text-sm font-semibold">BOOK CONSULTATION</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;