import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import ScfAssessmentCalculator from "./ScfAssessmentCalculator";
import DashboardPreview from "./DashboardPreview";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import CTASection from "./CTASection";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <ScfAssessmentCalculator />
      <DashboardPreview />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
