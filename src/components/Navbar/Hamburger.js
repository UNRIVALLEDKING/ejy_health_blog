'use client';
import Link from 'next/link';
import { useState } from 'react';
import navMenu from './Menu';

export default function Hamburger() {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <button
        onClick={() => setToggle(!toggle)}
        className="z-[99999] flex flex-col gap-1"
        aria-label="Toggle Button"
      >
        <div
          className={`h-1 w-8  rounded bg-black transition-all ${
            toggle ? 'translate-x-[1px] translate-y-[3px] rotate-45' : ''
          }`}
        ></div>
        <div
          className={`h-1 w-8 rounded bg-black transition-all ${
            toggle ? 'hidden' : ''
          }`}
        ></div>
        <div
          className={`h-1 w-8  rounded bg-black transition-all ${
            toggle ? '-translate-y-[5px] translate-x-[1px] -rotate-45' : ''
          }`}
        ></div>
      </button>
      <div
        className={`fixed left-0 top-0 transition-all duration-300 flex flex-col items-center w-full ${
          toggle ? 'h-[220px]' : 'h-0'
        }  mt-16 bg-white border-y-[0.25px] border-solid border-black`}
      >
        {navMenu.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            onClick={() => setToggle(!toggle)}
            className={`text-xl transition-all duration-200 pt-1 ${
              toggle ? 'opacity-100 transition-all delay-150' : 'opacity-0'
            } ${
              item.title === 'Blog'
                ? 'text-red-600'
                : 'text-black hover:text-black'
            }`}
          >
            {item.title}
          </Link>
        ))}
        <Link
          href={'/login'}
          className={`bg-[#ff0000] ${
            toggle ? 'opacity-100 transition-all delay-150' : 'opacity-0'
          } hover:scale-[1.01] transition-all text-white text-xl rounded-lg px-3 py-2`}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
