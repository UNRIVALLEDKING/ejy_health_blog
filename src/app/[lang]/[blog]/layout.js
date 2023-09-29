import { MAIN_URL } from '@/constants/constant';
import { BlogData } from './blogData';

export async function generateMetadata({ params }) {
  const { blog } = params;
  console.log('params', params);
  const data = BlogData.find((item) => item.url === blog);
  const url = `${MAIN_URL}${params.lang}/${blog}`;
  return {
    title: data.title,
    description: data.desc,
    keywords: data.keywords,
    author: data.author,
    date: data.date,
    openGraph: {
      images: [
        'https://blog.ejyhealth.in/_next/static/media/pic2.c5a3beb4.svg?v1',
      ],
      url: url,
      title: data.title,
      description: data.desc,
    },
  };
}

export async function generateStaticParams() {
  const data = BlogData.map((blog) => ({
    BlogData: blog.url,
  }));
  return data;
}

export default function layodut({ children }) {
  return <>{children}</>;
}
