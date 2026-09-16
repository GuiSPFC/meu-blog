import { promises as fs } from 'fs';
import path from 'path';
import { Artigo } from './tipos';

export async function getArtigos(): Promise<Artigo[]> {
  const filePath = path.join(process.cwd(), 'data', 'artigos.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function getArtigoBySlug(slug: string): Promise<Artigo | undefined> {
  const artigos = await getArtigos();
  return artigos.find((artigo) => artigo.slug === slug);
}
