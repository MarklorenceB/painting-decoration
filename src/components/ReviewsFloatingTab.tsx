"use client";

import { useState } from "react";
import { Star, X, MessageSquare } from "lucide-react";

const reviews = [
  {
    name: "Jordan",
    location: "Bridgwater",
    text: "Jason did a fantastic job tiling our kitchen. He was reliable, tidy, and even worked around Christmas to get it done on time. Really pleased with the result.",
  },
  {
    name: "Faye Edwards",
    location: "Taunton",
    text: "Had hallway tile flooring done. Jason was friendly and professional from start to finish. We absolutely love the finished look.",
  },
  {
    name: "Helen Oliver",
    location: "Taunton",
    text: "Jason retiled our bathroom beautifully. He was tidy throughout, and the cost was very reasonable. Would definitely recommend.",
  },
  {
    name: "D Wilson",
    location: "Taunton",
    text: "Had our bathroom fully tiled. Jason was friendly, conscientious and the quality of work was excellent. Very happy.",
  },
  {
    name: "dana86052",
    location: "Taunton",
    text: "Jason did wallpaper and kitchen tiles for us. Punctual, professional and a great finish. Would use again without hesitation.",
  },
  {
    name: "matt1212",
    location: "Taunton",
    text: "Bathroom walls and floor tiled. You can see the passion Jason has for his work. He went above and beyond to get it right.",
  },
  {
    name: "shaikhen88",
    location: "Taunton",
    text: "Small bathroom tiled to a really high standard. Jason was clean and tidy throughout. Very pleased with the result.",
  },
  {
    name: "gregg1185",
    location: "Tiverton",
    text: "Kitchen wall tiles done to a high standard. Jason gave good advice on layout and the finish is spot on.",
  },
];

export default function ReviewsFloatingTab() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex">
      {/* Collapsed tab */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex flex-col items-center gap-2 bg-primary text-white px-2 py-4 rounded-l-lg shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Open reviews panel"
        >
          <Star className="h-5 w-5 fill-white" />
          <span className="text-xs font-bold [writing-mode:vertical-lr] rotate-180">
            5/5 MyBuilder
          </span>
        </button>
      )}

      {/* Expanded panel */}
      {open && (
        <div className="w-96 max-h-[80vh] bg-white shadow-2xl rounded-l-xl border border-slate-200 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <p className="text-sm font-bold">5/5 on MyBuilder — 91 reviews</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 hover:bg-slate-100 rounded-md transition-colors"
              aria-label="Close reviews panel"
            >
              <X className="h-5 w-5 text-slate-500" />
            </button>
          </div>

          {/* Reviews list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="border border-slate-100 rounded-lg p-3"
              >
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="text-xs font-medium text-slate-500">
                  {review.name}, {review.location}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100">
            <a
              href="https://www.mybuilder.com/profile/jason_chapman_tiling_painting_decorating/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-primary text-white py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              Read all reviews on MyBuilder
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
