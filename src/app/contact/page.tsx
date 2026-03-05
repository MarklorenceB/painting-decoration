"use client";

import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-background px-4">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase bg-primary/10 text-primary rounded-full">
              Available for new projects
            </span>
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6">
              Let&apos;s transform your space together
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Whether it&apos;s a single wall or a whole house, no job is too
              small for our local specialist. Get in touch for a free,
              no-obligation quote.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-24 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form */}
            <div className="lg:col-span-7 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full h-12 rounded-lg border border-slate-200 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full h-12 rounded-lg border border-slate-200 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Service Needed
                  </label>
                  <select className="w-full h-12 rounded-lg border border-slate-200 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white">
                    <option disabled selected>
                      Select a service
                    </option>
                    <option>Interior Painting</option>
                    <option>Exterior Painting</option>
                    <option>Wallpapering</option>
                    <option>Tiling</option>
                    <option>Wooden Flooring</option>
                    <option>Woodwork &amp; Varnishing</option>
                    <option>Other / General Decorating</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Project Details
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about the project size, timeline, and any specific requirements..."
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-y"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white h-14 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  Send Quote Request <Send className="h-5 w-5" />
                </button>
                <p className="text-center text-xs text-slate-500">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="flex items-start gap-4 p-6 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="bg-primary text-white p-3 rounded-lg">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Call Anytime</h4>
                    <p className="text-slate-600 text-sm">07700 900 123</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="bg-primary text-white p-3 rounded-lg">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Email Us</h4>
                    <p className="text-slate-600 text-sm">
                      hello@signaturefinishes.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Area */}
              <div className="flex-1 flex flex-col bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                <div className="p-6">
                  <h4 className="font-bold mb-2">Service Area</h4>
                  <p className="text-slate-600 text-sm mb-4">
                    Proudly serving London and surrounding neighborhoods.
                  </p>
                </div>
                <div className="relative h-64 w-full bg-slate-100 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary/40 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">
                      London &amp; Surrounding Areas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
