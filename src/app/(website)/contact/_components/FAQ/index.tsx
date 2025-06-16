import { FAQs } from "@/constants/contact-page";

export const FAQ = () => {
  return (
    <div className="mt-16">
      <h3 className="text-3xl font-bold text-white text-center mb-12">Common Questions</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {FAQs.map((faq, index) => (
          <div key={index} className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-purple-400 transition-colors">
            <h4 className="text-lg font-semibold text-white mb-3">{faq.question}</h4>
            <p className="text-gray-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};