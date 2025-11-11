'use client';

import React from 'react';
import { useBlogEditorStore } from '@/lib/blog-editor/store';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TextFormattingToolbar } from './TextFormattingToolbar';
import {
  HeadingToolbar,
  SectionToolbar,
  ImageSettings,
  ButtonSettings,
  CompositeBlockSettings,
  HeroSettings,
  StyleSettings,
} from './BlockSettings';

/**
 * ContextualToolbar - Main toolbar component
 * Renders different settings panels based on the selected block type
 * Supports: Heading, Paragraph, Section, Image, Button, Hero, TextImage, ImageText
 */
export function ContextualToolbar() {
  const selectedBlockId = useBlogEditorStore((s) => s.selectedBlockId);
  const blocks = useBlogEditorStore((s) => s.blocks);

  /**
   * Recursively find a block by ID in the blocks tree
   * @param {string | null} id 
   * @param {import('@/lib/blog-editor/types').EditorBlock[]} blocklist 
   * @returns {import('@/lib/blog-editor/types').EditorBlock | undefined}
   */
  const findBlock = (id, blocklist) => {
    if (!id) return undefined;
    for (const block of blocklist) {
      if (block.id === id) return block;
      if (block.children) {
        const found = findBlock(id, block.children);
        if (found) return found;
      }
    }
    return undefined;
  };

  const selectedBlock = findBlock(selectedBlockId, blocks);

  if (!selectedBlock) return null;

  /**
   * Render toolbar content based on block type
   */
  const renderToolbarContent = () => {
    switch (selectedBlock.type) {
      case 'Heading': 
        return (
          <>
            <HeadingToolbar 
              blockId={selectedBlock.id} 
              level={selectedBlock.props.level} 
            />
            <Separator />
            <TextFormattingToolbar />
            <Separator />
            <StyleSettings 
              blockId={selectedBlock.id} 
              backgroundColor={selectedBlock.props.backgroundColor} 
              padding={selectedBlock.props.padding} 
            />
          </>
        );

      case 'Paragraph': 
        return (
          <>
            <TextFormattingToolbar />
            <Separator />
            <StyleSettings 
              blockId={selectedBlock.id} 
              backgroundColor={selectedBlock.props.backgroundColor} 
              padding={selectedBlock.props.padding} 
            />
          </>
        );

      case 'Section': 
        return (
          <SectionToolbar 
            blockId={selectedBlock.id} 
            layout={selectedBlock.props.layout} 
          />
        );

      case 'Image': 
        return (
          <>
            <ImageSettings 
              blockId={selectedBlock.id} 
              src={selectedBlock.props.src} 
              alt={selectedBlock.props.alt} 
            />
            <Separator />
            <StyleSettings 
              blockId={selectedBlock.id} 
              backgroundColor={selectedBlock.props.backgroundColor} 
              padding={selectedBlock.props.padding} 
            />
          </>
        );

      case 'Button': 
        return (
          <>
            <ButtonSettings 
              blockId={selectedBlock.id} 
              text={selectedBlock.props.text} 
              href={selectedBlock.props.href} 
            />
            <Separator />
            <StyleSettings 
              blockId={selectedBlock.id} 
              backgroundColor={selectedBlock.props.backgroundColor} 
              padding={selectedBlock.props.padding} 
            />
          </>
        );

      case 'Hero': 
        return (
          <HeroSettings 
            blockId={selectedBlock.id} 
            imageUrl={selectedBlock.props.imageUrl} 
            buttonText={selectedBlock.props.buttonText} 
            buttonHref={selectedBlock.props.buttonHref} 
          />
        );

      case 'TextImage':
      case 'ImageText':
        return (
          <div className="flex flex-col gap-4">
            <ImageSettings 
              blockId={selectedBlock.id} 
              src={selectedBlock.props.src} 
              alt={selectedBlock.props.alt} 
            />
            <Separator />
            <CompositeBlockSettings 
              blockId={selectedBlock.id} 
              type={selectedBlock.type} 
            />
            <Separator />
            <TextFormattingToolbar />
            <Separator />
            <StyleSettings 
              blockId={selectedBlock.id} 
              backgroundColor={selectedBlock.props.backgroundColor} 
              padding={selectedBlock.props.padding} 
            />
          </div>
        );

      default: 
        return null;
    }
  };

  const content = renderToolbarContent();

  if (!content) return null;

  return (
    <Card className="shadow-lg animate-fade-in">
      <CardContent className="p-4">
        {content}
      </CardContent>
    </Card>
  );
}
