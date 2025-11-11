'use client';

import React, { useRef, useState } from 'react';
import { useBlogEditorStore } from '@/lib/blog-editor/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import dynamic from 'next/dynamic';
import { 
  Heading1, 
  Heading2, 
  Heading3, 
  PanelLeft, 
  Columns, 
  RefreshCw, 
  Sparkles, 
  Droplet, 
  StretchHorizontal 
} from 'lucide-react';

const ImageUploader = dynamic(() => import('@/app/components/ImageUploader'), { ssr: false });

/**
 * HeadingToolbar - Controls for heading level (H1, H2, H3, H4)
 */
export const HeadingToolbar = ({ blockId, level }) => {
  const updateBlock = useBlogEditorStore((s) => s.updateBlock);

  const handleLevelChange = (value) => {
    const newLevel = parseInt(value, 10);
    if (newLevel >= 1 && newLevel <= 4) {
      updateBlock(blockId, { level: newLevel });
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold">Heading Level</Label>
      <ToggleGroup 
        type="single" 
        value={String(level || 2)} 
        onValueChange={handleLevelChange} 
        aria-label="Heading level" 
        className="justify-start"
      >
        <ToggleGroupItem value="1" aria-label="Heading 1" className="text-xs">
          H1
        </ToggleGroupItem>
        <ToggleGroupItem value="2" aria-label="Heading 2" className="text-xs">
          H2
        </ToggleGroupItem>
        <ToggleGroupItem value="3" aria-label="Heading 3" className="text-xs">
          H3
        </ToggleGroupItem>
        <ToggleGroupItem value="4" aria-label="Heading 4" className="text-xs">
          H4
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

/**
 * SectionToolbar - Controls for section layout (single/two-column)
 */
export const SectionToolbar = ({ blockId, layout }) => {
  const updateBlock = useBlogEditorStore((s) => s.updateBlock);

  const handleLayoutChange = (value) => {
    if (value) updateBlock(blockId, { layout: value });
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold">Section Layout</Label>
      <ToggleGroup 
        type="single" 
        value={layout || 'single'} 
        onValueChange={handleLayoutChange} 
        aria-label="Section layout" 
        className="justify-start"
      >
        <ToggleGroupItem value="single" aria-label="Single Column">
          <PanelLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="two-column" aria-label="Two Columns">
          <Columns className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

/**
 * ImageSettings - Image URL, alt text, and file upload with R2 storage
 */
export const ImageSettings = ({ blockId, src, alt }) => {
  const updateBlock = useBlogEditorStore((s) => s.updateBlock);

  return (
    <div className="grid gap-3">
      <div>
        <Label className="text-xs font-semibold mb-2 block">Image</Label>
        <ImageUploader
          label=""
          value={src || ''}
          onChange={(e) => updateBlock(blockId, { src: e.target.value })}
          required={false}
          helperText="Auto resize & WebP"
        />
      </div>
      <div>
        <Label htmlFor={`alt-${blockId}`} className="text-xs font-semibold">
          Alt Text
        </Label>
        <Input 
          id={`alt-${blockId}`} 
          value={alt || ''} 
          onChange={(e) => updateBlock(blockId, { alt: e.target.value })} 
          placeholder="Descriptive text for SEO" 
        />
      </div>
    </div>
  );
};

/**
 * ButtonSettings - Button text and link URL
 */
export const ButtonSettings = ({ blockId, text, href }) => {
  const updateBlock = useBlogEditorStore((s) => s.updateBlock);

  return (
    <div className="grid gap-3">
      <div>
        <Label htmlFor={`text-${blockId}`} className="text-xs font-semibold">
          Button Text
        </Label>
        <Input 
          id={`text-${blockId}`} 
          value={text || ''} 
          onChange={(e) => updateBlock(blockId, { text: e.target.value })} 
        />
      </div>
      <div>
        <Label htmlFor={`href-${blockId}`} className="text-xs font-semibold">
          Link URL
        </Label>
        <Input 
          id={`href-${blockId}`} 
          value={href || ''} 
          onChange={(e) => updateBlock(blockId, { href: e.target.value })} 
          placeholder="https://..." 
        />
      </div>
      <div className="text-xs text-muted-foreground">
        💡 Tip: Customize button appearance using the Background color picker below
      </div>
    </div>
  );
};

/**
 * CompositeBlockSettings - Swap between TextImage and ImageText layouts
 */
export const CompositeBlockSettings = ({ blockId, type }) => {
  const swapBlockType = useBlogEditorStore((s) => s.swapBlockType);

  const handleSwap = () => {
    swapBlockType(blockId, type === 'TextImage' ? 'ImageText' : 'TextImage');
  };

  return (
    <Button variant="outline" size="sm" onClick={handleSwap}>
      <RefreshCw className="mr-2 h-4 w-4" /> Swap Layout
    </Button>
  );
};

/**
 * HeroSettings - Hero block settings (background image, button)
 */
export const HeroSettings = ({ blockId, imageUrl, buttonText, buttonHref }) => {
  const updateBlock = useBlogEditorStore((s) => s.updateBlock);

  return (
    <div className="grid gap-3">
      <div>
        <Label className="text-xs font-semibold mb-2 block">Background Image</Label>
        <ImageUploader
          label=""
          value={imageUrl || ''}
          onChange={(e) => updateBlock(blockId, { imageUrl: e.target.value })}
          required={false}
          helperText="Auto resize & WebP"
        />
      </div>
      <Separator />
      <div>
        <Label htmlFor={`buttonText-${blockId}`} className="text-xs font-semibold">
          Button Text
        </Label>
        <Input 
          id={`buttonText-${blockId}`} 
          value={buttonText || ''} 
          onChange={(e) => updateBlock(blockId, { buttonText: e.target.value })} 
        />
      </div>
      <div>
        <Label htmlFor={`buttonHref-${blockId}`} className="text-xs font-semibold">
          Button Link URL
        </Label>
        <Input 
          id={`buttonHref-${blockId}`} 
          value={buttonHref || ''} 
          onChange={(e) => updateBlock(blockId, { buttonHref: e.target.value })} 
          placeholder="https://..." 
        />
      </div>
    </div>
  );
};

/**
 * StyleSettings - Background color and padding controls
 */
const stylePresets = [
  { backgroundColor: 'bg-primary/10', padding: 'p-8' },
  { backgroundColor: 'bg-muted/50', padding: 'p-12' },
  { backgroundColor: 'bg-destructive/10', padding: 'p-4' },
  { backgroundColor: '', padding: 'p-8' },
  { backgroundColor: 'bg-muted/50', padding: '' },
];

export const StyleSettings = ({ blockId, backgroundColor, padding }) => {
  const updateBlock = useBlogEditorStore((s) => s.updateBlock);
  const [customColor, setCustomColor] = useState(
    backgroundColor?.startsWith('#') ? backgroundColor : '#ffffff'
  );
  const [colorMode, setColorMode] = useState(
    backgroundColor?.startsWith('#') ? 'custom' : 'preset'
  );

  const handleAiStyle = () => {
    const randomPreset = stylePresets[Math.floor(Math.random() * stylePresets.length)];
    updateBlock(blockId, randomPreset);
    if (window.showToast) {
      window.showToast('AI style applied!', 'success');
    }
  };

  const handleColorChange = (color) => {
    setCustomColor(color);
    updateBlock(blockId, { backgroundColor: color });
    setColorMode('custom');
  };

  const handlePresetChange = (v) => {
    updateBlock(blockId, { backgroundColor: v });
    setColorMode('preset');
  };

  const presetColors = [
    { value: '', label: 'None', color: 'transparent' },
    { value: 'bg-slate-50', label: 'Slate', color: '#f8fafc' },
    { value: 'bg-gray-50', label: 'Gray', color: '#f9fafb' },
    { value: 'bg-zinc-50', label: 'Zinc', color: '#fafafa' },
    { value: 'bg-red-50', label: 'Red', color: '#fef2f2' },
    { value: 'bg-orange-50', label: 'Orange', color: '#fff7ed' },
    { value: 'bg-amber-50', label: 'Amber', color: '#fffbeb' },
    { value: 'bg-yellow-50', label: 'Yellow', color: '#fefce8' },
    { value: 'bg-lime-50', label: 'Lime', color: '#f7fee7' },
    { value: 'bg-green-50', label: 'Green', color: '#f0fdf4' },
    { value: 'bg-emerald-50', label: 'Emerald', color: '#ecfdf5' },
    { value: 'bg-teal-50', label: 'Teal', color: '#f0fdfa' },
    { value: 'bg-cyan-50', label: 'Cyan', color: '#ecfeff' },
    { value: 'bg-sky-50', label: 'Sky', color: '#f0f9ff' },
    { value: 'bg-blue-50', label: 'Blue', color: '#eff6ff' },
    { value: 'bg-indigo-50', label: 'Indigo', color: '#eef2ff' },
    { value: 'bg-violet-50', label: 'Violet', color: '#f5f3ff' },
    { value: 'bg-purple-50', label: 'Purple', color: '#faf5ff' },
    { value: 'bg-fuchsia-50', label: 'Fuchsia', color: '#fdf4ff' },
    { value: 'bg-pink-50', label: 'Pink', color: '#fdf2f8' },
    { value: 'bg-rose-50', label: 'Rose', color: '#fff1f2' },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="flex items-center text-xs font-semibold">
          <Droplet className="mr-2 h-3 w-3" /> Background
        </Label>
        
        {/* Preset Colors Grid */}
        <div className="grid grid-cols-5 gap-2">
          {presetColors.map((preset) => (
            <button
              key={preset.value}
              onClick={() => handlePresetChange(preset.value)}
              className={`h-8 w-full rounded border-2 transition-all ${
                colorMode === 'preset' && backgroundColor === preset.value
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-border hover:border-primary/50'
              } ${preset.value || 'bg-white'}`}
              title={preset.label}
              style={
                preset.value === '' 
                  ? { background: 'linear-gradient(135deg, transparent 45%, #e5e7eb 45%, #e5e7eb 55%, transparent 55%)' } 
                  : {}
              }
            />
          ))}
        </div>

        {/* Custom Color Picker */}
        <div className="pt-2">
          <Label className="text-xs text-muted-foreground mb-2 block">Custom Color</Label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={`h-10 w-10 rounded border-2 transition-all ${
                    colorMode === 'custom'
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                  style={{ backgroundColor: customColor }}
                />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3">
                <div className="space-y-2">
                  <Label className="text-xs">Pick a color</Label>
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-full h-32 cursor-pointer rounded border"
                  />
                  <Input
                    type="text"
                    value={customColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    placeholder="#ffffff"
                    className="font-mono text-xs"
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Input
              type="text"
              value={colorMode === 'custom' ? customColor : ''}
              onChange={(e) => handleColorChange(e.target.value)}
              placeholder="e.g., #3b82f6"
              className="flex-1 font-mono text-xs"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="flex items-center text-xs font-semibold">
          <StretchHorizontal className="mr-2 h-3 w-3" /> Padding
        </Label>
        <ToggleGroup 
          type="single" 
          value={padding} 
          onValueChange={(v) => updateBlock(blockId, { padding: v })}
        >
          <ToggleGroupItem value="" aria-label="No padding">None</ToggleGroupItem>
          <ToggleGroupItem value="p-4" aria-label="Small padding">S</ToggleGroupItem>
          <ToggleGroupItem value="p-8" aria-label="Medium padding">M</ToggleGroupItem>
          <ToggleGroupItem value="p-12" aria-label="Large padding">L</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Button variant="outline" size="sm" className="w-full" onClick={handleAiStyle}>
        <Sparkles className="mr-2 h-4 w-4" /> AI Style
      </Button>
    </div>
  );
};
