import { blogThumbnail } from '@/assets';
import { title } from '@/constants/constant';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { toast } from 'react-toastify';

const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG'];

export default function ImageUploadModal({
  setCurrentItemType,
  setCurrentItem,
  setContent,
  content,
  setImageState,
}) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [preview, setPreview] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  }, [file]);

  const addImageData = async () => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      const newContent = [
        ...content,
        {
          type: 'image',
          data: {
            object: file,
            tempSrc: objectUrl,
            caption: caption,
          },
        },
      ];

      await setContent(newContent);
      setCurrentItem('');
      setCurrentItemType('');
    }
  };

  useEffect(() => {
    const containsImage = content.filter(
      (item) => item.type === 'image'
    ).length;
    if (containsImage > 1) {
      setImageState(true);
    }
  }, [content]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[999] bg-white">
      <div className="w-[90%] xl:w-2/4 fixed p-4 shadow-xl max-h-[80vh] rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white">
        <p className="text-center xl:text-2xl font-bold my-4">Add Image</p>
        <FileUploader
          maxSize={5}
          multiple={false}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          onSizeError={(message) => toast.error(message)}
        >
          {preview ? (
            <div className="relative w-full p-0 m-0 cursor-pointer flex text-center">
              <Image
                src={preview}
                alt="Blog Image Thumbnail"
                className="w-auto max-h-[50vh] mx-auto"
                width={100}
                height={100}
              />
              <div className="absolute h-full w-full top-0 left-0 text-center bg-white/50 text-black flex items-center flex-col justify-center text-lg xl:text-3xl font-semibold">
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

        <textarea
          placeholder="Caption"
          onChange={(e) => setCaption(e.target.value)}
          className="text-black w-full outline-none text-lg xl:text-xl tracking-wider leading-8 my-4"
        ></textarea>
        <div className="flex gap-4 justify-end mt-4">
          <button
            onClick={addImageData}
            className="bg-[#ff0000] hover:scale-[1.01] transition-all text-white text-xl rounded-lg px-3 py-2"
          >
            Add
          </button>
          <button
            onClick={() => setCurrentItemType('')}
            className="bg-gray-500 hover:scale-[1.01] transition-all text-white text-xl rounded-lg px-3 py-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
