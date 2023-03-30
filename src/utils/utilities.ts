import { NavItems, SocialLinks } from "@/types";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import { FaMedium } from 'react-icons/fa'

export const getFormattedDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export const getFormattedDateFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return getFormattedDate(date);
}

export const getFormattedDateFromISO = (iso: string) => {
  const date = new Date(iso);
  return getFormattedDate(date);
}

export const getFormattedDateFromISOWithTime = (iso: string) => {
  const date = new Date(iso);
  return `${getFormattedDate(date)} ${date.getHours()}:${date.getMinutes()}`;
}

export const randomItemFromArray = (arr: any[], n: number) => {
  arr ? arr[Math.floor(Math.random() * n)] : null;
};

export const navItems: NavItems = [
  {
    id: 1,
    title: 'projects',
    path: '',
    icon: WorkIcon
  },
  { id: 2, title: 'about', path: '', icon: InfoIcon },
  { id: 4, title: 'blogs', path: '', icon: RssFeedIcon },
  { id: 5, title: 'contact', path: '', icon: ContactEmergencyIcon }
];

export const socialLinks: SocialLinks = [
  {
    id: 1,
    title: 'github',
    path: 'https://github.com/netman5',
    icon: GitHubIcon
  },
  {
    id: 2,
    title: 'linkedin',
    path: 'https://www.linkedin.com/in/ola-ishola/',
    icon: LinkedInIcon
  },

  {
    id: 3,
    title: 'twitter',
    path: 'https://twitter.com/Orlaish',
    icon: TwitterIcon
  },
  {
    id: 4,
    title: 'Medium',
    path: 'https://medium.com/@olaishola',
    icon: FaMedium
  }
];
