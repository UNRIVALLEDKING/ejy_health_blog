import ProfilePage from '@/components/UserProfile/ProfilePage';

export default async function page({ params }) {
  return (
    <div className="text-black w-full bg-transparent md:pb-20">
      <ProfilePage params={params} />
    </div>
  );
}
