import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { useBooking } from '@/lib/booking-context';

interface HeaderProps {
  /** Starts fully transparent over the hero and switches solid on scroll.
   *  Only the homepage passes this — every other page renders solid from
   *  the start, since their content sits directly under the nav. */
  transparentOnHero?: boolean;
}

const HOME_ANCHORS = [
  { to: '#services', label: 'Services' },
  { to: '#process', label: 'Process' },
  { to: '#audit', label: 'Self-Audit' },
  { to: '#faq', label: 'FAQ' },
];

const Header = ({ transparentOnHero = false }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openBooking } = useBooking();
  const isHome = location.pathname === '/';

  const isSolid = !transparentOnHero || isScrolled || isMobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const anchorHref = (hash: string) => (isHome ? hash : `/${hash}`);

  const handleBookClick = () => {
    setIsMobileMenuOpen(false);
    openBooking();
  };

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'transition-colors duration-200 font-medium text-sm relative py-2',
          isSolid ? 'text-ink-soft hover:text-ink' : 'text-white/85 hover:text-white',
          isActive && (isSolid ? 'text-ink' : 'text-white')
        )
      }
    >
      {children}
    </RouterNavLink>
  );

  const AnchorLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a
      href={anchorHref(to)}
      onClick={() => setIsMobileMenuOpen(false)}
      className={cn(
        'transition-colors duration-200 font-medium text-sm py-2',
        isSolid ? 'text-ink-soft hover:text-ink' : 'text-white/85 hover:text-white'
      )}
    >
      {children}
    </a>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
        isSolid
          ? 'bg-white/10 backdrop-blur-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom flex items-center justify-between max-w-[1200px] px-4 sm:px-6 lg:px-8 mx-auto">
        <Link to="/" className="group flex items-center gap-2.5">
          <img src="/easyweb-logo.png" alt="EasyWebs" className="w-8 h-8 rounded-lg object-cover" />
          <span
            className={cn(
              'font-serif font-medium text-lg tracking-[-0.01em] transition-colors duration-200',
              isSolid ? 'text-ink' : 'text-white'
            )}
          >
            EasyWebs
          </span>
        </Link>

        <nav key={location.pathname} className="hidden md:flex items-center gap-7">
          {isHome && HOME_ANCHORS.map((item) => (
            <AnchorLink key={item.to} to={item.to}>{item.label}</AnchorLink>
          ))}
          <NavLink to="/templates">Templates</NavLink>
          <NavLink to="/blog">Resources</NavLink>
          <NavLink to="/about">About</NavLink>
          <button
            onClick={handleBookClick}
            className={cn(
              'rounded-full font-semibold text-sm px-5 py-2.5 transition-colors',
              isSolid
                ? 'bg-ew-accent text-white hover:bg-ew-accent-ink'
                : 'bg-white text-ew-accent hover:bg-paper'
            )}
          >
            Book a discovery call
          </button>
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            'md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200',
            isSolid ? 'text-ink' : 'text-white'
          )}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div
        className={cn(
          'md:hidden transition-all duration-300 overflow-hidden bg-paper-raised border-b border-line',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="container-custom px-4 sm:px-6 lg:px-8 mx-auto py-4 flex flex-col gap-1">
          {isHome && HOME_ANCHORS.map((item) => (
            <a
              key={item.to}
              href={anchorHref(item.to)}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-ink-soft hover:text-ink transition-colors font-medium text-sm"
            >
              {item.label}
            </a>
          ))}
          <Link to="/templates" className="block py-2 text-ink-soft hover:text-ink transition-colors font-medium text-sm">Templates</Link>
          <Link to="/blog" className="block py-2 text-ink-soft hover:text-ink transition-colors font-medium text-sm">Resources</Link>
          <Link to="/about" className="block py-2 text-ink-soft hover:text-ink transition-colors font-medium text-sm">About</Link>
          <button
            onClick={handleBookClick}
            className="mt-2 w-full text-center rounded-full font-semibold text-sm px-5 py-3 bg-ew-accent text-white hover:bg-ew-accent-ink transition-colors"
          >
            Book a discovery call
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
