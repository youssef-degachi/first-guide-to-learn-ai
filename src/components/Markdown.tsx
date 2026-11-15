import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { assetUrl } from '../lib/course';
import type { ContentItem } from '../types';

type HtmlNode = { tagName?: string; properties?: Record<string, unknown>; children?: HtmlNode[] };
export function Markdown({ item }: { item: ContentItem }) {
  const headingPlugin = useMemo(() => () => (tree: HtmlNode) => {
    let index = 0;
    function walk(node: HtmlNode) {
      if (node.tagName === 'h2' || node.tagName === 'h3') {
        const heading = item.headings[index++];
        if (heading) node.properties = { ...node.properties, id: `section-${heading.id}` };
      }
      node.children?.forEach(walk);
    }
    walk(tree);
  }, [item]);

  return <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[headingPlugin]} skipHtml components={{
    img: ({ src, alt, title }) => {
      const value = typeof src === 'string' ? src : '';
      const resolved = /^(media|downloads)\//.test(value) ? assetUrl(value) : value;
      return <img src={resolved} alt={alt || ''} title={title} loading="lazy" decoding="async"/>;
    },
    a: ({ href = '', children }) => {
      if (href.startsWith('#/')) return <a href={href}>{children}</a>;
      if (href.startsWith('#')) return <a href={href} onClick={e => { e.preventDefault(); document.getElementById(`section-${href.slice(1)}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>{children}</a>;
      if (/^https?:\/\//.test(href)) return <a href={href} target="_blank" rel="noreferrer noopener">{children}</a>;
      if (href.startsWith('downloads/')) return <a href={assetUrl(href)} download>{children}</a>;
      // Imported reference material retains ordinary relative file links.
      if (!/^[a-z]+:/i.test(href)) return <a href={assetUrl(`downloads/learning-kit/${href.replace(/^\.\//, '')}`)} download>{children}</a>;
      return <span>{children}</span>;
    },
    table: ({ children }) => <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable data table"><table>{children}</table></div>,
    pre: ({ children }) => <pre tabIndex={0}>{children}</pre>,
  }}>{item.body}</ReactMarkdown>;
}
