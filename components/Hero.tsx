"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Hero() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section ref={elementRef as any} className="relative pt-20 min-h-screen flex items-center">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-accent-600/80 -z-10"></div>

      <div className="container-custom py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo Badge */}
          <div className={`inline-block mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="glass-card px-8 py-4 rounded-full border-2 border-white/30">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
                ReNewed Power
              </h2>
            </div>
          </div>

          {/* Main Headline - Bold & Inspiring */}
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Reclaim Your Power.<br/>
            <span className="text-accent-300">Rebuild Your Life.</span>
          </h1>

          {/* Subheadline */}
          <p className={`text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 max-w-3xl mx-auto font-light transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Evidence-based addiction recovery and therapy services designed to empower you on your journey to lasting transformation.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link
              href="#services"
              className="btn-primary text-lg px-8 py-4 rounded-full font-semibold shadow-2xl hover:shadow-accent-500/50 transition-all transform hover:scale-105"
            >
              Explore Our Services
            </Link>
            <Link
              href="#about"
              className="glass-card text-blue-900 text-lg px-8 py-4 rounded-full font-semibold border-2 border-white/30 hover:border-white/60 transition-all transform hover:scale-105"
            >
              Learn Our Approach
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className={`mt-16 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center gap-2">
              <span className="text-white/60 text-sm uppercase tracking-wider">Discover More</span>
              <svg className="w-6 h-6 text-white/60 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
