# CSS Structure Documentation

## Overview
The CSS has been reorganized from one massive file into multiple focused, maintainable files.

## File Structure

### 1. Core Layout (`src/Pages/home/Home.module.css`)
- **Purpose**: Core home page layout and section spacing
- **Contains**: 
  - `.homeContainer` - Main container
  - `.sectionContainer` - Section spacing and responsive breakpoints
  - Basic animations and accessibility

### 2. Shared Section Styles (`src/Components/shared/SectionStyles.module.css`)
- **Purpose**: Common styles used by all home page components
- **Contains**:
  - `.sectionHeader` - Section titles and headers
  - `.sectionTitle` - Title styling
  - `.loadingContainer` - Loading states
  - `.errorContainer` - Error states
  - Hover effects and accessibility

### 3. Product Grid (`src/Components/products/ProductGrid.module.css`)
- **Purpose**: Shared product grid layout for Products, BestSellers, and JustIn
- **Contains**:
  - `.productGrid` - 4-column grid layout
  - `.productGridWide` - Alternative grid layout
  - Responsive breakpoints (4→3→2→1 columns)
  - `.viewMoreBtn` - View more button styling

### 4. Categories Home (`src/Components/Categories/CategoriesHome.module.css`)
- **Purpose**: Specific styling for Categories component in home page
- **Contains**:
  - Categories grid layout
  - Responsive category sizing
  - Category card positioning

## Usage in Components

### Products Component
```javascript
import sectionStyles from "../../shared/SectionStyles.module.css";
import gridStyles from "../ProductGrid.module.css";

// Use sectionStyles for headers, loading, errors
// Use gridStyles for product grid layout
```

### BestSellers Component
```javascript
import sectionStyles from "../../shared/SectionStyles.module.css";
import gridStyles from "../ProductGrid.module.css";

// Same pattern as Products
```

### JustIn Component
```javascript
import sectionStyles from "../../shared/SectionStyles.module.css";
import gridStyles from "../ProductGrid.module.css";

// Same pattern as Products
```

## Benefits of New Structure

1. **Maintainability**: Each file has a single responsibility
2. **Reusability**: Shared styles can be imported by multiple components
3. **Organization**: Easy to find and modify specific styles
4. **Performance**: Smaller CSS bundles
5. **Team Collaboration**: Multiple developers can work on different files

## Responsive Breakpoints

### Product Grid
- **1400px+**: 4 columns
- **992px+**: 3 columns  
- **768px+**: 2 columns
- **576px+**: 2 columns (mobile)
- **480px+**: 1 column (small mobile)

### Categories
- **1400px+**: 4 columns
- **700px+**: 3 columns
- **Below 700px**: Responsive sizing

## CSS Variables Used
- `--text-primary`: Main text color
- `--primary-600`: Primary button color
- `--primary-700`: Primary button hover color
- `--error-600`: Error text color
- `--gray-300`, `--gray-400`: Gray shades

## Future Improvements
- Consider using CSS-in-JS for dynamic styles
- Implement CSS modules with TypeScript
- Add CSS linting and formatting rules
