"use client";

import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Blog() {
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
      .masonry-grid {
        column-count: 1;
        column-gap: 1.5rem;
      }
      @media (min-width: 768px) {
        .masonry-grid {
          column-count: 2;
        }
      }
      @media (min-width: 1024px) {
        .masonry-grid {
          column-count: 3;
        }
      }
      .masonry-item {
        break-inside: avoid;
        margin-bottom: 1.5rem;
        display: inline-block;
        width: 100%;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Add 3D tilt effect on mouse move
  useEffect(() => {
    const THRESHOLD = 15;
    const motionOK = !window.matchMedia("(prefers-reduced-motion)").matches;

    if (!motionOK) return;

    const handleHover = (card: HTMLDivElement) => (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { clientWidth, clientHeight, offsetLeft, offsetTop } = card;
      const rect = card.getBoundingClientRect();

      const horizontal = (clientX - rect.left) / clientWidth;
      const vertical = (clientY - rect.top) / clientHeight;

      const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
      const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

      card.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
    };

    const resetStyles = (card: HTMLDivElement) => () => {
      card.style.transform = `perspective(${card.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
    };

    cardRefs.current.forEach((card) => {
      if (card) {
        const hoverHandler = handleHover(card);
        const resetHandler = resetStyles(card);

        card.addEventListener("mousemove", hoverHandler);
        card.addEventListener("mouseleave", resetHandler);

        // Store handlers for cleanup
        (card as any)._hoverHandler = hoverHandler;
        (card as any)._resetHandler = resetHandler;
      }
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) {
          card.removeEventListener("mousemove", (card as any)._hoverHandler);
          card.removeEventListener("mouseleave", (card as any)._resetHandler);
        }
      });
    };
  }, []);

  const blogPosts = [
    {
      title: "Transformative Substance Abuse Therapy: Your Path to Recovery",
      author: "Shatakia Niles",
      date: "Jun 21",
      readTime: "2 min read",
      excerpt: "Substance abuse and addiction can impact individuals of all backgrounds, leading to significant challenges in their personal and professional lives. Our comprehensive therapy programs are designed to address the root causes of addiction...",
      views: 12,
      comments: 0,
      image: "/api/placeholder/600/400",
      imageHeight: "60%"
    },
    {
      title: "Empower Your Recovery Journey with Holistic Outpatient Therapy",
      author: "Shatakia Niles",
      date: "Jun 21",
      readTime: "1 min read",
      excerpt: "Embark on a Holistic Journey to Recovery. Recovering from addiction and substance abuse is a challenging path, often requiring a comprehensive approach that addresses not just the physical aspects but also the emotional...",
      views: 8,
      comments: 0,
      image: "/api/placeholder/600/500",
      imageHeight: "75%"
    },
    {
      title: "Virtual Counseling: Personalized Care for Addiction Recovery",
      author: "Shatakia Niles",
      date: "Jun 21",
      readTime: "2 min read",
      excerpt: "In today's fast-paced world, where convenience is key, finding effective solutions for addiction recovery has become more attainable than ever. Virtual counseling offers a flexible and personalized approach...",
      views: 15,
      comments: 1,
      image: "/api/placeholder/600/350",
      imageHeight: "50%"
    },
    {
      title: "Understanding Cognitive Behavioral Therapy for Addiction",
      author: "Shatakia Niles",
      date: "Jun 20",
      readTime: "3 min read",
      excerpt: "Cognitive Behavioral Therapy (CBT) has proven to be one of the most effective treatments for addiction. Learn how this evidence-based approach can help you identify and change negative thought patterns...",
      views: 22,
      comments: 2,
      image: "/api/placeholder/600/450",
      imageHeight: "70%"
    },
    {
      title: "The Role of Family in Addiction Recovery",
      author: "Shatakia Niles",
      date: "Jun 19",
      readTime: "2 min read",
      excerpt: "Family support plays a crucial role in the recovery journey. Discover how family therapy can strengthen relationships and create a supportive environment for lasting recovery...",
      views: 18,
      comments: 3,
      image: "/api/placeholder/600/400",
      imageHeight: "55%"
    },
    {
      title: "Mindfulness and Meditation in Recovery",
      author: "Shatakia Niles",
      date: "Jun 18",
      readTime: "3 min read",
      excerpt: "Incorporating mindfulness practices into your recovery journey can provide powerful tools for managing stress, cravings, and emotional triggers. Learn practical techniques you can start using today...",
      views: 25,
      comments: 1,
      image: "/api/placeholder/600/550",
      imageHeight: "80%"
    },
    {
      title: "Dual Diagnosis: Treating Co-Occurring Disorders",
      author: "Shatakia Niles",
      date: "Jun 17",
      readTime: "4 min read",
      excerpt: "Understanding the connection between mental health and addiction is essential for effective treatment. Our integrated approach addresses both conditions simultaneously for better outcomes...",
      views: 14,
      comments: 0,
      image: "/api/placeholder/600/380",
      imageHeight: "58%"
    },
    {
      title: "Building a Strong Support Network in Recovery",
      author: "Shatakia Niles",
      date: "Jun 16",
      readTime: "2 min read",
      excerpt: "Recovery is not a journey you have to take alone. Learn how to build and maintain a strong support network that will help you stay committed to your recovery goals...",
      views: 20,
      comments: 2,
      image: "/api/placeholder/600/420",
      imageHeight: "65%"
    },
    {
      title: "Overcoming Relapse: Strategies for Long-Term Success",
      author: "Shatakia Niles",
      date: "Jun 15",
      readTime: "3 min read",
      excerpt: "Relapse doesn't mean failure—it's an opportunity to learn and strengthen your recovery. Discover evidence-based strategies to prevent relapse and maintain long-term sobriety...",
      views: 30,
      comments: 4,
      image: "/api/placeholder/600/480",
      imageHeight: "72%"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Banner Section */}
      <section className="relative pt-32 pb-32 bg-gradient-to-br from-primary-600 via-accent-500 to-primary-700 overflow-hidden">
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
            Latest Articles
          </h1>
          <p className="text-xl text-center text-white/90 max-w-2xl mx-auto">
            Insights and resources to support your recovery journey
          </p>
        </div>

        {/* Wave Shape */}
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
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Blog Posts - Masonry Layout */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-7xl mx-auto px-4">
          <div className="masonry-grid">
            {blogPosts.map((post, index) => (
              <div key={index} className="masonry-item">
                <div
                  ref={(el) => { cardRefs.current[index] = el; }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-100 overflow-hidden border border-gray-100 group"
                  style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                >
                  {/* Image placeholder */}
                  <div className="w-full bg-gradient-to-br from-primary-100 to-accent-100 relative overflow-hidden" style={{ paddingBottom: post.imageHeight }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-20 h-20 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Author and date */}
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span>{post.author}</span>
                      </div>
                      <span className="mx-2">•</span>
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                          <span>{post.comments}</span>
                        </div>
                      </div>
                      <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center">
                        Read More
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
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
