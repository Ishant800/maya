import React from "react";
import Navbar from "../components/Navbar";
import heroImage from "../assets/veg.jpg";
import softBg from "../assets/bg.png";
import { blogs as fallbackBlogs } from "../data/blogs";
import { recipes } from "../data/recipes";
import { listBlogPosts } from "../lib/blogApi";
import { mapPostToBlog } from "../lib/blogMapper";
import {
  credentials,
  faqs,
  footerColumns,
  heroStats,
  plannerDays,
  processSteps,
  programs,
  services,
  specialties,
  successStories,
  targetGroups,
  teamMembers,
  testimonials,
} from "./home/homepageData";
import AudienceSection from "./home/components/AudienceSection";
import BlogSection from "./home/components/BlogSection";
import ConsultationSection from "./home/components/ConsultationSection";
import CredentialsSection from "./home/components/CredentialsSection";
import FaqSection from "./home/components/FaqSection";
import HomeFooter from "./home/components/HomeFooter";
import HomeHero from "./home/components/HomeHero";
import ProcessSection from "./home/components/ProcessSection";
import ProgramsSection from "./home/components/ProgramsSection";
import RecipesSection from "./home/components/RecipesSection";
import ServicesSection from "./home/components/ServicesSection";
import SuccessStoriesSection from "./home/components/SuccessStoriesSection";
import TeamSection from "./home/components/TeamSection";
import TestimonialsSection from "./home/components/TestimonialsSection";
import WeeklyPlannerSection from "./home/components/WeeklyPlannerSection";

function Homepage() {
  const [blogItems, setBlogItems] = React.useState(fallbackBlogs);
  const [blogNote, setBlogNote] = React.useState("Curated posts");
  const [storyIndex, setStoryIndex] = React.useState(0);

  React.useEffect(() => {
    let active = true;

    const loadPosts = async () => {
      try {
        const posts = await listBlogPosts();
        if (!active) return;

        const mapped = (posts || [])
          .filter((post) => post.status === "published")
          .map(mapPostToBlog)
          .filter(Boolean);

        if (mapped.length > 0) {
          setBlogItems(mapped);
          setBlogNote("Latest from Maya");
          return;
        }

        setBlogItems(fallbackBlogs);
        setBlogNote("Curated posts");
      } catch (error) {
        if (!active) return;
        setBlogItems(fallbackBlogs);
        setBlogNote("Curated posts");
      }
    };

    loadPosts();
    return () => {
      active = false;
    };
  }, []);

  const currentStory = successStories[storyIndex];

  const goPrevStory = () => {
    setStoryIndex((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const goNextStory = () => {
    setStoryIndex((prev) => (prev + 1) % successStories.length);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-cream text-ink">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={softBg}
            alt="Soft background texture"
            className="h-full w-full object-cover opacity-60"
          />
        </div>

        <HomeHero heroStats={heroStats} heroImage={heroImage} />
        <ServicesSection services={services} />
        <CredentialsSection credentials={credentials} specialties={specialties} />
        <AudienceSection targetGroups={targetGroups} />
        <ProgramsSection programs={programs} heroImage={heroImage} />
        <WeeklyPlannerSection plannerDays={plannerDays} />
        <ProcessSection processSteps={processSteps} />
        <TestimonialsSection testimonials={testimonials} />
        <SuccessStoriesSection
          currentStory={currentStory}
          storyIndex={storyIndex}
          successStories={successStories}
          onPrev={goPrevStory}
          onNext={goNextStory}
          onSelect={setStoryIndex}
        />
        <BlogSection blogItems={blogItems} blogNote={blogNote} />
        <RecipesSection recipes={recipes} />
        <TeamSection teamMembers={teamMembers} />
        <ConsultationSection />
        <FaqSection faqs={faqs} />
        <HomeFooter footerColumns={footerColumns} />
      </div>
    </>
  );
}

export default Homepage;
