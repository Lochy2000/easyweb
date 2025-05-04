import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container-custom">
        {/* Top Section with Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-2xl font-bold flex items-center gap-1 mb-4 group" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              <span 
                className="text-[#8b5cf6] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#8b5cf6] group-hover:via-[#d946ef] group-hover:to-[#8b5cf6] group-hover:bg-[length:200%_auto] group-hover:animate-gradient-x" 
                style={{ fontWeight: 800 }}
              >
                easy
              </span>
              <span 
                className="text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#8b5cf6] group-hover:via-[#d946ef] group-hover:to-[#8b5cf6] group-hover:bg-[length:200%_auto] group-hover:animate-gradient-x" 
                style={{ fontWeight: 800 }}
              >
                web
              </span>
            </Link>
            <p className="text-foreground/70 mb-6">
              Simple & scalable websites tailored to your unique needs. Modern design with a personal touch.
            </p>
            <div className="flex">
              <FooterLink to="/blog">Check out our latest blog post</FooterLink>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink to="/templates">Templates</FooterLink>
              <FooterLink href="#consultation">Consultations</FooterLink>
              <FooterLink href="#about">About Us</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
            </ul>
          </div>

          {/* Templates */}
          <div>
            <h3 className="text-lg font-bold mb-4">Templates</h3>
            <ul className="space-y-3">
              <FooterLink to="/templates">Portfolio</FooterLink>
              <FooterLink to="/templates">E-commerce</FooterLink>
              <FooterLink to="/templates">Business</FooterLink>
              <FooterLink to="/templates">Blog</FooterLink>
              <FooterLink to="/templates">Landing Pages</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-foreground/70">
              <li>
                <span>Email: </span>
                <a 
                  href="mailto:lochlann_oht@hotmail.com" 
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  lochlann_oht@hotmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="pt-8 border-t border-border/50 text-center text-foreground/60 text-sm">
          <p>© {new Date().getFullYear()} EasyWebs. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-3">
            <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
  'aria-label': string;
}

const SocialLink = ({ href, children, 'aria-label': ariaLabel }: SocialLinkProps) => {
  return (
    <a 
      href={href} 
      className="text-foreground/60 hover:text-primary transition-colors"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};

interface FooterLinkProps {
  href?: string;
  to?: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, to, children }: FooterLinkProps) => {
  const linkClass = "text-foreground/70 hover:text-primary transition-colors";
  return (
    <li>
      {to ? (
        <Link to={to} className={linkClass}>
          {children}
        </Link>
      ) : (
        <a href={href} className={linkClass}>
          {children}
        </a>
      )}
    </li>
  );
};

export default Footer;
