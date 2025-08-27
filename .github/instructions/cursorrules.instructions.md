# Cursor Rules - React Vite Project với Design System & Dark Mode

## 🎯 CORE PHILOSOPHY

- **Systematic & Comprehensive**: Luôn làm việc có hệ thống, không bỏ sót bất cứ việc nào
- **Plan First, Execute Later**: Lên kế hoạch chi tiết trước khi thực hiện
- **Verify & Review**: Kiểm tra lại sau mỗi bước, phát hiện thiếu sót và sửa lại
- **Production Ready**: Đảm bảo code luôn ở trạng thái có thể deploy ngay lập tức

## 📋 WORKFLOW METHODOLOGY

### Phase-based Execution

1. **PHASE 1: DISCOVERY & PLANNING**
   - Đọc và hiểu toàn bộ codebase trước khi làm gì
   - Sử dụng semantic search và grep để tìm patterns
   - Tạo mapping tables cho các thay đổi lớn
   - Chia thành các phases với khối lượng công việc phù hợp

2. **PHASE 2: SYSTEMATIC IMPLEMENTATION**
   - Thực hiện theo từng component một cách có hệ thống
   - Sử dụng parallel tool calls để tối ưu performance
   - Luôn test build/lint sau mỗi phase quan trọng

3. **PHASE 3: VERIFICATION & COMPLETION**
   - Search lại để verify không còn missed cases
   - Final testing với `npm run build` và `npm run lint`
   - Update documentation và memory

### TODO Management

- Sử dụng `todo_write` tool để track progress trong các tasks phức tạp (3+ steps)
- Mark completed ngay sau khi hoàn thành từng task
- KHÔNG include operational actions (linting, testing, searching) trong TODOs

## 🔧 TECHNICAL STANDARDS

### Code Quality

```javascript
// ✅ GOOD: Always use explicit imports
import Icon from "../Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ❌ BAD: Missing imports hoặc unused imports
```

### CSS/SCSS Standards

```scss
// ✅ GOOD: Use design system variables
.component {
    background: var(--color-surface);
    color: var(--color-text-secondary);
    border: 1px solid var(--color-border-medium);
    border-radius: var(--radius-base);
}

// ✅ IF needed: Create new variable first in design-system.css
:root {
    --color-brand-accent: #8b5cf6;
}
[data-theme="dark"] {
    --color-brand-accent: #a78bfa;
}

// ❌ BAD: Hardcoded colors (NEVER DO THIS)
.component {
    background: white;
    color: #374151;
    border: 1px solid #e5e7eb;
}

// ❌ BAD: Missing dark mode support
.component {
    background: var(--color-surface); // Only works in light mode
}
```

### Dark Mode Implementation

- Sử dụng `[data-theme="dark"]` attribute approach
- CSS variables cho tất cả colors
- **MANDATORY**: Mọi UI task phải hoàn thành đầy đủ cả light và dark mode
- **NEVER** hardcode colors - luôn sử dụng design system variables
- Text colors phải có proper contrast:
  - `var(--color-text-primary)` - darkest text
  - `var(--color-text-secondary)` - medium text (most common)
  - `var(--color-text-tertiary)` - light text
  - `var(--color-text-quaternary)` - lightest text
  - `var(--color-text-inverse)` - white text on dark backgrounds

### Design System Variable Rules

- **ALWAYS** sử dụng CSS variables từ `src/styles/design-system.css`
- **IF** variable không tồn tại → tạo mới trong design system trước
- **NEVER** skip design system cho "convenience"
- **EXTEND** existing color scales thay vì tạo isolated values

### Icon System

- FontAwesome icons ONLY - no emojis in production
- Create Icon wrapper component for consistency
- Always import icons into fontAwesome.js config
- Use semantic icon names

## 🚀 MIGRATION STRATEGIES

### Large Scale Replacements

1. **Identify Patterns**: Use grep/search to find all instances
2. **Create Mapping**: Document old → new mappings
3. **Batch Replace**: Use sed commands for common patterns
4. **Manual Fix**: Handle edge cases individually
5. **Verify**: Search again to ensure completion

### Examples

