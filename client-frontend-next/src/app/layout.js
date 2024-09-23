import '@styles/globals.css';
import Banner from '@/components/layout/Banner';
import Footer from '@/components/layout/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen bg-white ">
        <Banner />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
