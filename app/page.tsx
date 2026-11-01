import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Programs from "@/components/Programs";
import ProjectsWrapper from "@/components/ProjectsWrapper";
import Testimonials from "@/components/Testimonials";
import Impact from "@/components/Impact";
import CountdownTimerWrapper from "@/components/CountdownTimerWrapper";
import UpcomingEvents from "@/components/UpcomingEvents";
import GetInvolved from "@/components/GetInvolved";
import News from "@/components/News";
import ContactWrapper from "@/components/ContactWrapper";
import FooterCMS from "@/components/FooterCMS";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <CountdownTimerWrapper />
        <Hero />
        <Mission />
        <Programs />
        <ProjectsWrapper />
        <Testimonials />
        <Impact />
        <UpcomingEvents />
        <GetInvolved />
        <News />
        <ContactWrapper />
      </main>
      <FooterCMS />
    </>
  );
}
