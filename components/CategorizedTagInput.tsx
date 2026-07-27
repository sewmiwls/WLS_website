import React, { useState, useRef, useEffect } from "react";
import { X, Star, Tag } from "lucide-react";

interface CategorizedTagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  maxTags?: number;
  placeholder?: string;
  className?: string;
}

const CategorizedTagInput: React.FC<CategorizedTagInputProps> = ({
  value = [],
  onChange,
  suggestions = [],
  maxTags = 5,
  className = "",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Determine current state
  const mainCategory = value.length > 0 ? value[0] : null;
  const subCategories = value.slice(1);
  const maxSubCategories = 4;
  const isMainCategorySet = !!mainCategory;
  const isMaxSubCategoriesReached = subCategories.length >= maxSubCategories;

  // Filter suggestions based on input value
  useEffect(() => {
    if (inputValue.trim() && suggestions.length > 0) {
      const filtered = suggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
          !value.some((tag) => tag.toLowerCase() === suggestion.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
    setFocusedSuggestionIndex(-1);
  }, [inputValue, suggestions, value]);

  const addMainCategory = (category: string) => {
    const trimmedCategory = category.trim();
    if (trimmedCategory) {
      // Replace any existing categories with the new main category
      onChange([trimmedCategory]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const addSubCategory = (category: string) => {
    const trimmedCategory = category.trim();
    if (
      trimmedCategory &&
      !subCategories.some(
        (existingTag) => existingTag.toLowerCase() === trimmedCategory.toLowerCase()
      ) &&
      subCategories.length < maxSubCategories
    ) {
      onChange([mainCategory!, ...subCategories, trimmedCategory]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const removeMainCategory = () => {
    // Remove all categories when main category is removed
    onChange([]);
  };

  const removeSubCategory = (indexToRemove: number) => {
    const newSubCategories = subCategories.filter((_, index) => index !== indexToRemove);
    onChange([mainCategory!, ...newSubCategories]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        focusedSuggestionIndex >= 0 &&
        filteredSuggestions[focusedSuggestionIndex]
      ) {
        if (!isMainCategorySet) {
          addMainCategory(filteredSuggestions[focusedSuggestionIndex]);
        } else {
          addSubCategory(filteredSuggestions[focusedSuggestionIndex]);
        }
      } else if (inputValue.trim()) {
        if (!isMainCategorySet) {
          addMainCategory(inputValue);
        } else {
          addSubCategory(inputValue);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (showSuggestions && filteredSuggestions.length > 0) {
        setFocusedSuggestionIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (showSuggestions && filteredSuggestions.length > 0) {
        setFocusedSuggestionIndex((prev) =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setFocusedSuggestionIndex(-1);
    } else if (e.key === "Backspace" && !inputValue) {
      if (isMainCategorySet && subCategories.length > 0) {
        removeSubCategory(subCategories.length - 1);
      } else if (mainCategory) {
        removeMainCategory();
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!isMainCategorySet) {
      addMainCategory(suggestion);
    } else {
      addSubCategory(suggestion);
    }
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputFocus = () => {
    if (inputValue.trim() && filteredSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for suggestion clicks
    setTimeout(() => {
      setShowSuggestions(false);
      setFocusedSuggestionIndex(-1);
    }, 200);
  };

  const getCurrentPlaceholder = () => {
    if (!isMainCategorySet) {
      return "Enter your main business category...";
    } else if (isMaxSubCategoriesReached) {
      return "";
    } else {
      return `Add subcategory ${subCategories.length + 1}/4...`;
    }
  };

  const canAddMore = () => {
    if (!isMainCategorySet) return true;
    return !isMaxSubCategoriesReached;
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-wrap gap-2 p-3 border border-slate-600 rounded-lg bg-slate-800 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 min-h-[44px]">
        {/* Main Category */}
        {mainCategory && (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-emerald-600 text-white font-medium shadow-sm">
            <Star className="w-3 h-3 mr-1" />
            {mainCategory}
            <button
              type="button"
              onClick={removeMainCategory}
              className="ml-2 hover:bg-emerald-700 rounded-full p-0.5 transition-colors"
              aria-label={`Remove main category ${mainCategory}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        )}

        {/* Sub Categories */}
        {subCategories.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-blue-600 text-white"
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
            <button
              type="button"
              onClick={() => removeSubCategory(index)}
              className="ml-1 hover:bg-blue-700 rounded-full p-0.5 transition-colors"
              aria-label={`Remove subcategory ${tag}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        {/* Input Field */}
        {canAddMore() && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={
              value.length === 0 && !isMainCategorySet 
                ? getCurrentPlaceholder() 
                : getCurrentPlaceholder()
            }
            className="flex-1 min-w-[200px] bg-transparent text-white placeholder-slate-400 outline-none"
            aria-label={!isMainCategorySet ? "Add main category" : "Add subcategory"}
          />
        )}
      </div>

      {/* Progress and status info */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center space-x-4">
          <span className="text-xs text-slate-400">
            {value.length} / {maxTags} categories
          </span>
          {isMainCategorySet && (
            <span className="text-xs text-emerald-400 flex items-center">
              <Star className="w-3 h-3 mr-1" />
              Main set
            </span>
          )}
          {isMainCategorySet && (
            <span className="text-xs text-blue-400 flex items-center">
              <Tag className="w-3 h-3 mr-1" />
              {subCategories.length}/4 subs
            </span>
          )}
        </div>

        <div className="text-xs">
          {!isMainCategorySet && (
            <span className="text-amber-400">Set main category first</span>
          )}
          {isMainCategorySet && isMaxSubCategoriesReached && (
            <span className="text-yellow-400">Max subcategories reached</span>
          )}
        </div>
      </div>

      {/* Instructions */}
      {!isMainCategorySet && (
        <div className="mt-2 p-2 bg-slate-700/50 rounded text-xs text-slate-300 border-l-2 border-emerald-500">
          <div className="flex items-center mb-1">
            <Star className="w-3 h-3 mr-1 text-emerald-400" />
            <span className="font-medium">Step 1:</span> Choose your primary business category
          </div>
          <div className="ml-4 text-slate-400">
            This will be your main category and should best represent your core business.
          </div>
        </div>
      )}

      {isMainCategorySet && subCategories.length === 0 && (
        <div className="mt-2 p-2 bg-slate-700/50 rounded text-xs text-slate-300 border-l-2 border-blue-500">
          <div className="flex items-center mb-1">
            <Tag className="w-3 h-3 mr-1 text-blue-400" />
            <span className="font-medium">Step 2:</span> Add up to 4 subcategories
          </div>
          <div className="ml-4 text-slate-400">
            These help describe the specific services or products you offer.
          </div>
        </div>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg max-h-40 overflow-y-auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-slate-700 transition-colors ${
                index === focusedSuggestionIndex ? "bg-slate-700" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white">{suggestion}</span>
                {!isMainCategorySet ? (
                  <span className="text-xs text-emerald-400 flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    Main
                  </span>
                ) : (
                  <span className="text-xs text-blue-400 flex items-center">
                    <Tag className="w-3 h-3 mr-1" />
                    Sub
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorizedTagInput;