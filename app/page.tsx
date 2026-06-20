import AnnouncementBar from "./components/home/AnnouncementBar";
import Navbar from "./components/home/Navbar";
import Hero from "./components/home/Hero";
import FeaturedCollection from "./components/home/FeaturedCollection";
import BestSellers from "./components/home/BestSellers";
import LearnByTool from "./components/home/LearnByTool";
import LearnByLevel from "./components/home/LearnByLevel";
import SocialProof from "./components/home/SocialProof";
import StudentReviews from "./components/home/StudentReviews";
import FeaturedCTAs from "./components/home/FeaturedCTAs";
import CourseFeatures from "./components/home/CourseFeatures";
import Footer from "./components/home/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <FeaturedCollection />
        <BestSellers />
        <LearnByTool />
        <LearnByLevel />
        <SocialProof />
        <StudentReviews />
        <FeaturedCTAs />
        <CourseFeatures />
      </main>
      <Footer />
    </div>
  );
}
