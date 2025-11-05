'use client';

import { useState } from 'react';

export default function ImageUploader({ label, value, onChange, required = false, helperText = '' }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || '');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  // Hàm resize và chuyển đổi ảnh sang WebP
  const processImage = async (file, maxSizeMB = 5, quality = 0.85, maxWidth = 1920) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        
        img.onload = () => {
          // Tính toán kích thước mới
          let width = img.width;
          let height = img.height;
          
          // Resize nếu ảnh quá lớn
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          
          // Tạo canvas để xử lý ảnh
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Chuyển đổi sang WebP với quality
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Không thể xử lý ảnh'));
                return;
              }
              
              // Kiểm tra kích thước sau khi xử lý
              const sizeMB = blob.size / (1024 * 1024);
              
              if (sizeMB > maxSizeMB) {
                // Nếu vẫn còn lớn, giảm quality
                const newQuality = quality * (maxSizeMB / sizeMB) * 0.9;
                
                canvas.toBlob(
                  (newBlob) => {
                    if (!newBlob) {
                      reject(new Error('Không thể xử lý ảnh'));
                      return;
                    }
                    
                    // Tạo File object mới với tên .webp
                    const fileName = file.name.replace(/\.[^/.]+$/, '.webp');
                    const webpFile = new File([newBlob], fileName, { type: 'image/webp' });
                    resolve(webpFile);
                  },
                  'image/webp',
                  Math.max(0.5, newQuality)
                );
              } else {
                // Tạo File object mới với tên .webp
                const fileName = file.name.replace(/\.[^/.]+$/, '.webp');
                const webpFile = new File([blob], fileName, { type: 'image/webp' });
                resolve(webpFile);
              }
            },
            'image/webp',
            quality
          );
        };
        
        img.onerror = () => {
          reject(new Error('Không thể đọc ảnh'));
        };
        
        img.src = e.target.result;
      };
      
      reader.onerror = () => {
        reject(new Error('Không thể đọc file'));
      };
      
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn file ảnh');
      return;
    }

    setError('');
    setProcessing(true);

    try {
      // Xử lý ảnh: resize và chuyển sang WebP
      const processedFile = await processImage(file);
      
      const sizeMB = (processedFile.size / (1024 * 1024)).toFixed(2);
      console.log(`✅ Đã xử lý ảnh: ${file.name} → ${processedFile.name} (${sizeMB}MB)`);
      
      setProcessing(false);
      setUploading(true);

      // Create FormData với ảnh đã xử lý
      const formData = new FormData();
      formData.append('file', processedFile);

      // Upload to API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      // Update preview and value
      setPreview(data.url);
      onChange({ target: { value: data.url } });
    } catch (err) {
      setError(err.message || 'Lỗi khi xử lý/upload ảnh. Vui lòng thử lại.');
      console.error('Upload error:', err);
    } finally {
      setProcessing(false);
      setUploading(false);
    }
  };



  const handleRemove = () => {
    setPreview('');
    onChange({ target: { value: '' } });
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && '*'}
      </label>

      {/* Preview */}
      {preview && (
        <div className="mb-4 relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Upload Button */}
      <label className="block cursor-pointer">
        <div className={`
          flex items-center justify-center px-4 py-8 border-2 border-dashed rounded-lg
          transition-all duration-200
          ${(uploading || processing) ? 'border-gray-300 bg-gray-50 cursor-not-allowed' : 'border-teal-300 hover:border-teal-500 hover:bg-teal-50'}
        `}>
          {processing ? (
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-8 w-8 mb-2 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm text-blue-600 font-medium">Đang xử lý ảnh...</span>
              <span className="text-xs text-gray-500 mt-1">Resize & chuyển sang WebP</span>
            </div>
          ) : uploading ? (
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-8 w-8 mb-2 text-teal-700" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm text-gray-600 font-medium">Đang upload...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 mb-3 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-sm font-semibold text-teal-700 mb-1">Click để upload ảnh</span>
              <span className="text-xs text-gray-500">hoặc kéo thả file vào đây</span>
              <span className="text-xs text-blue-600 mt-2 font-medium">✨ Auto resize & WebP</span>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading || processing}
          className="hidden"
          required={required && !preview}
        />
      </label>

      {/* Helper Text */}
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">
          {helperText}
          <span className="block text-blue-600 mt-1">
            💡 Ảnh sẽ tự động được resize và chuyển sang WebP để tối ưu dung lượng
          </span>
        </p>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-2 flex items-center text-red-600 text-sm">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}
