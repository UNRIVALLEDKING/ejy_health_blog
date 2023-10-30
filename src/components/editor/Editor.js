'use client';

import { useEffect, useState } from 'react';
import ContentForm from './ContentForm';
import ContentRenderer from './ContentRenderer';
import EditorDashboard from './EditorDashboard';
import ThumbnailImage from './ThumbnailImage';
// import Image from 'next/image';
// import { verifiedIcon } from '@/assets/BlogCards';
import ImageUploadModal from './ImageUploadModal';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {
  PostRequest,
  awsImageUpload,
  calculateReadTime,
} from '@/constants/functions';
import FormLoader from './FormLoader';
import TagEditor from './TagEditor';

export default function Editor() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [thumbnailImg, setThumbnailImg] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [content, setContent] = useState([]);
  const [currentItem, setCurrentItem] = useState('');
  const [currentItemType, setCurrentItemType] = useState('');
  const [listType, setListType] = useState('lower-roman');
  const [userData, setUserData] = useState(null);
  const [imageState, setImageState] = useState(false);
  const [loader, setLoader] = useState(false);

  const router = useRouter();

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
    } else if (currentItemType === 'video' && currentItem) {
      const youtubeUrlPattern =
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|shorts\/|embed\/|v\/|user\/\S+|channel\/\S+|c\/\S+|)\S{11}/;

      if (!youtubeUrlPattern.test(currentItem)) {
        toast.warning('Please enter a valid YouTube URL.');
      } else {
        setContent([...content, { type: currentItemType, text: currentItem }]);
        setCurrentItem('');
      }
    } else {
      if (currentItem) {
        setContent([...content, { type: currentItemType, text: currentItem }]);
        setCurrentItem('');
      }
    }
  };

  console.log('blog data', content);

  async function handlePublish(e) {
    e.preventDefault();

    setLoader('Uploading Images');
    const thumbnailWithCaption = {
      object: thumbnailImg.object,
      caption: title,
    };
    const updatedThumbnail = await awsImageUpload(thumbnailWithCaption);
    const updatedContent = await Promise.all(
      content.map(async (item) => {
        if (item.type === 'image') {
          return {
            type: 'image',
            data: await awsImageUpload(item.data),
          };
        } else {
          return item;
        }
      })
    );
    console.log('url', updatedContent);
    console.log('thumbnailImg', thumbnailImg);
    console.log('updatedThumbnail', updatedThumbnail);
    setLoader('Uploading Blog Data');

    const tempFormData = {
      title: title,
      desc: desc,
      thumbnail: updatedThumbnail.src,
      body: updatedContent,
      user: userData.id,
      keywords: selectedTags,
    };
    console.log('updatedConte', updatedContent);
    try {
      const postData = await PostRequest(
        '/admin/blogs/create-post',
        tempFormData,
        userData.token
      );
      if (postData.status === 201) {
        toast.success('blog uploaded');
        router.push('/');
      } else {
        console.log('res', postData);
      }
    } catch (err) {
      console.log('err', err);
    }
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }

  const readTime = calculateReadTime(content);

  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem('userData')) ||
      JSON.parse(sessionStorage.getItem('userData'));
    const id = localStorage.getItem('id');
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (user) {
      setUserData({ fullname: user.fullname, id: id, token: token });
    } else {
      toast.warning('login to create blog');
      router.push('/login');
    }
  }, []);
  console.log('seleeeee', selectedTags);
  return (
    <div className="w-full">
      {loader ? (
        <>
          <FormLoader LoadingMessage={loader} />
        </>
      ) : (
        <></>
      )}
      {currentItemType === 'image' ? (
        <ImageUploadModal
          setImageState={setImageState}
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

      <TagEditor
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
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
      <EditorDashboard
        imageState={imageState}
        setCurrentItemType={setCurrentItemType}
      />
      <div className="text-right">
        <button
          onClick={handlePublish}
          className="bg-[#ff0000] mt-4 hover:scale-[1.01] transition-all text-white text-xl rounded-lg px-3 py-2"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
