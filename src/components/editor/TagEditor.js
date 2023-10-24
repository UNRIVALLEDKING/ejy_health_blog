'use client';
import { verifiedIcon } from '@/assets/BlogCards';
import Image from 'next/image';
import { useState } from 'react';
import { FiDelete } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function TagEditor({ selectedTags, setSelectedTags }) {
  const [tagInput, setTagInput] = useState('');

  const handleTags = (e) => {
    const string = e.target.value;
    const array = string
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    console.log('array', array);
    if (array.length > 5) {
      toast.warning("You can't enter more than 5 tags.");
      e.preventDefault();
    } else {
      setSelectedTags(array);
      setTagInput(e.target.value);
    }
  };

  const handleDeleteTag = (id) => {
    const updatedTags = [...selectedTags];

    const newUpdatedTags = updatedTags.filter((_, index) => index !== id);

    console.log('del', newUpdatedTags);
    setSelectedTags(newUpdatedTags);
    setTagInput(newUpdatedTags.join(', '));
  };
  console.log('tagInput', tagInput);
  return (
    <>
      <div className="my-3 gap-2 flex flex-wrap items-center text-base">
        <span className="border-[#027A48] text-[#027A48] border-solid cursor-pointer border-[1px] py-1 px-2 rounded-full">
          <Image className="inline" src={verifiedIcon} alt="verified icon" />{' '}
          Verified
        </span>

        {selectedTags.map((item, id) => (
          <span
            key={id}
            className="border-stone-700 flex items-center gap-x-2 whitespace-nowrap text-stone-700 border-solid border-[1px] py-1 px-2 rounded-full"
          >
            {item}{' '}
            <button className="">
              <FiDelete onClick={() => handleDeleteTag(id)} size={20} />
            </button>
          </span>
        ))}
      </div>
      <textarea
        value={tagInput} // Display selected tags as a comma-separated list
        onChange={(e) => handleTags(e)}
        placeholder="Use , (comma) as tag separator"
        className="w-full mt-2 p-2 outline-none"
      />
    </>
  );
}
