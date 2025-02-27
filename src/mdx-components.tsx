import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
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
          <Link
            href={href}
            className="text-blue-500 hover:underline"
            {...props}
          >
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
    ...components,
  };
}
