import React from "react";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  variant?: "default" | "minimal" | "dots";
  message?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  variant = "default",
  message,
  className = "",
}) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  const containerSizeClasses = {
    small: "gap-2",
    medium: "gap-3",
    large: "gap-4",
  };

  if (variant === "minimal") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <div
          className={`${sizeClasses[size]} border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin`}
        />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div
        className={`flex items-center justify-center ${containerSizeClasses[size]} ${className}`}
      >
        <div
          className={`${sizeClasses[size]} bg-blue-500 rounded-full animate-pulse`}
          style={{ animationDelay: "0ms" }}
        />
        <div
          className={`${sizeClasses[size]} bg-purple-500 rounded-full animate-pulse`}
          style={{ animationDelay: "150ms" }}
        />
        <div
          className={`${sizeClasses[size]} bg-cyan-500 rounded-full animate-pulse`}
          style={{ animationDelay: "300ms" }}
        />
        {message && (
          <span className="ml-3 text-slate-300 font-medium">{message}</span>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={`flex flex-col items-center justify-center ${containerSizeClasses[size]} ${className}`}
    >
      {/* Loader Container */}
      <div className="relative">
        {/* Outer Ring */}
        <div
          className={`${sizeClasses[size]} border-2 border-slate-700 rounded-full`}
        />

        {/* Spinning Ring */}
        <div
          className={`absolute inset-0 ${sizeClasses[size]} border-2 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin`}
        />

        {/* Inner Gradient */}
        <div className="absolute inset-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full" />
      </div>

      {/* Loading Message */}
      {message && (
        <span className="text-slate-300 font-medium text-sm mt-2">
          {message}
        </span>
      )}
    </div>
  );
};

export default Loader;

/**
 * // Basic loader
<Loader />

// Large loader with message
<Loader size="large" message="Loading testimonials..." />

// Minimal variant for buttons
<Loader variant="minimal" size="small" />

// Dots variant for fun
<Loader variant="dots" message="Please wait" />

// Custom styling
<Loader className="my-8" />
 */
