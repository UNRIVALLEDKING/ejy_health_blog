import { MAIN_URL } from '@/constants/constant';
import { GetRequest } from '@/constants/functions';
// import { BlogData } from './blogData';

const getBlogData = await GetRequest('/p/all');
const blogData = getBlogData.fetchData.posts;

export async function generateMetadata({ params }) {
  const { blog } = params;
  // console.log('params', params);

  const data = await blogData?.find((item) => {
    // console.log('item url', item.url);
    return item.url === blog;
  });
  console.log('data', data);
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
  // console.log('blog', blogData);
  const data = blogData?.map((blog) => ({
    BlogData: blog.url,
  }));
  return data;
}

export default function layodut({ children }) {
  return <>{children}</>;
}
