import { Metadata } from "next";
import { blogs } from "@/data/blogs";
import BlogCard from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Local SEO Blog | Where Local Search",
  description:
    "Read the latest Local SEO, Google Maps Ranking, Google Business Profile and Digital Marketing articles from Where Local Search.",
};

export default function BlogPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Where Local Search Blog
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-blue-100">
            Learn proven Local SEO strategies, Google Maps Ranking techniques,
            Google Business Profile optimisation tips and digital marketing
            insights to help your business grow online.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </main>
  );
}