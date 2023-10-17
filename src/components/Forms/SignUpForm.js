'use client';
import Link from 'next/link';
import { useRef } from 'react';

export default function SignUpForm() {
  const fullNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const rememberMeRef = useRef();
  function createUser(e) {
    e.preventDefault();
    const formData = {
      fullName: fullNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
      rememberMe: rememberMeRef.current.checked,
    };
    console.log('formData', formData);
  }
  return (
    <form
      onSubmit={createUser}
      className="w-1/2 flex flex-col border border-black p-4"
    >
      <input
        ref={fullNameRef}
        className="w-full p-2"
        type="text"
        placeholder="Full Name"
      />
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
      <input
        ref={confirmPasswordRef}
        className="w-full p-2"
        type="Password"
        placeholder="Confirm Password"
      />
      <label className="items-center flex flex-row cursor-pointer">
        <input ref={rememberMeRef} type="checkbox" className="mr-2" /> Remember
        Me
      </label>
      <button
        type="submit"
        className="bg-[#ff0000] hover:scale-[1.01] transition-all text-white text-xl rounded-lg px-3 py-2"
      >
        Sign Up
      </button>
      <p>
        Already Registered ?{' '}
        <Link className="link" href="/login">
          Login Now
        </Link>
      </p>
    </form>
  );
}
