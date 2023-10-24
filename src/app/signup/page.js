import SignUpForm from '@/components/Forms/SignUpForm';

export default function page() {
  return (
    <div className="w-full px-2 xl:px-0 gap-2 min-h-[80vh] flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold">Signup</h2>
      <SignUpForm />
    </div>
  );
}
