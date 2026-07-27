import React from "react";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({
  content,
}: BlogContentProps) {
  return (
    <article
      className="
        prose
        prose-lg
        max-w-none
        prose-headings:font-bold
        prose-headings:text-gray-900
        prose-p:text-gray-700
        prose-p:leading-8
        prose-a:text-blue-600
        prose-a:no-underline
        hover:prose-a:underline
        prose-li:text-gray-700
        prose-strong:text-gray-900
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