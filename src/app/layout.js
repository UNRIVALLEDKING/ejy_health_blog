import Nav from '@/components/Navbar/Nav';
import './globals.css';
import { Poppins } from 'next/font/google';
import Footer from '@/components/Footer/Footer';
import { description, title } from '@/constants/constant';
import PreventCopyWrapper from './PreventCopyWrapper';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

export const metadata = {
  title: `Blog - ${title}`,
  description: description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} overflow-x-hidden`}>
        <PreventCopyWrapper>
          <Nav />
          <main className="container mx-auto flex min-h-screen flex-col items-center mt-20">
            {children}
          </main>
          <Footer />
        </PreventCopyWrapper>
      </body>
    </html>
  );
}
