import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Style other markdown elements
          h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-bold mb-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-bold mb-2">{children}</h3>,
          p: ({ children }) => <p className="mb-4">{children}</p>,
          ul: ({ children }) => <ul className="list-disc ml-6 mb-4">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal ml-6 mb-4">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a href={href} className="text-blue-500 hover:text-blue-700 underline">
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img src={src} alt={alt} className="max-w-full h-auto rounded-lg my-4" />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 my-4">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-6 py-3 bg-slate-400 dark:bg-background text-left text-xs font-medium text-foreground uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;