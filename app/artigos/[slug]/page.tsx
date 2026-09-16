import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getArtigos, getArtigoBySlug } from '@/lib/api';
import styles from "./artigos.module.css"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const artigo = await getArtigoBySlug(resolvedParams.slug);
  if (!artigo) return { title: 'Artigo Não Encontrado' };

  return {
    title: `${artigo.titulo} | Meu Blog`,
    description: artigo.descricao,
  };
}

export async function generateStaticParams() {
  const artigos = await getArtigos();
  return artigos.map((artigo) => ({
    slug: artigo.slug,
  }));
}

export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const artigo = await getArtigoBySlug(resolvedParams.slug);
  
  if (!artigo) {
    notFound();
  }

  return (
    <article className={styles.container}>
      <header className={styles.cabecalho}>
        <h1 className={styles.titulo}>{artigo.titulo}</h1>
        <p className={styles.autorData}>
          Publicado por <strong>{artigo.autor}</strong> em {new Date(artigo.data).toLocaleDateString('pt-BR')}
        </p>
      </header>
      <div className={styles.conteudo}>{artigo.conteudo}</div>
      <footer className={styles.rodape}>
        <Link href="/" className={styles.linkVoltar}>
          ← Voltar para a página inicial
        </Link>
      </footer>
    </article>
  );
}
