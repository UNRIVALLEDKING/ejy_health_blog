import HomeCards from '@/components/Cards/HomeCards';
import Editor from '@/components/editor/Editor';

export default function page() {
  return (
    <div className="overflow-hidden bg-white text-black md:pb-20">
      <div className="container relative mx-auto flex flex-row px-4 xl:gap-x-4">
        <div className="w-full xl:w-[75%]">
          <Editor />
        </div>
        <div className="hidden xl:w-[25%] xl:flex gap-2 flex-col">
          <HomeCards />
        </div>
      </div>
    </div>
  );
}
