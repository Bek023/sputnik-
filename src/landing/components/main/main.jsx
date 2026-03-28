import { useSiteContent } from "../../../context/SiteContentContext";

const HeroSection = () => {
  const { content } = useSiteContent();

  return (
    <div className="p-3 md:p-8">
      <section
        id="home"
        className="relative w-full rounded-[28px] md:rounded-[40px] overflow-hidden bg-linear-to-tr from-[#ff7e4d] via-[#a389b9] to-[#6a94ff] p-6 sm:p-10 md:p-20 text-white font-sans shadow-2xl"
      >
        <div className="max-w-5xl space-y-6 md:space-y-10">
          <div className="max-w-2xl space-y-4 md:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight">
              {content.heroTitle}
            </h1>

            <p className="text-base md:text-xl opacity-90 leading-relaxed font-normal max-w-xl">
              {content.heroSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 md:gap-4 items-center">
            <a
              href={`tel:${content.heroPhone}`}
              className="flex items-center gap-2 md:gap-3 border-2 border-white/60 px-5 md:px-8 py-2.5 md:py-3.5 rounded-2xl font-semibold hover:bg-white/10 transition-all text-sm md:text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {content.heroPhone}
            </a>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
            <Badge
              text={content.heroBadge1}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              }
            />
            <Badge
              text={content.heroBadge2}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              }
            />
            <Badge
              text={content.heroBadge3}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const Badge = ({ icon, text }) => (
  <div className="flex items-center gap-3 md:gap-4 bg-white/20 backdrop-blur-md w-fit px-4 md:px-8 py-3 md:py-4 rounded-3xl border border-white/10 shadow-sm transition-transform hover:scale-105 cursor-default">
    <span className="text-white drop-shadow-sm">{icon}</span>
    <span className="text-sm md:text-base font-medium tracking-wide">{text}</span>
  </div>
);

export default HeroSection;
