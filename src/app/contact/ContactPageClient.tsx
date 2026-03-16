"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { submitContactForm, type FormState } from "./actions";
import {
  Phone,
  Send,
  Star,
  ArrowRight,
  MapPin,
  User,
  Mail,
  Briefcase,
  MessageSquare,
  CheckCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface ContactPageClientProps {
  heading: string;
  subtext: string;
  phone: string;
  areas: string;
  reviewCount: number;
  mybuilderUrl: string;
  heroImage: string;
  heroImageAlt: string;
}

export default function ContactPageClient({
  heading,
  subtext,
  phone,
  areas,
  reviewCount,
  mybuilderUrl,
  heroImage,
  heroImageAlt,
}: ContactPageClientProps) {
  const [state, setState] = useState<FormState | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      town: formData.get("town") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    };
    const result = await submitContactForm(data);
    setState(result);
    setIsPending(false);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative aspect-[21/9] flex items-center justify-center">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-16">
          <span className="inline-block px-4 py-1.5 mb-5 text-xs font-bold tracking-wider uppercase bg-primary/80 text-white rounded-full">
            Available for new projects
          </span>
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6">
            {heading}
          </h1>
          <p className="text-lg text-white/85 leading-relaxed max-w-2xl mx-auto mb-8">
            {subtext}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 min-h-[44px] rounded-lg font-bold transition-colors shadow-lg"
            >
              <Phone className="h-4 w-4" />
              Call {phone}
            </Link>
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white/10 px-8 py-4 min-h-[44px] rounded-lg font-bold transition-colors"
            >
              Send a Message
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Two-column contact section */}
      <section id="contact-form" className="py-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Form */}
            <div className="space-y-6">
              {state?.success ? (
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center py-16 text-center">
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  {state?.error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {state.error}
                    </div>
                  )}

                  {/* Card 1: Your Details */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                        <User className="h-5 w-5" />
                      </div>
                      <h2 className="text-lg font-bold">Your Details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">
                          Full name <span className="text-red-400">*</span>
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
                  </div>

                  {/* Card 2: Service & Project */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <h2 className="text-lg font-bold">Service Needed</h2>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">
                        What type of work do you need?
                      </label>
                      <select
                        name="service"
                        defaultValue=""
                        className="w-full h-12 rounded-lg border border-slate-200 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        <option>Interior painting &amp; decorating</option>
                        <option>Exterior painting</option>
                        <option>Wall tiling</option>
                        <option>Floor tiling</option>
                        <option>Not sure yet</option>
                      </select>
                    </div>
                  </div>

                  {/* Card 3: Project Details */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <h2 className="text-lg font-bold">Project Details</h2>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">
                        Tell us about the work <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        placeholder="Describe the job, the rooms involved, any particular requirements, and where you are based."
                        className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-y"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-primary text-white min-h-[52px] rounded-lg font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg"
                  >
                    {isPending ? "Sending..." : "Get Your Free Quote"}
                    {!isPending && <Send className="h-5 w-5" />}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Contact info & testimonials */}
            <div className="space-y-6">
              {/* Call Jason card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Prefer to call?</h3>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="text-primary font-bold text-lg hover:underline"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  Available Monday to Friday. If Jason is on a job, leave a message and he will call you back.
                </p>
              </div>

              {/* Areas covered card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-lg">Areas Covered</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {areas}
                </p>
              </div>

              {/* Why choose Jason card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-lg">Why Choose Jason</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    { icon: CheckCircle, text: "Direct, one-to-one service" },
                    { icon: CheckCircle, text: "Clean, tidy and respectful" },
                    { icon: Clock, text: "Reliable and punctual" },
                    { icon: CheckCircle, text: "~20 years' experience" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-center gap-3 text-slate-700">
                      <item.icon className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm font-medium">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* MyBuilder reviews card */}
              <a
                href={mybuilderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">5/5 on MyBuilder</p>
                    <p className="text-xs text-slate-500">{reviewCount} verified reviews</p>
                  </div>
                </div>
                <blockquote className="text-sm text-slate-600 italic border-l-2 border-primary pl-4 mb-4">
                  &ldquo;Jason did a brilliant job. Very tidy, professional and the finish was excellent. Would highly recommend.&rdquo;
                </blockquote>
                <span className="inline-flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                  Read all reviews
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>

              {/* Email card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email</h3>
                    <p className="text-sm text-slate-500">
                      Use the form to send your enquiry directly.
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
