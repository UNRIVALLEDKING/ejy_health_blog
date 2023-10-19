'use client';
import { PostRequest } from '@/constants/functions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const rememberMeRef = useRef();
  const router = useRouter();

  async function loginUser(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const rememberMe = rememberMeRef.current.checked;
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    const formData = {
      email: email,
      password: password,
      rememberMe: rememberMe,
    };
    const res = await PostRequest('/login', formData);
    console.log('res', res);

    if (res.status === 200) {
      if (rememberMe) {
        localStorage.setItem('id', res.data.userId);
        localStorage.setItem('token', res.data.accessToken);
        toast.success('Login Successfully');
        router.push(`/profile/${res.data.userId}`);
      } else {
        sessionStorage.setItem('id', res.data.userId);
        sessionStorage.setItem('token', res.data.accessToken);
        toast.success('Login Successfully');
        router.push(`/profile/${res.data.userId}`);
      }
    } else {
      alert(res.data.message);
    }
  }

  return (
    <form
      onSubmit={loginUser}
      className="w-1/2 flex flex-col border border-black p-4"
    >
      <input
        required
        ref={emailRef}
        className="w-full p-2"
        type="email"
        placeholder="Email"
      />
      <input
        required
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
