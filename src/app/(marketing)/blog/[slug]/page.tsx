import Image from "next/image";
import { getPostBySlug } from "@/lib/blog";
import { BlogPost } from "@/types/blog.types";
import { format } from "date-fns";
import { MDXContent } from "@/components/pages/blog/mdx-content";
import { serialize } from "next-mdx-remote/serialize";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post: BlogPost = await getPostBySlug(params.slug);
  const serializedContent = await serialize(post.content);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4 text-sm">
            <span className="font-medium">{post.author}</span>
            <span>•</span>
            <time>{format(new Date(post.date), "MMMM dd, yyyy")}</time>
            {post.readTime && (
              <>
                <span>•</span>
                <span>{post.readTime}</span>
              </>
            )}
          </div>
          {post.tags && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-muted rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            width={1920}
            height={1080}
            className="object-cover w-full"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <MDXContent source={serializedContent} />
        </div>
      </article>
    </div>
  );
}
