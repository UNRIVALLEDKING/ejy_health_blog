'use client';

import { speakerIcon } from '@/assets';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { toast } from 'react-toastify';
const fileTypes = ['JPEG', 'PNG', 'JPG'];

export default function SpeakerImageHandler({ image, setImage }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setImage({ tempSrc: objectUrl, object: file });
      return () => URL.revokeObjectURL(objectUrl);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    if (image === 'default') {
      setPreview(null);
      setFile(null);
    }
  }, [image]);

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
                className="w-full h-full rounded-full aspect-square object-cover object-center"
                width={100}
                height={100}
              />
              <div className="absolute rounded-full h-full w-full top-0 left-0 bg-black/50 text-center text-white flex items-center flex-col justify-center text-sm xl:text-base font-semibold">
                <p className="text-sm">Upload Speaker Image(optional)</p>
              </div>
            </div>
          ) : (
            <div className="relative w-full p-0 m-0 cursor-pointer flex">
              <Image
                src={speakerIcon}
                alt="Speaker Image"
                className="w-full h-full rounded-full aspect-square object-cover object-center"
              />
              <div className="absolute h-full w-full top-0 left-0 bg-black/50 text-center text-white flex items-center flex-col justify-center text-sm xl:text-base font-semibold rounded-full xl:rounded-full">
                <p className="text-sm">Upload Speaker Image (optional)</p>
              </div>
            </div>
          )}
        </FileUploader>
      </div>
    </>
  );
}
