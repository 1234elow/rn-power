"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Blog() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

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
      gradient: "from-blue-400 to-cyan-400",
      content: [
        "Substance abuse and addiction can impact individuals of all backgrounds, leading to significant challenges in their personal and professional lives. Seeking help is the first step towards recovery, and finding the right therapy program can make all the difference in one's journey towards sobriety.",
        "At Behavioral Health Therapy, we offer a transformative approach to substance abuse therapy that is centered around individual needs and goals. Our outpatient treatment programs are designed to provide comprehensive care through a combination of individual counseling, group therapy, family therapy, and virtual sessions. By offering a variety of therapeutic options, we aim to support our clients in their recovery process and address the underlying issues contributing to their substance abuse.",
        "Our team of experienced therapists and counselors are dedicated to providing personalized care in a compassionate and supportive environment. We understand that each individual's journey towards recovery is unique, which is why we tailor our treatment plans to meet their specific needs. Through our holistic approach to therapy, we address not only the physical aspects of addiction but also the mental and emotional factors that play a role in sustaining substance abuse.",
        "In addition to our therapy services, we offer online courses and resources on our website to support our clients in their recovery journey. These resources cover a range of topics, from coping mechanisms and relapse prevention to mindfulness practices and stress management techniques. By providing access to these tools, we empower individuals to take an active role in their recovery and equip them with the skills they need to maintain sobriety in the long term.",
        "Whether you are seeking help for yourself or a loved one, Behavioral Health Therapy is here to support you every step of the way. Our commitment to delivering high-quality care and services is reflected in our dedication to helping individuals reclaim their lives from the grip of addiction. If you or someone you know is struggling with substance abuse, know that there is hope for a brighter future. Contact us today to learn more about our transformative substance abuse therapy programs and start your journey towards recovery."
      ]
    },
    {
      title: "Holistic Outpatient Therapy",
      author: "Shatakia Niles",
      date: "Jun 21",
      readTime: "1 min read",
      gradient: "from-emerald-400 to-teal-400",
      content: [
        "Embark on a Holistic Journey to Recovery. Recovering from addiction and substance abuse is a challenging path, often requiring a multifaceted approach to heal the mind, body, and spirit. Holistic outpatient therapy is a powerful tool in this journey, offering a comprehensive and personalized approach to treatment that goes beyond traditional methods.",
        "At our Behavioral Health Therapy center, we specialize in providing outpatient treatment that combines individual, group, family, and virtual therapy sessions to address the unique needs of each individual. Our team of dedicated therapists and counselors are committed to creating a safe and supportive environment where clients can explore their emotions, behaviors, and beliefs while developing coping strategies and life skills for long-term recovery.",
        "Our holistic approach to therapy integrates traditional psychotherapy with complementary therapies such as mindfulness, yoga, art therapy, and meditation to promote healing on a holistic level. By addressing the physical, emotional, and spiritual aspects of addiction, clients can gain a deeper understanding of themselves and their triggers, leading to lasting transformation and growth.",
        "In addition to therapy sessions, we offer online courses and resources on our website to support clients on their recovery journey. Whether you're located in Arizona or Chicago, our goal is to empower individuals to reclaim their lives and build a brighter future free from addiction.",
        "If you or a loved one is ready to take the first step towards recovery, consider exploring the benefits of holistic outpatient therapy. Our new company is dedicated to delivering high-quality care and services, helping you navigate the path to healing and wellness. Let us support you on your journey to recovery and transformation."
      ]
    },
    {
      title: "Virtual Counseling: Personalized Care for Addiction Recovery",
      author: "Shatakia Niles",
      date: "Jun 21",
      readTime: "2 min read",
      gradient: "from-cyan-400 to-teal-400",
      content: [
        "In today's fast-paced world, where convenience is key, finding effective solutions for addiction recovery has become more attainable through modern advancements in therapy. Take a journey towards personalized care and support with the innovative approach of Virtual Counseling.",
        "Imagine being able to access transformative care, mental health support, and holistic therapy from the comfort of your own home. With Virtual Counseling, individuals struggling with substance abuse and addiction recovery can now benefit from individual, group, and family therapy sessions online. This method of therapy provides a level of convenience and flexibility that traditional in-person sessions may not offer.",
        "Virtual Counseling is not just about providing therapy sessions through a screen; it encompasses a holistic approach to recovery. It allows individuals to engage in online courses, access valuable resources, and receive the personalized care they need to reclaim their lives. Whether you are in Arizona or Chicago, Virtual Counseling brings the expertise and support of experienced therapists right to your doorstep.",
        "The Behavioral Health Therapy business, a new company dedicated to delivering high-quality care and services, specializes in Outpatient Treatment for substance abuse and addiction recovery. With a focus on providing personalized care in a supportive environment, they are committed to empowering individuals on their journey to recovery. By combining traditional therapy methods with modern technology, they aim to create a comprehensive and effective treatment plan tailored to each individual's needs.",
        "Virtual Counseling offers a unique opportunity for those seeking addiction recovery to receive personalized care in a convenient and accessible way. Through the power of technology and the expertise of experienced therapists, individuals can embark on a transformative journey towards healing and reclaiming their lives. Embrace the future of therapy with Virtual Counseling and take the first step towards a brighter tomorrow."
      ]
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

      {/* Blog Posts - Grid Layout */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => {
              const isExpanded = expandedPost === index;
              return (
                <div
                  key={index}
                  className={`transition-all duration-500 ${isExpanded ? 'md:col-span-3' : ''}`}
                >
                  <div
                    ref={(el) => { cardRefs.current[index] = el; }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-100 overflow-hidden border border-gray-100 group h-full flex flex-col"
                    style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                  >
                    {/* Image placeholder - Only show when collapsed */}
                    {!isExpanded && (
                      <div className={`w-full bg-gradient-to-br ${post.gradient} relative overflow-hidden h-48`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-16 h-16 text-white opacity-50 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      {/* Title */}
                      <h2 className={`font-serif text-gray-900 mb-3 group-hover:text-primary-600 transition-colors ${isExpanded ? 'text-3xl md:text-4xl' : 'text-xl'}`}>
                        {post.title}
                      </h2>

                      {/* Author and date */}
                      <div className="flex items-center text-sm text-gray-500 mb-4">
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

                      {/* Article Content - Only show when expanded */}
                      {isExpanded && (
                        <div className="prose prose-lg max-w-none mb-6">
                          {post.content.map((paragraph, pIndex) => (
                            <p key={pIndex} className="text-gray-700 leading-relaxed mb-4">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Preview - Only show when collapsed */}
                      {!isExpanded && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                          {post.content[0]}
                        </p>
                      )}

                      {/* Read More / Show Less Button */}
                      <button
                        onClick={() => {
                          setExpandedPost(isExpanded ? null : index);
                          if (!isExpanded) {
                            setTimeout(() => {
                              cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 100);
                          }
                        }}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center self-start"
                      >
                        {isExpanded ? 'Show Less' : 'Read More'}
                        <svg className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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
