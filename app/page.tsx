"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import LiquidEther from "@/components/LiquidEther";

export default function Home() {
  // Add smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <main className="min-h-screen relative">
      {/* Liquid Ether Background - Fixed full-screen */}
      <div className="fixed inset-0 -z-10">
        <LiquidEther
          colors={['#0EA5E9', '#06B6D4', '#3B82F6']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      <Header />
      <div className="parallax-container relative z-10">
        <Hero />
        <About />
        <Services />
        <Blog />
      </div>
      <Footer />
    </main>
  );
}
