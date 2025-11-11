'use client';

import React from 'react';
import { BlockWrapper } from './BlockWrapper';
import { HeadingBlock } from './HeadingBlock';
import { ParagraphBlock } from './ParagraphBlock';
import { ImageBlock } from './ImageBlock';
import { ButtonBlock } from './ButtonBlock';
import { HeroBlock } from './HeroBlock';
import { TextImageBlock } from './TextImageBlock';
import { ImageTextBlock } from './ImageTextBlock';

const blockComponentMap = {
  Heading: HeadingBlock,
  Paragraph: ParagraphBlock,
  Image: ImageBlock,
  Button: ButtonBlock,
  Hero: HeroBlock,
  TextImage: TextImageBlock,
  ImageText: ImageTextBlock,
  // Add more as needed
  Quote: ParagraphBlock, // Temporary
  List: ParagraphBlock, // Temporary
  Section: ParagraphBlock, // Temporary
};

const DropIndicator = () => (
  <div className="relative my-2 h-1 w-full rounded-full bg-teal-600 opacity-60">
    <div className="absolute -left-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-teal-600" />
    <div className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-teal-600" />
  </div>
);

export function BlockRenderer({ blocks, dropTargetId, dropPosition }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block) => {
        const Component = blockComponentMap[block.type];
        if (!Component) return null;

        const showIndicatorBefore = dropTargetId === block.id && dropPosition === 'before';
        const showIndicatorAfter = dropTargetId === block.id && dropPosition === 'after';

        return (
          <React.Fragment key={block.id}>
            {showIndicatorBefore && <DropIndicator />}
            <BlockWrapper id={block.id} props={block.props}>
              <Component id={block.id} {...block.props} children={block.children} />
            </BlockWrapper>
            {showIndicatorAfter && <DropIndicator />}
          </React.Fragment>
        );
      })}
    </>
  );
}
