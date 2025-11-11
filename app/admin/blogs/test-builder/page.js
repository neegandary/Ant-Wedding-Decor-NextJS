'use client';

import { useState } from 'react';
import { BlogPageBuilder } from '@/app/components/blog-editor/BlogPageBuilder';
import { blocksToHtml } from '@/lib/blog-editor/converters';

/**
 * Test Page Builder
 * 
 * PropertyPanel (góc phải) tự động hiển thị ContextualToolbar
 * với các controls dựa theo loại block được chọn.
 */
export default function TestPageBuilder() {
  const [blocks, setBlocks] = useState([]);

  const handleBlocksChange = (newBlocks) => {
    setBlocks(newBlocks);
    console.log('Blocks updated:', newBlocks);
    console.log('HTML output:', blocksToHtml(newBlocks));
  };

  return (
    <BlogPageBuilder 
      initialBlocks={blocks}
      onChange={handleBlocksChange}
    />
  );
}
