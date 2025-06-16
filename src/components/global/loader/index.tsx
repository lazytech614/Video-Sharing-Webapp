interface LoaderProps {
  state: boolean;
  className?: string;
  color?: string;
  children?: React.ReactNode;
  variant?: SpinnerVariant;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  overlay?: boolean;
  text?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  state,
  children,
  className = '',
  color = 'purple',
  variant = 'default',
  size = 'md',
  overlay = false,
  text,
  fullScreen = false
}) => {
  if (!state) {
    return <>{children}</>;
  }

  const LoadingContent = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Spinner variant={variant} size={size} color={color} />
      {text && (
        <p className="text-gray-400 text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
          <LoadingContent />
        </div>
      </div>
    );
  }

  if (overlay) {
    return (
      <div className={`relative ${className}`}>
        {children}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <LoadingContent />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <LoadingContent />
    </div>
  );
};

// Skeleton Loader Component for content placeholders
interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
  lines?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4', 
  rounded = false,
  lines = 1 
}) => {
  if (lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div 
            key={index}
            className={`bg-slate-700 animate-pulse ${width} ${height} ${rounded ? 'rounded-full' : 'rounded'}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div 
      className={`bg-slate-700 animate-pulse ${width} ${height} ${rounded ? 'rounded-full' : 'rounded'} ${className}`}
    />
  );
};

// Button Loader Component
interface ButtonLoaderProps {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
}

const ButtonLoader: React.FC<ButtonLoaderProps> = ({
  loading,
  children,
  className = '',
  disabled = false,
  onClick,
  variant = 'primary'
}) => {
  const baseClasses = "px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700",
    secondary: "bg-slate-700 text-white hover:bg-slate-600",
    outline: "border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {loading ? (
        <>
          <Spinner variant="default" size="sm" color="white" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

// Card Loader Component
const CardLoader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 ${className}`}>
    <div className="animate-pulse">
      <Skeleton width="w-3/4" height="h-6" className="mb-4" />
      <Skeleton lines={3} height="h-4" className="mb-4" />
      <div className="flex space-x-4">
        <Skeleton width="w-24" height="h-10" rounded />
        <Skeleton width="w-24" height="h-10" rounded />
      </div>
    </div>
  </div>
);

export default Loader;
export { Skeleton, ButtonLoader, CardLoader };
