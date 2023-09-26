'use client';

import Image from 'next/image';
import { useState } from 'react';
import ImageDrop from './ImageDrop';
import HomeCards from '../Cards/HomeCards';
import { BsFillImageFill } from 'react-icons/bs';

export default function Editor() {
  const [title, setTItle] = useState('');
  const [desc, setDesc] = useState('');
  const [thumbnailImg, setThumbnailImg] = useState('');
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState([]);
  const [currentItem, setCurrentItem] = useState('');
  const [currentItemType, setCurrentItemType] = useState('');
  let newDate = new Date().toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const handleAddItem = () => {
    if (currentItem) {
      setContent([...content, { type: currentItemType, text: currentItem }]);
      setCurrentItem('');
    }
  };
  console.log('blog data', content);
  console.log('current item', currentItem);
  console.log('current item type', currentItemType);

  return (
    <div className="overflow-hidden bg-white text-black md:pb-20">
      {/* <div className="flex justify-around w-full">
        <button onClick={() => setCurrentItemType('h2')}>Heading 2</button>
        <button onClick={() => setCurrentItemType('h3')}>Heading 3</button>
        <button onClick={() => setCurrentItemType('paragraph')}>
          Parapgraph
        </button>
      </div> */}
      {/* <button onClick={() => setCurrentItemType('image')}>Image</button> */}

      <div className="w-screen relative mx-auto px-4 flex flex-row gap-x-4">
        <div className="w-3/5 ml-52">
          <ImageDrop />
          <textarea
            className="my-3 text-3xl outline-none whitespace-normal w-full xl:text-6xl font-extrabold tracking-wider xl:mb-6 h-fit overflow-hidden"
            cols={2}
            placeholder="Enter Title"
          />

          <textarea
            placeholder="Enter short description"
            className="text-black w-full outline-none text-lg xl:text-2xl tracking-wider font-medium leading-8"
          />
          <div className="mt-4 text-right mr-4 text-base text-gray-500 xl:text-lg font-semibold">
            <p className="mb-2 tracking-wider">EJYhealth</p>
            <span>{newDate}</span> &#x2022; <span>7 min read</span>
          </div>
          <p className="text-center font-semibold text-gray-500 text-2xl">
            ~~~~~~~ Blog Content ~~~~~~~
          </p>
          <div>
            {content.map((item, index) => {
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
              } else if (item.type === 'h2') {
                return (
                  <h2
                    className="my-3 text-2xl xl:text-5xl font-extrabold tracking-wider xl:mb-6"
                    key={index}
                  >
                    {item.text}
                  </h2>
                );
              } else if (item.type === 'h3') {
                return (
                  <h3
                    className="my-3 text-xl xl:text-4xl font-extrabold tracking-wider xl:mb-6"
                    key={index}
                  >
                    {item.text}
                  </h3>
                );
              } else if (item.type === 'image') {
                return <Image key={index} src={item.src} alt={item.alt} />;
              } else if (item.type === 'link') {
                return (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.text}
                  </a>
                );
              }
            })}
          </div>

          <div>
            {currentItemType === 'h2' ? (
              <textarea
                onChange={(e) => setCurrentItem(e.target.value)}
                value={currentItem}
                placeholder="Heading 2"
                className="outline-none w-full my-3 text-2xl xl:text-5xl font-extrabold tracking-wider xl:mb-6"
              />
            ) : currentItemType === 'h3' ? (
              <textarea
                onChange={(e) => setCurrentItem(e.target.value)}
                value={currentItem}
                placeholder="Heading 3"
                className="outline-none w-full my-3 text-xl xl:text-4xl font-extrabold tracking-wider xl:mb-6"
              />
            ) : currentItemType === 'paragraph' ? (
              <textarea
                onChange={(e) => setCurrentItem(e.target.value)}
                value={currentItem}
                placeholder="Paragraph"
                className="w-full outline-none text-black text-lg xl:text-xl tracking-wider leading-8 my-4"
              />
            ) : null}
            {currentItemType !== '' ? (
              <button
                onClick={handleAddItem}
                className="bg-[#ff0000] hover:scale-[1.01] transition-all text-white text-xl rounded-lg px-3 py-2"
              >
                Add
              </button>
            ) : (
              <p className="text-center text-xl text-gray-500 mt-10">
                Start by selecting content type first
              </p>
            )}
          </div>
          <div className="flex justify-around w-full mt-10">
            <h3>Select content format</h3>
            <button
              className="font-bold"
              onClick={() => setCurrentItemType('h2')}
            >
              H2
            </button>
            <button
              className="font-semibold"
              onClick={() => setCurrentItemType('h3')}
            >
              H3
            </button>
            <button
              className="font-base"
              onClick={() => setCurrentItemType('paragraph')}
            >
              P
            </button>
            <button onClick={() => setCurrentItemType('image')}>
              <BsFillImageFill />
            </button>
            <button onClick={() => setCurrentItemType('ol')}>OL</button>
            <button onClick={() => setCurrentItemType('ul')}>Ul</button>
          </div>
        </div>

        <div className="w-1/5 flex gap-2 flex-col">
          <HomeCards />
        </div>
      </div>
    </div>
  );
}
