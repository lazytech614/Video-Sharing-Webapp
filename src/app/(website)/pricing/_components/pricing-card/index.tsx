import { Check, X } from "lucide-react";

type Props = {
    plan: string;
    price: string;
    period: string | null;
    description: string;
    features: {
        text: string;
        included: boolean;
    }[];
    isPopular: boolean;
    buttonText: string;
    buttonStyle: string | null;
}

const PricingCard = ({ plan, price, period, description, features, isPopular, buttonText, buttonStyle }: Props) => (
  <div className={`relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border ${isPopular ? 'border-purple-500 scale-105' : 'border-slate-700'} hover:border-purple-400 transition-all duration-300`}>
    {isPopular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </span>
      </div>
    )}
    
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-white mb-2">{plan}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold text-white">{price}</span>
        {period && <span className="text-gray-400 ml-2">/{period}</span>}
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
    
    <ul className="space-y-4 mb-8">
      {features.map((feature: any, index:any) => (
        <li key={index} className="flex items-center space-x-3">
          {feature.included ? (
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
          ) : (
            <X className="w-5 h-5 text-red-500 flex-shrink-0" />
          )}
          <span className={`${feature.included ? 'text-gray-300' : 'text-gray-500 line-through'}`}>
            {feature.text}
          </span>
        </li>
      ))}
    </ul>
    
    <button className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ${buttonStyle}`}>
      {buttonText}
    </button>
  </div>
);

export default PricingCard