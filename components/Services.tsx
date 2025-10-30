"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import FloatingTorus from "@/components/FloatingTorus";

export default function Services() {
  const { elementRef, isVisible } = useScrollAnimation();

  const therapyTypes = [
    {
      id: "virtual-therapy",
      title: "Virtual Therapy Sessions",
      price: "$150",
      duration: "60 minutes",
      description: "Connect with licensed therapists from the comfort of your home through secure video sessions.",
      features: ["Flexible scheduling", "HIPAA-compliant platform", "Licensed professionals"],
      icon: (
        <svg className="w-16 h-16 mb-4 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "from-primary-500 to-primary-700",
    },
    {
      id: "individual-therapy",
      title: "Individual Therapy",
      price: "$200",
      duration: "90 minutes",
      description: "Personalized one-on-one sessions tailored to your specific recovery needs and goals.",
      features: ["Customized treatment plans", "Evidence-based approaches", "Confidential support"],
      icon: (
        <svg className="w-16 h-16 mb-4 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: "from-accent-500 to-accent-700",
    },
    {
      id: "group-therapy",
      title: "Group Therapy Sessions",
      price: "$100",
      duration: "90 minutes",
      description: "Build community and find strength through shared experiences with peers on similar journeys.",
      features: ["Peer support network", "Expert facilitation", "Collective healing"],
      icon: (
        <svg className="w-16 h-16 mb-4 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "from-primary-600 to-accent-600",
    },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background with 3D Torus */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 -z-10"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-30 -z-10">
        <FloatingTorus />
      </div>

      <div className="container-custom">
        {/* Header */}
        <div ref={elementRef as any} className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block px-6 py-2 bg-primary-100 rounded-full mb-4">
            <span className="text-primary-700 font-semibold text-sm uppercase tracking-wider">Our Services</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-gradient mb-6">
            Choose Your Path to Recovery
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Expert-led therapy options designed to meet you wherever you are in your journey
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {therapyTypes.map((therapy, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="glass-card glass-card-hover rounded-3xl p-8 h-full flex flex-col relative overflow-hidden group">
                {/* Gradient Accent Bar */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${therapy.color}`}></div>

                {/* Icon */}
                <div className="flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                  {therapy.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4 text-center leading-tight">
                  {therapy.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 mb-6 text-center flex-grow">
                  {therapy.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {therapy.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href="/services"
                  className={`btn-primary w-full text-center py-3 rounded-full font-semibold bg-gradient-to-r ${therapy.color} hover:shadow-lg transform hover:scale-105 transition-all`}
                >
                  Learn More & View Pricing
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-lg text-gray-700 mb-6">
            Not sure which service is right for you?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-lg group"
          >
            Talk to Our Team
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
