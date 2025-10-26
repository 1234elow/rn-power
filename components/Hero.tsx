"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Hero() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section ref={elementRef as any} className="relative pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
        {/* Left Side - Blue Panel */}
        <div className={`bg-accent-500 flex items-center justify-center p-8 md:p-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center max-w-md">
            {/* Logo Box */}
            <div className="inline-block border-4 border-black px-6 py-3 mb-8">
              <h2 className="text-3xl md:text-4xl font-script text-black" style={{ fontFamily: 'cursive' }}>
                ReNewed<br/>Power
              </h2>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-serif mb-6 text-black leading-tight">
              Outpatient<br/>
              Addiction Recovery<br/>
              & Support
            </h1>

            {/* Tagline */}
            <p className="text-lg text-gray-800 mb-6">
              Empowering You to Reclaim Your Life
            </p>

            {/* Scroll Indicator */}
            <div className="flex justify-center">
              <svg className="w-6 h-6 text-black animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className={`relative bg-gray-200 min-h-[400px] md:min-h-[600px] transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          {/* Placeholder for therapy room image */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
            <div className="text-center text-gray-600 p-8">
              <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Therapy Room Image Placeholder</p>
              <p className="text-xs mt-2">Replace with actual image in /public folder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
