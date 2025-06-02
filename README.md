# GEOIQ Analytics Platform 🚀

A modern SaaS frontend application designed to help small-medium businesses improve their visibility in Large Language Models through AI-powered brand scanning, prompt generation, and content creation.

## 🎯 Project Overview

GEOIQ is a comprehensive analytics platform that provides:
- **Brand Visibility Scanning**: Monitor how your brand appears across AI platforms
- **Prompt Generation**: Create optimized prompts for better AI responses
- **Content Analytics**: Track content performance across multiple platforms
- **AI-Powered Insights**: Get recommendations for improving brand visibility

## 🎨 Design System

### Color Palette
- **Deep Royal Purple** (#390099) - Primary brand color (30% usage)
- **Rich Magenta** (#9E0059) - Secondary elements
- **Vivid Pink** (#FF0054) - Accent highlights  
- **Bright Orange** (#FF5400) - Accent highlights
- **Golden Yellow** (#FFBD00) - Accent highlights
- **White** (#FFFFFF) - Main backgrounds (60% usage)

### Typography
- **Primary Font**: Roboto (Google Fonts)
- **Design Rule**: 60-30-10 color distribution
- **Gradient**: linear-gradient(135deg, #390099 0%, #9E0059 25%, #FF0054 50%, #FF5400 75%, #FFBD00 100%)

## 🏗️ Tech Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3.4.0
- **UI Components**: Heroicons, Custom components
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Architecture**: SOLID principles, Clean Architecture

## 📁 Project Structure

```
GEOIQ_UI_NEW/
├── geoiq-ui/                    # Main Next.js application
│   ├── src/
│   │   ├── app/                 # Next.js 14 App Router pages
│   │   │   ├── dashboard/       # Dashboard pages
│   │   │   ├── prompts/         # Prompts management
│   │   │   └── layout.tsx       # Root layout
│   │   ├── components/          # Reusable UI components
│   │   │   ├── ui/              # Basic UI components
│   │   │   ├── layout/          # Layout components
│   │   │   └── charts/          # Chart components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API services & business logic
│   │   ├── types/               # TypeScript type definitions
│   │   ├── lib/                 # Utility functions
│   │   └── styles/              # Global styles
│   ├── public/                  # Static assets
│   ├── tailwind.config.ts       # Tailwind configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── package.json            # Dependencies
│   └── next.config.js          # Next.js configuration
├── .gitignore                  # Git ignore rules
├── README.md                   # This file
└── ARCHITECTURE.md             # Detailed architecture docs
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GEOIQ_UI_NEW
   ```

2. **Navigate to the application directory**
   ```bash
   cd geoiq-ui
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
   NEXT_PUBLIC_API_TOKEN=your_api_token_here
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏛️ Architecture

This project follows **SOLID principles** and **Clean Architecture** patterns:

### Service Layer
- **`ApiClient`**: HTTP communication service
- **`DashboardService`**: Dashboard data management
- **`CacheService`**: Client-side caching
- **`Logger`**: Centralized logging

### Component Layer
- **Reusable components** with single responsibility
- **Type-safe props** with comprehensive interfaces
- **Consistent styling** following design system
- **Accessibility features** built-in

### State Management
- **Custom hooks** for data management
- **Separation of concerns** between UI and business logic
- **Error handling** at multiple layers
- **Auto-refresh** capabilities

## 🎯 Key Features

### Dashboard Analytics
- **Content Metrics**: Blog posts, LinkedIn posts, Reddit answers, Quora answers
- **Growth Metrics**: Mentions, visibility score, sentiment analysis, scan statistics
- **Interactive Charts**: Visibility trends and brand mentions visualization
- **Quick Actions**: Fast access to key platform features

### Modern UI/UX
- **Responsive Design**: Works seamlessly across all devices
- **Smooth Animations**: Framer Motion powered transitions
- **Modern Charts**: Beautiful data visualization with Recharts
- **Consistent Styling**: Design system implementation

### Developer Experience
- **TypeScript**: Full type safety across the application
- **ESLint & Prettier**: Code quality and formatting
- **Component Documentation**: Comprehensive JSDoc comments
- **Hot Reloading**: Fast development workflow

## 🔧 Development Guidelines

### Code Style
- Follow **SOLID principles** for all implementations
- Use **TypeScript strictly** for type safety
- Implement **proper error handling** at all levels
- Document **all public interfaces** thoroughly
- Keep **components focused** on single responsibility

### Git Workflow
1. Create feature branches from `main`
2. Follow conventional commit messages
3. Ensure all tests pass
4. Update documentation as needed
5. Submit pull requests for review

### Testing Strategy
- **Unit tests** for services and utilities
- **Component tests** for UI components
- **Integration tests** for API interactions
- **E2E tests** for critical user workflows

## 🌐 API Integration

The frontend is designed for seamless backend integration with these expected endpoints:

```typescript
GET /api/dashboard                     // Complete dashboard data
GET /api/dashboard/content-metrics     // Content metrics only
GET /api/dashboard/growth-metrics      // Growth metrics only
GET /api/dashboard/visibility-trend    // Chart data
GET /api/dashboard/brand-mentions      // Chart data
GET /api/dashboard/config              // User preferences
```

## 📊 Performance

- **Optimized Bundle**: Tree-shaking and code splitting
- **Caching Strategy**: 5-minute TTL for API responses
- **Image Optimization**: Next.js automatic optimization
- **Lazy Loading**: Components loaded on demand

## 🔐 Security

- **Environment Variables**: Secure configuration management
- **Type Safety**: TypeScript prevents runtime errors
- **Input Validation**: Client-side validation with server verification
- **Error Boundaries**: Graceful error handling

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Configuration
- **Development**: Debug logging, local API
- **Staging**: Reduced logging, staging API  
- **Production**: Error logging only, production API

## 📚 Documentation

- **[Architecture Guide](./ARCHITECTURE.md)**: Detailed architecture documentation
- **[Style Guide](./geoiq-ui/GEOIQ_STYLE_GUIDE.md)**: Complete design system reference
- **Component Docs**: JSDoc comments in component files
- **API Docs**: Service layer documentation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software for GEOIQ Analytics Platform.

## 👥 Team

**GEOIQ Development Team**
- Frontend Architecture & Implementation
- UI/UX Design System
- Performance & Optimization

## 📞 Support

For technical support or questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation in `/docs`

---

**Built with ❤️ for small-medium businesses to thrive in the AI era** 🌟 