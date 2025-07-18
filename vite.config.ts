import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemap from "vite-plugin-sitemap";

// Custom plugin to handle markdown files
function markdownPlugin() {
  return {
    name: 'markdown-loader',
    enforce: 'pre',
    transform(code, id) {
      // Handle both .md and .md?raw files
      if (id.endsWith('.md') || id.includes('.md?raw')) {
        console.log(`[Vite Markdown Plugin] Processing file: ${id}`);
        // Return the raw content as a string for markdown files
        return `export default ${JSON.stringify(code)}`;
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    markdownPlugin(),
    // Comment out the sitemap plugin temporarily to fix build issues
    // sitemap({
    //   hostname: "https://www.easywebs.uk",
    //   dynamicRoutes: [
    //     '/',
    //     '/about',
    //     '/templates',
    //     '/blog',
    //     '/book'
    //   ],
    //   exclude: [
    //     '/portfolio-pro.html',
    //     '/business-plus.html',
    //     '/shop-simple.html',
    //     '/demo-template.html',
    //     '/minimal-blog.html',
    //     '/landing-launch.html',
    //   ],
    // }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
