import { MAIN_URL } from '@/constants/constant';
import { GetRequest } from '@/constants/functions';

let blogData = [];

console.log('blog', blogData);
const getBlogData = await GetRequest('/p/all');
if (getBlogData.fetchData && getBlogData.fetchData.posts) {
  blogData = getBlogData.fetchData.posts;
}
console.log('blog', blogData);

export async function generateMetadata({ params }) {
  const { blog } = params;

  // Find the data for the specified blog in blogData
  const data = blogData.find((item) => item.url === blog);

  if (!data) {
    return;
  }

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
  if (blogData.length > 0) {
    const data = blogData.map((blog) => ({
      BlogData: blog.url,
    }));
    return data;
  } else return;
}

export default function Layout({ children }) {
  return <>{children}</>;
}
