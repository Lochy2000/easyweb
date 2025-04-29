import React, { useState, useEffect } from 'react';
import Button from './Button';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled || isMobileMenuOpen ? "bg-background/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="container-custom flex items-center justify-between relative">
        {/* Logo - Reverted to text/icon with hover effect */}
        <Link 
          to="/" 
          className="text-2xl font-display font-bold text-foreground flex items-center gap-2 group"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
            <Globe className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="flex items-center">
            <span className="text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-colors duration-300">easy</span>
            <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-colors duration-300">web</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav key={location.pathname} className="hidden md:flex items-center gap-8">
          <NavLink to="/templates">Templates</NavLink>
          <NavLink to="/blog">Resources</NavLink>
          <NavLink to="/about">About</NavLink>
          <Button 
            variant="3d"
            onClick={() => window.open('https://calendly.com/lochlann_oht/discussion', '_blank')}
          >
            Book Consultation
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 p-2 z-50 relative bg-foreground/10 rounded-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className={cn(
            "w-6 h-0.5 bg-foreground transition-all duration-300 absolute", 
            isMobileMenuOpen ? "transform rotate-45" : "transform translate-y-[-4px]"
          )}></span>
          <span className={cn(
            "w-6 h-0.5 bg-foreground transition-all duration-300",
            isMobileMenuOpen && "opacity-0 transform scale-0"
          )}></span>
          <span className={cn(
            "w-6 h-0.5 bg-foreground transition-all duration-300 absolute",
            isMobileMenuOpen ? "transform -rotate-45" : "transform translate-y-[4px]"
          )}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-x-0 top-[72px] bottom-0 bg-background/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out z-40 border-t border-white/10",
          isMobileMenuOpen ? "translate-y-0" : "translate-y-full"
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsMobileMenuOpen(false);
          }
        }}
      >
        <nav className="flex flex-col gap-6 p-6 h-full overflow-y-auto">
          <MobileNavLink to="/templates" onClick={() => setIsMobileMenuOpen(false)}>Templates</MobileNavLink>
          <MobileNavLink to="/blog" onClick={() => setIsMobileMenuOpen(false)}>Resources</MobileNavLink>
          <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
          <Button 
            className="w-full mt-4"
            variant="3d"
            onClick={() => {
              window.open('https://calendly.com/lochlann_oht/discussion', '_blank');
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
