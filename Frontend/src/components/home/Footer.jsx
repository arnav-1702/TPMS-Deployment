import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#7886C7] text-white pt-8 pb-4 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Company Info */}
        <div className="text-center md:text-left md:pr-6 md:border-r md:border-gray-300">
          <h2 className="text-2xl font-bold  text-white mb-3">
            Talent Pool Manpower Services
          </h2>
          <p className="text-sm leading-relaxed text-white">
            Providing reliable manpower & training solutions to empower
            businesses and professionals for a better tomorrow.
          </p>
        </div>

        {/* Contact */}
        <div className="text-center md:text-left md:pl-6">
          <h3 className="text-lg font-semibold  text-white mb-3">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-4 h-4  text-white" />
              talentpoolmanpowerservices@gmail.com
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <Phone className="w-4 h-4  text-white" />
              +91 9028258741
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <MapPin className="w-4 h-4  text-white" />
              S.No. 176, Near Sonai English Medium School, Bhekrai Nagar, Pune -
              412208
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-4 pt-4 text-center text-sm  text-white">
        © {new Date().getFullYear()} Talent Pool Manpower Services. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
