import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

export default function Footer({ phone = "07903 197937" }: { phone?: string }) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-2 text-white mb-6">
            <Image
              src="/logo.png"
              alt="Jason Chapman Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="text-xl font-bold tracking-tight">
              Jason Chapman Tiling, Painting &amp; Decorating
            </span>
          </div>
          <p className="max-w-sm">
            Painting, decorating and tiling for homes in Wellington, Taunton,
            Tiverton and surrounding areas.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6">Quick Links</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services/interior-painting-decorating" className="hover:text-primary transition-colors">
                Interior Painting & Decorating
              </Link>
            </li>
            <li>
              <Link href="/services/exterior-painting" className="hover:text-primary transition-colors">
                Exterior Painting
              </Link>
            </li>
            <li>
              <Link href="/services/wall-floor-tiling" className="hover:text-primary transition-colors">
                Wall & Floor Tiling
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-primary transition-colors">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <a
                href="https://www.mybuilder.com/profile/jason_chapman_tiling_painting_decorating/reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                MyBuilder Reviews
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6">Contact</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">
                {phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-800 text-xs text-center">
        <p>&copy; 2026 Jason Chapman Tiling, Painting &amp; Decorating. All rights reserved.</p>
      </div>
    </footer>
  );
}
