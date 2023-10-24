'use client';
import { ejyHealthLogo } from '@/assets';
import { title } from '@/constants/constant';
import Image from 'next/image';
import Link from 'next/link';
import navMenu from './Menu';
import { Inter } from 'next/font/google';
import Hamburger from './Hamburger';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    const id = localStorage.getItem('id');
    if (token) {
      setIsLoggedIn({ id: id, user: JSON.parse(userData) });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav
      className={`${inter.className} z-50 flex bg-white justify-center py-2 items-center fixed top-0 w-full left-0 xl:border-b-[0.5px] xl:border-solid xl:border-black`}
    >
      <div className="hidden xl:flex justify-between items-center w-full px-2 xl:px-0 xl:max-w-[80vw] xl:w-full mx-auto">
        <Link href="/" className="flex flex-row items-center gap-2">
          <Image className="w-10" src={ejyHealthLogo} alt={title} />
          <h1 className="text-2xl text-black tracking-wider font-semibold">
            {title.slice(0, 3)}
            <span className="text-red-600">{title.slice(3)}</span>
          </h1>
        </Link>
        {/* <Link href="/">
          <Image className="w-40" src={largeLogo} alt={title} />
        </Link> */}
        <div className="flex gap-2 2xl:gap-6 text-xl">
          {navMenu.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className={`text-xl border-b-[1px] border-b-transparent hover:border-black transition-all duration-200 ${
                item.title === 'Blog'
                  ? 'text-red-600'
                  : 'text-black hover:text-black'
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>
        {isLoggedIn?.user ? (
          <Link
            href={`/profile/${isLoggedIn?.id}`}
            className="bg-[#ff0000] hover:scale-[1.01] transition-all text-white text-xl rounded-lg px-3 py-2"
          >
            {isLoggedIn?.user.fullname}
          </Link>
        ) : (
          <Link
            className="bg-[#ff0000] hover:scale-[1.01] transition-all text-white text-xl rounded-lg px-3 py-2"
            href={'/login'}
          >
            Login
          </Link>
        )}
      </div>
      <div className="flex xl:hidden w-full px-2 pb-1 justify-between items-center border-b-[0.25px] border-solid border-black">
        <Link href="/" className="flex flex-row items-center gap-2">
          <Image className="w-10" src={ejyHealthLogo} alt={title} />
          <h1 className="text-2xl text-black tracking-wider font-semibold">
            {title.slice(0, 3)}
            <span className="text-red-600">{title.slice(3)}</span>
          </h1>
        </Link>
        <div>
          <Hamburger />
        </div>
      </div>
    </nav>
  );
}
