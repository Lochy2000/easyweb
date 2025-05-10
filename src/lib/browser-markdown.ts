// A simple browser-compatible markdown front matter parser

export interface FrontMatter {
  [key: string]: any;
}

// Parse front matter and content from a markdown string
export function parseFrontMatter(markdown: string): { data: FrontMatter; content: string } {
  try {
    console.log("Parsing markdown:", markdown.substring(0, 200) + "...");
    
    // Check if the markdown has front matter delimiters (---)
    if (!markdown.startsWith('---')) {
      console.log("No front matter delimiter found");
      return { data: {}, content: markdown };
    }

    // Find the end of the front matter section
    const endOfFrontMatter = markdown.indexOf('---', 3);
    if (endOfFrontMatter === -1) {
      console.log("No closing front matter delimiter found");
      return { data: {}, content: markdown };
    }

    // Extract front matter text
    const frontMatterText = markdown.substring(3, endOfFrontMatter).trim();
    console.log("Front matter text:", frontMatterText);
    
    // Parse YAML-like front matter
    const data: FrontMatter = {};
    const lines = frontMatterText.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) continue;
      
      // Handle arrays in format: tags: ["tag1", "tag2"]
      if (trimmedLine.includes('[') && trimmedLine.includes(']')) {
        const colonPos = trimmedLine.indexOf(':');
        if (colonPos !== -1) {
          const key = trimmedLine.substring(0, colonPos).trim();
          const value = trimmedLine.substring(colonPos + 1).trim();
          
          try {
            // Parse JSON array
            data[key] = JSON.parse(value);
          } catch (e) {
            // If parsing fails, store as string
            data[key] = value;
          }
        }
        continue;
      }
      
      // Handle regular key-value pairs
      const colonPos = trimmedLine.indexOf(':');
      if (colonPos !== -1) {
        const key = trimmedLine.substring(0, colonPos).trim();
        const value = trimmedLine.substring(colonPos + 1).trim();
        
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          data[key] = value.substring(1, value.length - 1);
        } else {
          data[key] = value;
        }
      }
    }

    console.log("Parsed front matter:", data);

    // Extract content
    const content = markdown.substring(endOfFrontMatter + 3).trim();

    return { data, content };
  } catch (error) {
    console.error('Error parsing front matter:', error);
    return { data: {}, content: markdown };
  }
}