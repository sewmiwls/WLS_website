import React from "react";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <article
      className="
        prose
        prose-lg
        max-w-none
        
        /* Typography Styles */
        prose-headings:font-bold
        prose-headings:text-gray-900
        prose-p:text-gray-700
        prose-p:leading-8
        prose-a:text-blue-600
        prose-a:no-underline
        hover:prose-a:underline
        prose-li:text-gray-700
        prose-strong:text-gray-900

        /* 🟢 Step Cards Layout Styles */
        [&_.step-card]:my-8
        [&_.step-card]:p-6
        [&_.step-card]:sm:p-8
        [&_.step-card]:bg-white
        [&_.step-card]:border
        [&_.step-card]:border-gray-200
        [&_.step-card]:rounded-2xl
        [&_.step-card]:shadow-sm
        [&_.step-card]:transition-all
        [&_.step-card]:hover:shadow-md
        [&_.step-card]:hover:border-blue-300

        /* 🟢 Step Badge (Step 1, Step 2...) Styling */
        [&_.step-badge]:inline-block
        [&_.step-badge]:px-3.5
        [&_.step-badge]:py-1
        [&_.step-badge]:mb-4
        [&_.step-badge]:text-xs
        [&_.step-badge]:font-bold
        [&_.step-badge]:uppercase
        [&_.step-badge]:tracking-wider
        [&_.step-badge]:text-blue-700
        [&_.step-badge]:bg-blue-50
        [&_.step-badge]:border
        [&_.step-badge]:border-blue-200
        [&_.step-badge]:rounded-full

        /* 🟢 Card Inner Headings & Code */
        [&_.step-card_h3]:text-xl
        [&_.step-card_h3]:font-bold
        [&_.step-card_h3]:text-gray-900
        [&_.step-card_h3]:mt-0
        [&_.step-card_h3]:mb-3
        
        [&_.step-card_p]:text-gray-600
        [&_.step-card_p]:m-0
        [&_.step-card_p]:leading-relaxed

        [&_code]:bg-gray-100
        [&_code]:text-blue-600
        [&_code]:px-2
        [&_code]:py-0.5
        [&_code]:rounded-md
        [&_code]:text-sm
        [&_code]:font-semibold
      "
    >
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </article>
  );
}