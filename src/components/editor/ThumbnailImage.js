'use client';

import { blogThumbnail } from '@/assets';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { toast } from 'react-toastify';
const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG'];

export default function ThumbnailImage({ setThumbnailImg }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setThumbnailImg({ tempSrc: objectUrl, object: file });
      return () => URL.revokeObjectURL(objectUrl);
    }
    // eslint-disable-next-line
  }, [file]);

  return (
    <>
      <div>
        <FileUploader
          maxSize={5}
          multiple={false}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          onSizeError={(message) => toast.error(message)}
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
              <div className="absolute h-full w-full top-0 left-0 bg-black/50 text-center text-white flex items-center flex-col justify-center text-lg xl:text-3xl font-semibold">
                <p>Upload or Drop Thumbnail here</p>
                <p>Accepted Format : {fileTypes.join(', ')}</p>
                <p>Max Size : 5 MB</p>
              </div>
            </div>
          ) : (
            <div className="relative w-full p-0 m-0 cursor-pointer flex">
              <Image
                src={blogThumbnail}
                alt="Blog Image Thumbnail"
                className="w-full"
              />
              <div className="absolute h-full w-full top-0 left-0 bg-black/50 text-center text-white flex items-center flex-col justify-center text-lg xl:text-3xl font-semibold rounded-sm xl:rounded-3xl">
                <p>Upload or Drop Thumbnail here</p>
                <p>Accepted Format : {fileTypes.join(', ')}</p>
                <p>Max Size : 5 MB</p>
              </div>
            </div>
          )}
        </FileUploader>
      </div>
    </>
  );
}
