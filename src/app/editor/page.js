import HomeCards from '@/components/Cards/HomeCards';
import Editor from '@/components/editor/Editor';

export default function page() {
  return (
    <div className="bg-white text-black md:pb-20">
      <div className="container xl:max-w-[80vw] relative mx-auto flex flex-row px-4 xl:gap-x-4">
        <div className="w-[80%] xl:max-w-[80vw]">
          <Editor />
        </div>
        <div className="hidden xl:w-[25%] xl:flex gap-2 flex-col">
          <HomeCards />
        </div>
      </div>
    </div>
  );
}
