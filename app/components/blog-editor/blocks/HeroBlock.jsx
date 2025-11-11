'use client';

import React from 'react';
import { useBlogEditorStore } from '@/lib/blog-editor/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function HeroBlock({ 
  id, 
  title = 'Hero Title', 
  subtitle = 'Hero Subtitle',
  buttonText = 'Get Started',
  buttonHref = '#',
  imageUrl = ''
}) {
  const updateBlock = useBlogEditorStore((s) => s.updateBlock);

  return (
    <Card>
      <CardContent className="p-4">
        {/* Hero Preview */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-linear-to-r from-teal-700 to-teal-900 flex items-center justify-center text-center p-8">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt="Hero background" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          
          <div className="relative z-10 flex flex-col items-center gap-4 text-white max-w-3xl">
            <h1 className="text-4xl font-bold">{title || 'Hero Title'}</h1>
            <p className="text-lg text-white/90">{subtitle || 'Hero Subtitle'}</p>
            <Button 
              variant="secondary" 
              size="lg"
              className="pointer-events-none"
            >
              {buttonText || 'Call to Action'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
