'use client';
import Link from 'next/link';
import { useState } from 'react';
import navMenu from './Menu';

export default function Hamburger() {
  const [toggle, setToggle] = useState(false);

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <button
        onClick={toggleMenu}
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
        className={`fixed left-0 top-0 flex flex-col w-full items-center gap-1 pb-2 transition-all duration-500 mt-16 bg-white border-b-[0.25px] border-solid border-black`}
        style={{
          visibility: toggle ? 'visible' : 'hidden',
          opacity: toggle ? 1 : 0,
          maxHeight: toggle ? '100%' : '0',
          overflow: toggle ? 'visible' : 'hidden',
        }}
      >
        {navMenu.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            onClick={toggleMenu}
            className={`text-xl transition-all duration-200 pt-1 ${
              item.title === 'Blog'
                ? 'text-red-600'
                : 'text-black hover:text-black'
            }`}
          >
            {item.title}
          </Link>
        ))}
        {/* <Link
          onClick={toggleMenu}
          href={'/login'}
          className={`bg-[#ff0000] hover:scale-[1.01] transition-all text-white text-xl rounded-lg px-3 py-2`}
        >
          Login
        </Link> */}
        <button className="btn-primary">Join Waitlist</button>
      </div>
    </div>
  );
}
