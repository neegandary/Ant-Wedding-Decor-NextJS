'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * RenderBlock - Renders individual blocks for preview
 */
const RenderBlock = ({ block }) => {
  // Extract props from block.props for consistency with store structure
  const props = block.props || block;
  const wrapperClasses = cn('rounded-md', props.backgroundColor, props.padding);
  
  switch (block.type) {
    case 'Heading': {
      const Tag = `h${props.level || 2}`;
      const sizeClasses = {
        1: 'text-4xl lg:text-5xl font-bold tracking-tight',
        2: 'text-3xl lg:text-4xl font-semibold tracking-tight',
        3: 'text-2xl lg:text-3xl font-medium tracking-tight',
        4: 'text-xl lg:text-2xl font-medium tracking-tight',
      };
      
      // Parse text-align from content if present
      let textAlign = '';
      const content = props.content || '';
      
      // Extract text-align style from <p> tag
      const styleMatch = content.match(/style="([^"]*)"/);
      if (styleMatch) {
        const styles = styleMatch[1];
        const alignMatch = styles.match(/text-align:\s*(left|center|right|justify)/);
        if (alignMatch) {
          textAlign = alignMatch[1];
        }
      }
      
      // Extract inner HTML from <p> tags if present, preserving all inline formatting
      let cleanContent = content;
      const pTagMatch = cleanContent.match(/^<p[^>]*>(.*)<\/p>$/s);
      if (pTagMatch) {
        cleanContent = pTagMatch[1];
      }
      
      return (
        <div className={cn("prose prose-headings:text-inherit max-w-none", wrapperClasses)}>
          <Tag 
            className={sizeClasses[props.level || 2]}
            style={{ textAlign: textAlign || undefined }}
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          />
        </div>
      );
    }

    case 'Paragraph': {
      return (
        <div 
          className={cn(
            "prose prose-p:text-inherit prose-p:leading-normal prose-p:my-0 max-w-none",
            wrapperClasses
          )} 
          dangerouslySetInnerHTML={{ __html: props.content || '' }} 
        />
      );
    }

    case 'Image':
      return (
        <div className={cn("my-6", wrapperClasses)}>
          {props.src && (
            <img 
              src={props.src} 
              alt={props.alt || ''} 
              className="w-full h-auto rounded-lg shadow-md" 
            />
          )}
        </div>
      );

    case 'Button':
      return (
        <div className={cn("flex justify-center", wrapperClasses)}>
          <a
            href={props.href || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-teal-700 px-6 py-3 text-white font-medium hover:bg-teal-800 transition-colors"
          >
            {props.text || 'Button'}
          </a>
        </div>
      );

    case 'TextImage': {
      return (
        <div className={cn("flex flex-col md:flex-row items-center gap-8 my-6", wrapperClasses)}>
          <div className="md:w-1/2">
            <div 
              className="prose prose-p:text-inherit prose-p:leading-normal prose-p:my-0 max-w-none" 
              dangerouslySetInnerHTML={{ __html: props.content || '' }} 
            />
          </div>
          <div className="md:w-1/2">
            {props.src && (
              <img 
                src={props.src} 
                alt={props.alt || ''} 
                className="w-full h-auto rounded-lg shadow-md" 
              />
            )}
          </div>
        </div>
      );
    }

    case 'ImageText': {
      return (
        <div className={cn("flex flex-col md:flex-row items-center gap-8 my-6", wrapperClasses)}>
          <div className="md:w-1/2">
            {props.src && (
              <img 
                src={props.src} 
                alt={props.alt || ''} 
                className="w-full h-auto rounded-lg shadow-md" 
              />
            )}
          </div>
          <div className="md:w-1/2">
            <div 
              className="prose prose-p:text-inherit prose-p:leading-normal prose-p:my-0 max-w-none" 
              dangerouslySetInnerHTML={{ __html: props.content || '' }} 
            />
          </div>
        </div>
      );
    }

    case 'Section': {
      return (
        <section
          className={cn(
            'my-8 space-y-8 rounded-lg border border-border',
            props.layout === 'two-column' && 'grid md:grid-cols-2 gap-8 space-y-0',
            wrapperClasses
          )}
        >
          {block.children?.map((childBlock) => (
            <RenderBlock key={childBlock.id} block={childBlock} />
          ))}
        </section>
      );
    }

    case 'Hero': {
      return (
        <div className={cn(
          "relative w-full aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center text-center p-8 my-6", 
          wrapperClasses
        )}>
          {props.imageUrl && (
            <img 
              src={props.imageUrl} 
              alt="Hero background" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex flex-col items-center gap-4 text-white max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold">
              {props.title || 'Hero Title'}
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              {props.subtitle || 'Hero Subtitle'}
            </p>
            {props.buttonText && props.buttonHref && (
              <Button asChild size="lg" className="mt-4">
                <a href={props.buttonHref}>{props.buttonText}</a>
              </Button>
            )}
          </div>
        </div>
      );
    }

    default:
      return null;
  }
};

/**
 * BlogRenderer - Main preview component for blog content
 * @param {Object} props
 * @param {Array} props.blocks - Array of blog blocks to render
 */
export function BlogRenderer({ blocks = [] }) {
  console.log('BlogRenderer received blocks:', blocks);
  
  if (!blocks || blocks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-muted-foreground">
          <p>No content to preview. Add blocks to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        {blocks.map((block) => {
          console.log('Rendering block:', block);
          return <RenderBlock key={block.id} block={block} />;
        })}
      </div>
    </div>
  );
}
