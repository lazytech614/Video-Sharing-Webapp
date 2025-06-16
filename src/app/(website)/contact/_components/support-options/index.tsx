import { Clock } from "lucide-react";
import {OPTIONS} from "@/constants/contact-page";

export const SupportOptions = () => {
  return (
    <div className="mt-16">
      <h3 className="text-3xl font-bold text-white text-center mb-12">Other Ways to Get Help</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {OPTIONS.map((option, index) => (
          <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-purple-400 transition-all duration-300 group text-center">
            <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <option.icon className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-3">{option.title}</h4>
            <p className="text-gray-400 mb-4">{option.description}</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-purple-400 mb-6">
              <Clock className="w-4 h-4" />
              <span>{option.availability}</span>
            </div>
            <button className={`w-full bg-gradient-to-r ${option.color} text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity`}>
              {option.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};