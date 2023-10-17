'use client';
import Link from 'next/link';
import { useRef } from 'react';

export default function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const rememberMeRef = useRef();

  function loginUser(e) {
    e.preventDefault();
    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      rememberMe: rememberMeRef.current.checked,
    };
    console.log('data', formData);
  }

  return (
    <form
      onSubmit={loginUser}
      className="w-1/2 flex flex-col border border-black p-4"
    >
      <input
        ref={emailRef}
        className="w-full p-2"
        type="email"
        placeholder="Email"
      />
      <input
        ref={passwordRef}
        className="w-full p-2"
        type="Password"
        placeholder="Password"
      />
      <label className="items-center flex flex-row cursor-pointer">
        <input ref={rememberMeRef} type="checkbox" className="mr-2" /> Remember
        Me
      </label>
      <button
        type="submit"
        className="bg-[#ff0000] hover:scale-[1.01] transition-all text-white text-xl rounded-lg px-3 py-2"
      >
        Login
      </button>
      <p>
        Not Registered ?{' '}
        <Link className="link" href="/signup">
          Register Now
        </Link>
      </p>
    </form>
  );
}
