import Link from "next/link";
import { Brush, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 text-white mb-6">
            <Brush className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold tracking-tight">
              Signature Finishes
            </span>
          </div>
          <p className="max-w-sm mb-6">
            Professional multi-skilled decorating services serving the local
            community with pride for over a decade. Quality you can trust,
            finishes you&apos;ll love.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6">Quick Links</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <Link href="/services" className="hover:text-primary transition-colors">
                Residential Services
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary transition-colors">
                Commercial Contracts
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-primary transition-colors">
                Our Portfolio
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Client Testimonials
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6">Contact Info</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span>
                123 Decorator Lane,
                <br />
                London, UK SW1A 1AA
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <span>01234 567 890</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <span>hello@signaturefinishes.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-800 text-xs text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; 2024 Signature Finishes Decorating. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
