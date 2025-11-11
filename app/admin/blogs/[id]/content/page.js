'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

const BlogPageBuilder = dynamic(() => import('@/app/components/blog-editor/BlogPageBuilder').then(mod => ({ default: mod.BlogPageBuilder })), { ssr: false });
const Toast = dynamic(() => import('@/app/components/Toast'), { ssr: false });

export default function EditBlogContent() {
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
      
      setFormData({
        ...data.blog,
        contentBlocks: data.blog.contentBlocks || [],
        contentVersion: data.blog.contentVersion || 'blocks',
      });
    } catch (err) {
      console.error('Fetch blog error:', err);
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        contentBlocks: formData.contentBlocks,
        contentVersion: 'blocks',
      };

      const res = await fetch(`/api/admin/blogs/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra');
      }

      setToast({ message: 'Cập nhật nội dung thành công!', type: 'success' });
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
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session || !formData) return null;

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <BlogPageBuilder
        initialBlocks={formData.contentBlocks || []}
        onChange={handleBlocksChange}
        onPublish={handleSubmit}
        publishLabel="Cập nhật nội dung"
        isPublishing={saving}
        slug={formData.slug}
        backUrl={`/admin/blogs/${params.id}/edit`}
      />
    </>
  );
}
