import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import Image from "next/image";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getPageData(slug: string) {
  try {
    const page = await prisma.page.findUnique({
      where: { slug },
      include: {
        parentPage: true,
        childPages: {
          where: { published: true },
          orderBy: { navOrder: "asc" },
        },
      },
    });

    return page;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

export default async function DynamicPage(props: PageProps) {
  const params = await props.params;
  const page = await getPageData(params.slug);

  // If page doesn't exist or is not published, show 404
  if (!page || !page.published) {
    notFound();
  }

  return (
    <>
      <Header visible={true} />
      <div className="min-h-screen bg-slate-950 mt-[80px] md:mt-[100px]">
        {/* Hero Section with Title */}
        <section className="relative py-20 px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
          <div className="relative max-w-7xl mx-auto">
            {page.featuredImage && (
              <div className="mb-8 rounded-lg overflow-hidden">
                <Image
                  src={page.featuredImage}
                  alt={page.title}
                  className="w-full h-64 object-cover"
                  width={640}
                  height={256}
                />
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {page.title}
            </h1>
            {page.metaDescription && (
              <p className="text-xl text-slate-400 max-w-3xl">
                {page.metaDescription}
              </p>
            )}
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-6">
          <div
            className={`mx-auto ${
              page.layout === "full-width"
                ? "max-w-full"
                : page.layout === "sidebar"
                ? "max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8"
                : "max-w-4xl"
            }`}
          >
            {page.layout === "sidebar" ? (
              <>
                {/* Main Content Column */}
                <div className="lg:col-span-2">
                  <div
                    className="prose prose-invert prose-lg max-w-none
                      prose-headings:text-white prose-headings:font-bold
                      prose-p:text-slate-300 prose-p:leading-relaxed
                      prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-white
                      prose-ul:text-slate-300 prose-ol:text-slate-300
                      prose-li:text-slate-300
                      prose-blockquote:border-l-blue-500 prose-blockquote:text-slate-400
                      prose-code:text-blue-400 prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded
                      prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700
                      prose-img:rounded-lg"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                  />
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-1">
                  {page.childPages && page.childPages.length > 0 && (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 sticky top-24">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Related Pages
                      </h3>
                      <ul className="space-y-2">
                        {page.childPages.map((child) => (
                          <li key={child.id}>
                            <a
                              href={`/${child.slug}`}
                              className="text-blue-400 hover:text-blue-300 transition"
                            >
                              {child.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </aside>
              </>
            ) : (
              <div
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-white prose-headings:font-bold
                  prose-p:text-slate-300 prose-p:leading-relaxed
                  prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white
                  prose-ul:text-slate-300 prose-ol:text-slate-300
                  prose-li:text-slate-300
                  prose-blockquote:border-l-blue-500 prose-blockquote:text-slate-400
                  prose-code:text-blue-400 prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded
                  prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700
                  prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            )}
          </div>
        </section>

        {/* Child Pages Grid (for landing page layout) */}
        {page.layout === "landing" &&
          page.childPages &&
          page.childPages.length > 0 && (
            <section className="py-12 px-6 bg-slate-900/50">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-8">
                  Explore More
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {page.childPages.map((child) => (
                    <a
                      key={child.id}
                      href={`/${child.slug}`}
                      className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:bg-slate-800 hover:border-blue-500/50 transition group"
                    >
                      {child.featuredImage && (
                        <Image
                          src={child.featuredImage}
                          alt={child.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                          width={400}
                          height={192}
                        />
                      )}
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition">
                        {child.title}
                      </h3>
                      {child.metaDescription && (
                        <p className="text-slate-400 mt-2 line-clamp-3">
                          {child.metaDescription}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </section>
          )}

        {/* Custom CSS */}
        {page.customCss && (
          <style dangerouslySetInnerHTML={{ __html: page.customCss }} />
        )}

        {/* Custom JS */}
        {page.customJs && (
          <script dangerouslySetInnerHTML={{ __html: page.customJs }} />
        )}
      </div>
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata(props: PageProps) {
  const params = await props.params; // ✅ Await here too
  const page = await getPageData(params.slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.title,
    description: page.metaDescription || page.title,
    keywords: page.metaKeywords?.join(", "),
    openGraph: {
      title: page.title,
      description: page.metaDescription || page.title,
      images: page.featuredImage ? [page.featuredImage] : [],
    },
  };
}
