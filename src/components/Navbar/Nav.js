import { ejyHealthLogo, largeLogo } from '@/assets';
import { title } from '@/constants/constant';
import Image from 'next/image';
import Link from 'next/link';
import navMenu from './Menu';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Nav() {
  return (
    <nav
      className={`${inter.className} flex bg-white justify-around py-2 items-center fixed top-0 w-full left-0 border-b-[0.5px] border-solid border-black`}
    >
      <div className="flex flex-row items-center gap-2">
        <Image className="w-40" src={largeLogo} alt={title} />
        {/* <h1 className="text-2xl font-bold">
          {title.slice(0, 3)}
          <span className="text-red-600">{title.slice(3)}</span>
        </h1> */}
      </div>
      <div className="hidden xl:flex gap-2 2xl:gap-6 text-xl">
        {navMenu.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            className={`text-xl ${
              item.title === 'Blogs'
                ? 'text-red-600'
                : 'text-black hover:text-black'
            }`}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <button className="bg-[#ff0000] hover:scale-[1.01] transition-all text-white text-xl rounded-lg px-3 py-2">
        Join Waitlist
      </button>
    </nav>
  );
}