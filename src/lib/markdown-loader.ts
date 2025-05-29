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
    markdown = markdown.replace(/\\r/g, ''); // Remove escaped carriage returns
    return markdown;
  }
  return content;
}

// Improved front matter parser for markdown
function parseFrontMatter(content: string): { data: any; content: string } {
  try {
    // Extract actual markdown content if it's wrapped in export default
    let markdown = extractMarkdown(content);
    
    // Normalize ALL line endings to \n (handle \r\n, \r, and \n)
    markdown = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    console.log('Parsing content, first 100 chars:', markdown.substring(0, 100));
    
    // More flexible front matter regex that handles various line endings
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n\s*---\s*\n([\s\S]*)$/;
    const match = markdown.match(frontMatterRegex);
    
    if (!match) {
      console.warn("No front matter found in:", markdown.substring(0, 100));
      return { data: {}, content: markdown };
    }
    
    const frontMatterText = match[1].trim();
    const contentText = match[2].trim();
    
    console.log("Front matter text:", frontMatterText);
    
    // Parse front matter with improved error handling
    const data: any = {};
    const lines = frontMatterText.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();
      
      // Skip empty lines
      if (!trimmedLine) continue;
      
      // Handle multi-line values (like descriptions that span multiple lines)
      if (trimmedLine.startsWith('-') || (!trimmedLine.includes(':') && i > 0)) {
        // This might be a continuation of the previous value or a list item
        continue;
      }
      
      const colonIndex = trimmedLine.indexOf(':');
      if (colonIndex === -1) {
        console.warn('Invalid front matter line (no colon):', trimmedLine);
        continue;
      }
      
      let key = trimmedLine.substring(0, colonIndex).trim();
      let value = trimmedLine.substring(colonIndex + 1).trim();
      
      // Skip invalid keys (empty or containing invalid characters)
      if (!key || key.includes(' ')) {
        console.warn('Invalid front matter key:', key);
        continue;
      }
      
      // Special handling for tags array
      if (key === 'tags' && value.startsWith('[') && value.endsWith(']')) {
        try {
          data[key] = JSON.parse(value);
        } catch (e) {
          console.warn('Failed to parse tags array:', value);
          data[key] = [];
        }
      } else {
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.substring(1, value.length - 1);
        }
        
        // Convert empty strings to meaningful defaults
        if (value === '""' || value === "''") {
          value = '';
        }
        
        data[key] = value;
      }
    }
    
    console.log("Parsed front matter:", data);
    
    // Ensure required fields have defaults
    if (!data.author || data.author === '') {
      data.author = 'EasyWeb Team';
    }
    if (!data.tags || (Array.isArray(data.tags) && data.tags.length === 0)) {
      data.tags = [];
    }
    if (!data.category) {
      data.category = 'Uncategorized';
    }
    if (!data.date) {
      data.date = new Date().toISOString().split('T')[0];
    }
    
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
    
    // Load markdown files
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
        
        // More lenient validation - only require ID and title
        if (!data.id || !data.title) {
          console.warn(`Skipping file ${path} due to missing required front matter. ID: "${data.id}", Title: "${data.title}"`);
          console.warn('Full parsed data:', data);
          continue;
        }
        
        // Clean up the data
        const post: BlogFrontMatter = {
          id: data.id,
          title: data.title,
          description: data.description || `Learn more about ${data.title}`,
          category: data.category || 'General',
          imageUrl: generateCloudinaryUrl(data.imageUrl || 'default_image', IMAGE_SIZES.blogHero),
          date: data.date || new Date().toISOString().split('T')[0],
          author: data.author || 'EasyWeb Team',
          tags: Array.isArray(data.tags) ? data.tags : []
        };
        
        posts.push(post);
        console.log(`Successfully added post: ${data.title}`);
        
      } catch (error) {
        console.error(`Error processing markdown file: ${path}`, error);
        console.error('File content preview:', (markdownFiles[path] as string).substring(0, 200));
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
    
    const markdownFiles = import.meta.glob('../content/blogs/*.md', { eager: true, as: 'raw' });
    console.log('Available markdown files:', Object.keys(markdownFiles));
    
    // Find the file that matches the ID
    const filePath = Object.keys(markdownFiles).find(path => {
      const filename = path.split('/').pop() || '';
      const filenameMatch = filename === `${id}.md`;
      
      console.log(`Checking file ${filename} against ID ${id}.md - exact match: ${filenameMatch}`);
      
      if (filenameMatch) {
        return true;
      }
      
      // Fallback: check content for ID
      try {
        const content = markdownFiles[path] as string;
        const { data } = parseFrontMatter(content);
        const contentMatch = data.id === id;
        console.log(`Content match for ${id} in ${filename}: ${contentMatch}`);
        return contentMatch;
      } catch (e) {
        return false;
      }
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
      description: data.description || `Learn more about ${data.title}`,
      category: data.category || 'General',
      imageUrl: generateCloudinaryUrl(data.imageUrl || 'default_image', IMAGE_SIZES.blogHero),
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'EasyWeb Team',
      tags: Array.isArray(data.tags) ? data.tags : [],
      content
    };
  } catch (error) {
    console.error(`Error loading markdown blog post with ID ${id}:`, error);
    return null;
  }
}
