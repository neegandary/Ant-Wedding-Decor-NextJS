'use client';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const MAX_HISTORY_SIZE = 50;

/**
 * Recursively find a block by ID in the blocks tree
 * @param {import('@/lib/blog-editor/types').EditorBlock[]} blocks 
 * @param {string} id 
 * @returns {{ block: import('@/lib/blog-editor/types').EditorBlock | null, parent: import('@/lib/blog-editor/types').EditorBlock[] | null, index: number }}
 */
const findBlockAndParent = (blocks, id) => {
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
  pageId: null,
  blocks: [],
  status: 'idle', // 'idle' | 'loading' | 'saving' | 'error'
  error: null,
  isPreviewing: false,
  selectedBlockId: null,
  activeEditor: null,
  history: [],
  historyIndex: -1,
};

/**
 * @typedef {typeof initialState} EditorState
 */

/**
 * Editor store with Zustand and Immer middleware
 * Manages blocks, selection, active editor, and history (undo/redo)
 */
export const useEditorStore = create(
  immer((set) => {
    /**
     * Record history for undo/redo functionality
     * @param {(state: EditorState) => void} updater 
     */
    const recordHistory = (updater) => {
      set((state) => {
        updater(state);
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(JSON.parse(JSON.stringify(state.blocks))); // Deep copy
        if (newHistory.length > MAX_HISTORY_SIZE) {
          newHistory.shift();
        }
        state.history = newHistory;
        state.historyIndex = newHistory.length - 1;
      });
    };

    return {
      ...initialState,

      // Actions managed by Immer
      setPage: (page) => {
        recordHistory((state) => {
          state.pageId = page.id;
          state.blocks = page.blocks;
          state.status = 'idle';
          state.error = null;
          // Reset history for the new page
          state.history = [JSON.parse(JSON.stringify(page.blocks))];
          state.historyIndex = 0;
        });
      },

      addBlock: (block, targetId, position) => {
        recordHistory((state) => {
          if (position === 'append') {
            if (targetId === 'canvas-droppable-area' || targetId === null) {
              state.blocks.push(block);
            } else if (targetId) {
              const { block: targetBlock } = findBlockAndParent(state.blocks, targetId);
              if (targetBlock && targetBlock.type === 'Section') {
                targetBlock.children = targetBlock.children || [];
                targetBlock.children.push(block);
              }
            }
          } else {
            const { parent, index } = findBlockAndParent(state.blocks, targetId);
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
          const { block: activeBlock, parent: activeParent, index: activeIndex } = findBlockAndParent(state.blocks, activeId);
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

      setBlocks: (blocks) => {
        recordHistory((state) => {
          state.blocks = blocks;
        });
      },

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

      reset: () => {
        set(initialState);
      },

      // Actions NOT managed by Immer (for complex objects like Editor instances)
      setActiveEditor: (editor) => set({ activeEditor: editor }),
      setSelectedBlockId: (id) => set({ selectedBlockId: id }),
      setStatus: (status) => set({ status }),
      setError: (error) => set({ status: 'error', error }),
      togglePreview: () => set((state) => ({ isPreviewing: !state.isPreviewing, selectedBlockId: null })),
    };
  })
);
