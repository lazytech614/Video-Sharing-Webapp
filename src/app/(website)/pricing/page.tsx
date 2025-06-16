import FAQ from "./_components/FAQ";
import FeaturesComparison from "./_components/feature-comparison";
import PricingCard from "./_components/pricing-card";
import { PRICING_PLANS } from "@/constants/pricing-page";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">      
      <main className="px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Plan</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start free and scale as you grow. All plans include our core features with increasing limits and capabilities.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {PRICING_PLANS.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        {/* Features Comparison */}
        <FeaturesComparison />

        {/* FAQ Section */}
        <FAQ />

        {/* CTA Section */}
        <div className="text-center mt-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-12 border border-purple-500/30">
          <h3 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h3>
          <p className="text-gray-300 mb-8">Our team is here to help you choose the perfect plan for your needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
              Contact Sales
            </button>
            <button className="border border-purple-500 text-purple-400 px-8 py-3 rounded-full hover:bg-purple-500/10 transition-all duration-300">
              View Demo
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;