"use client";

import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ComponentProps } from "react";

type MDXComponentProps = {
  h1: ComponentProps<"h1">;
  h2: ComponentProps<"h2">;
  h3: ComponentProps<"h3">;
  p: ComponentProps<"p">;
  ul: ComponentProps<"ul">;
  ol: ComponentProps<"ol">;
  blockquote: ComponentProps<"blockquote">;
};

const components: {
  [K in keyof MDXComponentProps]: React.FC<MDXComponentProps[K]>;
} = {
  h1: (props) => (
    <h1 className="text-2xl md:text-3xl font-bold my-4" {...props} />
  ),
  h2: (props) => <h2 className="text-xl font-bold my-4" {...props} />,
  h3: (props) => <h3 className="text-lg font-bold my-3" {...props} />,
  p: (props) => (
    <p
      className="my-4 leading-relaxed text-sm text-muted-foreground"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="list-disc text-muted-foreground text-sm pl-6 my-4"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal text-muted-foreground text-sm pl-6 my-4"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-primary pl-4 italic my-4"
      {...props}
    />
  ),
};

export function MDXContent({ source }: { source: MDXRemoteSerializeResult }) {
  return <MDXRemote {...source} components={components} />;
}
