'use client';

import { useState } from 'react';
import ContentForm from './ContentForm';
import ContentRenderer from './ContentRenderer';
import EditorDashboard from './EditorDashboard';
import ThumbnailImage from './ThumbnailImage';
import Image from 'next/image';
import { verifiedIcon } from '@/assets/BlogCards';
import ImageUploadModal from './ImageUploadModal';

export default function Editor() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [thumbnailImg, setThumbnailImg] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [content, setContent] = useState([]);
  const [currentItem, setCurrentItem] = useState('');
  const [currentItemType, setCurrentItemType] = useState('');
  const [listType, setListType] = useState('lower-roman');

  let newDate = new Date().toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleAddItem = () => {
    if (currentItemType === 'paragraph' && currentItem) {
      let linkText = currentItem.replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" target="_blank" class="link" rel="noopener noreferrer">$1</a>'
      );
      let boldText = linkText.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
      let italicText = boldText.replace(/~(.*?)~/g, '<em>$1</em>');
      setContent([...content, { type: currentItemType, text: italicText }]);
      setCurrentItem('');
    } else if (currentItemType === 'list' && currentItem) {
      let newContent = [...content];
      if (currentItem.startsWith('#')) {
        const lines = currentItem.split('\n');
        const listItems = lines
          .filter((line) => line.startsWith('#'))
          .map((line) => `<li>${line.substring(1)}</li>`)
          .join('');
        newContent.push({
          type: 'list',
          text: `<ol style="list-style-type: ${listType}">${listItems}</ol>`,
        });
      } else {
        newContent.push({ type: currentItemType, text: currentItem });
      }
      setContent(newContent);
      setCurrentItem('');
    } else {
      if (currentItem) {
        setContent([...content, { type: currentItemType, text: currentItem }]);
        setCurrentItem('');
      }
    }
  };

  const handleTags = (e) => {
    const string = e.target.value;
    const array = string
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    setSelectedTags(array);
  };

  console.log('blog data', content);

  return (
    <>
      {currentItemType === 'image' ? (
        <ImageUploadModal
          setCurrentItemType={setCurrentItemType}
          setCurrentItem={setCurrentItem}
          setContent={setContent}
          content={content}
        />
      ) : (
        <></>
      )}
      <ThumbnailImage setThumbnailImg={setThumbnailImg} />
      <textarea
        className="my-3 text-3xl border-x-0 border-t-0 border-gray-200 outline-none whitespace-normal w-full xl:text-6xl font-extrabold tracking-wider xl:mb-6 h-fit overflow-hidden"
        cols={2}
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="my-3 gap-2 flex flex-wrap items-center text-base">
        <span className="border-[#027A48] text-[#027A48] border-solid cursor-pointer border-[1px] py-1 px-2 rounded-full">
          <Image className="inline" src={verifiedIcon} alt="verified icon" />{' '}
          Verified
        </span>

        {selectedTags.map((item, id) => (
          <span
            key={id}
            className="border-stone-700 whitespace-nowrap text-stone-700 border-solid border-[1px] py-1 px-2 rounded-full"
          >
            {item}{' '}
            <button className="border-[0.5px] rounded-full px-2 border-gray-600">
              x
            </button>
          </span>
        ))}
      </div>
      <textarea
        onChange={(e) => handleTags(e)}
        placeholder="Use , (comma) as tag seperator"
        className="w-full mt-2 p-2 outline-none"
      />

      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
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

      <ContentRenderer content={content} />

      {/* Blog Editor */}
      <ContentForm
        currentItemType={currentItemType}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        listType={listType}
        setListType={setListType}
        handleAddItem={handleAddItem}
      />

      {/* Content Format selector dashboard */}
      <EditorDashboard setCurrentItemType={setCurrentItemType} />
      <div className="text-right">
        <button className="bg-[#ff0000] mt-4 hover:scale-[1.01] transition-all text-white text-xl rounded-lg px-3 py-2">
          Publish
        </button>
      </div>
    </>
  );
}
