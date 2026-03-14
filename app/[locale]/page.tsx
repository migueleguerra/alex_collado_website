import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import CallToAction from "@/components/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutMe />
      <Services />
      <Testimonials />
      <Gallery />
      <CallToAction />
    </>
  );
}
