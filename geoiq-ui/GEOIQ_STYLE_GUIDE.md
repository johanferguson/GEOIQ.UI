# GEOIQ Dashboard Style Guide - 2024 Edition

## 🎨 Color Palette

### Primary Colors (60-30-10 Rule)
- **60% White (#FFFFFF)**: Main backgrounds, card backgrounds, content areas
- **30% Deep Royal Purple (#390099)**: Primary UI elements, most icons, main statistics, navigation active states
- **10% Accent Colors**: Strategic highlights for variety and hierarchy

### GEOIQ Brand Colors
```css
--deep-royal-purple: #390099    /* Primary color - 30% usage */
--rich-magenta: #9E0059         /* Card headings, secondary elements */
--vivid-pink: #FF0054           /* Accent highlights, special elements */
--bright-orange: #FF5400        /* Accent highlights */
--golden-yellow: #FFBD00        /* Accent highlights */
```

### Semantic Colors
```css
--success-green: #16a34a        /* Positive changes, success states */
--danger-red: #dc2626           /* Negative changes, error states */
--neutral-gray: #6b7280         /* Neutral states */
--text-dark: #1f2937           /* Primary text */
--text-medium: #4b5563         /* Secondary text */
--text-light: #64748b          /* Tertiary text (updated for better contrast) */
```

### Company & Brand Colors
```css
--brand-purple: #8B5CF6         /* Default brand color option */
--brand-pink: #EC4899           /* Brand color option */
--brand-green: #10B981          /* Brand color option */
--brand-yellow: #F59E0B         /* Brand color option */
--brand-red: #EF4444            /* Brand color option */
--brand-blue: #3B82F6           /* Brand color option */
--brand-brown: #8B5A2B          /* Brand color option */
--brand-indigo: #6366F1         /* Brand color option */
--brand-lime: #84CC16           /* Brand color option */
--brand-orange: #F97316         /* Brand color option */
--brand-cyan: #06B6D4           /* Brand color option */
--brand-violet: #A855F7         /* Brand color option */
```

## 🔤 Typography

### Font Family
- **Primary**: Roboto (Google Fonts)
- **Fallback**: sans-serif

### Font Weights
- **Normal (400)**: Card headings, navigation items, body text, form labels
- **Medium (500)**: Statistics numbers, section titles, buttons, chart titles, field labels
- **Bold (700)**: Only for special emphasis (use sparingly)

### Font Sizes (Unified System)
```css
--text-xs: 12px     /* Change indicators, chart labels, timestamps, descriptions, form help text */
--text-sm: 14px     /* Stat card headings, supporting text, action card titles, form labels, field values */
--text-base: 16px   /* Body text, navigation, form inputs */
--text-lg: 18px     /* Chart titles, page section headers */
--text-xl: 20px     /* Statistics numbers, page titles */
--text-2xl: 24px    /* Major page headers, modal titles */
```

### Text Colors (Unified System)
```css
--heading-color: #9E0059        /* Card headings, chart titles, field labels */
--title-color: #374151          /* Page titles, section headers */
--body-color: #4b5563           /* Regular text, form inputs */
--stats-color: #390099          /* Primary statistics, primary buttons */
--accent-stats: #FF0054 | #FFBD00  /* Accent statistics, status indicators */
--action-title: #390099         /* Action card titles, form buttons */
--action-description: #6b7280   /* Action card descriptions, help text */
--placeholder-color: #9ca3af    /* Form placeholders, empty states */
--disabled-color: #d1d5db       /* Disabled form elements */
```

## 🎯 Layout Principles

### Unified Spacing System
```css
--space-1: 4px      /* Tight spacing - form element borders */
--space-1-5: 6px    /* Extra tight - button padding, small gaps */
--space-2: 8px      /* Small spacing - icon containers, form field padding */
--space-3: 12px     /* Medium spacing - action card gaps, form group spacing */
--space-4: 16px     /* Default spacing - stat cards, action cards, form sections */
--space-5: 20px     /* Medium-large spacing */
--space-6: 24px     /* Large spacing - chart cards, page sections */
--space-8: 32px     /* Extra large spacing - page margins */
```

### Layout Containers
```css
/* Page Container (Company & Brands style) */
.page-container {
  width: 70%;
  max-width: none;
  margin: 0 auto;
  padding: 0;
}

/* Dashboard Container (Full width) */
.dashboard-container {
  width: 100%;
  max-width: none;
  padding: 0 24px;
}
```

### Grid Systems
```css
/* Brand Grid (Responsive) */
.brand-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
}

@media (min-width: 768px) {
  .brand-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .brand-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Form Grid (Two-column layout) */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}
```

## 📦 Component Styles

### Universal Card System (geoiq-card)
```css
.geoiq-card {
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  font-family: 'Roboto', sans-serif;
}

.geoiq-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Card variants */
.geoiq-card-interactive {
  cursor: pointer;
  transition: all 0.2s ease;
}

.geoiq-card-interactive:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.geoiq-card-gradient {
  background: linear-gradient(to bottom right, white, #f8fafc);
  border: none;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### Statistics Cards (Dashboard)
```css
.stat-card {
  /* Uses .geoiq-card base styles */
  padding: 16px; /* p-4 */
  gap: 16px; /* gap-4 */
}

.stat-heading {
  font-weight: 400; /* Normal */
  font-size: 14px; /* text-sm */
  color: #9E0059;
  margin-bottom: 4px;
}

.stat-value {
  font-weight: 500; /* Medium */
  font-size: 20px; /* text-xl */
  color: #390099; /* Primary stat color */
  margin: 4px 0;
}

.stat-change {
  font-size: 12px; /* text-xs */
  margin-top: 4px;
  /* Color based on change type: green for positive, red for negative */
}

.stat-icon {
  width: 20px; /* w-5 h-5 */
  height: 20px;
  color: #390099; /* Primary color for most icons */
}

.stat-icon-background {
  padding: 8px; /* p-2 */
  border-radius: 8px;
  background-color: rgba(57, 0, 153, 0.1); /* Primary color with 10% opacity */
}
```

### Brand Cards (Company & Brands)
```css
.brand-card {
  /* Uses .geoiq-card base styles */
  padding: 24px; /* p-6 */
  cursor: pointer;
  position: relative;
  transition: box-shadow 0.2s ease;
}

.brand-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.brand-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.brand-icon-container {
  padding: 8px;
  border-radius: 8px;
  /* Background color: brand color + '20' (20% opacity) */
}

.brand-icon {
  width: 16px; /* w-4 h-4 */
  height: 16px;
  /* Color: brand color */
}

.brand-title {
  font-size: 14px; /* text-sm */
  font-weight: 500; /* Medium */
  color: #1f2937;
  margin-bottom: 2px;
}

.brand-date {
  font-size: 12px; /* text-xs */
  color: #6b7280;
}

.brand-description {
  font-size: 12px; /* text-xs */
  color: #4b5563;
  margin-bottom: 16px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.brand-benefits-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.brand-benefits-icon {
  width: 14px; /* w-3.5 h-3.5 */
  height: 14px;
  color: #390099;
}

.brand-benefits-title {
  font-size: 12px; /* text-xs */
  font-weight: 500; /* Medium */
  color: #9E0059;
}

.brand-benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 6px;
}

.brand-benefit-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
  /* Background color: brand color */
}

.brand-benefit-text {
  font-size: 12px; /* text-xs */
  color: #4b5563;
  line-height: 1.5;
}

.brand-status-indicator {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 8px;
  height: 8px;
  background-color: #4ade80; /* Green for active */
  border-radius: 50%;
  opacity: 0.6;
}
```

### Form Components (Unified System)
```css
/* Form Field Row (Two-column layout) */
.form-field-row {
  /* Uses .geoiq-card base styles */
  padding: 24px; /* p-6 */
}

.form-field-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}

