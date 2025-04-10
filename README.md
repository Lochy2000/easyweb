# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f0f8f37c-da54-4d06-9cbe-f2462466a15e

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f0f8f37c-da54-4d06-9cbe-f2462466a15e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

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
