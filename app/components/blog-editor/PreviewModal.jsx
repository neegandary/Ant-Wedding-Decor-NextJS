'use client';

import React from 'react';
import { useBlogEditorStore } from '@/lib/blog-editor/store';
import { BlogRenderer } from './BlogRenderer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye, X } from 'lucide-react';

/**
 * PreviewModal - Full-screen preview of blog content
 */
export function PreviewModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const blocks = useBlogEditorStore((s) => s.blocks);

  // Debug: Log blocks when preview opens
  React.useEffect(() => {
    if (isOpen) {
      console.log('Preview blocks:', blocks);
    }
  }, [isOpen, blocks]);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <Eye className="h-4 w-4" />
        Preview
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl h-[90vh] overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle>Blog Preview</DialogTitle>
          </DialogHeader>
          
          <div className="mt-6">
            {blocks && blocks.length > 0 ? (
              <BlogRenderer blocks={blocks} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No content to preview. Add blocks to get started.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

/**
 * PreviewButton - Standalone button to trigger preview
 */
export function PreviewButton() {
  const [isOpen, setIsOpen] = React.useState(false);
  const blocks = useBlogEditorStore((s) => s.blocks);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="default"
        size="lg"
        className="gap-2"
      >
        <Eye className="h-5 w-5" />
        Preview Blog
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Blog Preview</DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            <BlogRenderer blocks={blocks} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
