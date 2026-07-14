import { Link } from 'react-router-dom';
import { useBooking } from '@/lib/booking-context';

const Footer = () => {
  const { openBooking } = useBooking();

  return (
    <footer className="bg-[#211f1a] text-white pt-16 pb-10">
      <div className="container-custom max-w-[1120px] mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-3.5">
              <img src="/easyweb-logo.png" alt="EasyWebs" className="w-[26px] h-[26px] rounded-md object-cover" />
              <span className="font-serif font-medium text-base">EasyWebs</span>
            </Link>
            <p className="text-[12.5px] text-white/60 max-w-[360px] leading-relaxed">
              Technical consultancy and implementation for small businesses and growing teams.{' '}
              <Link to="/templates" className="text-white/85 underline hover:text-white">See our templates</Link>
              {' '}or{' '}
              <Link to="/blog" className="text-white/85 underline hover:text-white">read the blog</Link>
              {' '}first if you're not ready to book.
            </p>
          </div>
          <button
            onClick={() => openBooking()}
            className="rounded-full font-semibold text-[13.5px] px-6 py-3 bg-white text-[#211f1a] hover:bg-white/90 transition-colors"
          >
            Book a discovery call
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} EasyWebs. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white/70 transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-white/70 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
