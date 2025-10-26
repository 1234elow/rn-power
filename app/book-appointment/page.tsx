"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function BookAppointment() {
  const { elementRef, isVisible } = useScrollAnimation();

  const services = [
    {
      id: "virtual-therapy",
      name: "Virtual Therapy",
      description: "Therapy at your fingertips, from anywhere.",
      duration: "45 min",
      price: 90,
    },
    {
      id: "individual-therapy",
      name: "Individual Therapy",
      description: "Guiding you to a healthier tomorrow.",
      duration: "1 hr",
      price: 100,
    },
    {
      id: "group-therapy",
      name: "Group Therapy",
      description: "Together we heal and grow.",
      duration: "1 hr",
      price: 75,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50">
      {/* Header */}
      <div className="container-custom py-20">
        <div
          ref={elementRef as any}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-serif text-gradient mb-4">
            Book an Appointment
          </h1>
        </div>

        {/* Services Grid */}
        <div className="max-w-4xl mx-auto space-y-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              <div className="glass-card glass-card-hover rounded-3xl p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Service Info */}
                  <div className="flex-grow">
                    <h3 className="text-2xl md:text-3xl font-serif text-gray-900 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-700 mb-3">{service.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{service.duration}</span>
                      <span className="text-2xl font-bold text-gray-900">
                        ${service.price}
                      </span>
                    </div>
                  </div>

                  {/* Book Button */}
                  <Link
                    href={`/book-appointment/${service.id}`}
                    className="glass-dark rounded-full px-8 py-3 text-primary-700 font-medium hover:bg-primary-100 transition-colors text-center whitespace-nowrap"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