/* Left Column - Label with Icon */
.form-field-label-column {
  display: flex;
  align-items: center;
  gap: 12px;
}

.form-field-icon-container {
  padding: 8px;
  border-radius: 8px;
  background-color: rgba(57, 0, 153, 0.125); /* #39009920 */
  flex-shrink: 0;
}

.form-field-icon {
  width: 16px; /* w-4 h-4 */
  height: 16px;
  color: #390099;
}

.form-field-label-group {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1;
}

.form-field-label {
  font-size: 14px; /* text-sm */
  font-weight: 500; /* Medium */
  color: #9E0059;
}

.form-field-edit-button {
  padding: 4px;
  color: #9ca3af;
  border-radius: 4px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.form-field-edit-button:hover {
  color: #390099;
  background-color: #f9fafb;
}

.form-field-edit-icon {
  width: 14px; /* w-3.5 h-3.5 */
  height: 14px;
}

/* Right Column - Value or Input */
.form-field-value-column {
  min-width: 0;
}

.form-field-value {
  font-size: 14px; /* text-sm */
  color: #1f2937;
  word-break: break-words;
  line-height: 1.5;
}

.form-field-value-empty {
  color: #9ca3af;
  font-style: italic;
}

/* Form Inputs */
.form-input {
  width: 100%;
  padding: 8px 12px;
  font-size: 14px; /* text-sm */
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;
  font-family: 'Roboto', sans-serif;
}

.form-input:focus {
  border-color: #390099;
  box-shadow: 0 0 0 1px rgba(57, 0, 153, 0.2);
}

.form-textarea {
  /* Extends .form-input */
  resize: none;
  min-height: 96px; /* 4 rows */
}

/* Form Buttons */
.form-button-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}

