import React, { useState } from "react";
import { Facebook, Twitter, Linkedin, Instagram, Bolt } from "lucide-react";
import { useSiteContent } from "../../../context/SiteContentContext";

const Footer = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { content } = useSiteContent();

  const faqs = [
    {
      question: "What areas do you service?",
      answer: "We service all major metropolitan areas and surrounding suburbs. Check our service area map for specific locations.",
    },
    {
      question: "How quickly can you respond to emergencies?",
      answer: "We offer 24/7 emergency services with an average response time of under 60 minutes for critical electrical issues.",
    },
    {
      question: "Are your electricians licensed and insured?",
      answer: "Yes, every member of our team is fully licensed, bonded, and carries comprehensive insurance for your peace of mind.",
    },
    {
      question: "Do you offer warranties on your work?",
      answer: "Absolutely. We stand by our craftsmanship with a 12-month warranty on all labor and parts installed by our team.",
    },
    {
      question: "What types of payment do you accept?",
      answer: "We accept all major credit cards, bank transfers, and digital payment platforms like Apple Pay and Google Pay.",
    },
    {
      question: "How do I schedule a service appointment?",
      answer: "You can schedule through our online portal, by filling out the contact form above, or by calling our 24/7 service line.",
    },
  ];

  return (
    <div className="bg-white font-sans">
      <section className="bg-blue-50/30 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-500 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-800">{faq.question}</h3>
                  <div className={`mt-4 text-slate-600 leading-relaxed transition-all duration-300 ease-in-out ${openIndex === index ? "block" : "hidden"}`}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-linear-to-b from-white to-blue-100 pt-20 pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                <Bolt className="fill-black" size={28} />
                {content.footerCompany}
              </div>
              <p className="text-slate-600 leading-relaxed max-w-xs">
                {content.footerDesc}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
              <ul className="space-y-3 text-slate-600">
                <li className="hover:text-blue-500 cursor-pointer transition">About Us</li>
                <li className="hover:text-blue-500 cursor-pointer transition">Services</li>
                <li className="hover:text-blue-500 cursor-pointer transition">Projects</li>
                <li className="hover:text-blue-500 cursor-pointer transition">Contact</li>
                <li className="hover:text-blue-500 cursor-pointer transition">Careers</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Services</h4>
              <ul className="space-y-3 text-slate-600">
                <li className="hover:text-blue-500 cursor-pointer transition">Residential Wiring</li>
                <li className="hover:text-blue-500 cursor-pointer transition">Commercial Installations</li>
                <li className="hover:text-blue-500 cursor-pointer transition">Emergency Repairs</li>
                <li className="hover:text-blue-500 cursor-pointer transition">Smart Home Solutions</li>
                <li className="hover:text-blue-500 cursor-pointer transition">Maintenance</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-slate-900 mb-2">Connect With Us</h4>
              <div className="flex gap-4">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <div
                    key={i}
                    className="p-2 bg-slate-200/50 rounded-full hover:bg-blue-500 hover:text-white transition cursor-pointer text-slate-700"
                  >
                    <Icon size={20} />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-slate-800 font-medium">{content.footerPhone}</p>
                <p className="text-slate-600 hover:text-blue-500 cursor-pointer">{content.footerEmail}</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200/60 text-center text-slate-500 text-sm">
            {content.footerCopyright}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
