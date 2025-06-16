import { Check, X } from "lucide-react";

const FeaturesComparison = () => (
  <div className="mt-20">
    <h3 className="text-3xl font-bold text-white text-center mb-12">Feature Comparison</h3>
    <div className="overflow-x-auto">
      <table className="w-full max-w-4xl mx-auto bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="text-left p-6 text-white font-semibold">Features</th>
            <th className="text-center p-6 text-white font-semibold">FREE</th>
            <th className="text-center p-6 text-white font-semibold">PRO</th>
            <th className="text-center p-6 text-white font-semibold">PREMIUM</th>
          </tr>
        </thead>
        <tbody>
          {[
            { feature: 'Video Upload', free: true, pro: true, premium: true },
            { feature: 'HD Quality', free: false, pro: true, premium: true },
            { feature: '4K Quality', free: false, pro: false, premium: true },
            { feature: 'Storage', free: '1GB', pro: '100GB', premium: 'Unlimited' },
            { feature: 'Analytics', free: false, pro: true, premium: true },
            { feature: 'Custom Branding', free: false, pro: false, premium: true },
            { feature: 'API Access', free: false, pro: false, premium: true },
            { feature: 'Priority Support', free: false, pro: true, premium: true },
          ].map((row, index) => (
            <tr key={index} className="border-b border-slate-700/50">
              <td className="p-6 text-gray-300">{row.feature}</td>
              <td className="p-6 text-center">
                {typeof row.free === 'boolean' ? (
                  row.free ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                ) : (
                  <span className="text-gray-300">{row.free}</span>
                )}
              </td>
              <td className="p-6 text-center">
                {typeof row.pro === 'boolean' ? (
                  row.pro ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                ) : (
                  <span className="text-gray-300">{row.pro}</span>
                )}
              </td>
              <td className="p-6 text-center">
                {typeof row.premium === 'boolean' ? (
                  row.premium ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                ) : (
                  <span className="text-gray-300">{row.premium}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default FeaturesComparison
