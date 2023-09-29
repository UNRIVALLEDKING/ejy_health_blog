import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsReddit,
  BsTwitter,
  BsYoutube,
} from 'react-icons/bs';

const title = 'EJYhealth';

const MAIN_URL = 'https://blog.ejyhealth.in/';

const description =
  "EJY Health is establishing a global platform where doctors, nurses, patients, and the general public can seamlessly interact and benefit from one another's expertise. We're addressing gaps in the Health & wellness industry on a large scale, connecting people from diverse backgrounds and professions to foster collective growth and learning.";

const SNSData = [
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/company/ejyhealth/',
    icon: <BsLinkedin />,
  },
  {
    title: 'Twitter',
    url: 'https://twitter.com/ejyhealth',
    icon: <BsTwitter />,
  },
  {
    title: 'Github',
    url: 'https://github.com/ejyhealth',
    icon: <BsGithub />,
  },
  {
    title: 'Instagram',
    url: 'https://instagram.com/ejyhealth',
    icon: <BsInstagram />,
  },
  {
    title: 'Youtube',
    url: 'https://youtube.com/@ejyhealth',
    icon: <BsYoutube />,
  },

  {
    title: 'Facebook',
    url: 'https://www.facebook.com/ejyhealth/',
    icon: <BsFacebook />,
  },
  {
    title: 'Reddit',
    url: 'https://www.reddit.com/r/ejyhealth/',
    icon: <BsReddit />,
  },
];
export { title, description, SNSData, MAIN_URL };
