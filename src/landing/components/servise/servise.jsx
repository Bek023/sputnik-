const ServiceAndChoice = () => {
  return (
    <div className="bg-white py-20 px-6 font-sans">
      <section id="service" className="max-w-7xl mx-auto mb-32 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Our{" "}
          <span className="relative inline-block px-4 py-1 text-white bg-linear-to-r from-orange-500 to-orange-300 rounded-lg">
            Services
          </span>
        </h2>
        <p className="max-w-4xl mx-auto text-gray-600 mb-16 leading-relaxed">
          We've built our reputation on reliability, responsiveness, and results
          and we're proud to be the first call for countless homeowners,
          builders, and businesses in Service. Whether you're powering up a new
          space or upgrading outdated systems, you can count on Powering your
          home & business to bring the energy safely and professionally.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard
            title="Residential Wiring"
            desc="Complete electrical solutions for homes"
            icon={
              <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
            }
          />
          <ServiceCard
            title="Commercial Installations"
            desc="Professional business electrical services"
            icon={
              <path d="M3 21h18M3 7h18M3 11h18M3 15h18M3 19h18M5 3h14a2 2 0 0 1 2 2v16H3V5a2 2 0 0 1 2-2z" />
            }
          />
          <ServiceCard
            title="Emergency Repairs"
            desc="24/7 emergency electrical assistance"
            icon={<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />}
          />
          <ServiceCard
            title="Smart Home Solutions"
            desc="Modern smart electrical systems"
            icon={<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />}
          />
        </div>
      </section>

      <section id="about" className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-8 tracking-tight">
          Why <span className="ml-2">Choose Us</span>
        </h2>
        <p className="max-w-3xl mx-auto text-gray-500 mb-20 leading-relaxed">
          We deliver reliable, high-quality electrical services backed by
          experienced professionals, prompt support, and a strong focus on
          safety. Our commitment to customer satisfaction, transparent pricing,
          and attention to detail sets us apart as a trusted partner for all
          your electrical needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureItem
            title="24/7"
            subtitle="Emergency Service"
            desc="Round-the-clock electrical assistance"
            icon={<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
          />
          <FeatureItem
            title="100%"
            subtitle="Licensed Experts"
            desc="Fully certified professional electricians"
            icon={
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            }
          />
          <FeatureItem
            title="100%"
            subtitle="Satisfaction"
            desc="Guaranteed quality workmanship"
            icon={
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            }
          />
        </div>
      </section>
    </div>
  );
};

const ServiceCard = ({ title, desc, icon }) => (
  <div className="relative group bg-white border border-gray-100 rounded-[40px] p-8 pt-16 shadow-sm hover:shadow-xl transition-all duration-300">
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon}
      </svg>
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-500 text-sm mb-6 leading-relaxed">{desc}</p>
    <a
      href="#"
      className="text-blue-500 font-semibold text-sm flex items-center justify-center gap-1 hover:gap-2 transition-all"
    >
      Read more
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </a>
  </div>
);

const FeatureItem = ({ title, subtitle, desc, icon }) => (
  <div className="flex flex-col items-center">
    <div className="w-20 h-20 bg-blue-500 text-white rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        {icon}
      </svg>
    </div>
    <h3 className="text-3xl font-bold text-blue-500 mb-1">{title}</h3>
    <h4 className="text-xl font-bold mb-3">{subtitle}</h4>
    <p className="text-gray-500">{desc}</p>
  </div>
);

export default ServiceAndChoice;
