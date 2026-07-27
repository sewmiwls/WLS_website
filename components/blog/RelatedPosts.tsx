import BlogCard from "./BlogCard";
import { Blog } from "@/data/blogs";

interface RelatedPostsProps {
  currentSlug: string;
  blogs: Blog[];
}

export default function RelatedPosts({
  currentSlug,
  blogs,
}: RelatedPostsProps) {
  const relatedBlogs = blogs
    .filter((blog) => blog.slug !== currentSlug)
    .slice(0, 3);

  if (relatedBlogs.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 border-t border-gray-200 pt-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Related Articles
        </h2>

        <p className="mt-3 text-gray-600">
          Continue learning with more Local SEO and Google Maps
          optimisation articles.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {relatedBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    </section>
  );
}