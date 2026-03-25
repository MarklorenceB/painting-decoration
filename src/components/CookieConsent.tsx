"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

type Consent = "accepted" | "denied" | null;

function getConsent(): Consent {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem("cookie-consent");
  if (v === "accepted" || v === "denied") return v;
  return null;
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent>("accepted"); // default hidden
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getConsent();
    setConsent(stored);
    if (!stored) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setConsent("accepted");
    setVisible(false);
  }

  function deny() {
    localStorage.setItem("cookie-consent", "denied");
    setConsent("denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl rounded-xl bg-slate-900 border border-slate-700 p-5 sm:p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-white font-semibold text-sm mb-1">
              Cookie Preferences
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              We use cookies to analyse site traffic and improve your experience.
              You can accept or decline non-essential cookies.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={deny}
              className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
