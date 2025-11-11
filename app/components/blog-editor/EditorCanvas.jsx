'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useBlogEditorStore } from '@/lib/blog-editor/store';
import { BlockRenderer } from './blocks/BlockRenderer';
import { cn } from '@/lib/blog-editor/utils';

export function EditorCanvas({ dropTargetId, dropPosition }) {
  const blocks = useBlogEditorStore((s) => s.blocks);
  const setSelectedBlockId = useBlogEditorStore((s) => s.setSelectedBlockId);
  
  const blockIds = React.useMemo(() => blocks.map((b) => b.id), [blocks]);
  
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-droppable-area',
  });

  const handleCanvasClick = (e) => {
    if (e.target.dataset.isCanvasBackground === 'true') {
      setSelectedBlockId(null);
    }
  };

  return (
    <main
      ref={setNodeRef}
      className={cn(
        'flex-1 overflow-y-auto bg-background transition-colors duration-200',
        isOver && 'bg-accent/20'
      )}
    >
      <div className="mx-auto max-w-5xl py-12 px-8">
        <div
          onClick={handleCanvasClick}
          data-is-canvas-background="true"
          className="min-h-[calc(100vh-12rem)]"
        >
          <SortableContext items={blockIds} strategy={verticalListSortingStrategy}>
            <div className="space-y-3" data-is-canvas-background="true">
              <BlockRenderer 
                blocks={blocks} 
                dropTargetId={dropTargetId} 
                dropPosition={dropPosition} 
              />
            </div>
          </SortableContext>
          
          {blocks.length === 0 && (
            <div 
              className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20"
              data-is-canvas-background="true"
            >
              <div className="text-center" data-is-canvas-background="true">
                <svg 
                  className="mx-auto h-12 w-12 text-muted-foreground mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  data-is-canvas-background="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-muted-foreground font-medium" data-is-canvas-background="true">
                  Drag blocks from the sidebar to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
