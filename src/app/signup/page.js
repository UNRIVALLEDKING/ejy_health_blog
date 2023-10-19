import SignUpForm from '@/components/Forms/SignUpForm';
import { ToastContainer } from 'react-toastify';

export default function page() {
  return (
    <div className="w-full">
      <ToastContainer />
      <h2>Signup</h2>
      <SignUpForm />
    </div>
  );
}
