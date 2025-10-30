"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";
import FloatingParticles from "@/components/FloatingParticles";

export default function About() {
  const { elementRef, isVisible } = useScrollAnimation();

  const values = [
    {
      title: "Evidence-Based Care",
      description: "Proven methodologies backed by research and clinical expertise",
      icon: (
        <svg className="w-10 h-10 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Holistic Approach",
      description: "Addressing mind, body, and spirit for complete healing",
      icon: (
        <svg className="w-10 h-10 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: "Personalized Support",
      description: "Tailored treatment plans designed around your unique needs",
      icon: (
        <svg className="w-10 h-10 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-accent-50 to-cyan-50 -z-10"></div>

      {/* Floating Particles */}
      <FloatingParticles />

      <div className="container-custom">
        {/* Header */}
        <div ref={elementRef as any} className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block px-6 py-2 bg-accent-100 rounded-full mb-4">
            <span className="text-accent-700 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-gradient mb-6">
            Our Mission & Approach
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Empowering lasting transformation through compassionate, evidence-based care
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Bold Mission Statement */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="glass-card rounded-3xl p-10 md:p-12 relative overflow-hidden">
              {/* Accent gradient */}
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary-500 to-accent-500"></div>

              <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">
                Transform Your Life with ReNewed Power
              </h3>
              <p className="text-gray-800 leading-relaxed text-lg mb-6">
                At <strong>ReNewed Power Inc.</strong>, we don't just treat addiction—we empower complete transformation.
                With locations in <strong>Arizona and Chicago</strong>, our dedicated team of licensed professionals
                provides outpatient treatment that meets you where you are.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                We believe recovery is more than abstinence. It's about reclaiming your power, rebuilding relationships,
                and rediscovering purpose. Our evidence-based therapies address the root causes, not just symptoms,
                ensuring sustainable, lasting change.
              </p>
              <div className="flex items-start gap-3 p-4 bg-primary-50 rounded-xl">
                <svg className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                <p className="text-gray-800 font-medium">
                  Start your journey today and discover the strength within you to create the life you deserve.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Logo */}
          <div className={`flex items-center justify-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative w-full max-w-md">
              <Image
                src="/logo.png"
                alt="ReNewed Power Logo"
                width={500}
                height={500}
                className="w-full h-auto rounded-3xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* Our Values - 3 Column Grid */}
        <div className={`mb-20 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl md:text-4xl font-serif text-center text-gray-900 mb-12">
            What Sets Us Apart
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass-card glass-card-hover rounded-2xl p-8 text-center"
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-serif text-gray-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-700">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row - Redesigned */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="glass-card glass-card-hover rounded-2xl p-6 text-center">
            <div className="text-5xl font-bold text-gradient mb-2">10+</div>
            <div className="text-gray-700 font-medium">Years of Excellence</div>
          </div>
          <div className="glass-card glass-card-hover rounded-2xl p-6 text-center">
            <div className="text-5xl font-bold text-gradient mb-2">2</div>
            <div className="text-gray-700 font-medium">Convenient Locations</div>
          </div>
          <div className="glass-card glass-card-hover rounded-2xl p-6 text-center">
            <div className="text-5xl font-bold text-gradient mb-2">1000+</div>
            <div className="text-gray-700 font-medium">Lives Transformed</div>
          </div>
          <div className="glass-card glass-card-hover rounded-2xl p-6 text-center">
            <div className="text-5xl font-bold text-gradient mb-2">100%</div>
            <div className="text-gray-700 font-medium">Commitment to You</div>
          </div>
        </div>
      </div>
    </section>
  );
}
