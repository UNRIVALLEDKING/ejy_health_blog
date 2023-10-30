import { BiSolidEdit } from 'react-icons/bi';

const navMenu = [
  {
    id: 0,
    title: 'Home',
    url: 'https://ejyhealth.in',
  },
  {
    id: 1,
    title: 'Events',
    url: 'https://events.ejyhealth.in/',
  },
  {
    id: 2,
    title: 'Community',
    url: 'https://ejyhealth.in/community',
  },
  {
    id: 3,
    title: 'Career',
    url: 'https://ejyhealth.in/career',
  },
  {
    id: 4,
    title: 'Blog',
    url: '/',
  },
  {
    id: 5,
    title: <BiSolidEdit size={30} />,
    url: '/editor',
  },
];
export default navMenu;
