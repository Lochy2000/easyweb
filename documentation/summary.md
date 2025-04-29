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

Project Structure

src/pages: Main page components (Index, Templates, About, Blog, NotFound)
src/components: Reusable UI components

src/components/ui: Shadcn UI components


src/lib: Utility functions
src/hooks: Custom React hooks
src/styles: CSS and styling files

Styling Approach

The site uses Tailwind CSS with a customized theme and extended configuration
Custom CSS variables for consistent color theming
Dark mode by default with a purple/violet accent color scheme
Custom animations defined in index.css and Tailwind config
CSS utility classes for common styling patterns
Custom components for buttons, cards, and other UI elements
Responsive design for different screen sizes

Key Features

Modern UI/UX: Clean, modern design with animations and smooth transitions
Responsive Layout: Mobile-friendly design with responsive navigation
Loading Animations: Custom loading screen between page transitions
Gradient Effects: Beautiful gradient color schemes throughout the site
Interactive Components: Buttons, cards, and other interactive elements
Animation Effects: Text reveals, background effects, and transition animations

Page Structure

Home Page: Hero section, Services, Process Steps, Testimonials
Templates Page: Showcases website templates
About Page: Information about the team/company
Blog/Resources Page: Blog posts or resources
404 Page: Custom not found page

Performance Optimizations

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

Deployment
The site is configured to deploy on Vercel (as indicated by vercel.json). The deployment process is streamlined with Vercel's integration.
Notable UI Components

Custom animated buttons with gradient and 3D effects
A responsive header with mobile menu
Hero section with animated text reveal
Background effects for visual interest
Custom card designs
Testimonial carousel
Process step visualization

Styling Highlights

Custom animations for hover states and transitions
Gradient backgrounds and text
Glassmorphism effects (backdrop blur with semi-transparent backgrounds)
Custom keyframe animations for various UI elements
Theme-consistent color palette with HSL variables