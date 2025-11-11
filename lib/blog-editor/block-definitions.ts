import { 
  Heading1, 
  Type, 
  ImageIcon, 
  MousePointerClick, 
  PanelLeft, 
  PanelRight, 
  RectangleHorizontal, 
  LayoutDashboard
} from 'lucide-react';
import type { EditorBlock, BlockType } from './types';
import { v4 as uuid } from 'uuid';

export interface BlockDefinition {
  type: BlockType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  defaults: Omit<EditorBlock, 'id' | 'type'>;
}

const commonProps = {
  backgroundColor: '',
  padding: '',
  textAlign: 'left' as const,
};

export const BLOCK_DEFINITIONS: BlockDefinition[] = [
  {
    type: 'Heading',
    label: 'Heading',
    icon: Heading1,
    defaults: { 
      props: { 
        ...commonProps, 
        content: 'New Heading', 
        level: 2 
      } 
    },
  },
  {
    type: 'Paragraph',
    label: 'Paragraph',
    icon: Type,
    defaults: { 
      props: { 
        ...commonProps, 
        content: '<p>Start typing...</p>' 
      } 
    },
  },
  {
    type: 'Hero',
    label: 'Hero Section',
    icon: LayoutDashboard,
    defaults: {
      props: {
        ...commonProps,
        title: 'Blog Hero Title',
        subtitle: 'Giới thiệu ngắn gọn về nội dung bài viết',
        buttonText: 'Đọc thêm',
        buttonHref: '#content',
        imageUrl: '/images/hero-placeholder.jpg',
      },
    },
  },
  {
    type: 'Image',
    label: 'Image',
    icon: ImageIcon,
    defaults: { 
      props: { 
        ...commonProps, 
        src: '/images/placeholder.jpg', 
        alt: 'Image description' 
      } 
    },
  },
  {
    type: 'Button',
    label: 'Button',
    icon: MousePointerClick,
    defaults: { 
      props: { 
        ...commonProps, 
        text: 'Click Me', 
        href: '#' 
      } 
    },
  },
  {
    type: 'TextImage',
    label: 'Text | Image',
    icon: PanelRight,
    defaults: { 
      props: { 
        ...commonProps, 
        content: '<p>Mô tả nội dung hoặc thông tin về hình ảnh.</p>', 
        src: '/images/placeholder.jpg', 
        alt: 'Image' 
      } 
    },
  },
  {
    type: 'ImageText',
    label: 'Image | Text',
    icon: PanelLeft,
    defaults: { 
      props: { 
        ...commonProps, 
        content: '<p>Mô tả nội dung hoặc thông tin về hình ảnh.</p>', 
        src: '/images/placeholder.jpg', 
        alt: 'Image' 
      } 
    },
  },
  {
    type: 'Section',
    label: 'Section Container',
    icon: RectangleHorizontal,
    defaults: { 
      props: { 
        ...commonProps, 
        layout: 'single' 
      }, 
      children: [] 
    },
  },
];

export const createNewBlock = (type: BlockType): EditorBlock => {
  const definition = BLOCK_DEFINITIONS.find((b) => b.type === type);
  if (!definition) {
    throw new Error(`Block type "${type}" not found.`);
  }
  
  // Deep copy để tránh shared state
  return {
    id: uuid(),
    type,
    ...JSON.parse(JSON.stringify(definition.defaults)),
  };
};
