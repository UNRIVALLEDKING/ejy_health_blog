import ProfilePage from '@/components/UserProfile/ProfilePage';

export default async function page({ params }) {
  return (
    <>
      <ProfilePage params={params} />
    </>
  );
}
