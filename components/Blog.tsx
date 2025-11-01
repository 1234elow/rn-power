"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Blog() {
  const { elementRef, isVisible } = useScrollAnimation();
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  const blogPosts = [
    {
      title: "Transformative Substance Abuse Therapy: Your Path to Recovery",
      writer: "Shatakia Niles",
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
      writer: "Shatakia Niles",
      date: "Jun 21",
      readTime: "1 min read",
      gradient: "from-purple-400 to-pink-400",
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
      writer: "Shatakia Niles",
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
    },
  ];

  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50 -z-10"></div>

      <div className="container-custom">
        {/* Header */}
        <div ref={elementRef as any} className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-serif text-gradient mb-4">
            Insights & Resources
          </h2>
          <p className="text-xl text-gray-600">
            Expert guidance for your recovery journey
          </p>
        </div>

        {/* Blog Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => {
              const isExpanded = expandedPost === index;
              return (
                <div
                  key={index}
                  className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${isExpanded ? 'md:col-span-3' : ''}`}
                  style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                >
                  <div className="glass-card glass-card-hover rounded-3xl overflow-hidden group h-full flex flex-col">
                    {/* Image Placeholder with Gradient */}
                    {!isExpanded && (
                      <div className={`h-48 bg-gradient-to-br ${post.gradient} flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        <svg className="w-16 h-16 text-white opacity-50 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      {/* Title */}
                      <h3 className={`font-serif text-gray-900 mb-4 ${isExpanded ? 'text-3xl md:text-4xl' : 'text-xl line-clamp-2 flex-grow'}`}>
                        {post.title}
                      </h3>

                      {/* Writer Info - Only show when expanded */}
                      {isExpanded && (
                        <div className="flex items-center gap-3 mb-6 text-gray-600">
                          <span className="font-medium">{post.writer}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      )}

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
                        <p className="text-gray-700 mb-4 line-clamp-3">
                          {post.content[0]}
                        </p>
                      )}

                      {/* Read More / Show Less Button */}
                      <button
                        onClick={() => {
                          setExpandedPost(isExpanded ? null : index);
                          if (!isExpanded) {
                            setTimeout(() => {
                              document.getElementById(`blog-post-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 100);
                          }
                        }}
                        className="glass-dark rounded-full px-6 py-2 text-primary-700 font-medium hover:bg-primary-100 transition-colors group-hover:scale-105 transform duration-200 self-start"
                      >
                        {isExpanded ? 'Show Less' : 'Read More'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
