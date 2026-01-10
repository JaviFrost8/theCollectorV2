import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from './components/layout/Navbar';

export const metadata: Metadata = {
  title: 'The Collector',
  description: 'Mantén ordenada tu colección de películas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="flex flex-col h-screen bg-background">
        <Navbar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
