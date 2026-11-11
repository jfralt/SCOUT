import React from "react";
import Hero from "./Hero";
import SavingsCalculator from "./SavingsCalculator";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import CTASection from "./CTASection";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <SavingsCalculator />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}

