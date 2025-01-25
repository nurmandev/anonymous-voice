import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
      <p className="mb-8">Could not find the requested blog post.</p>
      <Button asChild>
        <Link href="/blog">Return to Blog</Link>
      </Button>
    </div>
  );
}
