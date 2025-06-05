import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
  return (
    <div className={`prose prose-invert max-w-none ${className || ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground mt-6 sm:mt-8" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 mt-4 sm:mt-6 text-foreground" {...props} />,
          p: ({ node, ...props }) => <p className="mb-3 sm:mb-4 text-foreground/85 leading-relaxed" {...props} />,
          ul: ({ node, ...props }) => <ul className="mb-3 sm:mb-4 list-disc list-inside pl-3 sm:pl-4 text-foreground/85" {...props} />,
          ol: ({ node, ...props }) => <ol className="mb-3 sm:mb-4 list-decimal list-inside pl-3 sm:pl-4 text-foreground/85" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1 sm:mb-2 text-foreground/85" {...props} />,
          a: ({ node, ...props }) => (
            <a 
              className="text-primary hover:underline font-medium" 
              target={props.href?.startsWith('http') ? "_blank" : undefined}
              rel={props.href?.startsWith('http') ? "noopener noreferrer" : undefined}
              {...props} 
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-primary/50 pl-3 sm:pl-4 italic my-4 sm:my-6 text-foreground/80 bg-muted/20 py-2 rounded-r" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }) => (
            inline ? 
              <code className="bg-muted rounded px-1 py-0.5 text-sm font-mono text-primary" {...props}>{children}</code> :
              <pre className="bg-card border border-border rounded-lg p-3 sm:p-4 overflow-x-auto text-sm my-4 sm:my-6">
                <code className={`${className || ''} font-mono text-foreground`} {...props}>{children}</code>
              </pre>
          ),
          img: ({ node, ...props }) => (
            <img 
              className={`max-w-full sm:max-w-md lg:max-w-lg rounded-lg mx-auto my-4 sm:my-6 block ${props.className || ''}`.trim()} 
              loading="lazy"
              {...props} 
              alt={props.alt || 'Blog image'} 
            />
          ),
          hr: ({ node, ...props }) => <hr className="my-6 sm:my-8 border-white/10" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-semibold text-foreground" {...props} />,
          em: ({ node, ...props }) => <em className="italic text-foreground/90" {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
