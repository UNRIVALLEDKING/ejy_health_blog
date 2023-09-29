import Image from 'next/image';
import { BlogData } from './blogData';
import { verifiedIcon } from '@/assets/BlogCards';
import HomeCards from '@/components/Cards/HomeCards';
import 'react-toastify/dist/ReactToastify.css';
import {
  BsFacebook,
  BsLinkedin,
  BsTelegram,
  // BsMailbox,
  BsTwitter,
  BsWhatsapp,
} from 'react-icons/bs';
import { HiMail } from 'react-icons/hi';
import { MAIN_URL } from '@/constants/constant';
import CopyURL from '@/components/CopyURL';
import { ToastContainer } from 'react-toastify';

export default function page({ params }) {
  const { blog } = params;

  // console.log('params', params);
  const pageData = BlogData.find((item) => item.url === blog);
  const blogUrl = encodeURIComponent(
    MAIN_URL + params.lang + '/' + pageData.url
  );
  function calculateReadingTime() {
    const wordsPerMinute = 200;
    const content = pageData.content;

    const filteredContent = content.filter(
      (item) => item.type === 'paragraph' || item.type === 'list'
    );

    const totalWords = filteredContent.reduce((total, item) => {
      if (item.type === 'paragraph') {
        const words = item.text.replace(/<[^>]+>/g, '').split(/\s+/);
        return total + words.length;
      } else if (item.type === 'list') {
        const listItems = item.text.split('<li>').filter(Boolean);
        return total + listItems.length;
      }
      return total;
    }, 0);

    const readingTimeMinutes = Math.ceil(totalWords / wordsPerMinute);

    return readingTimeMinutes;
  }

  const readTime = calculateReadingTime();
  return (
    <div className="bg-white text-black md:pb-20">
      <ToastContainer />
      <div className="container xl:max-w-[80vw] relative mx-auto flex flex-row px-4 xl:gap-x-4">
        <div className="w-full mx-auto xl:max-w-[80vw]">
          <div>
            <Image
              className="w-full"
              src={pageData.thumbnail}
              alt={pageData.title}
            />
            <div className="my-3 gap-2 flex items-center text-sm">
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
            <h1 className="my-3 text-2xl xl:text-5xl font-bold tracking-wider xl:mb-6">
              {pageData.title}
            </h1>
            <p className="text-black text-lg xl:text-xl tracking-wider font-medium leading-8">
              {pageData.desc}
            </p>
            <div className="mt-4 flex flex-col-reverse xl:flex-row justify-between mr-4 text-sm text-gray-500">
              <div className="flex justify-start items-center gap-3 text-2xl">
                <a
                  href={`whatsapp://send?text=Check out this blog post: ${blogUrl}`}
                  data-action="share/whatsapp/share"
                >
                  <BsWhatsapp />
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?url=${blogUrl}&text=${pageData.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsTwitter />
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsFacebook />
                </a>

                {/* <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    blogUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsLinkedin />
                </a> */}
                <a
                  href={`https://t.me/share/url?url=${blogUrl}&text=${pageData.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsTelegram />
                </a>
                <a
                  href={`mailto:?subject=Check%20out%20this%20blog%20post&body=Check%20out%20this%20blog%20post:%20${blogUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl"
                >
                  {/* <BsMailbox /> */}
                  <HiMail />
                  {/* <span>Email</span> */}
                </a>

                <CopyURL url={blogUrl} />
              </div>
              <div className="text-right">
                <a
                  href={pageData.authorUrl}
                  target="_blank"
                  className="link text-sm"
                >
                  {pageData.author}
                </a>
                <p>
                  24 August 2023 &#x2022; <span>{readTime} min read</span>
                </p>
              </div>
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
                  className="text-black text-base xl:text-lg tracking-wide leading-8 my-4"
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
                  className="my-3 text-xl xl:text-4xl font-bold tracking-wide xl:mb-6"
                >
                  {item.text}
                </h2>
              );
            } else if (item.type === 'h3') {
              return (
                <h3
                  key={index}
                  className="my-3 text-lg xl:text-3xl font-bold tracking-wide xl:mb-6"
                >
                  {item.text}
                </h3>
              );
            }
          })}
          <div className="mt-20 text-right">
            <a
              href={pageData.authorUrl}
              target="_blank"
              className="link text-sm"
            >
              {pageData.author}
            </a>
            <p className="text-sm">{pageData.date}</p>
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
