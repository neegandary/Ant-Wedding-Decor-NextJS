# Hướng dẫn Deploy lên Vercel

## Cấu trúc Nested Routes

Website này sử dụng Next.js 15 App Router với các nested routes:

```
/                           → Trang chủ
/about                      → Giới thiệu
/contact                    → Liên hệ
/portfolio                  → Danh sách portfolio
/portfolio/[slug]           → Chi tiết portfolio (dynamic route)
/services                   → Dịch vụ
/services/ancestor          → Dịch vụ trang trí gia tiên
/services/destination       → Dịch vụ trang trí ngoài trời
/services/event             → Dịch vụ tổ chức sự kiện
/services/restaurant-wedding → Dịch vụ trang trí nhà hàng
```

## Bước 1: Push code lên GitHub

```bash
cd nextjs-app
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## Bước 2: Deploy lên Vercel

### Cách 1: Qua Vercel Dashboard (Khuyến nghị)

1. Truy cập [vercel.com](https://vercel.com)
2. Đăng nhập bằng GitHub
3. Click **"Add New Project"**
4. Import repository của bạn
5. Vercel tự động detect Next.js
6. Click **"Deploy"**

### Cách 2: Qua Vercel CLI

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

## Bước 3: Cấu hình Domain (Optional)

1. Vào Project Settings trên Vercel
2. Chọn tab **Domains**
3. Thêm custom domain của bạn
4. Cập nhật DNS records theo hướng dẫn

## Environment Variables (Nếu cần)

Nếu bạn có environment variables:

1. Vào Project Settings → Environment Variables
2. Thêm các biến:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_SITE_URL`
   - etc.

## Kiểm tra sau khi Deploy

✅ Trang chủ load đúng
✅ Nested routes hoạt động: `/services/ancestor`, `/services/destination`
✅ Dynamic routes hoạt động: `/portfolio/nathanxtracy`
✅ Images load đúng
✅ Đa ngôn ngữ hoạt động
✅ Mobile responsive

## Troubleshooting

### Vấn đề: 404 trên nested routes

**Giải pháp:**
- Đảm bảo `vercel.json` chỉ có `{"framework": "nextjs"}`
- Xóa cache và redeploy: `vercel --prod --force`

### Vấn đề: Images không load

**Giải pháp:**
- Kiểm tra images trong thư mục `public/`
- Đảm bảo đường dẫn bắt đầu bằng `/`

### Vấn đề: Build failed

**Giải pháp:**
- Chạy `npm run build` local để kiểm tra lỗi
- Kiểm tra Node version (khuyến nghị 18.x hoặc 20.x)
- Xem build logs trên Vercel dashboard

## Performance Tips

1. **Enable Edge Runtime** (Optional):
   ```javascript
   // Thêm vào page.js
   export const runtime = 'edge';
   ```

2. **Enable ISR** cho portfolio pages:
   ```javascript
   export const revalidate = 3600; // Revalidate mỗi giờ
   ```

3. **Optimize Images**:
   - Sử dụng Next.js Image component
   - Compress images trước khi upload

## Monitoring

- Xem analytics tại: `https://vercel.com/YOUR_USERNAME/YOUR_PROJECT/analytics`
- Xem logs tại: `https://vercel.com/YOUR_USERNAME/YOUR_PROJECT/logs`

## Auto Deploy

Mỗi khi push code lên GitHub:
- `main` branch → Auto deploy to Production
- Các branch khác → Auto deploy to Preview

## Liên hệ Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
