import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "@/types/blog.types";
import { notFound } from "next/navigation";

const postsDirectory = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPost[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
          slug,
          content,
          title: data.title,
          excerpt: data.excerpt,
          image: data.image,
          date: data.date,
          author: data.author,
          category: data.category,
          readTime: data.readTime,
          tags: data.tags,
        } as BlogPost;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    if (!data.title || !data.excerpt || !data.image) {
      throw new Error("Invalid post data");
    }

    return {
      slug,
      content,
      title: data.title,
      excerpt: data.excerpt,
      image: data.image,
      date: data.date,
      author: data.author,
      category: data.category,
      readTime: data.readTime,
      tags: data.tags,
    } as BlogPost;
  } catch (error) {
    console.error("Error reading blog post:", error);
    notFound();
  }
}
