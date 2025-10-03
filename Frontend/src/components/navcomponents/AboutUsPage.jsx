"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* About Us Section */}
          <motion.div
            className="flex items-start justify-between mb-16 gap-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl font-bold text-[#000000] mb-6">About Us</h1>
              <h2 className="text-xl font-semibold text-[#000000] mb-6">
                About Talent Pool Manpower Services
              </h2>

              <div className="space-y-4 text-[#000000] leading-relaxed">
                <p>
                  Founded in 2022 by Nilesh Pandit, Talent Pool Manpower Services
                  is a trusted HR and recruitment partner for businesses across
                  industries. With over 8 years of experience in the human
                  resources domain, Nilesh established the company with a clear
                  vision—to bridge the gap between skilled professionals and the
                  right career opportunities.
                </p>
                <p>
                  At Talent Pool, we believe that people are the true strength of
                  any organization. Our approach is human-centric, transparent,
                  and tailored to ensure the right match between talent and
                  employer.
                </p>
              </div>
            </motion.div>

            {/* About Image */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img
                src="/assets/about.png"
                alt="About Talent Pool Manpower Services"
                className="w-80 h-64 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </motion.div>

          {/* Founder's Note Section */}
          <motion.div
            className="flex items-start gap-8 mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img
                src="/assets/ceo.png"
                alt="Nilesh Pandit, Founder"
                className="w-80 h-64 object-cover rounded-lg shadow-lg"
              />
            </motion.div>

            <motion.div
              className="flex-1 pt-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl font-bold text-[#000000] mb-6">
                Founder's Note
              </h3>
              <blockquote className="text-[#000000] text-lg leading-relaxed mb-6 font-normal">
                "My journey in HR taught me that people are the true strength of
                any organisation. Through Talentpool, my mission is to connect
                skilled professionals with the right opportunities, empowering
                both individuals and businesses to grow together."
              </blockquote>
              <cite className="text-[#000000] font-semibold text-base">
                — Nilesh Pandit, Founder
              </cite>
            </motion.div>
          </motion.div>

          {/* Mission and Vision */}
          <motion.div
            className="space-y-8 mb-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-[#000000]">Our Mission</h3>
              <p className="text-[#000000] leading-relaxed">
                To connect talented individuals with the right job opportunities
                while helping organizations build high-performing teams.
              </p>
              <p className="text-[#000000] leading-relaxed">
                <span className="font-semibold">Our Vision</span> <br />
                To become a leading HR partner known for trust, efficiency, and
                people-first solutions.
              </p>
            </div>
          </motion.div>

          {/* Why Choose Talent Pool */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-[#000000] mb-6">
              Why Choose Talent Pool?
            </h3>
            <ul className="space-y-1 text-[#000000]">
              {[
                "8+ years of HR expertise",
                "Customized recruitment solutions",
                "Dedicated support for both candidates and companies",
                "Transparent and efficient processes",
              ].map((point, index) => (
                <motion.li
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <span className="mr-3">•</span>
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}