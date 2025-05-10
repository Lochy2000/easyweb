import matter from 'gray-matter';
import { generateCloudinaryUrl, IMAGE_SIZES } from './cloudinary';
import type { BlogFrontMatter, BlogPost } from './blog';

// Function to load markdown content from the file system
export async function loadMarkdownFile(path: string): Promise<BlogPost | null> {
  try {
    // In a browser environment, we can't directly access the file system
    // This would be replaced by a fetch or import in production
    
    // Simulating file loading - in production this would be a fetch or import.meta.glob
    const response = await fetch(path);
    const markdown = await response.text();
    
    // Parse front matter
    const { data, content } = matter(markdown);
    
    // Convert image ID to Cloudinary URL
    const imageUrl = generateCloudinaryUrl(
      data.imageUrl as string,
      IMAGE_SIZES.blogHero
    );
    
    // Return formatted blog post
    return {
      id: data.id as string,
      title: data.title as string,
      description: data.description as string,
      category: data.category as string,
      imageUrl,
      date: data.date as string,
      author: data.author as string,
      tags: data.tags as string[],
      content
    };
  } catch (error) {
    console.error(`Error loading markdown file: ${path}`, error);
    return null;
  }
}

// Function to load all markdown files in the blogs directory
export async function loadAllMarkdownFiles(): Promise<BlogFrontMatter[]> {
  try {
    // In production, this would use import.meta.glob or a similar approach
    // to dynamically import all markdown files
    
    // For now, return a static list
    // In the future, this will be dynamic based on files in the content/blogs directory
    return [
      {
        id: "understanding-website-hosting",
        title: "Understanding Website Hosting",
        description: "Learn the basics of web hosting and why it's crucial for your online presence.",
        category: "Getting Started",
        imageUrl: generateCloudinaryUrl("hosting_iipawi", IMAGE_SIZES.blogHero),
        date: "2025-01-15",
        author: "EasyWeb Team",
        tags: ["Hosting", "Web Development", "Beginners"]
      },
      {
        id: "demystifying-seo-2025",
        title: "Demystifying SEO in 2025",
        description: "Is SEO still worth it in 2025? Here's what's changed, who should care, and how to build websites that perform in a world of AI search.",
        category: "SEO",
        imageUrl: generateCloudinaryUrl("seo_2025_image", IMAGE_SIZES.blogHero),
        date: "2025-05-09",
        author: "EasyWeb Team",
        tags: ["SEO", "Web Development", "AI"]
      },
      // More blogs would be loaded dynamically
    ];
  } catch (error) {
    console.error('Error loading markdown files', error);
    return [];
  }
}

// In a Vite environment, we can use this approach to load all markdown files:
// This would replace the static implementation above in production
export async function loadAllMarkdownFilesVite(): Promise<BlogFrontMatter[]> {
  try {
    // This is a placeholder for how it would work in production
    // Vite's import.meta.glob allows us to import multiple files matching a pattern
    // const modules = import.meta.glob('/src/content/blogs/*.md');
    
    // const posts = await Promise.all(
    //   Object.entries(modules).map(async ([path, loader]) => {
    //     const file = await loader();
    //     const { data } = matter(file.default);
    //     return {
    //       ...data,
    //       imageUrl: generateCloudinaryUrl(data.imageUrl, IMAGE_SIZES.blogHero)
    //     } as BlogFrontMatter;
    //   })
    // );
    
    // return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // For now, return the static implementation
    return loadAllMarkdownFiles();
  } catch (error) {
    console.error('Error loading markdown files with Vite', error);
    return [];
  }
}
