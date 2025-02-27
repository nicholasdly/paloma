import Link from "next/link";
import React, { memo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import ShikiHighlighter, { isInlineCode } from "react-shiki";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

const components: Partial<Components> = {
  h1: ({ children, ...props }) => (
    <h1
      className="mt-4 font-serif text-xl font-semibold text-primary"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mt-4 font-serif text-lg font-semibold text-primary"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-4 font-serif font-semibold text-primary" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="mt-4 font-serif font-semibold text-primary" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5 className="mt-4 font-serif font-semibold text-primary" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6 className="mt-4 font-serif font-semibold text-primary" {...props}>
      {children}
    </h6>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="ml-4 list-decimal marker:text-primary [&_ol]:mt-1 [&_ul]:mt-1"
      {...props}
    >
      {children}
    </ol>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="ml-4 list-disc marker:text-primary [&_ol]:mt-1 [&_ul]:mt-1"
      {...props}
    >
      {children}
    </ul>
  ),
  li: ({ children, ...props }) => (
    <li className="mt-1" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <span className="font-semibold" {...props}>
      {children}
    </span>
  ),
  a: ({ href, children, ...props }) => {
    if (!href) return <>{children}</>;

    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link href={href} className="text-blue-500 hover:underline" {...props}>
          {children}
        </Link>
      );
    }

    return (
      <Link
        href={href}
        className="text-blue-500 underline-offset-2 hover:underline"
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </Link>
    );
  },
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-2 pl-4 italic text-primary/75" {...props}>
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }) => (
    <table className="w-full table-auto border-x border-t text-sm" {...props}>
      {children}
    </table>
  ),
  tr: ({ children, ...props }) => (
    <tr className="divide-x" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border-b bg-accent p-3 text-left font-semibold text-accent-foreground"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border-b p-3" {...props}>
      {children}
    </td>
  ),
  code: ({ node, className, children, ...props }) => {
    const match = className?.match(/language-(\w+)/);
    const language = match ? match[1] : undefined;

    const isInline = node ? isInlineCode(node) : false;

    return !isInline ? (
      <ShikiHighlighter
        className="rounded border text-sm font-medium shadow-[6px_6px_0_hsla(219,_93%,_42%,_0.06)]"
        language={language}
        theme="github-light"
        delay={150}
        {...props}
      >
        {String(children)}
      </ShikiHighlighter>
    ) : (
      <code
        className="whitespace-pre rounded border bg-accent px-1 py-0.5 font-mono text-sm font-medium text-accent-foreground"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => <>{children}</>,
};

function PureMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, [remarkMath, { singleDollarTextMath: false }]]}
      rehypePlugins={[[rehypeKatex, { output: "html" }]]}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
}

export const Markdown = memo(
  PureMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);
