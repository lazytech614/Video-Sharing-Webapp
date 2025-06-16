import React from 'react';
import Hero from './_components/hero';
import Feature from './_components/feature';
import Stats from './_components/stats';
import Testimonials from './_components/testimonials';
import CTA from './_components/cta';
import Footer from './_components/footer';

const NuevueLandingPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <Hero />
      <Feature />
      <Stats />
      <Testimonials />
      <CTA />
    </main>
  );
};

export default NuevueLandingPage;