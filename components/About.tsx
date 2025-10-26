"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import MorphingSphere from "@/components/MorphingSphere";

export default function About() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 -z-10"></div>

      <div className="container-custom">
        {/* Header */}
        <div ref={elementRef as any} className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-serif text-gradient mb-4">
            About Us
          </h2>
          <p className="text-2xl md:text-3xl font-script text-primary-600" style={{ fontFamily: 'cursive' }}>
            Our Approach
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Glass Card with Text */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="glass-card rounded-3xl p-8 md:p-12">
              <p className="text-gray-800 leading-relaxed text-lg mb-6">
                At ReNewed Power Inc., we specialize in Outpatient Treatment for substance abuse and
                addiction recovery utilizing evidence-based care. With two locations, Arizona and Chicago,
                our dedicated team provides personalized care in a supportive environment, empowering
                individuals to reclaim their lives.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe in a holistic approach that addresses not just the symptoms but the underlying
                challenges, ensuring a sustainable path to recovery. Start your journey with us and discover
                the strength within you.
              </p>
            </div>
          </div>

          {/* Right - 3D Sphere */}
          <div className={`h-96 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <MorphingSphere />
          </div>
        </div>

        {/* Stats Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="glass-card glass-card-hover rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-gradient mb-2">10+</div>
            <div className="text-gray-700">Years of Experience</div>
          </div>
          <div className="glass-card glass-card-hover rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-gradient mb-2">2</div>
            <div className="text-gray-700">Locations</div>
          </div>
          <div className="glass-card glass-card-hover rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-gradient mb-2">1000+</div>
            <div className="text-gray-700">Lives Changed</div>
          </div>
        </div>
      </div>
    </section>
  );
}
