"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import FloatingTorus from "@/components/FloatingTorus";

export default function Services() {
  const { elementRef, isVisible } = useScrollAnimation();

  const therapyTypes = [
    {
      number: "01",
      title: "Individual Therapy",
      description: "One-on-one sessions with medical professionals tailored for personal recovery.",
      icon: (
        <svg className="w-12 h-12 mb-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Group Therapy",
      description: "Supportive group sessions for shared experiences and collective healing.",
      icon: (
        <svg className="w-12 h-12 mb-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      showButton: true,
    },
    {
      number: "03",
      title: "Family Therapy",
      description: "Engaging families in the recovery process together for stronger bonds.",
      icon: (
        <svg className="w-12 h-12 mb-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background with 3D Torus */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-50 -z-10"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-40 -z-10">
        <FloatingTorus />
      </div>

      <div className="container-custom">
        {/* Header */}
        <div ref={elementRef as any} className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-serif text-gradient mb-4">
            Therapy Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive care tailored to your unique journey
          </p>
        </div>

        {/* Cards Grid - Staggered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {therapyTypes.map((therapy, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="glass-card glass-card-hover rounded-3xl p-8 text-center h-full flex flex-col">
                <div className="flex justify-center">
                  {therapy.icon}
                </div>
                <div className="text-sm font-bold text-primary-500 mb-3">{therapy.number}</div>
                <h3 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4 leading-tight">
                  {therapy.title}
                </h3>
                <p className="text-gray-700 mb-6 flex-grow">
                  {therapy.description}
                </p>
                {therapy.showButton && (
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors group"
                  >
                    Explore Our Services
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
