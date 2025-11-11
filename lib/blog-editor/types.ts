// Blog Page Builder Types (adapted from Aether Canvas)

export type BlockType = 
  | 'Heading' 
  | 'Paragraph' 
  | 'Image' 
  | 'Button' 
  | 'TextImage' 
  | 'ImageText' 
  | 'Section' 
  | 'Hero'
  | 'Quote'
  | 'List';

export interface EditorBlock {
  id: string;
  type: BlockType;
  props: {
    // Common
    content?: string;
    
    // Heading
    level?: 1 | 2 | 3 | 4;
    
    // Image
    src?: string;
    alt?: string;
    
    // Button
    text?: string;
    href?: string;
    
    // Section
    layout?: 'single' | 'two-column';
    
    // Styling
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right';
    
    // Hero
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonHref?: string;
    imageUrl?: string;
    
    // Quote
    author?: string;
    
    // List
    listType?: 'bullet' | 'numbered';
    items?: string[];
  };
  children?: EditorBlock[];
}

export interface BlogContent {
  blocks: EditorBlock[];
  version: string; // For future migrations
}

// Helper type for converting between JSON and HTML
export interface BlogData {
  // Original fields
  slug: string;
  title: string;
  author: string;
  category: string;
  excerpt: string;
  thumbnailImage: string;
  headerImage: string;
  tags: string[];
  publishedDate: string;
  metaDescription: string;
  metaKeywords: string[];
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  displayOrder: number;
  readTime: number;
  
  // New fields for page builder
  content?: string; // HTML fallback
  contentBlocks?: EditorBlock[]; // JSON blocks
  contentVersion?: string; // 'html' | 'blocks'
}
