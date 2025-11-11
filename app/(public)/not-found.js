import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f7f6eb] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#cbb9a4] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Không tìm thấy trang</h2>
        <p className="text-gray-600 mb-8">Trang bạn đang tìm kiếm không tồn tại.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#cbb9a4] text-white rounded-lg hover:bg-[#b5a68f] transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
