import { CONTACT_INFO } from "@/constants/contact-page";
import { ContactInfoCard } from "./_components/contact-info-card";
import { ContactForm } from "@/components/global/forms/contact-form";
import { SupportOptions } from "./_components/support-options";
import { FAQ } from "./_components/FAQ";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">    
      <main className="px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {CONTACT_INFO.map((info, index) => (
            <ContactInfoCard key={index} {...info} />
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <ContactForm />
        </div>

        {/* Support Options */}
        <div className="max-w-6xl mx-auto">
          <SupportOptions />
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <FAQ />
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-12 border border-purple-500/30 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h3>
          <p className="text-gray-300 mb-8">Join thousands of creators who are already sharing their stories with Nuevue.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
              Start Creating
            </button>
            <button className="border border-purple-500 text-purple-400 px-8 py-3 rounded-full hover:bg-purple-500/10 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;