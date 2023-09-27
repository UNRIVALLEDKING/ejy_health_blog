import Image from 'next/image';
import { BlogData } from './blogData';
import { verifiedIcon } from '@/assets/BlogCards';
import HomeCards from '@/components/Cards/HomeCards';

export default function page({ params }) {
  const { blog } = params;
  const pageData = BlogData.find((item) => item.url === blog);
  return (
    <div className="overflow-hidden bg-white text-black md:pb-20">
      <div className="container relative mx-auto flex flex-row px-4 xl:gap-x-4">
        <div className="w-full xl:w-[75%]">
          <div>
            <Image
              className="w-full"
              src={pageData.thumbnail}
              alt={pageData.title}
            />
            <div className="my-3 gap-2 flex items-center text-base">
              <span className="border-[#027A48] text-[#027A48] border-solid cursor-pointer border-[1px] py-1 px-2 rounded-full">
                <Image
                  className="inline"
                  src={verifiedIcon}
                  alt="verified icon"
                />{' '}
                Verified
              </span>
              <span className="border-stone-700 text-stone-700 border-solid cursor-pointer border-[1px] py-1 px-2 rounded-full">
                Case-Study
              </span>
              <span className="border-stone-700 text-stone-700 border-solid cursor-pointer border-[1px] py-1 px-2 rounded-full">
                Kid&apos;s Care
              </span>
            </div>
            <h1 className="my-3 text-3xl xl:text-6xl font-extrabold tracking-wider xl:mb-6">
              {pageData.title}
            </h1>
            <p className="text-black text-lg xl:text-2xl tracking-wider font-medium leading-8">
              {pageData.desc}
            </p>
            <div className="mt-4 text-right mr-4 text-base text-gray-500 xl:text-lg font-semibold">
              <p className="mb-2 tracking-wider">{pageData.author}</p>
              <span>24 August 2023</span> &#x2022; <span>7 min read</span>
            </div>
          </div>

          {pageData.content.map((item, index) => {
            if (item.type === 'paragraph') {
              const renderHTML = (htmlString) => {
                return { __html: htmlString };
              };

              return (
                <p
                  key={index}
                  className="text-black text-lg xl:text-xl tracking-wider leading-8 my-4"
                  dangerouslySetInnerHTML={renderHTML(item.text)}
                />
              );
            } else if (item.type === 'image') {
              return (
                <div
                  key={index}
                  className="flex w-full flex-col items-center justify-center"
                >
                  <Image
                    //   placeholder="blur"
                    className="my-4 w-full"
                    //   blurDataURL={item.src.blurDataURL}
                    src={item.src.src}
                    alt={item.alt}
                    width={item.src.width}
                    height={item.src.height}
                  />
                  <p className="text-center">{item.caption}</p>
                </div>
              );
            } else if (item.type === 'video') {
              return (
                <div key={index}>
                  <video src={item.src} controls />
                  <p>{item.caption}</p>
                </div>
              );
            } else if (item.type === 'h2') {
              return (
                <h2
                  key={index}
                  className="my-3 text-2xl xl:text-5xl font-extrabold tracking-wider xl:mb-6"
                >
                  {item.text}
                </h2>
              );
            } else if (item.type === 'h3') {
              return (
                <h3
                  key={index}
                  className="my-3 text-xl xl:text-4xl font-extrabold tracking-wider xl:mb-6"
                >
                  {item.text}
                </h3>
              );
            }
          })}
          <div className="mt-20 text-right">
            <a href={pageData.authorUrl} target="_blank" className="text-xl">
              {pageData.author}
            </a>
            <p>{pageData.date}</p>
          </div>
        </div>
        <div className="hidden xl:w-[25%] xl:flex gap-2 flex-col">
          <HomeCards />
          <HomeCards />
          <HomeCards />
          <HomeCards />
          <HomeCards />
        </div>
      </div>
    </div>
  );
}
