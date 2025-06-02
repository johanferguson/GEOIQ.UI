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

## 🔤 Typography

### Font Family
- **Primary**: Roboto (Google Fonts)
- **Fallback**: sans-serif

### Font Weights
- **Normal (400)**: Card headings, navigation items, body text
- **Medium (500)**: Statistics numbers, section titles, buttons, chart titles
- **Bold (700)**: Only for special emphasis (use sparingly)

### Font Sizes (Compact Design)
```css
--text-xs: 12px     /* Change indicators, chart labels, timestamps */
--text-sm: 14px     /* Stat card headings, supporting text */
--text-base: 16px   /* Body text, navigation */
--text-lg: 18px     /* Chart titles, action card titles */
--text-xl: 20px     /* Statistics numbers (reduced from 24px) */
--text-2xl: 24px    /* Page titles, major section headers */
```

### Text Colors
```css
--heading-color: #9E0059        /* Card headings, chart titles (solid, no gradients) */
--title-color: #374151          /* Page titles, section headers */
--body-color: #4b5563           /* Regular text */
--stats-color: #390099          /* Primary statistics */
--accent-stats: #FF0054 | #FFBD00  /* Accent statistics */
```

## 🎯 Layout Principles

### 60-30-10 Design Rule
1. **60% White**: Dominant color for backgrounds and cards
2. **30% Deep Royal Purple (#390099)**: Secondary color for primary UI elements
3. **10% Accent Colors**: Variety colors for highlights and special elements

### Compact Spacing System
```css
--space-1: 4px      /* Tight spacing */
--space-2: 8px      /* Small spacing - icon containers */
--space-3: 12px     /* Medium spacing */
--space-4: 16px     /* Default spacing - stat cards */
--space-6: 24px     /* Large spacing - chart cards */
--space-8: 32px     /* Extra large spacing */
```

## 📦 Component Styles

### Statistics Cards (Compact Design)
```css
.stat-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  padding: 16px; /* p-4 - reduced from 24px */
  transition: all 0.3s ease;
  gap: 16px; /* gap-4 - reduced from 24px */
}

.stat-heading {
  font-family: 'Roboto', sans-serif;
  font-weight: 400; /* Normal */
  font-size: 14px; /* text-sm - reduced from 16px */
  color: #9E0059;
}

.stat-value {
  font-family: 'Roboto', sans-serif;
  font-weight: 500; /* Medium */
  font-size: 20px; /* text-xl - reduced from 24px */
  color: #390099; /* Primary stat color */
  margin-top: 4px;
}

.stat-change {
  font-family: 'Roboto', sans-serif;
  font-size: 12px; /* text-xs - reduced from 14px */
  margin-top: 4px;
  /* Color based on change type: green for positive, red for negative */
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

### Icons (Compact Sizing)
```css
.stat-icon {
  width: 20px; /* w-5 h-5 - reduced from 24px */
  height: 20px;
  color: #390099; /* Primary color for most icons */
}

.stat-icon-background {
  padding: 8px; /* p-2 - reduced from 12px */
  border-radius: 8px;
  background-color: rgba(57, 0, 153, 0.1); /* Primary color with 10% opacity */
}

/* Branded Icons (LinkedIn, Reddit, Quora) */
.branded-icon {
  color: #390099; /* Always use primary color */
}
```

### Modern Charts Styling
```css
.chart-container {
  background: linear-gradient(to bottom right, white, #f8fafc);
  border: none;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.chart-title {
  font-family: 'Roboto', sans-serif;
  font-weight: 500; /* Medium */
  font-size: 18px;
  color: #9E0059; /* Solid color - no gradients */
  margin-bottom: 24px;
}

.chart-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #64748b;
}

.chart-indicator-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(to right, var(--start-color), var(--end-color));
}

/* Modern Chart Grid */
.chart-grid {
  stroke-dasharray: 1 3;
  stroke: #e1e5e9;
  stroke-opacity: 0.6;
}

/* Modern Chart Axes */
.chart-axis {
  font-size: 11px;
  fill: #64748b;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}

/* Glass-morphism Tooltips */
.chart-tooltip {
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 12px;
  font-size: 13px;
  color: #374151;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(10px);
}

.chart-tooltip-label {
  color: #9E0059;
  font-weight: 500;
  margin-bottom: 4px;
}
```

## 🚀 Navigation

### Top Bar
```css
.top-bar {
  background: linear-gradient(to right, #390099, #FF0054);
  color: white;
  padding: 16px 24px;
}

.top-bar-title {
  font-family: 'Roboto', sans-serif;
  font-weight: 500; /* Medium */
  font-size: 24px;
  color: white;
}
```

### Sidebar Navigation
```css
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

## 🎮 Interactive Elements

### Buttons
```css
.geoiq-btn-primary {
  background: linear-gradient(to right, #390099, #9E0059);
  color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  transform: scale(1);
}

.geoiq-btn-primary:hover {
  transform: scale(1.05);
  background: linear-gradient(to right, #300080, #850048);
}

.geoiq-btn-secondary {
  background: white;
  color: #390099;
  border: 1px solid #390099;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}
```

### Modern Animations & Effects
```css
/* Fade in animation for cards */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s ease-in-out forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover animations */
.hover-scale {
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
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

## 📊 Modern Chart Color Schemes

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
```

## 📋 Content Guidelines

### Section Headings
- **Remove unnecessary headings**: Don't use "Content", "Growth", "Quick Actions" unless needed for context
- **Keep "Recent Activity"**: Necessary for user orientation
- **Font**: Roboto Medium, #374151, 24px
- **No gradients in chart titles**: Use solid #9E0059 color

### Compact Card Content Structure
1. **Heading**: Normal weight (400), #9E0059, 14px (text-sm)
2. **Value**: Medium weight (500), stat color, 20px (text-xl)
3. **Change**: Normal weight (400), semantic color, 12px (text-xs)
4. **Icon**: 20px (w-5 h-5), in colored background circle with 8px padding

### Custom Icons
- **LinkedIn, Reddit, Quora**: Always use custom SVG icons
- **Color**: Always #390099 for branded icons
- **Background**: 20% opacity of the icon color
- **Size**: 20px (w-5 h-5) for compact design

## 🎯 Brand Icon Reference

### LinkedIn Icon
```typescript
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
```

### Reddit Icon
```typescript
const RedditIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
);
```

### Quora Icon
```typescript
const QuoraIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.738 18.701a2.995 2.995 0 0 0 2.584-1.495l.588 1.455a3.995 3.995 0 0 1-3.172 1.615c-1.555 0-2.813-.88-3.416-2.16-.596 1.28-1.854 2.16-3.415 2.16a3.995 3.995 0 0 1-4-4c0-2.205 1.795-4 4-4 1.561 0 2.819.88 3.415 2.16.603-1.28 1.86-2.16 3.416-2.16a4.002 4.002 0 0 1 3.171 1.615l-.587 1.455a2.995 2.995 0 0 0-2.584-1.495c-1.66 0-3 1.34-3 3s1.34 3 3 3zM5.917 19.276a2.995 2.995 0 0 1-3-3c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3z"/>
  </svg>
);
```

## 📱 Responsive Design

### Grid Systems
- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 4 columns for stats, 2 columns for charts

### Compact Spacing
- **Statistics Cards**: `gap-4` (16px between cards)
- **Chart Cards**: `gap-8` (32px between charts)
- **Card Padding**: Statistics `p-4` (16px), Charts `p-6` (24px)

### Breakpoints
- **sm**: 640px and up
- **md**: 768px and up  
- **lg**: 1024px and up
- **xl**: 1280px and up

---

## 🚀 2024 Modern Design Principles

### Glass-morphism Effects
- Use `backdrop-filter: blur(10px)` for tooltips
- Combine with `rgba(255, 255, 255, 0.95)` backgrounds
- Apply modern shadows with multiple layers

### Subtle Gradients
- Background gradients should be very subtle (`from-white to-slate-50`)
- Data gradients can be more vibrant but with proper transparency
- Avoid gradients in text (keep headings solid colors)

### Contemporary Spacing
- Favor compact designs with efficient space usage
- Use consistent spacing scales
- Prioritize content density while maintaining readability

### SVG Effects
- Use SVG filters for glow effects on charts
- Implement proper gradients with multiple color stops
- Add transparency fadeout effects for modern aesthetics

---

## 🚀 Usage Notes

1. **Always start with white backgrounds** (60% rule)
2. **Use #390099 for primary elements** (30% rule)
3. **Sparingly use accent colors** (#FF0054, #FFBD00) (10% rule)
4. **All text should use Roboto font family**
5. **Card headings are normal weight with solid colors** (no gradients)
6. **Statistics cards use compact sizing** (p-4, text-sm, text-xl, text-xs)
7. **Chart cards use modern effects** (subtle gradients, glass-morphism, SVG filters)
8. **Branded icons always use #390099** with compact 20px sizing
9. **Charts use transparency with fadeout effects** for contemporary look
10. **Animations are smooth and purposeful** with proper easing

## 🎯 2024 Best Practices

- **Compact Design**: Efficient use of space without sacrificing readability
- **Modern Effects**: Glass-morphism, subtle shadows, SVG filters
- **Transparency**: Use opacity creatively for depth and hierarchy  
- **Consistency**: Maintain design system throughout all components
- **Performance**: Optimize animations and effects for smooth interactions

This style guide ensures consistency across all GEOIQ pages and maintains the professional, modern aesthetic established in our 2024 dashboard design. 