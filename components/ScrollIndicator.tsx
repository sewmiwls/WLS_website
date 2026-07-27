import React from "react";

const ScrollIndicator = () => {
  return (
    // Scroll Indicator
    <button
      type="button"
      aria-label="Scroll to content"
      className="absolute cursor-pointer z-30 bottom-0.5 m-5 left-1/2 transform -translate-x-1/2"
      onClick={() =>
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
      }
    >
      <div className="flex flex-col items-center space-y-2 text-slate-400">
        <span className="text-sm">Scroll</span>
        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </button>
  );
};

export default ScrollIndicator;
