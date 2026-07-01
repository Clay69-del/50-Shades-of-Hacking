import matter from 'gray-matter';

export interface WriteupMetadata {
  title: string;
  category: 'Forensics' | 'Web' | 'Crypto' | 'Reverse' | 'Networking';
  date: string;
  author: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface WriteupPost {
  slug: string;
  metadata: WriteupMetadata;
  body: string;
}

export const getAllWriteups = (): WriteupPost[] => {
  // Grab all markdown files within our content directory synchronously
  const modules = import.meta.glob('/content/writeups/*.md', { query: '?raw', eager: true });
  
  const posts = Object.keys(modules).map((path) => {
    // Extract the file text string
    const content = (modules[path] as any).default || modules[path];
    
    // Parse frontmatter metadata vs body using gray-matter
    const { data, content: body } = matter(content);
    
    // Convert path string like "/content/writeups/sample-forensics.md" into slug identity "sample-forensics"
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    
    return {
      slug,
      metadata: data as WriteupMetadata,
      body,
    };
  });

  // Sort writeups by date newest first
  return posts.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
};
