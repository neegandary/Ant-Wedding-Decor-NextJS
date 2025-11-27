'use client';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { EditorBlock, BlockType } from './types';
import type { Editor } from '@tiptap/react';

const MAX_HISTORY_SIZE = 30;

// Helper function để tìm block và parent
const findBlockAndParent = (
  blocks: EditorBlock[], 
  id: string
): { 
  block: EditorBlock | null; 
  parent: EditorBlock[] | null; 
  index: number 
} => {
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.id === id) {
      return { block, parent: blocks, index: i };
    }
    if (block.children) {
      const found = findBlockAndParent(block.children, id);
      if (found.block) {
        return found;
      }
    }
  }
  return { block: null, parent: null, index: -1 };
};

const initialState = {
  blocks: [] as EditorBlock[],
  selectedBlockId: null as string | null,
  activeEditor: null as Editor | null,
  history: [] as EditorBlock[][],
  historyIndex: -1,
  isDirty: false,
  onBlocksChange: null as ((blocks: EditorBlock[]) => void) | null,
  currentLanguage: 'vi' as 'vi' | 'en',
  blocksVi: [] as EditorBlock[],
  blocksEn: [] as EditorBlock[],
};

type EditorState = typeof initialState;

type EditorActions = {
  setBlocks: (blocks: EditorBlock[]) => void;
  addBlock: (block: EditorBlock, targetId: string | null, position: 'before' | 'after' | 'append') => void;
  updateBlock: (id: string, newProps: Partial<EditorBlock['props']>) => void;
  moveBlock: (activeId: string, overId: string) => void;
  deleteBlock: (id: string) => void;
  swapBlockType: (id: string, newType: BlockType) => void;
  setSelectedBlockId: (id: string | null) => void;
  setActiveEditor: (editor: Editor | null) => void;
  setOnBlocksChange: (callback: ((blocks: EditorBlock[]) => void) | null) => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  setCurrentLanguage: (lang: 'vi' | 'en') => void;
  setBlocksByLanguage: (blocksVi: EditorBlock[], blocksEn: EditorBlock[]) => void;
  getAllBlocks: () => { vi: EditorBlock[]; en: EditorBlock[] };
};

export const useBlogEditorStore = create<EditorState & EditorActions>()(
  immer((set, get) => {
    const recordHistory = (updater: (state: Omit<EditorState, 'activeEditor'>) => void) => {
      set((state) => {
        updater(state);
        
        // Record to history
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(JSON.parse(JSON.stringify(state.blocks)));
        
        if (newHistory.length > MAX_HISTORY_SIZE) {
          newHistory.shift();
        }
        
        state.history = newHistory;
        state.historyIndex = newHistory.length - 1;
        state.isDirty = true;
      });
      
      // Call onChange callback after state update
      const { blocks, onBlocksChange } = get();
      if (onBlocksChange) {
        onBlocksChange(blocks);
      }
    };

    return {
      ...initialState,

      setBlocks: (blocks) => {
        set((state) => {
          state.blocks = blocks;
          state.history = [JSON.parse(JSON.stringify(blocks))];
          state.historyIndex = 0;
          state.isDirty = false;
        });
      },

      addBlock: (block, targetId, position) => {
        recordHistory((state) => {
          if (position === 'append') {
            if (!targetId) {
              state.blocks.push(block);
            } else {
              const { block: targetBlock } = findBlockAndParent(state.blocks, targetId);
              if (targetBlock && targetBlock.type === 'Section') {
                targetBlock.children = targetBlock.children || [];
                targetBlock.children.push(block);
              }
            }
          } else {
            const { parent, index } = findBlockAndParent(state.blocks, targetId!);
            if (parent) {
              parent.splice(position === 'before' ? index : index + 1, 0, block);
            }
          }
        });
      },

      updateBlock: (id, newProps) => {
        recordHistory((state) => {
          const { block } = findBlockAndParent(state.blocks, id);
          if (block) {
            block.props = { ...block.props, ...newProps };
          }
        });
      },

      moveBlock: (activeId, overId) => {
        recordHistory((state) => {
          const { block: activeBlock, parent: activeParent, index: activeIndex } = 
            findBlockAndParent(state.blocks, activeId);
          
          if (!activeBlock || !activeParent) return;
          
          activeParent.splice(activeIndex, 1);
          
          const { parent: overParent, index: overIndex } = findBlockAndParent(state.blocks, overId);
          
          if (overParent) {
            overParent.splice(overIndex, 0, activeBlock);
          } else {
            const { block: overBlock } = findBlockAndParent(state.blocks, overId);
            if (overBlock?.type === 'Section') {
              overBlock.children = overBlock.children || [];
              overBlock.children.push(activeBlock);
            } else {
              state.blocks.push(activeBlock);
            }
          }
        });
      },

      deleteBlock: (id) => {
        recordHistory((state) => {
          const { parent, index } = findBlockAndParent(state.blocks, id);
          if (parent) {
            parent.splice(index, 1);
          }
          if (state.selectedBlockId === id) {
            state.selectedBlockId = null;
          }
        });
      },

      swapBlockType: (id, newType) => {
        recordHistory((state) => {
          const { block } = findBlockAndParent(state.blocks, id);
          if (block) {
            block.type = newType;
          }
        });
      },

      setSelectedBlockId: (id) => set({ selectedBlockId: id }),
      
      setActiveEditor: (editor) => set({ activeEditor: editor }),

      setOnBlocksChange: (callback) => set({ onBlocksChange: callback }),

      undo: () => {
        set((state) => {
          if (state.historyIndex > 0) {
            state.historyIndex -= 1;
            state.blocks = JSON.parse(JSON.stringify(state.history[state.historyIndex]));
          }
        });
      },

      redo: () => {
        set((state) => {
          if (state.historyIndex < state.history.length - 1) {
            state.historyIndex += 1;
            state.blocks = JSON.parse(JSON.stringify(state.history[state.historyIndex]));
          }
        });
      },

      reset: () => set(initialState),

      canUndo: () => get().historyIndex > 0,
      canRedo: () => get().historyIndex < get().history.length - 1,

      setCurrentLanguage: (lang) => {
        set((state) => {
          // Save current blocks to current language
          if (state.currentLanguage === 'vi') {
            state.blocksVi = JSON.parse(JSON.stringify(state.blocks));
          } else {
            state.blocksEn = JSON.parse(JSON.stringify(state.blocks));
          }
          
          // Switch to new language
          state.currentLanguage = lang;
          state.blocks = JSON.parse(JSON.stringify(lang === 'vi' ? state.blocksVi : state.blocksEn));
          state.history = [JSON.parse(JSON.stringify(state.blocks))];
          state.historyIndex = 0;
          state.selectedBlockId = null;
        });
      },

      setBlocksByLanguage: (blocksVi, blocksEn) => {
        set((state) => {
          state.blocksVi = blocksVi;
          state.blocksEn = blocksEn;
          state.blocks = state.currentLanguage === 'vi' ? blocksVi : blocksEn;
          state.history = [JSON.parse(JSON.stringify(state.blocks))];
          state.historyIndex = 0;
        });
      },

      getAllBlocks: () => {
        const state = get();
        // Save current editing blocks
        const currentBlocks = JSON.parse(JSON.stringify(state.blocks));
        return {
          vi: state.currentLanguage === 'vi' ? currentBlocks : state.blocksVi,
          en: state.currentLanguage === 'en' ? currentBlocks : state.blocksEn,
        };
      },
    };
  })
);
