import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Programs from "@/components/Programs";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Impact from "@/components/Impact";
import CountdownTimer from "@/components/CountdownTimer";
import UpcomingEvents from "@/components/UpcomingEvents";
import GetInvolved from "@/components/GetInvolved";
import News from "@/components/News";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <CountdownTimer />
        <Hero />
        <Mission />
        <Programs />
        <Projects />
        <Testimonials />
        <Impact />
        <UpcomingEvents />
        <GetInvolved />
        <News />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
