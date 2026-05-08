import { notFound } from "next/navigation";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // TODO: load MDX content by slug
  void slug;
  notFound();
}
