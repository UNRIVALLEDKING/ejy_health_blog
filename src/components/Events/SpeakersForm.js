'use client';

import { speakerIcon } from '@/assets';
import Image from 'next/image';
import { useState } from 'react';
import SpeakerImageHandler from './SpeakerImageHandler';
import CustomTooltip from '../ToolTip/CustomTooltip';
import { MdDone } from 'react-icons/md';
import { RiTwitterXFill } from 'react-icons/ri';
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillLinkedin,
  AiFillYoutube,
} from 'react-icons/ai';
import { BsLink45Deg } from 'react-icons/bs';
import { toast } from 'react-toastify';

export default function SpeakersForm({ setSpeakersData, speakersData }) {
  const [speakerName, setSpeakerName] = useState('');
  const [designation, setDesignation] = useState('');
  const [image, setImage] = useState('default');
  const [snsInput, setSnsInput] = useState(false);
  const [snsData, setSnsData] = useState('');
  const [snsLinks, setSnsLinks] = useState([]);

  const requiredFields = {
    speakerName: 'Speaker name is required',
    designation: "Speaker's designation is required",
  };
  const handleAddSpeaker = (e) => {
    e.preventDefault();
    for (const [fieldName, fieldMessage] of Object.entries(requiredFields)) {
      if (!eval(fieldName)) {
        toast.warning(fieldMessage);
        return;
      }
    }
    const newSpeaker = {
      speakerName,
      designation,
      imageUrl: image ? image : 'default',
      snsLinks,
    };

    setSpeakersData([...speakersData, newSpeaker]);
    setSpeakerName('');
    setDesignation('');
    setSnsData([]);
    setSnsLinks([]);
    setImage('default');
  };

  const addSNSLink = (e) => {
    e.preventDefault();
    setSnsLinks([...snsLinks, snsData]);
    setSnsData('');
  };
  const handleSNSLinks = (e) => {
    e.preventDefault();
    setSnsInput(!snsInput);
  };

  console.log('speakersData', speakersData);
  console.log('snsLinks', snsLinks);

  return (
    <div className="text-right w-full my-2">
      {speakersData?.map((item, index) => (
        <div
          key={index}
          className="p-6 text-start my-2 w-full mx-auto bg-white rounded-xl shadow-lg grid grid-cols-5 items-center space-x-4"
        >
          <div className="">
            <Image
              className="w-full h-full rounded-full aspect-square object-cover object-center"
              width={100}
              height={100}
              src={
                item.imageUrl === 'default'
                  ? speakerIcon
                  : item.imageUrl.tempSrc
              }
              alt="Speaker Logo"
            />
          </div>
          <div className="col-span-4">
            <div className="text-xl font-medium text-black">
              {item.speakerName}
            </div>
            <p className="text-slate-500">{item.designation}</p>
            <div className="pl-2 mt-2 flex gap-4">
              {item.snsLinks?.map((link, snsIndex) => (
                <a
                  key={snsIndex}
                  href={link}
                  target="_blank"
                  className="text-gray-500 hover:text-black transition-all"
                  rel="noopener noreferrer"
                >
                  {link.includes('instagram') ? (
                    <AiFillInstagram size={24} />
                  ) : link.includes('facebook') ? (
                    <AiFillFacebook size={24} />
                  ) : link.includes('linkedin') ? (
                    <AiFillLinkedin size={24} />
                  ) : link.includes('twitter') ? (
                    <RiTwitterXFill size={24} />
                  ) : link.includes('youtube') ? (
                    <AiFillYoutube size={24} />
                  ) : (
                    <BsLink45Deg size={24} />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="grid grid-cols-5 gap-3 mt-5">
        <div>
          <SpeakerImageHandler image={image} setImage={setImage} />
        </div>
        <div className="col-span-4">
          <input
            type="text"
            value={speakerName}
            className="input-text"
            onChange={(e) => setSpeakerName(e.target.value)}
            placeholder="Speaker Name"
          />
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="input-text"
            placeholder="Speaker Designation"
          />
          <div className="pl-2 mt-2 flex gap-4">
            {snsLinks.map((link, snsIndex) => (
              <a
                key={snsIndex}
                href={link}
                target="_blank"
                className="text-gray-500 hover:text-black transition-all"
                rel="noopener noreferrer"
              >
                {link.includes('instagram') ? (
                  <AiFillInstagram size={24} />
                ) : link.includes('facebook') ? (
                  <AiFillFacebook size={24} />
                ) : link.includes('linkedin') ? (
                  <AiFillLinkedin size={24} />
                ) : link.includes('twitter') ? (
                  <RiTwitterXFill size={24} />
                ) : link.includes('youtube') ? (
                  <AiFillYoutube size={24} />
                ) : (
                  <BsLink45Deg size={24} />
                )}
              </a>
            ))}
          </div>
          {snsInput ? (
            <>
              <div className="flex justify-between gap-2 items-center">
                <input
                  type="text"
                  className="input-text"
                  value={snsData}
                  onChange={(e) => setSnsData(e.target.value)}
                  placeholder="Add SNS Links"
                />
                <button
                  onClick={addSNSLink}
                  className="px-3 py-3 shadow-xl rounded-full"
                >
                  <MdDone />
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
          <CustomTooltip
            toolTipMessage={snsInput ? 'Close SNS Input' : 'Add SNS Links'}
          >
            <button
              onClick={handleSNSLinks}
              className={`px-3 py-2 shadow-xl  rounded-full`}
            >
              <p
                className={`text-2xl transition-all ${
                  snsInput ? 'rotate-45' : ''
                }`}
              >
                +
              </p>
            </button>
          </CustomTooltip>
        </div>
      </div>
      <button onClick={handleAddSpeaker} className="btn-primary">
        Add Speaker
      </button>
    </div>
  );
}
