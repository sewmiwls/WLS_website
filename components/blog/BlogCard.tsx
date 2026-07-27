import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/data/blogs";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/blog/${blog.slug}`}>
        <div className="relative h-60 w-full">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-6">
        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {blog.category}
        </span>

        <Link href={`/blog/${blog.slug}`}>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 transition hover:text-blue-600">
            {blog.title}
          </h2>
        </Link>

        <p className="mt-3 text-gray-600 leading-7">
          {blog.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm text-gray-500">
          <div>
            <p className="font-medium">{blog.author}</p>
            <p>{blog.publishedAt}</p>
          </div>

          <span>{blog.readingTime}</span>
        </div>

        <Link
          href={`/blog/${blog.slug}`}
          className="mt-6 inline-flex items-center font-semibold text-blue-600 hover:text-blue-800"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}