.form-button-primary {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background-color: #390099;
  color: white;
  border-radius: 6px;
  font-size: 12px; /* text-xs */
  font-weight: 500; /* Medium */
  transition: all 0.2s ease;
  border: none;
}

.form-button-primary:hover {
  background-color: rgba(57, 0, 153, 0.9);
}

.form-button-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-button-secondary {
  padding: 6px 12px;
  color: #4b5563;
  background: transparent;
  border: none;
  border-radius: 6px;
  font-size: 12px; /* text-xs */
  font-weight: 500; /* Medium */
  transition: color 0.2s ease;
}

.form-button-secondary:hover {
  color: #1f2937;
}

/* Loading Spinner */
.form-loading-spinner {
  width: 12px;
  height: 12px;
  border: 1px solid white;
  border-top: 1px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

### Navigation & Tabs
```css
/* Page Navigation Tabs */
.nav-tabs {
  border-bottom: 1px solid #e5e7eb;
}

.nav-tab-group {
  display: flex;
  gap: 32px; /* space-x-8 */
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 4px;
  border-bottom: 2px solid transparent;
  font-size: 14px; /* text-sm */
  font-weight: 500; /* Medium */
  transition: all 0.2s ease;
  font-family: 'Roboto', sans-serif;
}

.nav-tab-active {
  border-bottom-color: #390099;
  color: #390099;
}

.nav-tab-inactive {
  color: #6b7280;
}

.nav-tab-inactive:hover {
  color: #374151;
  border-bottom-color: #d1d5db;
}

.nav-tab-icon {
  width: 16px; /* w-4 h-4 */
  height: 16px;
}

/* Sidebar Navigation */
.nav-item {
  font-family: 'Roboto', sans-serif;
  font-weight: 500; /* Medium */
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-item-active {
  background: linear-gradient(to right, rgba(147, 51, 234, 0.1), rgba(147, 51, 234, 0.2));
  border-right: 4px solid #390099;
  color: #1f2937;
}

.nav-icon {
  width: 20px;
  height: 20px;
  color: #390099; /* Most icons use primary color */
}

.nav-icon-accent {
  /* Only for special items */
  color: #FF0054; /* Vivid Pink */
  color: #FFBD00; /* Golden Yellow */
}
```

### Quick Action Cards
```css
.action-card {
  /* Uses .geoiq-card base styles */
  padding: 16px; /* p-4 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px; /* gap-3 */
  cursor: pointer;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.action-content {
  flex: 1;
}

.action-title {
  font-weight: 500; /* Medium */
  font-size: 14px; /* text-sm */
  color: #390099; /* Primary brand color */
  margin-bottom: 4px;
}

.action-description {
  font-weight: 400; /* Normal */
  font-size: 12px; /* text-xs */
  color: #6b7280; /* Neutral gray */
  line-height: 1.4;
}

.action-icon {
  width: 20px; /* w-5 h-5 */
  height: 20px;
  color: #390099; /* Primary color */
  flex-shrink: 0;
}
```

### Buttons (Unified System)
```css
.geoiq-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(to right, #390099, #9E0059);
  color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  transition: all 0.3s ease;
  transform: scale(1);
  cursor: pointer;
}

.geoiq-btn-primary:hover {
  transform: scale(1.02);
  background: linear-gradient(to right, #300080, #850048);
}

.geoiq-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: white;
  color: #390099;
  border: 1px solid #390099;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 14px;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.geoiq-btn-secondary:hover {
  background: #390099;
  color: white;
}

.geoiq-btn-small {
  padding: 6px 12px;
  font-size: 12px; /* text-xs */
}

.geoiq-btn-large {
  padding: 12px 24px;
  font-size: 16px; /* text-base */
}
```

### Loading & Empty States
```css
/* Loading Spinner */
.loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #390099;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-spinner-sm {
  width: 16px;
  height: 16px;
  border-width: 1px;
}

.loading-spinner-lg {
  width: 32px;
  height: 32px;
  border-width: 3px;
}

/* Empty State */
.empty-state {
  /* Uses .geoiq-card-gradient base styles */
  padding: 32px;
  text-align: center;
}

.empty-state-icon-container {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(57, 0, 153, 0.1);
}

.empty-state-icon {
  width: 24px;
  height: 24px;
  color: #390099;
}

.empty-state-title {
  font-size: 14px; /* text-sm */
  font-weight: 500; /* Medium */
  color: #1f2937;
  margin-bottom: 8px;
}

.empty-state-description {
  font-size: 12px; /* text-xs */
  color: #4b5563;
  margin-bottom: 16px;
  max-width: 384px; /* max-w-sm */
  margin-left: auto;
  margin-right: auto;
}
```

### Chart Cards (Modern Design)
```css
.chart-card {
  background: linear-gradient(to bottom right, white, #f8fafc); /* Subtle gradient backgrounds */
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: none; /* border-0 */
  padding: 24px; /* p-6 */
  transition: all 0.3s ease;
}

/* Visibility chart specific */
.chart-card-visibility {
  background: linear-gradient(to bottom right, white, #f1f5f9);
  box-shadow: 0 10px 15px -3px rgba(148, 163, 184, 0.1);
}

/* Brand mentions chart specific */
.chart-card-mentions {
  background: linear-gradient(to bottom right, white, #fffbeb);
  box-shadow: 0 10px 15px -3px rgba(251, 191, 36, 0.1);
}
```

## 📊 Chart Color Schemes & Effects

### Area Charts (Visibility Trend)
- **Stroke**: Horizontal gradient from #FF0054 to #FF5400 to #FFBD00
- **Stroke Width**: 2px (refined, not too bold)
- **Fill Gradient**: Vertical gradient with multiple stops
  ```css
  stop-color: #FF0054, opacity: 0.3 (top)
  stop-color: #FF5400, opacity: 0.15 (middle)  
  stop-color: #FFBD00, opacity: 0.05 (bottom)
  ```
- **Dots**: #FF0054 with white stroke
- **Active Dots**: Larger with enhanced styling

### Bar Charts (Brand Mentions)
- **Fill**: Vertical gradient with transparency fadeout
  ```css
  stop-color: #FFBD00, opacity: 0.6 (top)
  stop-color: #FF5400, opacity: 0.4 (middle)
  stop-color: #FF0054, opacity: 0.2 (bottom)
  ```
- **Rounded Corners**: radius=[6, 6, 0, 0]
- **Glow Effect**: Subtle SVG filter

### Chart Backgrounds
- **Visibility Chart**: `from-white to-slate-50` with slate shadow
- **Mentions Chart**: `from-white to-amber-50` with amber shadow

## 🎮 Interactive Elements & Animations

### Modern Animations & Effects
```css
/* Page transitions */
.page-fade-in {
  opacity: 0;
  transform: translateY(10px);
  animation: pageFadeIn 0.4s ease-out forwards;
}

@keyframes pageFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Card hover animations */
.card-hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Button hover animations */
.button-hover-scale {
  transition: transform 0.2s ease;
}

.button-hover-scale:hover {
  transform: scale(1.02);
}

.button-hover-scale:active {
  transform: scale(0.98);
}

/* Form field focus animations */
.form-field-focus {
  transition: all 0.2s ease;
}

.form-field-focus:focus {
  transform: translateY(-1px);
}

/* Loading animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.loading-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* SVG Glow Effects */
.chart-glow-filter {
  filter: url(#glow);
}

.glow-filter-def {
  feGaussianBlur: stdDeviation="3";
}

/* Glass-morphism Effect */
.glass-effect {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}
```

## 🔧 Utility Classes

### Custom CSS Classes
```css
.geoiq-gradient {
  background: linear-gradient(135deg, #390099 0%, #9E0059 25%, #FF0054 50%, #FF5400 75%, #FFBD00 100%);
}

.geoiq-glass {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.font-roboto {
  font-family: 'Roboto', sans-serif;
}

.chart-shadow-slate {
  box-shadow: 0 10px 15px -3px rgba(148, 163, 184, 0.3);
}

.chart-shadow-amber {
  box-shadow: 0 10px 15px -3px rgba(251, 191, 36, 0.3);
}

/* Text utilities */
.text-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Status indicators */
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0.6;
}

.status-dot-green {
  background-color: #4ade80;
}

.status-dot-yellow {
  background-color: #fbbf24;
}

.status-dot-red {
  background-color: #f87171;
}
```

## 📋 Content Guidelines

### Page Structures

#### Dashboard Layout
- **Container**: Full width with 24px padding
- **Grid**: Responsive grid for cards
- **Spacing**: 16px gaps between cards

#### Company & Brands Layout
- **Container**: 70% width, centered
- **Sections**: 24px spacing between major sections
- **Forms**: Two-column grid layout
- **Cards**: 16px gaps in brand grid

### Section Headings
- **Page Titles**: Roboto Medium, #374151, 18px (text-lg)
- **Section Headers**: Roboto Medium, #374151, 18px (text-lg)
- **Card Titles**: Roboto Medium, #9E0059, 14px (text-sm)
- **Form Labels**: Roboto Medium, #9E0059, 14px (text-sm)
- **No gradients in titles**: Use solid colors for better readability

### Form Field Guidelines
1. **Two-column Layout**: Label/icon on left, value/input on right
2. **Consistent Spacing**: 24px padding in cards, 24px gap between columns
3. **Edit States**: Inline editing with save/cancel buttons
4. **Icon Usage**: 16px icons in colored background containers
5. **Validation**: Real-time feedback with color coding

### Brand Management Guidelines
1. **Brand Colors**: Use provided color palette for brand identity
2. **Brand Cards**: Consistent layout with icon, title, description, benefits
3. **Status Indicators**: Always include status dots for brand state
4. **Benefits Display**: Show first 2 benefits, indicate count for more
5. **Empty States**: Encouraging messaging with clear call-to-action

## 🎯 Brand Icon Reference

### Custom Platform Icons
Always use custom SVG icons for social platforms and maintain consistent styling:

#### LinkedIn Icon
```typescript
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
```

#### Reddit Icon
```typescript
const RedditIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
);
```

#### Quora Icon
```typescript
const QuoraIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.738 18.701a2.995 2.995 0 0 0 2.584-1.495l.588 1.455a3.995 3.995 0 0 1-3.172 1.615c-1.555 0-2.813-.88-3.416-2.16-.596 1.28-1.854 2.16-3.415 2.16a3.995 3.995 0 0 1-4-4c0-2.205 1.795-4 4-4 1.561 0 2.819.88 3.415 2.16.603-1.28 1.86-2.16 3.416-2.16a4.002 4.002 0 0 1 3.171 1.615l-.587 1.455a2.995 2.995 0 0 0-2.584-1.495c-1.66 0-3 1.34-3 3s1.34 3 3 3zM5.917 19.276a2.995 2.995 0 0 1-3-3c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3z"/>
  </svg>
);
```

### Icon Usage Guidelines
- **Platform Icons**: Always use custom SVG icons with currentColor
- **Size**: Consistent 20px (w-5 h-5) for dashboard, 16px (w-4 h-4) for forms
- **Color**: Always #390099 for branded icons to maintain consistency
- **Background**: Use 20% opacity of the icon color for containers

## 🎨 Color Application Examples

### Dashboard Statistics
- **Primary Stats**: #390099 (Blog Posts, LinkedIn, Mentions, Visibility)
- **Accent Stats**: #FF0054 (Reddit Answers), #FFBD00 (Positive Sentiment)
- **Backgrounds**: White with subtle shadows

### Company & Brands
- **Brand Colors**: Use predefined palette for brand identity
- **Form Labels**: #9E0059 for consistency
- **Icons**: #390099 with 20% opacity backgrounds
- **Status**: Green (#4ade80) for active, amber for draft, red for inactive

### Navigation & UI
- **Active States**: #390099 with light backgrounds
- **Hover States**: Darker shades of primary colors
- **Disabled States**: #d1d5db with reduced opacity

---

## 📝 Implementation Notes

### CSS Variable Usage
Prefer CSS variables for colors to enable easy theming:
```css
:root {
  --primary: #390099;
  --secondary: #9E0059;
  --accent-pink: #FF0054;
  --accent-orange: #FF5400;
  --accent-yellow: #FFBD00;
}
```

### Responsive Design
- Mobile: Single column layouts, larger touch targets
- Tablet: Two-column grids, adjusted spacing
- Desktop: Three-column grids, hover states

### Accessibility
- Maintain color contrast ratios (WCAG AA)
- Provide focus indicators for all interactive elements
- Use semantic HTML structure
- Include proper ARIA labels

### Performance
- Use CSS transforms for animations
- Prefer opacity and transform over color/size changes
- Implement proper loading states
- Optimize SVG icons for fast rendering

---

**Style Guide Version**: 2024.2  
**Last Updated**: Company & Brands Management Integration  
**Maintained by**: GEOIQ Development Team 