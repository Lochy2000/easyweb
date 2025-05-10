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
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-6 text-primary" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mb-4 text-primary mt-8" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mb-3 mt-6" {...props} />,
          p: ({ node, ...props }) => <p className="mb-4 text-foreground/80 leading-relaxed" {...props} />,
          ul: ({ node, ...props }) => <ul className="mb-4 list-disc list-inside pl-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="mb-4 list-decimal list-inside pl-4" {...props} />,
          li: ({ node, ...props }) => <li className="mb-2" {...props} />,
          a: ({ node, ...props }) => (
            <a 
              className="text-primary hover:underline" 
              target={props.href?.startsWith('http') ? "_blank" : undefined}
              rel={props.href?.startsWith('http') ? "noopener noreferrer" : undefined}
              {...props} 
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-primary/50 pl-4 italic my-6" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }) => (
            inline ? 
              <code className="bg-white/10 rounded px-1 py-0.5 text-sm font-mono" {...props}>{children}</code> :
              <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto text-sm my-6">
                <code className={`${className || ''} font-mono`} {...props}>{children}</code>
              </pre>
          ),
          img: ({ node, ...props }) => (
            <img 
              className="rounded-lg mx-auto my-6" 
              loading="lazy"
              {...props} 
              alt={props.alt || 'Blog image'} 
            />
          ),
          hr: ({ node, ...props }) => <hr className="my-8 border-white/10" {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
