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
import { cn } from '@/lib/blog-editor/utils';

export function ParagraphBlock({ id, content = '<p></p>', backgroundColor = '', padding = '' }) {
  const updateBlock = useBlogEditorStore((s) => s.updateBlock);
  const setActiveEditor = useBlogEditorStore((s) => s.setActiveEditor);
  
  const editor = useEditor({
    // When rendering on the server, Tiptap can cause hydration mismatches
    // because it may render different content/IDs between server and client.
    // Setting `immediatelyRender: false` ensures the editor doesn't attempt
    // to render until the client has mounted, avoiding hydration warnings.
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // Ensure list extensions are enabled
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
        listItem: {},
      }),
      TextStyle,
      FontSize,
      Placeholder.configure({
        placeholder: 'Start typing...',
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
        class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-20',
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
    <div className={cn(
      backgroundColor,
      padding,
      'rounded-md transition-colors'
    )}>
      {editor && <EditorContent editor={editor} />}
    </div>
  );
}
