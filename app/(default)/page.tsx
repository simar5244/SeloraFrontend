export const metadata = {
  title: "Selora - Intelligence For Teams",
  description: "Run what-if simulations, predict attrition, balance workloads, and retain top talent with Selora's Intelligence For Teams.",
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import OrganizationFeatures from "@/components/organization-features";
import ModernFeatures from "@/components/modern-features";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";
import BrandCarousel from "@/components/BrandCarousel";

export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero />
      <OrganizationFeatures />
      <Features />
      <Workflows />
      {/* <BrandCarousel /> */}
      <Cta />
    </>
  );
}
