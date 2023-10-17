'use client';
import { useState } from 'react';
export default function ContentEditModal({
  content,
  setContent,
  setEditData,
  editData,
}) {
  console.log('content edit', content);
  const [newData, setNewData] = useState(() => {
    const data = content.at(editData);
    console.log('data', data);
    return data;
  });
  const handleEdit = () => {
    if (editData !== -1) {
      const updatedContent = [...content];
      updatedContent[editData] = newData;
      setContent(updatedContent);
    }
    setEditData(null);
  };

  console.log('newcon', newData);
  return (
    <div className="z-[9999999999999] w-screen h-screen fixed top-0 left-0 bg-white">
      <div className="w-[90%] xl:w-2/4 fixed p-4 shadow-xl max-h-[80vh] rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white">
        <p className="text-center xl:text-2xl font-bold my-4">Edit Content</p>
        <textarea
          className="w-full"
          value={newData.text}
          // onChange={(e) => editContentValue(e)}
          onChange={(e) => setNewData({ ...newData, text: e.target.value })}
        />
        <button onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );
}
