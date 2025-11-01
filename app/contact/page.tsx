"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create email content from form data
    const subject = `Contact Form Submission from ${formData.firstName} ${formData.lastName}`;
    const body = `
First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}

---
This email was generated from the ReNewed Power contact form.
    `.trim();

    // Create mailto link with pre-filled content
    const mailtoLink = `mailto:admin@rnpowerinc.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open user's mail app
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lightBlue-50 via-lightBlue-100 to-lightBlue-200">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute inset-0">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
          <div className="floating-orb orb-4"></div>
          <div className="floating-orb orb-5"></div>
        </div>

        <div className="container-custom max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-gray-900 mb-4">
            Get In Touch
          </h1>
          <h2 className="text-3xl md:text-4xl font-script text-gray-800 mb-6" style={{ fontFamily: 'cursive' }}>
            Contact Us for Transformation
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            We are here to listen and support you on your journey to transformation. This is a safe space for you to explore and share your story. Feel free to reach out and take the first step towards a brighter, healthier future.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-16 relative z-10">
        <div className="container-custom max-w-2xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>

            {/* Consent Checkbox */}
            <div className="mb-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">
                  I allow this website to store my submission so they can respond to my inquiry. *
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary-800 text-white py-4 rounded-lg font-medium text-lg hover:bg-primary-900 transition-colors shadow-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Contact Information */}
      <section className="pb-16 relative z-10">
        <div className="container-custom max-w-4xl mx-auto px-4 text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="inline-block border-4 border-primary-600 px-8 py-4 rounded-lg">
              <h3 className="text-4xl font-script text-primary-600" style={{ fontFamily: 'cursive' }}>
                ReNewed Power
              </h3>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-gray-800 text-lg mb-6">
            <p>
              <span className="font-semibold italic">Arizona:</span> 1270 E Broadway Rd, Ste 122, Tempe, AZ 85282
            </p>
            <p>
              <span className="font-semibold italic">Chicago:</span> 621 E 67th St, Chicago, IL 60637
            </p>
            <p>
              <span className="font-semibold italic">Hours:</span> Monday - Friday | 9 AM - 5 PM
            </p>
            <p>
              <span className="font-semibold italic">Email:</span>{" "}
              <a href="mailto:admin@rnpowerinc.com" className="text-primary-600 hover:underline">
                admin@rnpowerinc.com
              </a>
            </p>
            <p>
              <span className="font-semibold italic">Tel:</span>{" "}
              <a href="tel:480-687-3368" className="text-primary-600 hover:underline">
                480-687-3368
              </a>
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-gray-800 hover:text-primary-600 transition-colors" aria-label="Twitter">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-800 hover:text-primary-600 transition-colors" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-0">
        <div className="w-full h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2975.576892!2d-87.606891!3d41.775002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e296a1b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2s615%20E%2067th%20St%2C%20Chicago%2C%20IL%2060637!5e0!3m2!1sen!2sus!4v1234567890123"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="ReNewed Power Location - Chicago"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
