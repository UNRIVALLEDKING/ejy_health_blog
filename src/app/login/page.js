import LoginForm from '@/components/Forms/LoginForm';

export default function page() {
  return (
    <div className="w-full px-2 xl:px-0 gap-2 min-h-[80vh] flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold">Login</h2>
      <LoginForm />
    </div>
  );
}
