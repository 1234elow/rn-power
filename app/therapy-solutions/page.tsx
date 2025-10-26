"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TherapyIcon from "@/components/TherapyIcon";
import Link from "next/link";

export default function TherapySolutions() {
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
  const therapies = [
    {
      name: "Anxiety",
      description: "At ReNewed Power Inc, we understand that anxiety can manifest in various ways, affecting your daily life. Your heart races, palms sweat, and those familiar fight or flight urges can leave you feeling overwhelmed. Our specialized program provides a safe environment to explore your feelings, learn coping strategies, and regain control. We offer personalized treatment plans tailored to your unique experience, whether you're struggling with insomnia, difficulty breathing, or a persistent sense of uneasiness. Let us help you find peace and stability in your life once again.",
    },
    {
      name: "Cognitive Behavioral Therapy",
      description: "Cognitive Behavior Therapy (CBT) is a transformative talking therapy that empowers you to view the world and your behavior clearly and accurately. Recognized as the only therapy proven effective for various mental health challenges, including anxiety, panic attacks, depression, relationship issues, and addiction, CBT offers a structured approach typically spanning 12-16 sessions. This practical framework allows you to set achievable goals, actively track your progress, and witness the impact of your thoughts on your feelings and behaviors. Experience profound changes in self-perception and relationships through CBT.",
    },
    {
      name: "Depression",
      description: "At ReNewed Power Inc, we understand that depression can feel overwhelming and isolating. Our dedicated team offers compassionate care tailored to your unique needs. Through evidence-based therapies and holistic approaches, we aim to empower you in your journey to recovery. Our outpatient services allow you to access support while maintaining your daily life. Together, we will help you regain control, find hope, and rediscover joy in your life. You are not alone; let us guide you towards a brighter future.",
    },
    {
      name: "Dialectical Behavioral Therapy",
      description: "In the late 1980s, psychologist Marsha M. Linehan developed Dialectical Behavior Therapy (DBT) to address the limitations of cognitive behavior therapy (CBT) for patients with borderline personality disorder. Rooted in mindfulness, acceptance, and present-moment awareness, DBT has gained immense popularity as a versatile treatment for various disorders. It effectively combines therapeutic techniques to uncover the root causes of addiction and mental health issues. By fostering new ways of thinking and behaving, DBT empowers individuals to transform their lives and achieve lasting recovery.",
    },
    {
      name: "Dual Diagnosis",
      description: "Dual Diagnosis treatment addresses the complexities of individuals facing both mental health challenges and substance use disorders. At ReNewed Power Inc, we provide specialized care for those battling co-occurring conditions, understanding that one can significantly impact the other. For instance, someone struggling with alcohol abuse may also be dealing with depression, necessitating an integrated approach to recovery. Our experienced team employs evidence-based therapies tailored to the unique needs of each individual, fostering a supportive environment for healing and growth. Together, we work towards a sustainable recovery and improved quality of life.",
    },
    {
      name: "Holistic Therapy",
      description: "At ReNewed Power Inc, we believe in a holistic approach to addiction treatment that emphasizes healing the mind, body, and spirit. Our treatment program supports each patient with unique, healthy, and positive strategies that can impact their lives well beyond treatment. Holistic therapy encompasses nutrition, mindfulness meditation, physical therapy, and other therapeutic approaches designed to promote overall well-being. By combining holistic therapies with traditional addiction treatment, we help improve recovery outcomes. This strategy enables patients to learn techniques for overcoming their addiction while focusing on mental health issues, ultimately allowing them to heal and live their best lives.",
    },
    {
      name: "Solution Based Therapy",
      description: "Solution-focused therapy, also known as solution-focused brief therapy, empowers individuals to harness their personal strengths and create effective strategies to achieve their goals. This approach enables patients to find resolutions and implement positive changes more rapidly than traditional therapies that emphasize pathology and past experiences. Unlike other forms of therapy, SFBT centers on the patient's positive attributes, offering a short-term, goal-oriented experience. The primary aim is to help individuals resolve everyday challenges, fostering a sense of achievement and well-being in their lives.",
    },
    {
      name: "Trauma",
      description: "Trauma is an emotional response to a terrible event such as an accident, crime, natural disaster, or abuse. Initially, individuals may experience shock and denial. Over time, longer-term reactions can manifest as unpredictable emotions, flashbacks, and strained relationships. At ReNewed Power Inc, we offer specialized support to help individuals process their trauma safely and effectively. Our approach is rooted in the latest research and best practices, allowing us to provide a compassionate environment for healing. We understand that trauma can affect anyone, and we are here to guide you on your recovery journey.",
    },
    {
      name: "Trauma Focused Therapy",
      description: "At ReNewed Power Inc, we recognize that unresolved trauma can lead to a cycle of substance abuse and emotional disconnection. Our Trauma Focused Therapy integrates both body and mind treatment models to help individuals process their experiences. We understand that as trauma unfolds, behaviors often reveal their roots, providing clarity to the struggles faced. Our compassionate approach addresses issues such as emotional voids, addiction, anxiety, and PTSD, empowering clients to reconnect with themselves and others. Together, we work towards healing, helping you reclaim your sense of self and build meaningful connections.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section with Wave */}
      <section className="relative pt-20 pb-32 bg-accent-500 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute inset-0">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
          <div className="floating-orb orb-4"></div>
          <div className="floating-orb orb-5"></div>
        </div>

        <div className="container-custom py-16 relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif text-center text-black">
            Therapy Solutions
          </h1>
        </div>

        {/* Wave SVG */}
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

      {/* Therapies Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {therapies.map((therapy, index) => (
              <div key={index} className="text-center">
                <TherapyIcon />
                <h3
                  className="text-2xl md:text-3xl font-script text-primary-600 my-4"
                  style={{ fontFamily: 'cursive' }}
                >
                  {therapy.name}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {therapy.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <Link
            href="/#contact"
            className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-12 py-4 rounded-md text-lg font-medium transition-colors"
          >
            Book an Appointment
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
