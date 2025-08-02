# نظام التصميم الموحد - 3legant E-Commerce

## 🎨 نظرة عامة

تم توحيد نظام التصميم بناءً على Figma Design System لضمان التناسق في جميع أنحاء التطبيق.

## 📁 الملفات

- `src/design-system.css` - نظام التصميم الموحد
- `src/index.css` - الأنماط الأساسية

## 📐 أحجام النصوص الموحدة

### Font Family
```css
--font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

### Text Sizes
```css
--text-xs: 1.2rem;    /* 12px */
--text-sm: 1.4rem;    /* 14px */
--text-base: 1.6rem;  /* 16px */
--text-lg: 1.8rem;    /* 18px */
--text-xl: 2rem;      /* 20px */
--text-2xl: 2.4rem;   /* 24px */
--text-3xl: 3rem;     /* 30px */
--text-4xl: 3.6rem;   /* 36px */
--text-5xl: 4.8rem;   /* 48px */
--text-6xl: 6rem;     /* 60px */
```

## 🎨 تسميات متغيرات الألوان الموحدة

### Primary Colors
```css
--primary-50: #f0f9ff;
--primary-100: #e0f2fe;
--primary-200: #bae6fd;
--primary-300: #7dd3fc;
--primary-400: #38bdf8;
--primary-500: #0ea5e9;
--primary-600: #0284c7;
--primary-700: #0369a1;
--primary-800: #075985;
--primary-900: #0c4a6e;
```

### Gray Colors
```css
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;
```

### Semantic Colors
```css
--success-500: #22c55e;
--success-600: #16a34a;
--warning-500: #f59e0b;
--warning-600: #d97706;
--error-500: #ef4444;
--error-600: #dc2626;
```

## 📏 المقاسات الموحدة

### Spacing Scale
```css
--space-1: 0.4rem;   /* 4px */
--space-2: 0.8rem;   /* 8px */
--space-3: 1.2rem;   /* 12px */
--space-4: 1.6rem;   /* 16px */
--space-5: 2rem;     /* 20px */
--space-6: 2.4rem;   /* 24px */
--space-8: 3.2rem;   /* 32px */
--space-10: 4rem;    /* 40px */
--space-12: 4.8rem;  /* 48px */
--space-16: 6.4rem;  /* 64px */
--space-20: 8rem;    /* 80px */
--space-24: 9.6rem;  /* 96px */
```

### Border Radius
```css
--radius-sm: 0.4rem;   /* 4px */
--radius-md: 0.8rem;   /* 8px */
--radius-lg: 1.2rem;   /* 12px */
--radius-xl: 1.6rem;   /* 16px */
--radius-2xl: 2.4rem;  /* 24px */
--radius-full: 9999px;
```

## 🔄 Responsive Font Sizes

```css
/* Mobile: 320px - 767px */
html { font-size: 56.25%; /* 1rem = 9px */ }

/* Tablet: 768px - 1023px */
html { font-size: 62.5%; /* 1rem = 10px */ }

/* Desktop: 1024px - 1279px */
html { font-size: 68.75%; /* 1rem = 11px */ }

/* Large Desktop: 1280px+ */
html { font-size: 100%; /* 1rem = 16px */ }
```

## 🎯 الاستخدام

### Typography
```html
<h1 class="text-4xl font-bold">عنوان رئيسي</h1>
<p class="text-base text-gray-600">نص عادي</p>
<span class="text-sm font-medium">نص صغير</span>
```

### Font Weights
```html
<p class="font-light">Poppins Light (300)</p>
<p class="font-normal">Poppins Regular (400)</p>
<p class="font-medium">Poppins Medium (500)</p>
<p class="font-semibold">Poppins SemiBold (600)</p>
<p class="font-bold">Poppins Bold (700)</p>
<p class="font-extrabold">Poppins ExtraBold (800)</p>
```

### Colors
```html
<div class="bg-primary-600 text-white">خلفية زرقاء</div>
<div class="text-gray-500">نص رمادي</div>
<div class="bg-success-500 text-white">نجح</div>
```

### Spacing
```html
<div class="p-6">Padding 24px</div>
<div class="px-4 py-2">Padding X: 16px, Y: 8px</div>
<div class="m-4">Margin 16px</div>
<div class="gap-6">Gap 24px</div>
```

### Buttons
```html
<button class="btn btn-primary">زر أساسي</button>
<button class="btn btn-secondary">زر ثانوي</button>
<button class="btn btn-outline">زر محيطي</button>
```

### Cards
```html
<div class="card">
  <div class="card-header">
    <h3>عنوان البطاقة</h3>
  </div>
  <div class="card-body">
    <p>محتوى البطاقة</p>
  </div>
</div>
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: `max-width: 767px`
- **Tablet**: `768px - 1023px`
- **Desktop**: `1024px - 1279px`
- **Large Desktop**: `1280px+`

### Responsive Classes
```html
<div class="hidden md:block">يظهر فقط على الشاشات المتوسطة+</div>
<div class="block md:hidden">يظهر فقط على الموبايل</div>
<div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">شبكة متجاوبة</div>
```

## 🔧 Migration Guide

### من النظام القديم إلى الجديد

#### الألوان
```css
/* القديم */
color: var(--text);
background-color: var(--bg);

/* الجديد */
color: var(--text-primary);
background-color: var(--bg-primary);
```

#### المسافات
```css
/* القديم */
padding: 3rem;

/* الجديد */
padding: var(--space-8); /* أو استخدام الكلاس p-8 */
```

#### أحجام الخطوط
```css
/* القديم */
font-size: 16px;

/* الجديد */
font-size: var(--text-base); /* أو استخدام الكلاس text-base */
```

## 🎨 الألوان المتاحة

### Primary Colors
- `primary-50` إلى `primary-900`

### Gray Colors
- `gray-50` إلى `gray-900`

### Semantic Colors
- `success-500`, `success-600`
- `warning-500`, `warning-600`
- `error-500`, `error-600`

## 📐 أحجام الخطوط

- `text-xs`: 12px
- `text-sm`: 14px
- `text-base`: 16px
- `text-lg`: 18px
- `text-xl`: 20px
- `text-2xl`: 24px
- `text-3xl`: 30px
- `text-4xl`: 36px
- `text-5xl`: 48px
- `text-6xl`: 60px

## 🔤 Font Weights

- `font-light`: 300 (Light)
- `font-normal`: 400 (Regular)
- `font-medium`: 500 (Medium)
- `font-semibold`: 600 (SemiBold)
- `font-bold`: 700 (Bold)
- `font-extrabold`: 800 (ExtraBold)

## 🔄 Transitions

- `transition`: 0.3s ease-in-out
- `transition-fast`: 0.15s ease-in-out
- `transition-slow`: 0.5s ease-in-out
- `transition-colors`: للألوان فقط
- `transition-transform`: للتحويلات فقط 