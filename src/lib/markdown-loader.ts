import { generateCloudinaryUrl, IMAGE_SIZES } from './cloudinary';
import type { BlogFrontMatter, BlogPost } from './blog';

// Extract raw markdown from Vite-transformed content
function extractMarkdown(content: string): string {
  // Check if it's wrapped in export default
  if (content.startsWith('export default "')) {
    // Remove the export default wrapper and unescape newlines
    let markdown = content.slice(16, -1); // Remove export default " and closing "
    markdown = markdown.replace(/\\n/g, '\n');
    markdown = markdown.replace(/\\"/g, '"');
    return markdown;
  }
  return content;
}

// A simple front matter parser for markdown
function parseFrontMatter(content: string): { data: any; content: string } {
  try {
    // Extract actual markdown content if it's wrapped in export default
    const markdown = extractMarkdown(content);
    console.log('Parsing content, first 100 chars:', markdown.substring(0, 100));
    
    // Simple regex-based front matter extraction
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = markdown.match(frontMatterRegex);
    
    if (!match) {
      console.warn("No front matter found in:", markdown.substring(0, 100));
      return { data: {}, content: markdown };
    }
    
    const frontMatterText = match[1].trim();
    const contentText = match[2].trim();
    
    console.log("Front matter text:", frontMatterText);
    
    // Parse front matter
    const data: any = {};
    const lines = frontMatterText.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;
      
      const colonIndex = trimmedLine.indexOf(':');
      if (colonIndex === -1) {
        console.warn('Invalid front matter line (no colon):', trimmedLine);
        continue;
      }
      
      const key = trimmedLine.substring(0, colonIndex).trim();
      let value = trimmedLine.substring(colonIndex + 1).trim();
      
      // Special handling for tags array
      if (key === 'tags' && value.startsWith('[') && value.endsWith(']')) {
        try {
          data[key] = JSON.parse(value);
        } catch (e) {
          data[key] = [];
        }
      } else {
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.substring(1, value.length - 1);
        }
        data[key] = value;
      }
    }
    
    console.log("Parsed front matter:", data);
    return { data, content: contentText };
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return { data: {}, content };
  }
}

// Dynamic method: Use import.meta.glob to load all markdown files
export async function loadMarkdownBlogPosts(): Promise<BlogFrontMatter[]> {
  try {
    console.log('Attempting to load markdown files...');
    
    // @ts-ignore - Vite-specific API
    const markdownFiles = import.meta.glob('../content/blogs/*.md', { eager: true, as: 'raw' });
    console.log('Markdown files found:', Object.keys(markdownFiles).length);
    console.log('Found markdown file paths:', Object.keys(markdownFiles));
    
    const posts: BlogFrontMatter[] = [];
    
    for (const path in markdownFiles) {
      try {
        // Skip template file
        if (path.includes('_template.md')) {
          console.log('Skipping template file:', path);
          continue;
        }
        
        const fileContent = markdownFiles[path] as string;
        console.log(`Processing file: ${path}, content length: ${fileContent.length}`);
        
        const { data } = parseFrontMatter(fileContent);
        
        if (!data.id || !data.title) {
          console.warn(`Skipping file ${path} due to missing required front matter (id or title)`);
          continue;
        }
        
        posts.push({
          id: data.id,
          title: data.title,
          description: data.description || '',
          category: data.category || 'Uncategorized',
          imageUrl: generateCloudinaryUrl(data.imageUrl || 'default_image', IMAGE_SIZES.blogHero),
          date: data.date || new Date().toISOString().split('T')[0],
          author: data.author || 'EasyWeb Team',
          tags: data.tags || []
        });
        
        console.log(`Successfully added post: ${data.title}`);
      } catch (error) {
        console.error(`Error processing markdown file: ${path}`, error);
      }
    }
    
    console.log('Total posts processed:', posts.length);
    
    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading markdown blog posts:', error);
    return [];
  }
}

// Load a specific blog post by ID
export async function loadMarkdownBlogPost(id: string): Promise<BlogPost | null> {
  try {
    console.log(`Attempting to load markdown file for post: ${id}`);
    
    // @ts-ignore - Vite-specific API
    const markdownFiles = import.meta.glob('../content/blogs/*.md', { eager: true, as: 'raw' });
    console.log('Available markdown files:', Object.keys(markdownFiles));
    
// Find the file that matches the ID
    const filePath = Object.keys(markdownFiles).find(path => {
      // Try two matching approaches:
      // 1. Check if the filename contains the ID (standard approach)
      // 2. Check if the ID is in the content (backup approach)
      const filename = path.split('/').pop() || '';
      const filenameMatch = filename === `${id}.md`;
      
      // For debugging:
      console.log(`Checking file ${filename} against ID ${id}.md - exact match: ${filenameMatch}`);
      
      if (filenameMatch) {
        return true;
      }
      
      // If no filename match, try to check the content for the ID
      const content = markdownFiles[path] as string;
      const idMatch = content.includes(`id: ${id}`);
      console.log(`Content match for ${id} in ${filename}: ${idMatch}`);
      
      return filenameMatch || idMatch;
    });
    
    if (!filePath) {
      console.warn(`No markdown file found for post ID: ${id}`);
      return null;
    }
    
    console.log(`Found markdown file for post ID ${id}: ${filePath}`);
    const fileContent = markdownFiles[filePath] as string;
    
    const { data, content } = parseFrontMatter(fileContent);
    
    if (!data.id || !data.title) {
      console.warn(`Invalid front matter for post ID: ${id}`);
      return null;
    }
    
    return {
      id: data.id,
      title: data.title,
      description: data.description || '',
      category: data.category || 'Uncategorized',
      imageUrl: generateCloudinaryUrl(data.imageUrl || 'default_image', IMAGE_SIZES.blogHero),
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'EasyWeb Team',
      tags: data.tags || [],
      content
    };
  } catch (error) {
    console.error(`Error loading markdown blog post with ID ${id}:`, error);
    return null;
  }
}