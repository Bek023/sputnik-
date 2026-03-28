import { createContext, useContext, useState, useEffect } from "react";

const DEFAULT_CONTENT = {
  // Header
  logo: "",           // base64 yoki bo'sh (matn bo'ladi)
  companyName: "Sputnik",

  // Map
  mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d53439.01085727181!2d66.8468847!3d39.6509942!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d1941369984f7%3A0xdd6b43742d313da8!2z0KHQv9GD0YLQvdC40Lo!5e1!3m2!1sru!2s!4v1773130188076!5m2!1sru!2s",

  // Hero section
  heroTitle: "Powering Your Home & Business",
  heroSubtitle:
    "We've built our reputation on reliability, responsiveness, and results and we're proud to be the first call for countless homeowners, builders, and businesses in Service. Whether you're powering up a new space or upgrading outdated systems, you can count on Powering your home & business to bring the energy safely and professionally.",
  heroPhone: "1-800-VOLTPRO",
  heroBadge1: "24/7 Service",
  heroBadge2: "Licensed & Insured",
  heroBadge3: "100% Satisfaction",

  // Services section
  servicesTitle: "Our Services",
  servicesDesc:
    "We've built our reputation on reliability, responsiveness, and results and we're proud to be the first call for countless homeowners, builders, and businesses in Service. Whether you're powering up a new space or upgrading outdated systems, you can count on Powering your home & business to bring the energy safely and professionally.",
  service1Title: "Residential Wiring",
  service1Desc: "Complete electrical solutions for homes",
  service1Icon: "",
  service2Title: "Commercial Installations",
  service2Desc: "Professional business electrical services",
  service2Icon: "",
  service3Title: "Emergency Repairs",
  service3Desc: "24/7 emergency electrical assistance",
  service3Icon: "",
  service4Title: "Smart Home Solutions",
  service4Desc: "Modern smart electrical systems",
  service4Icon: "",

  // Why Choose Us
  whyTitle: "Why Choose Us",
  whyDesc:
    "We deliver reliable, high-quality electrical services backed by experienced professionals, prompt support, and a strong focus on safety. Our commitment to customer satisfaction, transparent pricing, and attention to detail sets us apart as a trusted partner for all your electrical needs.",
  why1Stat: "24/7",
  why1Subtitle: "Emergency Service",
  why1Desc: "Round-the-clock electrical assistance",
  why2Stat: "100%",
  why2Subtitle: "Licensed Experts",
  why2Desc: "Fully certified professional electricians",
  why3Stat: "100%",
  why3Subtitle: "Satisfaction",
  why3Desc: "Guaranteed quality workmanship",

  // Contact
  contactPhone: "1-800-VOLTPRO",
  contactEmergency: "1-800-EMERGENCY",
  contactEmail: "info@voltpro.com",
  contactAddress: "123 Electric Avenue",
  contactCity: "Power City, PC 12345",

  // Footer
  footerCompany: "VoltPro",
  footerDesc: "Professional electrical services you can trust. Licensed, bonded, and insured.",
  footerPhone: "1-800-VOLTPRO",
  footerEmail: "info@voltpro.com",
  footerCopyright: "© 2024 VoltPro. All rights reserved.",
};

const STORAGE_KEY = "siteContent";

const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULT_CONTENT, ...JSON.parse(saved) } : DEFAULT_CONTENT;
    } catch {
      return DEFAULT_CONTENT;
    }
  });

  const updateContent = (newContent) => {
    setContent(newContent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
  };

  return (
    <SiteContentContext.Provider value={{ content, updateContent, DEFAULT_CONTENT }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
