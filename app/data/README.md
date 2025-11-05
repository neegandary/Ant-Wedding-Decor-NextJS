# Portfolio Data Structure

## Files Created

### 1. `portfolioData.js`
Chứa data cho trang portfolio grid (DecorPortfolio.jsx):
- `PORTFOLIO_ITEMS_RAW`: Array chứa thông tin cơ bản của các portfolio items
- `PORTFOLIO_LIST`: Array chứa thứ tự các portfolio endpoints
- `monthToNumber()`: Helper function để convert tháng

### 2. `portfolioDetailData.js`
Chứa data chi tiết cho từng portfolio (PortfolioDetail.jsx):
- `PORTFOLIO_DETAIL_DATA`: Object chứa thông tin chi tiết của mỗi portfolio
  - title, subtitle, category
  - headerImage
  - description (mô tả dài)
  - details (concept, address, photographer)
  - contact (hotline, email)
  - tags
  - images (array các ảnh với orientation và size)

**LƯU Ý**: File này chưa hoàn chỉnh, mới có 5 portfolios đầu tiên. Bạn cần thêm các portfolios còn lại theo cùng format.

### 3. `index.js`
Export tất cả data từ một entry point duy nhất.

## Cách sử dụng

### Trong DecorPortfolio.jsx:
```javascript
import { PORTFOLIO_ITEMS_RAW, monthToNumber } from '../data/portfolioData';
```

### Trong PortfolioDetail.jsx:
```javascript
import { PORTFOLIO_DETAIL_DATA, PORTFOLIO_LIST } from '../data';
```

## Cần làm tiếp

1. **Hoàn thiện `portfolioDetailData.js`**: 
   - Thêm các portfolios còn lại (từ hieuxbrian đến ngocxshawn)
   - Copy format từ file PortfolioDetail.jsx cũ

2. **Cập nhật PortfolioDetail.jsx**:
   - Import data từ file mới
   - Xóa phần portfolioData cũ
   - Sử dụng PORTFOLIO_DETAIL_DATA và PORTFOLIO_LIST

## Template để thêm portfolio mới

```javascript
PORTFOLIO_DETAIL_DATA.endpoint_name = {
  title: 'TITLE',
  subtitle: 'Subtitle',
  category: 'CATEGORY',
  headerImage: IMAGES.image_name,
  description: `Description text...`,
  details: {
    concept: 'Concept Name',
    address: 'Nha Trang',
    photographer: 'Ant Wedding Studio'
  },
  contact: {
    hotline: '079 467 2928',
    email: 'antwedding79@gmail.com'
  },
  tags: ['Tag1', 'Tag2', 'Tag3'],
  images: [
    { src: IMAGES.image1, orientation: 'landscape', size: 'large' },
    { src: IMAGES.image2, orientation: 'portrait', size: 'medium' },
    // ...
  ]
};
```
