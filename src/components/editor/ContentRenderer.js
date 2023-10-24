'use client';
import Image from 'next/image';
import { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import ContentEditModal from './ContentEditModal';
import VideoResolver from './VideoResolver';
export default function ContentRenderer({ content, setContent }) {
  const [editData, setEditData] = useState(null);

  const editContent = (index) => {
    setEditData(index);
  };
  console.log('index', editData);
  return (
    <div>
      {editData !== null ? (
        <>
          <ContentEditModal
            content={content}
            editData={editData}
            setContent={setContent}
            setEditData={setEditData}
          />
        </>
      ) : (
        <></>
      )}
      {content?.map((item, index) => {
        if (item.type === 'paragraph') {
          const renderHTML = (htmlString) => {
            return { __html: htmlString };
          };

          return (
            <div key={index} className="flex flex-row">
              <p
                className="xl:max-w-[95%] text-black text-base xl:text-lg tracking-wide leading-8 my-4"
                dangerouslySetInnerHTML={renderHTML(item.text)}
              />
              <BiEdit
                className="cursor-pointer"
                onClick={() => editContent(index)}
                size={30}
              />
            </div>
          );
        } else if (item.type === 'h2') {
          return (
            <div key={index} className="flex flex-row items-center">
              <h2 className="xl:max-w-[95%] my-3 text-xl xl:text-4xl font-extrabold tracking-wide xl:mb-6">
                {item.text}
              </h2>
              <BiEdit
                className="cursor-pointer"
                onClick={() => editContent(index)}
                size={30}
              />
            </div>
          );
        } else if (item.type === 'h3') {
          return (
            <div key={index} className="flex flex-row items-center">
              <h3 className="my-3 text-lg xl:text-3xl font-extrabold tracking-wide xl:mb-6">
                {item.text}
              </h3>
              <BiEdit
                className="cursor-pointer"
                onClick={() => editContent(index)}
                size={30}
              />
            </div>
          );
        } else if (item.type === 'image') {
          return (
            <Image
              key={index}
              width={100}
              height={100}
              className="w-full h-full my-4"
              src={item.data.tempSrc}
              alt={item.data.alt}
            />
          );
        } else if (item.type === 'list') {
          const renderHTML = (htmlString) => {
            return { __html: htmlString };
          };

          return (
            <div key={index} className="flex flex-row items-start">
              <div
                className="text-black text-base xl:text-lg tracking-wide leading-8 my-4"
                dangerouslySetInnerHTML={renderHTML(item.text)}
              />{' '}
              <BiEdit
                className="cursor-pointer"
                onClick={() => editContent(index)}
                size={30}
              />
            </div>
          );
        } else if (item.type === 'video') {
          return <VideoResolver key={index} videoData={item} />;
        }
      })}
    </div>
  );
}
