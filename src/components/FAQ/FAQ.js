'use client';

import { useState } from 'react';

export default function FAQ() {
  const [answer, setAnswer] = useState(0);
  const faqData = [
    {
      id: 0,
      question: 'Why EJY Health?',
      answer:
        "EJY Health is establishing a global platform where doctors, nurses, patients, and the general public can seamlessly interact and benefit from one another's expertise. We're addressing gaps in the Health & wellness industry on a large scale, connecting people from diverse backgrounds and professions to foster collective growth and learning.",
    },
    {
      id: 1,
      question: 'Benefits of joining the waitlist?',
      answer: 'Answer for Benefits of joining the waitlist?',
    },
    {
      id: 2,
      question: 'How do I connect?',
      answer: 'Answer for How do I connect?',
    },
    {
      id: 3,
      question: 'Is it a paid platform?',
      answer: 'Answer for Is it a paid platform?',
    },
    {
      id: 4,
      question: 'How to download the app?',
      answer: 'Answer for How to download the app?',
    },
  ];
  return (
    <>
      <h3 className="text-3xl text-center xl:text-5xl font-extrabold tracking-wider xl:mb-3">
        FAQs
      </h3>

      <p className="mt-2 mb-8 text-lg">
        Got queries? We&apos;re armed with answers!
      </p>
      <div className="hidden xl:flex w-full gap-2 shadow-md rounded-md py-8 px-4">
        <div className="w-1/2 flex gap-4 flex-col">
          {faqData.map((item) => (
            <p
              key={item.id}
              onClick={() => setAnswer(item.id)}
              className={`text-xl py-8 px-4 transition-all cursor-pointer ${
                answer === item.id ? 'bg-black text-white rounded-md' : ''
              }`}
            >
              {item.question}
            </p>
          ))}
        </div>
        <div className="w-1/2 p-4 text-xl border-2 border-solid border-neutral-200 rounded-md">
          {faqData[answer].answer}
        </div>
      </div>
    </>
  );
}
