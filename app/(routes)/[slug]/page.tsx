import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DynamicPage(props: PageProps) {
  const params = await props.params;

  // All dynamic CMS pages are disabled
  notFound();
}

export async function generateMetadata(props: PageProps) {
  return {
    title: "Page Not Found",
    description: "This page is unavailable.",
  };
}