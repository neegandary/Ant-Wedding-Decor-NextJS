'use client';

import React from 'react';
import { useBlogEditorStore } from '@/lib/blog-editor/store';
import { cn } from '@/lib/blog-editor/utils';

export function ButtonBlock({ id, text = 'Button', href = '/contact', backgroundColor = '', padding = '' }) {
  const updateBlock = useBlogEditorStore((s) => s.updateBlock);

  return (
    <div className={cn(
      'space-y-3 rounded-md transition-colors',
      backgroundColor,
      padding
    )}>
      <div className="flex justify-center">
        <a
          href={href}
          className="inline-block rounded-lg bg-teal-700 px-6 py-3 text-white font-medium hover:bg-teal-800 transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          {text || 'Button'}
        </a>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Button text"
          value={text}
          onChange={(e) => updateBlock(id, { text: e.target.value })}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
        <input
          type="text"
          placeholder="Button URL"
          value={href}
          onChange={(e) => updateBlock(id, { href: e.target.value })}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>
    </div>
  );
}
