import Nav from '@/components/Navbar/Nav';
import './globals.css';
import { Red_Hat_Display } from 'next/font/google';
import Footer from '@/components/Footer/Footer';
import { description, title } from '@/constants/constant';

const redHatDisplay = Red_Hat_Display({ subsets: ['latin'] });

export const metadata = {
  title: `Blog - ${title}`,
  description: description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${redHatDisplay.className} overflow-x-hidden`}>
        <Nav />
        <main className="container mx-auto flex min-h-screen flex-col items-center 2xl:p-20 mt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
