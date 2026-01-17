import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from './components/layout/Navbar';
import { AuthProvider } from '@/context/AuthContext';

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
        <AuthProvider>
          <Navbar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
