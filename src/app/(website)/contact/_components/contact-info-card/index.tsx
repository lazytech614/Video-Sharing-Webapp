type Props = {
    icon: any;
    title: string;
    info: string;
    description: string;
}

export const ContactInfoCard = ({ icon: Icon, title, info, description }: Props) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-purple-400 transition-all duration-300 group">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <p className="text-purple-400 font-medium mb-2">{info}</p>
    <p className="text-gray-400">{description}</p>
  </div>
);