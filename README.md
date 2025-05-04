EasyWeb website is a modern, well-structured React application built with Vite and using a variety of modern web technologies. Here's an overview of the site's structure, styling, and functionality:
Tech Stack & Dependencies

Framework: React with TypeScript and Vite
Routing: React Router DOM for navigation
Styling: Tailwind CSS with customized configuration
UI Components: Shadcn UI components (a collection of accessible UI components)
Animations: Framer Motion for smooth animations and transitions
State Management: React Query for data fetching and caching
Form Handling: React Hook Form with Zod validation
Icons: Lucide React for icons
Analytics: Vercel Analytics and Speed Insights
Deployment: Hosted on Vercel (currently working locally)

## Project Structure

src/pages: Main page components (Index, Templates, About, Blog, NotFound)
src/components: Reusable UI components

src/components/ui: Shadcn UI components


src/lib: Utility functions
src/hooks: Custom React hooks
src/styles: CSS and styling files

## Styling Approach

The site uses Tailwind CSS with a customized theme and extended configuration
Custom CSS variables for consistent color theming
Dark mode by default with a purple/violet accent color scheme
Custom animations defined in index.css and Tailwind config
CSS utility classes for common styling patterns
Custom components for buttons, cards, and other UI elements
Responsive design for different screen sizes

## Key Features

Modern UI/UX: Clean, modern design with animations and smooth transitions
Responsive Layout: Mobile-friendly design with responsive navigation
Loading Animations: Custom loading screen between page transitions
Gradient Effects: Beautiful gradient color schemes throughout the site
Interactive Components: Buttons, cards, and other interactive elements
Animation Effects: Text reveals, background effects, and transition animations

## Page Structure

Home Page: Hero section, Services, Process Steps, Testimonials
Templates Page: Showcases website templates
About Page: Information about the team/company
Blog/Resources Page: Blog posts or resources
404 Page: Custom not found page

## Performance Optimizations

Lazy loading of pages
Code splitting
Loading screen during transitions
Asset preloading
React Query for efficient data fetching
Vercel for fast deployment and CDN delivery

Running Locally
The site can be run locally using npm or bun commands:

npm run dev or bun run dev - Start development server
npm run build or bun run build - Build for production
npm run preview or bun run preview - Preview build locally

## Deployment
The site is configured to deploy on Vercel (as indicated by vercel.json). The deployment process is streamlined with Vercel's integration.
Notable UI Components

Custom animated buttons with gradient and 3D effects
A responsive header with mobile menu
Hero section with animated text reveal
Background effects for visual interest
Custom card designs
Testimonial carousel
Process step visualization

## Styling Highlights

Custom animations for hover states and transitions
Gradient backgrounds and text
Glassmorphism effects (backdrop blur with semi-transparent backgrounds)
Custom keyframe animations for various UI elements
Theme-consistent color palette with HSL variables

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f0f8f37c-da54-4d06-9cbe-f2462466a15e) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Performance Optimizations

This project implements several performance optimizations to ensure fast loading times and smooth user experience:

### 1. Code Splitting and Lazy Loading
- Implemented React.lazy for main page components
- Added Suspense boundaries with loading fallbacks
- Route-based code splitting to reduce initial bundle size
- Optimized dynamic imports for better chunk management

### 2. Image Optimization
- Custom OptimizedImage component with:
  - WebP format support with fallbacks
  - Responsive image sizes using srcSet
  - Automatic generation of multiple image sizes
  - Lazy loading with blur placeholders
  - Proper sizing hints for better CLS
  - Progressive loading animations

### 3. Font Optimization
- Implemented efficient font loading strategy:
  - Variable fonts for reduced file size
  - Font-display: swap for better FOUT handling
  - Local font fallbacks with size adjustments
  - System font fallback chain
  - Optional font features for enhanced typography

### 4. Caching and Service Worker
- Service Worker implementation for:
  - Static asset caching
  - Offline support
  - Cache-first strategy for static assets
  - Network-first strategy for API calls
  - Automatic cache cleanup

### 5. Resource Preloading
- Critical resource hints:
  - DNS prefetching for external domains
  - Preconnect hints for third-party resources
  - Preload directives for critical assets
  - Early hint headers for faster initial load

### 6. Query Optimization
- React Query implementation with:
  - 5-minute stale time
  - Disabled window focus refetching
  - Limited retry attempts
  - Request deduplication

### 7. Animation Performance
- Optimized animations using:
  - CSS transforms instead of JS where possible
  - Hardware acceleration hints
  - Reduced motion support
  - RAF-based animations
  - Debounced event handlers

### 8. Analytics and Monitoring
- Vercel Analytics integration
- Performance metric tracking
- Real user monitoring
- Error boundary implementation

## Analytics Implementation

### Vercel Analytics

We use Vercel Analytics to track user behavior and performance metrics. The implementation includes:

1. **Web Analytics**
   - Real-time user tracking
   - Page views and unique visitors
   - User engagement metrics
   - Geographic data
   - Referral sources

2. **Speed Insights**
   - Core Web Vitals monitoring
   - Page load performance
   - User experience metrics
   - Performance scoring

### Setup Instructions

1. Install the required packages:
```bash
npm install @vercel/analytics
```

2. Add Analytics to your app:
```tsx
// src/App.tsx
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      {/* Your app components */}
      <Analytics />
    </>
  );
}
```

3. View analytics in your Vercel dashboard:
   - Go to your project in Vercel
   - Navigate to Analytics tab
   - View real-time data and insights

### Key Metrics Tracked

- **Performance**
  - First Contentful Paint (FCP)
  - Largest Contentful Paint (LCP)
  - First Input Delay (FID)
  - Cumulative Layout Shift (CLS)

- **User Behavior**
  - Page views
  - Session duration
  - Navigation paths
  - Exit pages

- **Technical**
  - Browser types
  - Device information
  - Network conditions
  - Error tracking

### Privacy Considerations

- Compliant with GDPR and CCPA
- No personal data collection
- Anonymous usage tracking
- Automatic data retention policies

## Getting Started

[Rest of the existing README content...]
