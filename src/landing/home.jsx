import ContactServiceSection from "./components/contact/contact";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import HeroSection from "./components/main/main";
import ProjectGrid from "./components/project/project";
import Testimonials from "./components/rate/rate";
import ServiceAndChoice from "./components/servise/servise";
import Offers from "./components/offers/offers";

export default function Home() {
  return (
    <section className="max-w-350 mx-auto">
      <Header />
      <HeroSection />
      <ServiceAndChoice />
      <ProjectGrid />
      <Testimonials />
      <Offers />
      <ContactServiceSection />
      <Footer />
    </section>
  );
}
