/**
 * @typedef {'Heading' | 'Paragraph' | 'Image' | 'Button' | 'TextImage' | 'ImageText' | 'Section' | 'Hero' | 'FAQ'} BlockType
 */

/**
 * @typedef {Object} EditorBlockProps
 * @property {string} [content] - Rich text content for text blocks
 * @property {1 | 2 | 3} [level] - Heading level (1-3)
 * @property {string} [src] - Image source URL
 * @property {string} [alt] - Image alt text
 * @property {string} [text] - Button text
 * @property {string} [href] - Link URL
 * @property {'single' | 'two-column'} [layout] - Section layout
 * @property {string} [backgroundColor] - Background color (CSS class or hex)
 * @property {string} [padding] - Padding class
 * @property {string} [title] - Hero title
 * @property {string} [subtitle] - Hero subtitle
 * @property {string} [buttonText] - Hero/Section button text
 * @property {string} [buttonHref] - Hero/Section button link
 * @property {string} [imageUrl] - Hero background image URL
 * @property {Array<{id: string, question: string, answer: string}>} [items] - FAQ items
 * @property {string} [uploadUrl] - Temporary upload preview URL
 */

/**
 * @typedef {Object} EditorBlock
 * @property {string} id - Unique block identifier
 * @property {BlockType} type - Block type
 * @property {EditorBlockProps} props - Block properties
 * @property {EditorBlock[]} [children] - Child blocks (for Section blocks)
 */

/**
 * @typedef {Object} PageContent
 * @property {string} id - Page ID/slug
 * @property {EditorBlock[]} blocks - Array of editor blocks
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {*} [data]
 * @property {string} [error]
 */

export {};
