"use client";

import { useActionState } from "react";
import { submitContactForm } from "./actions";
import { Phone, Send, Star, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

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
              Get in touch with Jason
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Looking for an interior painter, decorator or tiler in Wellington,
              Taunton, Tiverton or the surrounding area? Get in touch to discuss
              your project and request a quote.
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
              {state?.success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Send className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message sent</h3>
                  <p className="text-slate-600 max-w-md">
                    Thanks for getting in touch. Your message has been sent and
                    Jason will be in touch soon.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-2">
                    Tell us about the work
                  </h2>
                  <p className="text-sm text-slate-500 mb-6">
                    Fill in the form with a few details about your job and Jason
                    will get back to you as soon as possible.
                  </p>

                  {state?.error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {state.error}
                    </div>
                  )}

                  <form action={formAction} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">
                          Full name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full h-12 rounded-lg border border-slate-200 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">
                          Phone number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className="w-full h-12 rounded-lg border border-slate-200 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="w-full h-12 rounded-lg border border-slate-200 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">
                          Town / area
                        </label>
                        <input
                          type="text"
                          name="town"
                          className="w-full h-12 rounded-lg border border-slate-200 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">
                        Service needed
                      </label>
                      <select
                        name="service"
                        defaultValue=""
                        className="w-full h-12 rounded-lg border border-slate-200 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        <option>Interior decorating</option>
                        <option>Wall tiling</option>
                        <option>Floor tiling</option>
                        <option>Not sure yet</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">
                        Project details
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        placeholder="Tell us a little about the job, the rooms involved, and where you are based."
                        className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-y"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-primary text-white h-14 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isPending ? "Sending..." : "Send enquiry"}
                      {!isPending && <Send className="h-5 w-5" />}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Call Jason */}
              <div className="flex items-start gap-4 p-6 rounded-xl bg-primary/5 border border-primary/10">
                <div className="bg-primary text-white p-3 rounded-lg">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold">Call Jason</h4>
                  <a
                    href="tel:07473124611"
                    className="text-slate-600 text-sm hover:text-primary transition-colors"
                  >
                    07473 124611
                  </a>
                </div>
              </div>

              {/* Areas Covered */}
              <div className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm">
                <h4 className="font-bold mb-2">Areas covered</h4>
                <p className="text-slate-600 text-sm">
                  Wellington, Taunton, Tiverton and surrounding areas.
                </p>
              </div>

              {/* Why Choose Jason */}
              <div className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm">
                <h4 className="font-bold mb-2">Why choose Jason</h4>
                <p className="text-slate-600 text-sm">
                  Reliable, tidy work, direct communication and a professional
                  finish.
                </p>
              </div>

              {/* MyBuilder Badge */}
              <a
                href="https://www.mybuilder.com/profile/jason_chapman_tiling_painting_decorating/reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-colors"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">5/5 on MyBuilder</p>
                  <p className="text-xs text-slate-500">91 reviews</p>
                </div>
                <ArrowRight className="h-4 w-4 text-primary" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
