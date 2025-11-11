'use client';

import React from 'react';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/blog-editor/utils';

export function ImageBlock({ id, src = '', alt = '', backgroundColor = '', padding = '' }) {
  return (
    <div className={cn(
      'w-full rounded-md transition-colors',
      backgroundColor,
      padding
    )}>
      {src ? (
        <div className="relative">
          <img 
            src={src} 
            alt={alt} 
            className="w-full rounded-lg object-cover max-h-96"
          />
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50">
          <div className="text-center">
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">Add an image</p>
          </div>
        </div>
      )}
    </div>
  );
}
