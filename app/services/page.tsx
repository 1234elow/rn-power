"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Services() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Add floating orbs animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float-fade {
        0%, 100% {
          transform: translate(0, 0);
          opacity: 0;
        }
        25% {
          opacity: 0.4;
        }
        50% {
          transform: translate(var(--float-x), var(--float-y));
          opacity: 0.5;
        }
        75% {
          opacity: 0.3;
        }
      }
      .floating-orb {
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3));
        box-shadow:
          inset -20px -20px 60px rgba(0, 0, 0, 0.3),
          inset 10px 10px 30px rgba(255, 255, 255, 0.2),
          0 0 40px rgba(255, 255, 255, 0.6),
          0 0 80px rgba(255, 255, 255, 0.4),
          0 0 120px rgba(255, 255, 255, 0.2);
        pointer-events: none;
      }
      .orb-1 {
        width: 150px;
        height: 150px;
        top: 15%;
        left: 10%;
        --float-x: 30px;
        --float-y: -40px;
        animation: float-fade 8s ease-in-out infinite;
      }
      .orb-2 {
        width: 120px;
        height: 120px;
        top: 60%;
        right: 15%;
        --float-x: -25px;
        --float-y: 35px;
        animation: float-fade 10s ease-in-out infinite 2s;
      }
      .orb-3 {
        width: 140px;
        height: 140px;
        bottom: 25%;
        left: 25%;
        --float-x: 40px;
        --float-y: 30px;
        animation: float-fade 12s ease-in-out infinite 4s;
      }
      .orb-4 {
        width: 100px;
        height: 100px;
        top: 40%;
        right: 30%;
        --float-x: -20px;
        --float-y: -25px;
        animation: float-fade 9s ease-in-out infinite 1s;
      }
      .orb-5 {
        width: 130px;
        height: 130px;
        top: 10%;
        right: 20%;
        --float-x: 35px;
        --float-y: 40px;
        animation: float-fade 11s ease-in-out infinite 3s;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);


  const services = [
    {
      number: "01",
      name: "Individual Therapy",
      description: "Individual therapy at ReNewed Power Inc. focuses on personalized treatment plans that address each client's unique experiences and challenges. Our licensed therapists create a safe and supportive environment, allowing individuals to explore their thoughts and feelings related to substance abuse and addiction. Through evidence-based practices, clients learn coping strategies, set achievable goals, and build resilience.",
      accentColor: "border-primary-500",
      bgGradient: "from-blue-50 to-white",
      bookingLink: "/book-appointment/individual-therapy",
    },
    {
      number: "02",
      name: "Group Therapy",
      description: "Group therapy at ReNewed Power Inc. offers a dynamic space for individuals to connect and share their experiences in a supportive environment. Led by trained facilitators, these sessions encourage open dialogue and foster a sense of community among participants. Members gain insights from one another, learn new coping strategies, and develop valuable interpersonal skills.",
      accentColor: "border-accent-500",
      bgGradient: "from-lightBlue-100 to-white",
      bookingLink: "/book-appointment/group-therapy",
    },
    {
      number: "03",
      name: "Family Therapy",
      description: "Family therapy at ReNewed Power Inc. recognizes the vital role that family dynamics play in the recovery journey. This therapeutic approach involves family members in the process, facilitating open communication and understanding among loved ones. Our skilled therapists guide families through discussions that address the impact of addiction, explore underlying issues, and strengthen relationships.",
      accentColor: "border-primary-500",
      bgGradient: "from-blue-50 to-white",
      bookingLink: "/book-appointment/family-therapy",
    },
    {
      number: "04",
      name: "Virtual Therapy",
      description: "If attending treatment or counseling in person is inconvenient or impractical, ReNewed Power Inc offers Virtual Therapy options tailored to your needs. Our online sessions provide you with the flexibility to engage in recovery from the comfort of your own home. With certified professionals guiding you, you can access essential resources and support while maintaining your daily routines.",
      accentColor: "border-accent-500",
      bgGradient: "from-lightBlue-100 to-white",
      bookingLink: "/book-appointment/virtual-therapy",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleCards((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Header with Gradient and Wave Transition */}
      <section className="relative pt-32 pb-32 bg-gradient-to-br from-primary-600 via-accent-500 to-primary-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Floating orbs */}
        <div className="absolute inset-0">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
          <div className="floating-orb orb-4"></div>
          <div className="floating-orb orb-5"></div>
        </div>

        <div className="container-custom relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif text-center text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-center text-white/90 max-w-2xl mx-auto">
            Comprehensive treatment programs designed to support your journey to recovery
          </p>
        </div>

        {/* Wave Shape - part of hero background */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-24"
          >
            <path
              d="M0,64 C240,100 480,100 720,80 C960,60 1200,40 1440,64 L1440,120 L0,120 Z"
              fill="url(#blueGradient)"
            />
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f0f9fc" />
                <stop offset="50%" stopColor="#e1f3f9" />
                <stop offset="100%" stopColor="#c3e7f3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Services Cards - with matching gradient background */}
      <section className="py-20 bg-gradient-to-br from-lightBlue-50 via-lightBlue-100 to-lightBlue-200">
        <div className="container-custom max-w-6xl mx-auto px-4">
          <div className="space-y-12">
            {services.map((service, index) => (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                data-index={index}
                className={`transform transition-all duration-700 ${
                  visibleCards.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`backdrop-blur-lg bg-white/70 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-l-8 ${service.accentColor} overflow-hidden group border border-white/50`}
                >
                  <div className="p-8 md:p-12">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <span className="inline-block text-sm font-bold text-primary-600 bg-primary-100 px-4 py-2 rounded-full mb-4">
                          {service.number}
                        </span>
                        <h2
                          className="text-4xl md:text-5xl font-script text-gray-900 mb-4 group-hover:text-primary-600 transition-colors"
                          style={{ fontFamily: 'cursive' }}
                        >
                          {service.name}
                        </h2>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-lg mb-8">
                      {service.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href={service.bookingLink}
                        className="inline-flex items-center justify-center bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        Book This Service
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                      <Link
                        href="/therapy-solutions"
                        className="inline-flex items-center justify-center border-2 border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-500">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-serif text-white mb-6">
            Ready to Start Your Recovery Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our services and how we can support you
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-white text-primary-700 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-xl hover:scale-105 transform duration-300"
          >
            Book an Appointment
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
