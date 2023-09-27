import Nav from '@/components/Navbar/Nav';
import './globals.css';
import { Poppins } from 'next/font/google';
import Footer from '@/components/Footer/Footer';
import { description, title } from '@/constants/constant';

const poppins = Poppins({ subsets: ['latin'], weight: '400' });

export const metadata = {
  title: `Blog - ${title}`,
  description: description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} overflow-x-hidden`}>
        <Nav />
        <main className="container mx-auto flex min-h-screen flex-col items-center mt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
