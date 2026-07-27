import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogs, getBlogBySlug } from "@/data/blogs";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Where Local Search",
    };
  }

  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    keywords: blog.keywords,
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      images: [
        {
          url: blog.featuredImage,
        },
      ],
    },
  };
}

export default function BlogDetails({
  params,
}: BlogPageProps) {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = blogs
    .filter((item) => item.id !== blog.id)
    .slice(0, 3);

  return (
    <main className="bg-slate-100/70 min-h-screen">

      {/* Hero */}

      <section className="relative h-[500px] overflow-hidden">

        <Image
          src={blog.featuredImage}
          alt={blog.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-end">

          <div className="mx-auto w-full max-w-5xl px-6 pb-14 text-white">

            <span className="inline-block rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
              {blog.category}
            </span>

            <h1 className="mt-6 text-4xl font-bold md:text-6xl">
              {blog.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-5 text-gray-200">

              <span>{blog.author}</span>

              <span>•</span>

              <span>{blog.publishedAt}</span>

              <span>•</span>

              <span>{blog.readingTime}</span>

            </div>

          </div>

        </div>

      </section>

      {/* Article */}

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">

      
<article
  
    className="
      bg-white                  {/* 👈 සුදු පාට පසුබිම */}
      shadow-md                 {/* 👈 වටේට ලස්සන shadow එකක් */}
      rounded-2xl               {/* 👈 කොන් රවුම් කිරීම */}
      p-6 sm:p-10 md:p-16       {/* 👈 ඇතුළතින් පරතරය (Padding) */}
      border border-gray-100    {/* 👈 සියුම් border එකක් */}
      
      max-w-none 
      text-gray-800 
      leading-relaxed
    
    [&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:text-gray-900 [&_h1]:mb-6 [&_h1]:mt-2
    [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:border-b [&_h2]:pb-2
    
  
    [&_p]:text-base [&_p]:text-gray-700 [&_p]:mb-5 [&_p]:leading-8
    
  
    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
    [&_li]:text-gray-700
    
  
    [&_section]:mb-10
  "
  dangerouslySetInnerHTML={{
    __html: blog.content,
  }}
/>

      </section>

      {/* CTA */}

      <section className="mx-auto max-w-5xl px-6 pb-20">

        <div className="rounded-2xl bg-blue-600 px-8 py-14 text-center text-white">

          <h1 className="text-3xl font-bold">
            Ready to Grow Your Local Business?
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-blue-100">
            Our Local SEO specialists help Australian businesses improve
            Google Maps rankings, generate more enquiries and grow online.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-700 transition hover:bg-gray-100"
          >
            Contact Us
          </Link>

        </div>

      </section>

      {/* Related Articles 

      <section className="mx-auto max-w-6xl px-6 pb-24">

        <h2 className="mb-10 text-3xl font-bold">
          Related Articles
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {relatedBlogs.map((item) => (

            <Link
              key={item.id}
              href={`/blogs/${item.slug}`}
              className="overflow-hidden rounded-xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="relative h-56">

                <Image
                  src={item.featuredImage}
                  alt={item.title}
                  fill
                  className="object-cover"
                />

              </div>

              <div className="p-6">

                <span className="text-sm font-semibold text-blue-600">
                  {item.category}
                </span>

                <h3 className="mt-3 text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-600">
                  {item.excerpt}
                </p>

                <div className="mt-6 font-semibold text-blue-600">
                  Read More →
                </div>

              </div>

            </Link>

          ))}

        </div>

      </section> */}

    </main>
  );
}