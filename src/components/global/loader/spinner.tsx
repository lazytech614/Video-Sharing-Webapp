export type SpinnerVariant = 'default' | 'dots' | 'pulse' | 'bars' | 'ring' | 'gradient';

interface SpinnerProps {
  variant?: SpinnerVariant;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ 
  variant = 'default', 
  size = 'md', 
  color = 'purple',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    purple: 'border-purple-600',
    blue: 'border-blue-600',
    green: 'border-green-600',
    red: 'border-red-600',
    white: 'border-white',
    gray: 'border-gray-600'
  };

  const baseClasses = `${sizeClasses[size]} ${className}`;

  switch (variant) {
    case 'default':
      return (
        <div 
          className={`${baseClasses} border-2 ${colorClasses[color as keyof typeof colorClasses]} border-t-transparent rounded-full animate-spin`}
          role="status"
          aria-label="Loading"
        />
      );

    case 'dots':
      return (
        <div className={`flex space-x-1 ${className}`} role="status" aria-label="Loading">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`${sizeClasses[size]} bg-${color}-600 rounded-full animate-pulse`}
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: '0.9s'
              }}
            />
          ))}
        </div>
      );

    case 'pulse':
      return (
        <div 
          className={`${baseClasses} bg-${color}-600 rounded-full animate-ping`}
          role="status"
          aria-label="Loading"
        />
      );

    case 'bars':
      return (
        <div className={`flex space-x-1 ${className}`} role="status" aria-label="Loading">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-1 bg-${color}-600 rounded-full animate-pulse`}
              style={{
                height: size === 'sm' ? '16px' : size === 'md' ? '24px' : size === 'lg' ? '32px' : '48px',
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1.2s'
              }}
            />
          ))}
        </div>
      );

    case 'ring':
      return (
        <div className={`relative ${baseClasses}`} role="status" aria-label="Loading">
          <div className={`absolute inset-0 border-2 border-${color}-200 rounded-full`} />
          <div className={`absolute inset-0 border-2 border-${color}-600 border-t-transparent rounded-full animate-spin`} />
        </div>
      );

    case 'gradient':
      return (
        <div 
          className={`${baseClasses} border-2 border-transparent bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-spin`}
          style={{
            backgroundClip: 'padding-box',
            border: '2px solid transparent',
            background: 'linear-gradient(45deg, #8b5cf6, #ec4899) border-box',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'subtract'
          }}
          role="status"
          aria-label="Loading"
        >
          <div className="w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-20" />
        </div>
      );

    default:
      return null;
  }
};

export default Spinner