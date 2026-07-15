import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostMeta {
  title: string;
  meta_title: string;
  meta_description: string;
  slug: string;
  focus_keyword: string;
  category: string;
  author: string;
  date: string;
  updated: string;
  canonical: string;
  og_title: string;
  og_description: string;
  og_type: string;
  type?: string;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export function getPostBySlug(slug: string): Post | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      meta: { ...data, slug: realSlug } as PostMeta,
      content,
    };
  } catch (e) {
    return null;
  }
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs
    .filter((slug) => slug.endsWith('.mdx'))
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null && post.meta.type !== 'page')
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
  return posts;
}
