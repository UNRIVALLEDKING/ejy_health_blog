'use client';

import { blogThumbnail } from '@/assets';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG'];

export default function ImageDrop() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  return (
    <>
      <div>
        <FileUploader
          multiple={false}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        >
          {preview ? (
            <div className="relative w-full p-0 m-0 cursor-pointer flex">
              <Image
                src={preview}
                alt="Blog Image Thumbnail"
                className="w-full h-full"
                width={100}
                height={100}
              />
              <div className="absolute h-full w-full top-0 left-0 bg-black/50 text-center text-white flex items-center flex-col justify-center text-3xl font-semibold">
                <p>Upload or Drop Thumbnail here</p>
                <p>Accepted Format : {fileTypes.join(', ')}</p>
              </div>
            </div>
          ) : (
            <div className="relative w-full p-0 m-0 cursor-pointer flex">
              <Image
                src={blogThumbnail}
                alt="Blog Image Thumbnail"
                className="w-full"
              />
              <div className="absolute h-full w-full top-0 left-0 bg-black/50 text-center text-white flex items-center flex-col justify-center text-3xl font-semibold rounded-3xl">
                <p>Upload or Drop Thumbnail here</p>
                <p>Accepted Format : {fileTypes.join(', ')}</p>
              </div>
            </div>
          )}
        </FileUploader>
      </div>
    </>
  );
}
