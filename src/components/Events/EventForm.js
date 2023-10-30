'use client';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Checkbox, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useState } from 'react';
import { CheckBox, Groups3, VideoCameraFront } from '@mui/icons-material';
import ThumbnailImage from '../editor/ThumbnailImage';
import SpeakersForm from './SpeakersForm';
import 'dayjs/locale/en-gb';
import { toast } from 'react-toastify';
import { PostRequest, awsImageUpload } from '@/constants/functions';
import { useUser } from '@/constants/customHooks';
import FormLoader from '../editor/FormLoader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function EventForm() {
  const { userData, authenticated, loading, token } = useUser();

  const [thumbnailImg, setThumbnailImg] = useState('default');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mode, setMode] = useState('virtual');
  const [platform, setPlatform] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');
  const [meetLink, setMeetLink] = useState('');
  const [address, setAddress] = useState('');
  const [gmapUrl, setGmapUrl] = useState('');
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [deadLine, setDeadLine] = useState(null);
  const [speakersData, setSpeakersData] = useState([]);
  const [topic, setTopic] = useState('');
  const [eventData, setEventData] = useState([]);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  // Add required fields and messages here
  const requiredFields = {
    title: 'Title is required',
    thumbnailImg: 'Thumbnail is required',
    description: 'Description is required',
    topic: 'Topic is Required',
    startDateTime: 'Start Date & Time is required',
    endDateTime: 'End Date & Time is required',
    deadLine: 'Deadline is required',
    registrationLink: 'Registration Link is required',
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const [fieldName, fieldMessage] of Object.entries(requiredFields)) {
      if (!eval(fieldName)) {
        toast.warning(fieldMessage);
        return;
      }
    }
    if (speakersData.length === 0) {
      toast.warning('Speaker is required');
      return;
    }
    const updatedStartDateTime = dayjs(startDateTime).toISOString();
    const updatedEndDateTime = dayjs(endDateTime).toISOString();

    // Thumbnail Image upload to S3 before creating event

    setLoader('Uploading Images');
    let thumbnailWithCaption = {
      object: thumbnailImg.object,
      caption: title,
    };
    const updatedThumbnail = await awsImageUpload(thumbnailWithCaption);

    // Speakers Images upload to S3 before creating event and updating links imageUrl with new s3 src

    const updatedSpeakersData = await Promise.all(
      speakersData.map(async (item) => {
        if (item.imageUrl !== 'default') {
          let imageWithCaption = {
            object: item.imageUrl.object,
            caption: item.speakerName,
          };
          const src = await awsImageUpload(imageWithCaption);

          return { ...item, imageUrl: src };
        } else {
          return item;
        }
      })
    );

    console.log('speakersData', updatedSpeakersData);

    setLoader('Creating Event');
    if (mode === 'virtual') {
      const updatedEventUrl = {
        platform,
        url: meetLink,
      };
      const tempEventData = {
        title,
        description,
        mode,
        topic,
        platform,
        eventUrl: updatedEventUrl,
        meetLink,
        deadLine,
        registrationLink,
        speakers: updatedSpeakersData,
        thumbnail: updatedThumbnail.src,
        startDateTime: updatedStartDateTime,
        endDateTime: updatedEndDateTime,
      };
      console.log('eventData', tempEventData);

      try {
        const postData = await PostRequest(
          '/admin/events/create',
          tempEventData,
          token
        );
        if (postData.status === 201) {
          toast.success('Event Created');
          router.push('/');
        } else {
          console.log('postData', postData);
        }
      } catch (err) {
        console.log('err', err);
      }
    } else if (mode === 'physical') {
      const updatedAddress = {
        data: address,
        url: gmapUrl,
      };
      const tempEventData = {
        title,
        description,
        mode,
        topic,
        speakers: updatedSpeakersData,
        thumbnail: updatedThumbnail.src,
        address: updatedAddress,
        eventUrl: registrationLink,
        registrationLink,
        deadLine,
        startDateTime: updatedStartDateTime,
        endDateTime: updatedEndDateTime,
      };
      console.log('eventData', tempEventData);

      try {
        const postData = await PostRequest(
          '/admin/events/create',
          tempEventData,
          token
        );
        if (postData.status === 201) {
          toast.success('Event Created');
          router.push('/');
        } else {
          console.log('postData', postData);
        }
      } catch (err) {
        console.log('err', err);
      }
    }
  };
  console.log('user', userData, token, authenticated, loading);

  if (loading) {
    return <FormLoader LoadingMessage={'Loading'} />;
  }
  if (!userData.user.roles.includes('admin')) {
    return <p>You are not an admin</p>;
  }
  if (!userData) {
    console.log('no data');
    return <Link href={'/'}>Go to home</Link>;
  }
  return (
    <div className="w-full">
      {loader ? (
        <FormLoader LoadingMessage={loader} />
      ) : (
        <>
          <h2 className="text-4xl text-center">Create Event</h2>
          <ThumbnailImage setThumbnailImg={setThumbnailImg} />
          <form className="grid xl:grid-cols-2 xl:gap-4 mb-5">
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Event Name"
                className="input-text text-2xl"
              />
              <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="input-text"
              />
              <input
                type="text"
                placeholder="Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="input-text"
              />
              <div className="grid grid-rows-2 items-center xl:grid-cols-3 mt-4">
                <label className="text-xl px-2 font-semibold">Mode</label>
                <RadioGroup
                  row
                  value={mode}
                  className="flex justify-between items-center"
                  onChange={handleModeChange}
                >
                  <FormControlLabel
                    value="virtual"
                    control={
                      <Radio
                        sx={{
                          '& .MuiSvgIcon-root': {
                            fontSize: 40,
                          },
                        }}
                        icon={<VideoCameraFront />}
                        checkedIcon={<VideoCameraFront />}
                      />
                    }
                    label="Virtual"
                  />
                  <FormControlLabel
                    value="physical"
                    control={
                      <Radio
                        color="secondary"
                        sx={{
                          '& .MuiSvgIcon-root': {
                            fontSize: 40,
                          },
                        }}
                        icon={<Groups3 />}
                        checkedIcon={<Groups3 />}
                      />
                    }
                    label="Physical"
                  />
                </RadioGroup>
              </div>

              <input
                type="text"
                onChange={(e) => setRegistrationLink(e.target.value)}
                value={registrationLink}
                placeholder="Registration Link"
                className="input-text"
              />
              {mode === 'virtual' ? (
                <>
                  <input
                    type="text"
                    placeholder="Platform"
                    onChange={(e) => setPlatform(e.target.value)}
                    value={platform}
                    className="input-text"
                  />

                  <input
                    type="text"
                    value={meetLink}
                    onChange={(e) => setMeetLink(e.target.value)}
                    placeholder="Event Link"
                    className="input-text"
                  />
                </>
              ) : (
                <>
                  <input
                    type="tel"
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    className="input-text"
                  />

                  <input
                    type="text"
                    value={gmapUrl}
                    onChange={(e) => setGmapUrl(e.target.value)}
                    placeholder="Google Map Link"
                    className="input-text"
                  />
                </>
              )}

              <div className="flex items-center gap-4 mt-4">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="en-gb"
                >
                  <MobileDateTimePicker
                    label="Event Starts at"
                    value={startDateTime}
                    onChange={setStartDateTime}
                    disablePast
                  />
                  -
                  <MobileDateTimePicker
                    label="Event Ends at"
                    value={endDateTime}
                    onChange={setEndDateTime}
                    disablePast
                  />
                </LocalizationProvider>
              </div>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <MobileDateTimePicker
                  label="Registration Deadline"
                  value={deadLine}
                  className="mt-4"
                  onChange={setDeadLine}
                  disablePast
                />
              </LocalizationProvider>
            </div>
            <div className="w-full">
              <h2 className="text-center text-2xl">Speakers</h2>
              <SpeakersForm
                speakersData={speakersData}
                setSpeakersData={setSpeakersData}
              />
            </div>
            <button onClick={handleSubmit} className="btn-primary">
              Create Event
            </button>
          </form>
        </>
      )}
    </div>
  );
}
