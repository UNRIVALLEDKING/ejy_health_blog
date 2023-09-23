'use client';
import { useState } from 'react';
import allTopics from './TopicLists';

export default function HomeTopics() {
  const [selectTopic, setSelectTopic] = useState(0);
  return (
    <>
      {allTopics.map((item, id) => (
        <h2
          key={id}
          className={`w-full h-full py-4 rounded-full text-center cursor-pointer transition-all duration-300 ${
            id === selectTopic ? 'border-full bg-white' : ''
          }`}
          onClick={() => setSelectTopic(item.id)}
        >
          {item.title}
        </h2>
      ))}
    </>
  );
}
