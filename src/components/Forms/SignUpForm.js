'use client';
import { PostRequest } from '@/constants/functions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'react-toastify';

export default function SignUpForm() {
  const fullNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const router = useRouter();

  async function createUser(e) {
    e.preventDefault();

    const fullName = fullNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!fullName || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Password and Confirm Password must match.');
      return;
    }

    const formData = {
      fullname: fullName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    const res = await PostRequest('/register', formData);
    console.log('res', res);
    if (res.status === 201) {
      // alert(res.data.message);
      toast.success(res.data.message);
      router.push('/login');
    }
  }

  return (
    <form
      onSubmit={createUser}
      className="w-1/2 flex flex-col border border-black p-4"
    >
      <input
        required
        ref={fullNameRef}
        className="w-full p-2"
        type="text"
        placeholder="Full Name"
      />
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
      <input
        required
        ref={confirmPasswordRef}
        className="w-full p-2 mb-2"
        type="Password"
        placeholder="Confirm Password"
      />

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
