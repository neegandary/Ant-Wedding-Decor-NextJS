'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontSize } from '@/app/components/tiptap-extensions/FontSize';
import { useBlogEditorStore } from '@/lib/blog-editor/store';
import { cn } from '@/lib/blog-editor/utils';
import { Bold, Italic } from 'lucide-react';

/**
 * Get inline styles for heading based on level
 */
const getHeadingStyles = (level) => {
  const styles = {
    1: 'font-size: 2.25rem; font-weight: 700; line-height: 1.2;', // text-4xl font-bold
    2: 'font-size: 1.875rem; font-weight: 600; line-height: 1.25;', // text-3xl font-semibold
    3: 'font-size: 1.5rem; font-weight: 500; line-height: 1.3;', // text-2xl font-medium
    4: 'font-size: 1.25rem; font-weight: 500; line-height: 1.4;', // text-xl font-medium
  };
  return styles[level] || styles[2];
};

export function HeadingBlock({ id, content = '', level = 2, backgroundColor = '', padding = '' }) {
  const updateBlock = useBlogEditorStore((s) => s.updateBlock);
  const setActiveEditor = useBlogEditorStore((s) => s.setActiveEditor);
  const selectedBlockId = useBlogEditorStore((s) => s.selectedBlockId);
  
  const isSelected = selectedBlockId === id;
  
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // Disable heading nodes to avoid nested heading tags
        heading: false,
        bold: {},
        italic: {},
        // Use paragraph as the content node
        paragraph: {},
        bulletList: false,
        orderedList: false,
        blockquote: false,
      }),
      TextStyle,
      FontSize,
      Placeholder.configure({
        placeholder: 'Enter heading...',
      }),
      TextAlign.configure({
        types: ['paragraph'],
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none heading-editor',
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
    // Update editor styles when level changes
    if (editor && !editor.isDestroyed) {
      const editorElement = editor.view.dom;
      if (editorElement) {
        // Update the editor container style
        editorElement.setAttribute('style', getHeadingStyles(level));
        
        // Also update paragraph elements to remove conflicting inline styles
        const paragraphs = editorElement.querySelectorAll('p');
        paragraphs.forEach(p => {
          // Remove any conflicting font-size from inline styles
          // But preserve text-align and other formatting
          const currentStyle = p.getAttribute('style') || '';
          const styleWithoutFontSize = currentStyle
            .split(';')
            .filter(s => {
              const trimmed = s.trim();
              return trimmed && 
                     !trimmed.startsWith('font-size') && 
                     !trimmed.startsWith('font-weight') &&
                     !trimmed.startsWith('line-height');
            })
            .join(';');
          
          if (styleWithoutFontSize) {
            p.setAttribute('style', styleWithoutFontSize);
          } else {
            p.removeAttribute('style');
          }
        });
      }
    }
  }, [level, editor]);

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
