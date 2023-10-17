import HomeCards from '@/components/Cards/HomeCards';
import FAQ from '@/components/FAQ/FAQ';
import LangSelect from '@/components/Languages/LangSelect';
import HomeTopics from '@/components/Topics/HomeTopics';
import { TEST_API } from '@/constants/constant';

async function getData() {
  console.log('url', TEST_API + '/blog');
  try {
    const res = await fetch(TEST_API + '/blog');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (err) {
    return { error: err };
  }
}

export default async function Home() {
  const blogData = await getData();
  console.log('data', blogData);
  return (
    <>
      <h2
        className={`text-3xl xl:p-20 text-center xl:text-7xl font-extrabold tracking-wider xl:mb-6`}
      >
        Explore Some Health Gyan
      </h2>
      <LangSelect />
      <div className="hidden md:flex gap-3 text-xl w-[80%] mx-auto justify-around px-4  py-4 mt-6 2xl:mt-8 rounded-full bg-neutral-200">
        <HomeTopics />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 w-full mt-10 px-4 xl:px-0">
        {/* {blogData?.map((item, id) => (
          <HomeCards key={id} item={item} />
        ))} */}
        <HomeCards />
        <HomeCards />
        <HomeCards />
        <HomeCards />
        <HomeCards />
        <HomeCards />
        <HomeCards />
        <HomeCards />
        <HomeCards />
      </div>

      <button className="my-10 bg-[#ff0000] hover:scale-[1.01] transition-all text-white text-xl rounded-lg px-3 py-2">
        Load More Gyan
      </button>
      <FAQ />
    </>
  );
}
