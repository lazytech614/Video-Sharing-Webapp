import { FAQs } from "@/constants";

const FAQ = () => {
  return (
    <div className="mt-20">
      <h3 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h3>
      <div className="max-w-3xl mx-auto space-y-6">
        {FAQs.map((faq, index) => (
          <div key={index} className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h4 className="text-lg font-semibold text-white mb-3">{faq.question}</h4>
            <p className="text-gray-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;