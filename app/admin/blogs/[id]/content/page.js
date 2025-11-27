'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

const BlogPageBuilder = dynamic(() => import('@/app/components/blog-editor/BlogPageBuilder').then(mod => ({ default: mod.BlogPageBuilder })), { ssr: false });
const Toast = dynamic(() => import('@/app/components/Toast'), { ssr: false });

export default function EditBlogContent() {
  const { t } = useTranslation();
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session && params.id) {
      fetchBlog();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, params.id]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/admin/blogs/${params.id}`);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      // Support both old format (contentBlocks) and new format (content.vi/en)
      let contentBlocksVi = [];
      let contentBlocksEn = [];
      
      // Check if content is an object with vi/en
      if (data.blog.content && typeof data.blog.content === 'object' && !Array.isArray(data.blog.content)) {
        contentBlocksVi = data.blog.content.vi?.blocks || [];
        contentBlocksEn = data.blog.content.en?.blocks || [];
      } 
      // Fallback to old format
      else {
        contentBlocksVi = data.blog.contentBlocks || [];
        contentBlocksEn = [];
      }
      
      setFormData({
        ...data.blog,
        contentBlocksVi,
        contentBlocksEn,
        contentVersion: 'blocks',
      });
    } catch (err) {
      console.error('Fetch blog error:', err);
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e, allBlocks) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        content: {
          vi: { blocks: allBlocks.vi },
          en: { blocks: allBlocks.en }
        },
        contentVersion: 'blocks',
      };

      const res = await fetch(`/api/admin/blogs/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t('updateError'));
      }

      setToast({ message: t('updateSuccess'), type: 'success' });
    } catch (err) {
      console.error('Save error:', err);
      setToast({ message: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleBlocksChange = useCallback((blocks) => {
    setFormData(prev => ({ ...prev, contentBlocks: blocks, contentVersion: 'blocks' }));
  }, []);

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center">{t('loading')}</div>;
  }

  if (!session || !formData) return null;

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <BlogPageBuilder
        initialBlocks={formData.contentBlocksVi || []}
        initialBlocksEn={formData.contentBlocksEn || []}
        onChange={handleBlocksChange}
        onPublish={handleSubmit}
        publishLabel={t('updateContent')}
        isPublishing={saving}
        slug={formData.slug}
        backUrl={`/admin/blogs/${params.id}/edit`}
      />
    </>
  );
}
