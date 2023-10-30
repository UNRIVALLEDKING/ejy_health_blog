'use client';
import {
  DeleteRequest,
  PostRequest,
  awsImageDelete,
  calculateReadTime,
} from '@/constants/functions';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { IMAGE_HOST, title } from '@/constants/constant';
import { image2, impressionsIcon } from '@/assets/BlogCards';
import Link from 'next/link';
import { MdDelete } from 'react-icons/md';
import { useUser } from '@/constants/customHooks';
import FormLoader from '../editor/FormLoader';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { userData, authenticated, loading, token } = useUser();
  const router = useRouter();

  const handleDelete = async (item) => {
    toast('deleting blog');
    const id = item._id;
    const thumbnailImg = item.thumbnail;
    const images = item.body.filter((item) => {
      return item.type === 'image';
    });
    const imageSources = [
      thumbnailImg,
      ...images.map((image) => image.data.src),
    ];

    const imagesToBeDeleted = imageSources.map((src) => ({ Key: src }));
    console.log('images to be deleted', imagesToBeDeleted);
    const deleteImages = await awsImageDelete(imagesToBeDeleted);
    console.log('deleteImages AWS', deleteImages);

    const deletePost = await DeleteRequest(
      `/admin/blogs/delete-post/${id}`,
      userToken
    );
    console.log('delete', deletePost);
  };

  console.log('user', userData);

  const handleLogOut = async () => {
    const logout = await PostRequest('/logout', [], token);
    if (logout.status === 200) {
      localStorage.clear;
      toast.success('log out successfully');
      router.push('/');
    }
    console.log('logout', logout);
  };
  if (loading) {
    // Render a loading indicator or message.
    return (
      <div>
        <FormLoader LoadingMessage={'Loading Data'} />
      </div>
    );
  }

  if (!authenticated) {
    // Handle the case when authentication fails.
    return <div>Authentication failed. Please log in.</div>;
  }

  return (
    <div>
      <div className="text-right">
        <h1 className="text-4xl text-center">
          Yahallo! {userData?.user.fullname}{' '}
        </h1>
        <button
          className="bg-[#ff0000] mt-4 hover:scale-[1.01] transition-all text-white text-xl rounded-lg px-3 py-2"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </div>
      <h2 className="text-3xl">Posts by {userData?.user.fullname}</h2>
      <div className="w-full grid grid-cols-2 gap-2">
        {userData?.user.posts.map((item, id) => (
          <div key={id} className="relative w-full flex gap-2 shadow-xl">
            <button onClick={() => handleDelete(item)}>
              <MdDelete size={30} className="absolute bottom-2 right-2" />
            </button>
            <Image
              className="rounded-lg aspect-video object-cover object-center"
              width={200}
              height={200}
              src={item ? IMAGE_HOST + item.thumbnail : image2}
              alt={item ? item.title : title}
            />
            <div className="w-4/5">
              <div>
                <Link href={`/en/${item.url}`}>
                  <h3 className="text-2xl font-semibold my-3">
                    {item
                      ? item.title
                      : 'Your health depends on the food you consume.'}
                  </h3>
                </Link>
                <p className="my-2 text-base tracking-tight">
                  {item
                    ? item.desc
                    : 'In a world where the pace of life seems to grow increasingly hectic, it&apos;s easy to overlook the profound impact that our dietary choices.'}
                </p>
              </div>
              <div>
                <div className="mt-2 mb-3 text-sm">
                  <span>
                    {item.views} Impressions{' '}
                    <Image
                      className="inline w-6"
                      src={impressionsIcon}
                      alt="impressions icon"
                    />
                  </span>
                </div>
                <div className="mt-2 text-sm">
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  }).format(new Date(item.createdAt))}{' '}
                  &#x2022; <span>{calculateReadTime(item.body)} Min Read</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
