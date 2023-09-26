import { BlogData } from './blogData';

export async function generateMetadata({ params }) {
  const { blog } = params;
  console.log('params', params);
  const data = BlogData.find((item) => item.url === blog);
  const url = `https://blog.ejyhealth.in/${params.lang}/${blog}`;
  return {
    title: data.title,
    description: data.desc,
    keywords: data.keywords,
    author: data.author,
    date: data.date,
    openGraph: {
      images: [data.ogImage],
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
