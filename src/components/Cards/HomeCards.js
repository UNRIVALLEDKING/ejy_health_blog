import { image2, impressionsIcon, verifiedIcon } from '@/assets/BlogCards';
import { title, IMAGE_HOST } from '@/constants/constant';
import { calculateReadTime } from '@/constants/functions';
import Image from 'next/image';
import Link from 'next/link';

export default function HomeCards({ item }) {
  console.log('item', item);
  return (
    <div className="p-2 2xl:p-6 shadow-md w-full rounded-md">
      <Image
        className="w-full rounded-lg aspect-video object-cover object-center"
        width={500}
        height={500}
        src={item ? IMAGE_HOST + item.thumbnail : image2}
        alt={item ? item.title : title}
      />
      <div className="my-2 gap-2 flex flex-wrap items-center text-sm">
        <span className="whitespace-nowrap border-[#027A48] text-[#027A48] border-solid cursor-pointer border-[1px] py-1 px-2 rounded-full">
          <Image className="inline" src={verifiedIcon} alt="verified icon" />{' '}
          Verified
        </span>
        {item.tags.map((item) => (
          <span
            key={item.id}
            style={{ borderColor: item.color }}
            className={`whitespace-nowrap text-stone-700 border-solid cursor-pointer border-[1px] py-1 px-2 rounded-full`}
          >
            {item.name}
          </span>
        ))}
      </div>
      <h2 className="text-2xl font-semibold my-3">
        <Link href={`/en/${item.url}`}>
          {item ? item.title : 'Your health depends on the food you consume.'}
        </Link>
      </h2>
      <p className="my-2 text-base tracking-tight">
        {item
          ? item.desc
          : 'In a world where the pace of life seems to grow increasingly hectic, it&apos;s easy to overlook the profound impact that our dietary choices.'}
      </p>
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
  );
}
