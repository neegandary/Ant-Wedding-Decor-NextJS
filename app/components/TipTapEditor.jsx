'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect, useState } from 'react';

const MenuBar = ({ editor }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  if (!editor) {
    return null;
  }

  const handleImageUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      editor.chain().focus().setImage({ src: data.url, alt: 'Blog image' }).run();
      setShowImageModal(false);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Lỗi khi upload ảnh. Vui lòng thử lại.');
    } finally {
      setUploading(false);
    }
  };

  const setLink = () => {
    if (linkUrl) {
      if (linkText) {
        editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run();
      } else {
        editor.chain().focus().setLink({ href: linkUrl }).run();
      }
      setLinkUrl('');
      setLinkText('');
      setShowLinkModal(false);
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const addHorizontalRule = () => {
    editor.chain().focus().setHorizontalRule().run();
  };

  return (
    <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
      {/* Text Formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive('bold') ? 'bg-teal-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        type="button"
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive('italic') ? 'bg-teal-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        type="button"
      >
        <em>I</em>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive('underline') ? 'bg-teal-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        type="button"
      >
        <u>U</u>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive('strike') ? 'bg-teal-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        type="button"
      >
        <s>S</s>
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Headings */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-teal-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        type="button"
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-teal-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        type="button"
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-teal-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        type="button"
      >
        H3
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive('bulletList') ? 'bg-teal-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        type="button"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive('orderedList') ? 'bg-teal-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        type="button"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Alignment */}
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-teal-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        type="button"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-teal-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        type="button"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M4 18h16" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-teal-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        type="button"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M4 18h16" />
        </svg>
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Quote & Code */}
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive('blockquote') ? 'bg-teal-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        type="button"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive('codeBlock') ? 'bg-teal-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        type="button"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Link & Image */}
      <button
        onClick={() => setShowLinkModal(true)}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive('link') ? 'bg-teal-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        type="button"
        title="Add Link"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </button>
      {editor.isActive('link') && (
        <button
          onClick={removeLink}
          className="px-3 py-1.5 rounded text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
          type="button"
          title="Remove Link"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      <button
        onClick={() => setShowImageModal(true)}
        className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
        type="button"
        title="Add Image"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
      <button
        onClick={addHorizontalRule}
        className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
        type="button"
        title="Horizontal Line"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Undo/Redo */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        type="button"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        type="button"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
        </svg>
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Clear Formatting */}
      <button
        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
        className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
        type="button"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => !uploading && setShowImageModal(false)}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Thêm Hình Ảnh</h3>

            {uploading ? (
              <div className="flex flex-col items-center py-8">
                <svg className="animate-spin h-12 w-12 mb-4 text-teal-700" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-sm text-gray-600 font-medium">Đang upload ảnh...</span>
              </div>
            ) : (
              <>
                <label className="block cursor-pointer">
                  <div className="flex flex-col items-center justify-center px-4 py-12 border-2 border-dashed border-teal-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all">
                    <svg className="w-16 h-16 mb-3 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm font-semibold text-teal-700 mb-1">Click để chọn ảnh</span>
                    <span className="text-xs text-gray-500">hoặc kéo thả file vào đây</span>
                    <span className="text-xs text-gray-400 mt-2">JPG, PNG, GIF, WebP</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    className="hidden"
                  />
                </label>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setShowImageModal(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    type="button"
                  >
                    Hủy
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowLinkModal(false)}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Thêm Link</h3>
            <input
              type="text"
              placeholder="Text hiển thị (tùy chọn)..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 mb-3"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
            />
            <input
              type="url"
              placeholder="Nhập URL..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 mb-4"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setLink()}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setLinkUrl('');
                  setLinkText('');
                  setShowLinkModal(false);
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                type="button"
              >
                Hủy
              </button>
              <button
                onClick={setLink}
                className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors"
                type="button"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function TipTapEditor({ content, onChange }) {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-teal-700 underline hover:text-teal-800',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TextStyle,
      Color,
      Placeholder.configure({
        placeholder: 'Bắt đầu viết nội dung blog của bạn...',
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);

      // Update word and character count
      const text = editor.getText();
      setCharCount(text.length);
      setWordCount(text.split(/\s+/).filter(word => word.length > 0).length);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[400px] max-w-none p-4',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '');
    }
  }, [content, editor]);

  useEffect(() => {
    if (editor && content) {
      const text = editor.getText();
      setCharCount(text.length);
      setWordCount(text.split(/\s+/).filter(word => word.length > 0).length);
    }
  }, [editor, content]);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="bg-white border-t border-gray-300 min-h-[400px] max-h-[600px] overflow-y-auto"
      />
      {/* Footer Stats */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <strong>{wordCount}</strong> từ
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <strong>{charCount}</strong> ký tự
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-gray-500">
          <span>💡 Tip: Ctrl+B = Bold, Ctrl+I = Italic, Ctrl+Z = Undo</span>
        </div>
      </div>
    </div>
  );
}
