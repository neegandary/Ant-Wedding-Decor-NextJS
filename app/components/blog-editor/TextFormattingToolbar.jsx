'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useBlogEditorStore } from '@/lib/blog-editor/store';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Type, 
  Bold, 
  Italic, 
  Link as LinkIcon, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Heading1,
  Heading2,
  Heading3
} from 'lucide-react';

/**
 * TextFormattingToolbar - Rich text formatting controls for TipTap editor
 * Handles: bold, italic, link, lists, alignment, font size, heading levels
 * Includes selection saving/restoring to prevent losing context when using dropdowns
 */
export const TextFormattingToolbar = () => {
  const activeEditor = useBlogEditorStore((s) => s.activeEditor);
  const [currentFontSize, setCurrentFontSize] = useState('default');
  const savedSelectionRef = useRef(null);

  // Update current font size when editor or selection changes
  useEffect(() => {
    if (activeEditor) {
      const updateFontSize = () => {
        const fontSize = activeEditor.getAttributes('textStyle').fontSize || 'default';
        setCurrentFontSize(fontSize);
      };
      
      updateFontSize();
      activeEditor.on('selectionUpdate', updateFontSize);
      activeEditor.on('update', updateFontSize);
      
      return () => {
        activeEditor.off('selectionUpdate', updateFontSize);
        activeEditor.off('update', updateFontSize);
      };
    }
  }, [activeEditor]);

  const handleSetParagraph = () => {
    if (activeEditor) {
      activeEditor.chain().focus().setParagraph().run();
    }
  };

  const handleSetHeading = (level) => {
    // HeadingBlock uses paragraph nodes, not heading nodes
    // So we don't actually change the node type, just update the block props
    // This function is kept for future compatibility if we switch back to heading nodes
    console.log('Heading level change requested:', level);
    // Do nothing for now since HeadingBlock manages its own heading level via props
  };

  const handleToggleBold = () => {
    if (activeEditor) {
      activeEditor.chain().focus().toggleBold().run();
    }
  };

  const handleToggleItalic = () => {
    if (activeEditor) {
      activeEditor.chain().focus().toggleItalic().run();
    }
  };

  const handleToggleBulletList = () => {
    if (activeEditor && activeEditor.can().chain().focus().toggleBulletList().run()) {
      activeEditor.chain().focus().toggleBulletList().run();
    }
  };

  const handleToggleOrderedList = () => {
    if (activeEditor && activeEditor.can().chain().focus().toggleOrderedList().run()) {
      activeEditor.chain().focus().toggleOrderedList().run();
    }
  };

  const handleSetLink = () => {
    if (activeEditor) {
      const previousUrl = activeEditor.getAttributes('link').href;
      const url = window.prompt('Enter URL:', previousUrl);
      
      // cancelled
      if (url === null) {
        return;
      }

      // empty - remove link
      if (url === '') {
        activeEditor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }

      // update link
      activeEditor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const handleSetAlignment = (alignment) => {
    if (activeEditor) {
      activeEditor.chain().focus().setTextAlign(alignment).run();
    }
  };

  const handleSetFontSize = (size) => {
    if (!activeEditor && !savedSelectionRef.current) return;
    
    const editor = activeEditor || savedSelectionRef.current?.editor;
    if (!editor) return;
    
    // Restore selection if we saved it
    if (savedSelectionRef.current) {
      editor.commands.setTextSelection({
        from: savedSelectionRef.current.from,
        to: savedSelectionRef.current.to
      });
    }
    
    if (size && size !== 'default') {
      editor.chain().focus().setFontSize(size).run();
    } else if (size === 'default') {
      editor.chain().focus().unsetFontSize().run();
    }
    
    // Clear saved selection
    savedSelectionRef.current = null;
  };

  const handleSelectPointerDown = (e) => {
    // Prevent the editor from losing focus
    e.preventDefault();
    
    // Save current selection and editor reference
    if (activeEditor) {
      const { from, to } = activeEditor.state.selection;
      savedSelectionRef.current = { from, to, editor: activeEditor };
    }
  };

  const isDisabled = !activeEditor;

  // Prevent losing focus when clicking toolbar buttons
  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-4" onMouseDown={handleMouseDown}>
      {/* Removed Text Style section since HeadingBlock uses paragraph nodes
          and heading level is controlled via PropertyPanel dropdown */}
      
      <div className="space-y-2">
        <Label className="text-xs font-semibold">Text Formatting</Label>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={activeEditor?.isActive('bold') ? 'default' : 'outline'} 
            size="sm" 
            title="Bold (Ctrl+B)"
            onClick={handleToggleBold}
            disabled={isDisabled}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button 
            variant={activeEditor?.isActive('italic') ? 'default' : 'outline'} 
            size="sm" 
            title="Italic (Ctrl+I)"
            onClick={handleToggleItalic}
            disabled={isDisabled}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button 
            variant={activeEditor?.isActive('link') ? 'default' : 'outline'} 
            size="sm" 
            title="Link (Ctrl+K)"
            onClick={handleSetLink}
            disabled={isDisabled}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button 
            variant={activeEditor?.isActive('bulletList') ? 'default' : 'outline'} 
            size="sm" 
            title="Bullet List"
            onClick={handleToggleBulletList}
            disabled={isDisabled}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            variant={activeEditor?.isActive('orderedList') ? 'default' : 'outline'} 
            size="sm" 
            title="Numbered List"
            onClick={handleToggleOrderedList}
            disabled={isDisabled}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold">Text Alignment</Label>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={activeEditor?.isActive({ textAlign: 'left' }) ? 'default' : 'outline'} 
            size="sm" 
            title="Align Left"
            onClick={() => handleSetAlignment('left')}
            disabled={isDisabled}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant={activeEditor?.isActive({ textAlign: 'center' }) ? 'default' : 'outline'} 
            size="sm" 
            title="Align Center"
            onClick={() => handleSetAlignment('center')}
            disabled={isDisabled}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button 
            variant={activeEditor?.isActive({ textAlign: 'right' }) ? 'default' : 'outline'} 
            size="sm" 
            title="Align Right"
            onClick={() => handleSetAlignment('right')}
            disabled={isDisabled}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button 
            variant={activeEditor?.isActive({ textAlign: 'justify' }) ? 'default' : 'outline'} 
            size="sm" 
            title="Justify"
            onClick={() => handleSetAlignment('justify')}
            disabled={isDisabled}
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold">Font Size</Label>
        <Select 
          value={currentFontSize}
          onValueChange={handleSetFontSize}
          disabled={isDisabled}
        >
          <SelectTrigger 
            className="w-full" 
            onPointerDown={handleSelectPointerDown}
          >
            <SelectValue placeholder="Default size" />
          </SelectTrigger>
          <SelectContent 
            onCloseAutoFocus={(e) => {
              // Prevent focus from leaving the editor when closing the dropdown
              e.preventDefault();
              if (savedSelectionRef.current?.editor) {
                savedSelectionRef.current.editor.commands.focus();
              }
            }}
          >
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="12px">12px - Tiny</SelectItem>
            <SelectItem value="14px">14px - Small</SelectItem>
            <SelectItem value="16px">16px - Normal</SelectItem>
            <SelectItem value="18px">18px - Medium</SelectItem>
            <SelectItem value="20px">20px - Large</SelectItem>
            <SelectItem value="24px">24px - Extra Large</SelectItem>
            <SelectItem value="28px">28px - 2XL</SelectItem>
            <SelectItem value="32px">32px - 3XL</SelectItem>
            <SelectItem value="36px">36px - 4XL</SelectItem>
            <SelectItem value="48px">48px - Huge</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {isDisabled && (
        <div className="text-xs text-muted-foreground">
          💡 Click inside a text block to enable formatting tools
        </div>
      )}
    </div>
  );
};
