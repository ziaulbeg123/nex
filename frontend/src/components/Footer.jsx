import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="border-t border-white/5 bg-[#050506]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center bg-yellow-500 text-black font-heading font-extrabold text-lg">N</span>
            <span className="font-heading font-semibold tracking-[0.18em] text-sm text-neutral-100">
              NEXVORA LABS <span className="text-yellow-500">//</span>
            </span>
          </div>
          <p className="mt-5 text-sm text-neutral-500 leading-relaxed max-w-xs">
            Precision engineering and design that commands attention. Web, apps, AI agents, marketing and custom software — built to convert.
          </p>
        </div>
        <div>
          <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-yellow-500/80 mb-5">Explore</p>
          <ul className="space-y-3 text-sm">
            <li><Link data-testid="footer-home-link" to="/" className="text-neutral-400 hover:text-yellow-500 transition-colors">Home</Link></li>
            <li><Link data-testid="footer-services-link" to="/#services" className="text-neutral-400 hover:text-yellow-500 transition-colors">Services</Link></li>
            <li><Link data-testid="footer-about-link" to="/about" className="text-neutral-400 hover:text-yellow-500 transition-colors">About</Link></li>
            <li><Link data-testid="footer-pricing-link" to="/pricing" className="text-neutral-400 hover:text-yellow-500 transition-colors">Pricing</Link></li>
            <li><Link data-testid="footer-admin-link" to="/admin" className="text-neutral-400 hover:text-yellow-500 transition-colors">Admin Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-yellow-500/80 mb-5">Contact</p>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li><a href="mailto:nexvoralabs2@gmail.com" data-testid="footer-email-link" className="flex items-center gap-3 hover:text-yellow-500 transition-colors"><Mail className="h-4 w-4 text-yellow-500 shrink-0" /> nexvoralabs2@gmail.com</a></li>
            <li><a href="tel:+919760415452" data-testid="footer-phone-1-link" className="flex items-center gap-3 hover:text-yellow-500 transition-colors"><Phone className="h-4 w-4 text-yellow-500 shrink-0" /> +91 97604 15452</a></li>
            <li><a href="tel:+918191876059" data-testid="footer-phone-2-link" className="flex items-center gap-3 hover:text-yellow-500 transition-colors"><Phone className="h-4 w-4 text-yellow-500 shrink-0" /> +91 81918 76059</a></li>
            <li><a href="https://wa.me/919760415452" target="_blank" rel="noopener noreferrer" data-testid="footer-whatsapp-link" className="flex items-center gap-3 hover:text-green-400 transition-colors"><MessageCircle className="h-4 w-4 text-green-400 shrink-0" /> WhatsApp — chat instantly</a></li>
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-yellow-500 shrink-0" /> Warsaw, Poland · Aonla, Bareilly (India)</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-mono-tech text-xs tracking-[0.2em] text-neutral-600 uppercase">
          Nexvora Labs © 2026 // All rights reserved.
        </p>
      </div>
    </footer>
  );
}
