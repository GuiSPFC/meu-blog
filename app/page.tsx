import Link from 'next/link';
import { getArtigos } from '@/lib/api';
import styles from './page.module.css';

export default async function HomePage() {
  const artigos = await getArtigos();

  return (
    <main className={styles.container}>
      <h1 className={styles.tituloPrincipal}>Meu Blog EBAC</h1>
      <div className={styles.listaArtigos}>
        {artigos.map((artigo) => (
          <article key={artigo.slug} className={styles.cartaoArtigo}>
            <h2 style={{ margin: 0 }}>
              <Link href={`/artigos/${artigo.slug}`} className={styles.linkArtigo}>
                {artigo.titulo}
              </Link>
            </h2>
            <p className={styles.metadados}>
              Por <strong>{artigo.autor}</strong> em {new Date(artigo.data).toLocaleDateString('pt-BR')}
            </p>
            <p style={{ margin: 0, lineHeight: 1.5 }}>{artigo.descricao}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
