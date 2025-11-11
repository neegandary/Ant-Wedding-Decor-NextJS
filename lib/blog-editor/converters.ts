import type { EditorBlock } from './types';

/**
 * Convert JSON blocks to HTML for rendering on the frontend
 */
export function blocksToHtml(blocks: EditorBlock[]): string {
  if (!blocks || blocks.length === 0) return '';

  return blocks.map(block => blockToHtml(block)).join('\n');
}

function blockToHtml(block: EditorBlock): string {
  const { type, props, children } = block;

  switch (type) {
    case 'Heading': {
      const level = props.level || 2;
      const content = props.content || '';
      return `<h${level} class="blog-heading-${level}">${content}</h${level}>`;
    }

    case 'Paragraph': {
      return props.content || '<p></p>';
    }

    case 'Image': {
      return `<figure class="blog-image">
        <img src="${props.src || ''}" alt="${props.alt || ''}" />
        ${props.alt ? `<figcaption>${props.alt}</figcaption>` : ''}
      </figure>`;
    }

    case 'Quote': {
      return `<blockquote class="blog-quote">
        <p>${props.content || ''}</p>
        ${props.author ? `<cite>— ${props.author}</cite>` : ''}
      </blockquote>`;
    }

    case 'List': {
      const items = props.items || [];
      const listTag = props.listType === 'numbered' ? 'ol' : 'ul';
      const itemsHtml = items.map(item => `<li>${item}</li>`).join('\n');
      return `<${listTag} class="blog-list">\n${itemsHtml}\n</${listTag}>`;
    }

    case 'Button': {
      return `<div class="blog-button-wrapper" style="text-align: ${props.textAlign || 'left'}">
        <a href="${props.href || '#'}" class="blog-button">${props.text || 'Button'}</a>
      </div>`;
    }

    case 'Hero': {
      return `<div class="blog-hero" style="background-image: url('${props.imageUrl || ''}')">
        <div class="blog-hero-content">
          <h1>${props.title || ''}</h1>
          <p>${props.subtitle || ''}</p>
          ${props.buttonText ? `<a href="${props.buttonHref || '#'}" class="blog-hero-button">${props.buttonText}</a>` : ''}
        </div>
      </div>`;
    }

    case 'TextImage': {
      return `<div class="blog-text-image">
        <div class="blog-text-image-content">${props.content || ''}</div>
        <div class="blog-text-image-img">
          <img src="${props.src || ''}" alt="${props.alt || ''}" />
        </div>
      </div>`;
    }

    case 'ImageText': {
      return `<div class="blog-image-text">
        <div class="blog-image-text-img">
          <img src="${props.src || ''}" alt="${props.alt || ''}" />
        </div>
        <div class="blog-image-text-content">${props.content || ''}</div>
      </div>`;
    }

    case 'Section': {
      const childrenHtml = children ? blocksToHtml(children) : '';
      return `<section class="blog-section blog-section-${props.layout || 'single'}" style="background-color: ${props.backgroundColor || 'transparent'}; padding: ${props.padding || '0'}">
        ${childrenHtml}
      </section>`;
    }

    default:
      return '';
  }
}

/**
 * Convert HTML to JSON blocks (basic implementation)
 * This is a simplified version - you may need to enhance it
 */
export function htmlToBlocks(html: string): EditorBlock[] {
  // For now, return a single paragraph block with the HTML
  // In production, you'd want to parse the HTML properly
  return [
    {
      id: crypto.randomUUID(),
      type: 'Paragraph',
      props: {
        content: html,
      },
    },
  ];
}

/**
 * Estimate reading time based on blocks
 */
export function estimateReadTime(blocks: EditorBlock[]): number {
  const html = blocksToHtml(blocks);
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  const wordsPerMinute = 200;
  return Math.ceil(words / wordsPerMinute) || 1;
}
