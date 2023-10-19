'use client';

import { useEffect, useState } from 'react';
import ContentForm from './ContentForm';
import ContentRenderer from './ContentRenderer';
import EditorDashboard from './EditorDashboard';
import ThumbnailImage from './ThumbnailImage';
import Image from 'next/image';
import { verifiedIcon } from '@/assets/BlogCards';
import ImageUploadModal from './ImageUploadModal';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Editor() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [thumbnailImg, setThumbnailImg] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [content, setContent] = useState([]);
  const [currentItem, setCurrentItem] = useState('');
  const [currentItemType, setCurrentItemType] = useState('');
  const [listType, setListType] = useState('lower-roman');
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState(null);

  const router = useRouter();

  let newDate = new Date().toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // const userId = localStorage.getItem('id') || sessionStorage.getItem('id');
  const handleAddItem = () => {
    const tempFormData = {
      title: title,
      desc: desc,
      Thumbnail: 'thumbnailImg',
      content: content,
      user: userData.id,
      tags: selectedTags,
      category: 'default',
    };

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
    setFormData(tempFormData, { content: content });
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

  function handlePublish(e) {
    e.preventDefault();

    const tempFormData = {
      title: title,
      desc: desc,
      ThumbnailImage: 'https://files.catbox.moe/mug3bj.png',
      body: content,
      author: userData,
      keywords: selectedTags,
    };
    setFormData(tempFormData);
    console.log('data', tempFormData);
  }

  function calculateReadTime(content) {
    const readingSpeed = 80; // words per minute
    const listItems = content
      .filter((item) => item.type === 'list')
      .map((item) => {
        const parsedItem = item.text.replace(/<[^>]*>/g, '');
        console.log('list parsed', parsedItem);
        return parsedItem;
      });

    const paragraphs = content
      .filter((item) => item.type === 'paragraph')
      .map((item) => {
        const parsedItem = item.text.replace(/<[^>]*>/g, '');
        console.log('para parsed', parsedItem);
        return parsedItem;
      });

    const totalWords =
      listItems.join(' ').split(' ').length +
      paragraphs.join(' ').split(' ').length;

    const readTimeInMinutes = totalWords / readingSpeed;

    const readTimeInMinutesRoundedUp = Math.ceil(readTimeInMinutes);

    return readTimeInMinutesRoundedUp;
  }
  const readTime = calculateReadTime(content);

  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem('userData')) ||
      JSON.parse(sessionStorage.getItem('userData'));
    const id = localStorage.getItem('id') || sessionStorage.getItem('id');
    if (user) {
      setUserData({ fullname: user.fullname, id: id });
    } else {
      toast('login to create blog');
      router.push('/login');
    }
  }, []);
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
        className="my-3 text-2xl border-x-0 border-t-0 border-gray-200 outline-none whitespace-normal w-full xl:text-5xl font-bold tracking-wider xl:mb-6 h-fit overflow-hidden"
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
        className="text-black w-full outline-none text-lg xl:text-xl tracking-wider font-medium leading-8"
      />
      <div className="mt-4 text-right mr-4 text-sm text-gray-500 xl:text-base ">
        <p className="mb-2 tracking-wider">{userData?.fullname}</p>
        <span>{newDate}</span> &#x2022; <span>{readTime} min read</span>
      </div>
      <hr className="mt-4" />

      <ContentRenderer content={content} setContent={setContent} />

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
        <button
          onClick={handlePublish}
          className="bg-[#ff0000] mt-4 hover:scale-[1.01] transition-all text-white text-xl rounded-lg px-3 py-2"
        >
          Publish
        </button>
      </div>
    </>
  );
}
