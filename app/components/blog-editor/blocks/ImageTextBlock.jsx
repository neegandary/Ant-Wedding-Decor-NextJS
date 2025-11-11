'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontSize } from '@/app/components/tiptap-extensions/FontSize';
import { useBlogEditorStore } from '@/lib/blog-editor/store';
import { ImageIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/blog-editor/utils';

export function ImageTextBlock({ id, content = '<p>Type your content here...</p>', src = '', alt = '', backgroundColor = '', padding = '' }) {
  const updateBlock = useBlogEditorStore((s) => s.updateBlock);
  const setActiveEditor = useBlogEditorStore((s) => s.setActiveEditor);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc list-inside',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal list-inside',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'ml-4',
          },
        },
      }),
      TextStyle,
      FontSize,
      Placeholder.configure({
        placeholder: 'Type something...',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-teal-600 underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none',
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      const newContent = currentEditor.getHTML();
      updateBlock(id, { content: newContent });
    },
    onFocus: ({ editor: currentEditor }) => {
      setActiveEditor(currentEditor);
    },
    onBlur: () => {
      setActiveEditor(null);
    },
  });

  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      const editorContent = editor.getHTML();
      if (editorContent !== content) {
        editor.commands.setContent(content, { emitUpdate: false });
      }
    }
  }, [content, editor]);

  return (
    <Card className={cn(
      'transition-colors',
      backgroundColor,
      padding
    )}>
      <CardContent className="p-4">
        {/* Two Column Layout: Image | Text */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="flex-1 w-full relative">
            {src ? (
              <img src={src} alt={alt} className="w-full h-auto rounded-md object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center w-full aspect-video bg-muted rounded-md border-2 border-dashed">
                <ImageIcon className="w-12 h-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Add an image</p>
              </div>
            )}
          </div>

          <div className="flex-1 w-full">
            {editor && <EditorContent editor={editor} />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