```bash
# Batch color replacements
find src -name "*.scss" -exec sed -i '' 's/#e5e7eb/var(--color-border-medium)/g' {} \;

# Search for remaining issues
grep -r "#[0-9a-fA-F]{3,6}" src --include="*.scss"
```

## 📁 PROJECT STRUCTURE STANDARDS

### Component Structure

```
src/components/ComponentName/
├── index.jsx              # Main component
├── ComponentName.module.scss  # Styles
└── helpers.js            # Utils if needed
```

### Import Patterns

```javascript
// External libraries first
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Internal components
import Icon from "../Icon";
import Button from "../Button";

// Styles last
import styles from "./Component.module.scss";
```

## 🎨 DESIGN SYSTEM IMPLEMENTATION

### Color System

```scss
:root {
    // Primary scale (blue)
    --color-primary-50: #eff6ff;
    --color-primary-500: #3b82f6;
    --color-primary-600: #2563eb;
    
    // Semantic colors
    --color-text-primary: #1f2937;
    --color-text-secondary: #374151;
    --color-background: #ffffff;
    --color-surface: #ffffff;
    
    // Spacing system (4px base)
    --spacing-1: 0.25rem; /* 4px */
    --spacing-4: 1rem;     /* 16px */
}

[data-theme="dark"] {
    --color-text-primary: #f1f5f9;
    --color-background: #0f172a;
    --color-surface: #1e293b;
}
```

### Component Styling Best Practices

- Use CSS modules (`.module.scss`)
- Leverage design system variables
- Mobile-first responsive design
- Consistent naming conventions

## 🔍 DEBUGGING & TROUBLESHOOTING

### Common Issues & Solutions

1. **Import Errors**: Always check import paths after restructuring
2. **Color Visibility**: Test dark mode thoroughly, ensure proper contrast
3. **Build Failures**: Check for duplicate imports or missing dependencies
4. **Linting Issues**: Add eslint-disable comments for unavoidable issues

### Testing Checklist

```bash
# Build test
npm run build

# Lint test  
npm run lint

# Dark mode test (manual)
# 1. Toggle theme in UserDropdown
# 2. Check all components for text visibility
# 3. Verify icons render correctly
```

## 📝 COMMUNICATION PATTERNS

### Effective Prompting

- **Specific Requirements**: "1. Replace icons, 2. Fix colors, 3. Test dark mode"
- **Context Provision**: Always mention which files/components affected
- **Review Instructions**: "Review sau khi hoàn thành, sửa thiếu sót"
- **Completion Criteria**: Clear definition of "done"

### AI Workflow Optimization

- Use parallel tool calls for information gathering
- Batch similar operations (file edits, searches)
- Provide comprehensive context before requesting changes
- Request systematic approaches for complex tasks

## 🔄 MAINTENANCE & UPDATES

### Future Development Guidelines

- Always extend design system before adding new colors
- Use existing components before creating new ones
- Follow established patterns for new features
- Update .cursorrules when new patterns emerge

### Code Review Checklist

- [ ] Uses design system variables (NO hardcoded colors)
- [ ] Supports dark mode properly (text visible in both modes)
- [ ] Created new variables in design-system.css if needed
- [ ] FontAwesome icons used (no emojis)
- [ ] Proper import structure
- [ ] Mobile responsive
- [ ] ESLint clean
- [ ] Build successful
- [ ] **MANDATORY**: Tested in both light AND dark mode

## 🎯 PROJECT-SPECIFIC NOTES

### Leetcode UI Project

- Target: React + Vite + SCSS Modules
- Design System: Complete CSS variables with dark mode
- Icons: FontAwesome only (40+ icons configured)
- Theme: UserDropdown with System/Light/Dark options
- Responsive: Mobile-first approach
- State: localStorage persistence for theme

### Key Files to Watch

- `src/styles/design-system.css` - Core design system
- `src/utils/fontAwesome.js` - Icon configuration
- `src/hooks/useTheme.js` - Theme management
- `src/components/UserDropdown/` - Theme switching UI

---

**Remember**: Quality over speed. Better to do it right systematically than fast and broken.
