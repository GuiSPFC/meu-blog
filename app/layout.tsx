import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Meu Blog Técnico',
  description: 'Blog desenvolvido com Next.js e CSS Modules',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} style={{ margin: 0, backgroundColor: '#fafafa', color: '#333' }}>
        {children}
      </body>
    </html>
  );
}
