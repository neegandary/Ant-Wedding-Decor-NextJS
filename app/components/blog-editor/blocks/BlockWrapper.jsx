'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useBlogEditorStore } from '@/lib/blog-editor/store';
import { cn } from '@/lib/blog-editor/utils';
import { GripVertical, Trash2 } from 'lucide-react';

export function BlockWrapper({ id, children, props = {} }) {
  const selectedBlockId = useBlogEditorStore((s) => s.selectedBlockId);
  const setSelectedBlockId = useBlogEditorStore((s) => s.setSelectedBlockId);
  const deleteBlock = useBlogEditorStore((s) => s.deleteBlock);

  const isSelected = selectedBlockId === id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedBlockId(id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteBlock(id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative rounded-lg transition-all duration-200',
        isSelected && 'ring-2 ring-teal-500 ring-offset-2',
        'hover:ring-2 hover:ring-gray-300'
      )}
      onClick={handleClick}
    >
      {/* Drag Handle & Delete Button */}
      <div
        className={cn(
          'absolute -left-10 top-2 flex flex-col gap-1 opacity-0 transition-opacity',
          'group-hover:opacity-100',
          isSelected && 'opacity-100'
        )}
      >
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab rounded bg-gray-200 p-1 hover:bg-gray-300 active:cursor-grabbing"
          aria-label="Drag block"
        >
          <GripVertical className="h-4 w-4 text-gray-600" />
        </button>
        <button
          onClick={handleDelete}
          className="rounded bg-red-100 p-1 hover:bg-red-200"
          aria-label="Delete block"
        >
          <Trash2 className="h-4 w-4 text-red-600" />
        </button>
      </div>

      {/* Block Content */}
      <div
        className="min-h-10"
        style={{
          backgroundColor: props.backgroundColor || 'transparent',
          padding: props.padding || '8px',
        }}
      >
        {children}
      </div>
    </div>
  );
}
