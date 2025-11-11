'use client';

import React, { useState, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { BLOCK_DEFINITIONS } from '@/lib/blog-editor/block-definitions';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

function DraggableBlock({ type }) {
  const definition = BLOCK_DEFINITIONS.find((b) => b.type === type);
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `draggable-${type}`,
    data: { type },
  });

  // Avoid spreading dnd-kit generated attributes during SSR/hydration.
  // dnd-kit may generate IDs (e.g. aria-describedby) that differ between
  // server and client. Only apply `attributes` after the component mounts
  // on the client to prevent React hydration mismatch warnings.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!definition) return null;

  const Icon = definition.icon;

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...(mounted ? attributes : {})}
      className={cn(
        'cursor-grab transition-all duration-150 hover:shadow-sm bg-background border',
        isDragging && 'opacity-50'
      )}
    >
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex items-center justify-center w-6 h-6">
          <Icon className="h-5 w-5 text-foreground" />
        </div>
        <span className="text-sm font-normal text-foreground">{definition.label}</span>
      </CardContent>
    </Card>
  );
}

export function EditorSidebar() {
  return (
    <aside className="w-64 border-r bg-background flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-sm font-semibold text-foreground">Blocks</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Drag and drop blocks onto the canvas.
        </p>
      </div>
      
      {/* Blocks List - No scroll */}
      <div className="p-4">
        <div className="space-y-2">
          {BLOCK_DEFINITIONS.map((def) => (
            <DraggableBlock key={def.type} type={def.type} />
          ))}
        </div>
      </div>
    </aside>
  );
}
