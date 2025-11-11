'use client';

import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useBlogEditorStore } from '@/lib/blog-editor/store';
import { createNewBlock } from '@/lib/blog-editor/block-definitions';
import { EditorSidebar } from './EditorSidebar';
import { EditorCanvas } from './EditorCanvas';
import { PropertyPanel } from './PropertyPanel';
import { PreviewModal } from './PreviewModal';
import { Undo2, Redo2, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function BlogPageBuilder({ initialBlocks = [], onChange, onPublish, publishLabel = 'Publish', isPublishing = false, slug = 'blog', backUrl = null }) {
  const blocks = useBlogEditorStore((s) => s.blocks);
  const setBlocks = useBlogEditorStore((s) => s.setBlocks);
  const addBlock = useBlogEditorStore((s) => s.addBlock);
  const moveBlock = useBlogEditorStore((s) => s.moveBlock);
  const undo = useBlogEditorStore((s) => s.undo);
  const redo = useBlogEditorStore((s) => s.redo);
  const canUndo = useBlogEditorStore((s) => s.canUndo);
  const canRedo = useBlogEditorStore((s) => s.canRedo);
  const setSelectedBlockId = useBlogEditorStore((s) => s.setSelectedBlockId);
  const setOnBlocksChange = useBlogEditorStore((s) => s.setOnBlocksChange);

  const [dropTargetId, setDropTargetId] = useState(null);
  const [dropPosition, setDropPosition] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Register onChange callback
  useEffect(() => {
    if (onChange) {
      setOnBlocksChange(onChange);
    }
    return () => setOnBlocksChange(null);
  }, [onChange, setOnBlocksChange]);

  const handlePublish = (e) => {
    if (onPublish) {
      // Create a synthetic event if needed
      const syntheticEvent = e || { preventDefault: () => {} };
      onPublish(syntheticEvent);
    }
  };

  // Initialize blocks only once
  useEffect(() => {
    if (!initialized && initialBlocks && initialBlocks.length > 0) {
      setBlocks(initialBlocks);
      setInitialized(true);
    }
  }, [initialBlocks, initialized, setBlocks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    if (!event.active.id.toString().startsWith('draggable-')) {
      setSelectedBlockId(event.active.id);
    }
    setDropTargetId(null);
    setDropPosition(null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (over) {
      // Adding new block from sidebar
      if (active.id.toString().startsWith('draggable-')) {
        const type = active.data.current?.type;
        if (type) {
          const newBlock = createNewBlock(type);
          if (over.id === 'canvas-droppable-area') {
            addBlock(newBlock, null, 'append');
          } else {
            const position = dropPosition === 'before' ? 'before' : 'after';
            addBlock(newBlock, over.id, position);
          }
        }
      }
      // Reordering existing blocks
      else if (active.id !== over.id) {
        moveBlock(active.id, over.id);
      }
    }
    
    setDropTargetId(null);
    setDropPosition(null);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    
    if (!over) {
      setDropTargetId(null);
      setDropPosition(null);
      return;
    }

    if (active.id !== over.id) {
      setDropTargetId(over.id);
      setDropPosition('after');
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b bg-background px-6 py-3">
        <div className="flex items-center gap-3">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => backUrl ? window.location.href = backUrl : window.history.back()}
            className="text-muted-foreground hover:text-foreground"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Dashboard
          </Button>
          
          <div className="h-6 w-px bg-border" />
          
          {/* Blog Slug */}
          <span className="text-sm font-medium">{slug}</span>
          
          <div className="h-6 w-px bg-border ml-2" />
          
          {/* Blocks Count */}
          <span className="text-xs text-muted-foreground">
            {blocks.length} {blocks.length === 1 ? 'block' : 'blocks'}
          </span>
        </div>

        <div className="flex items-center gap-2">

          {/* Undo/Redo */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => undo()}
            disabled={!canUndo()}
            title="Undo"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => redo()}
            disabled={!canRedo()}
            title="Redo"
          >
            <Redo2 className="h-4 w-4" />
          </Button>

          <div className="h-6 w-px bg-border mx-2" />

          {/* Preview/Publish */}
          <PreviewModal />
          <Button 
            size="sm" 
            className="gap-2"
            onClick={handlePublish}
            disabled={isPublishing || blocks.length === 0}
          >
            <Save className="h-4 w-4" />
            {isPublishing ? 'Đang lưu...' : publishLabel}
          </Button>
        </div>
      </div>

      {/* Editor Area */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="flex flex-1 overflow-hidden relative">
          <EditorSidebar />
          <EditorCanvas dropTargetId={dropTargetId} dropPosition={dropPosition} />
          <PropertyPanel />
        </div>
      </DndContext>
    </div>
  );
}
