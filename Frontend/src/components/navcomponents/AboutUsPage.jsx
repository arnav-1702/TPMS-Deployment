import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

import aboutImg from "../../../assets/about.png";
import ceoImg from "../../../assets/ceo.png";

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
                Welcome to Talent Pool Manpower Services
              </h2>

              <div className="space-y-4 text-[#000000] leading-relaxed">
                <p>
                  Talent Pool Manpower Services is a trusted name in human resource
                  management, recruitment, and permanent staffing solutions. We
                  specialize in connecting exceptional talent with outstanding
                  organizations, helping businesses build strong teams and
                  professionals achieve meaningful careers.
                </p>
                <p>
                  Founded in 2022 and led by <strong>Mr. Nilesh Pandit</strong>,
                  Talent Pool Manpower Services has been built on the foundation
                  of integrity, commitment, and excellence. With a deep
                  understanding of industry needs and workforce dynamics, we aim
                  to deliver the most reliable, transparent, and result-driven HR
                  solutions that empower organizations to grow and succeed.
                </p>
                <p>
                  At Talent Pool Manpower Services, we understand that every
                  company’s success depends on its people. That’s why we go
                  beyond traditional recruitment — we partner with clients to
                  understand their culture, business objectives, and hiring
                  needs, ensuring we identify the right candidates who bring both
                  skill and passion to their roles.
                </p>
                <p>
                  Our focus is on quality over quantity, ensuring that every
                  candidate we recommend is carefully screened, professionally
                  evaluated, and perfectly matched to the position requirements.
                  Whether you are looking for entry-level professionals, mid-level
                  executives, or senior management personnel, our experienced
                  recruitment team delivers efficient and tailored staffing
                  solutions across various sectors.
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
                src={aboutImg}
                alt="About Talent Pool Manpower Services"
                className="w-80 h-64 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </motion.div>

          {/* Core Services Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold text-[#000000] mb-4">
              Our Core Services
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-[#000000]">
              <li>
                <strong>Recruitment Services:</strong> Comprehensive hiring
                solutions for companies seeking the right talent quickly and
                efficiently.
              </li>
              <li>
                <strong>Permanent Staffing:</strong> Reliable, long-term workforce
                solutions designed to help businesses build stable, skilled teams.
              </li>
              <li>
                <strong>HR Consulting:</strong> Strategic support in workforce
                planning, employee relations, and organizational development.
              </li>
            </ul>
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
                src={ceoImg}
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
                any organisation. Through Talent Pool, my mission is to connect
                skilled professionals with the right opportunities, empowering
                both individuals and businesses to grow together."
              </blockquote>
              <cite className="text-[#000000] font-semibold text-base">
                — Nilesh Pandit, Founder
              </cite>
            </motion.div>
          </motion.div>

          {/* Mission, Vision, and Values Section */}
          <motion.div
            className="space-y-8 mb-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-[#000000] mb-2">
                Our Mission
              </h3>
              <p className="text-[#000000] leading-relaxed">
                To deliver customized, ethical, and efficient HR solutions that
                bridge the gap between talented individuals and forward-thinking
                organizations.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#000000] mb-2">
                Our Vision
              </h3>
              <p className="text-[#000000] leading-relaxed">
                To be recognized as a leading manpower and HR service provider
                known for our professionalism, reliability, and commitment to
                excellence in every partnership we build.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#000000] mb-2">
                Our Values
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-[#000000]">
                <li>
                  <strong>Integrity:</strong> Upholding honesty and transparency
                  in every step of the recruitment process.
                </li>
                <li>
                  <strong>Excellence:</strong> Consistently striving to exceed
                  client expectations through quality and dedication.
                </li>
                <li>
                  <strong>Commitment:</strong> Building long-term relationships
                  based on trust, reliability, and performance.
                </li>
                <li>
                  <strong>People First:</strong> Believing that the right talent
                  can transform any organization’s success.
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Why Choose Talent Pool */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
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

          {/* Closing Note */}
          <motion.div
            className="mt-12 text-center text-[#000000]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-lg font-medium mb-2">
              At Talent Pool Manpower Services, we don’t just fill vacancies —
              we build careers, strengthen organizations, and create opportunities
              that drive growth.
            </p>
            <p className="font-semibold">
              <strong>Talent Pool Manpower Services</strong> <br />
              Led by <strong>Mr. Nilesh Pandit</strong> <br />
              Your trusted partner in recruitment and permanent staffing.
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}