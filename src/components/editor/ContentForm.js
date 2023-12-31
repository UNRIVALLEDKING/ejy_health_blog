import { toast } from 'react-toastify';

export default function ContentForm({
  currentItemType,
  currentItem,
  listType,
  setCurrentItem,
  setListType,
  handleAddItem,
}) {
  return (
    <div>
      {currentItemType === 'h2' ? (
        <textarea
          onChange={(e) => setCurrentItem(e.target.value)}
          value={currentItem}
          placeholder="Heading 2"
          className="outline-none w-full my-3 text-xl xl:text-4xl font-extrabold tracking-wide xl:mb-6"
        />
      ) : currentItemType === 'h3' ? (
        <textarea
          onChange={(e) => setCurrentItem(e.target.value)}
          value={currentItem}
          placeholder="Heading 3"
          className="outline-none w-full my-3 text-lg xl:text-3xl font-extrabold tracking-wide xl:mb-6"
        />
      ) : currentItemType === 'paragraph' ? (
        <textarea
          onChange={(e) => setCurrentItem(e.target.value)}
          value={currentItem}
          placeholder="Paragraph use for *Bold* , ~Italic~ & [Link text](Link url)"
          className="w-full outline-none text-black text-base xl:text-lg tracking-wide leading-8 my-4"
        />
      ) : currentItemType === 'list' ? (
        <>
          <select
            onChange={(e) => setListType(e.target.value)}
            value={listType}
            className="mt-4 rounded-lg border-none outline-none text-black sm:text-sm px-2 py-3 bg-neutral-200/60"
          >
            <option value="lower-roman">Lower Roman</option>
            <option value="upper-roman">Upper Roman</option>
            <option value="disc">Disc</option>
            <option value="circle">Circle</option>
            <option value="lower-alpha">Lower Alpha</option>
            <option value="upper-alpha">upper Alpha</option>
          </select>
          <textarea
            onChange={(e) => setCurrentItem(e.target.value)}
            value={currentItem}
            placeholder="Use # for list"
            className="w-full outline-none text-black text-base xl:text-lg tracking-wide leading-8 my-4"
          />
        </>
      ) : currentItemType === 'video' ? (
        <>
          <input
            onChange={(e) => setCurrentItem(e.target.value)}
            value={currentItem}
            className="w-full outline-none text-black text-base xl:text-lg tracking-wide leading-8 my-4"
            type="text"
            placeholder="Enter youtube Video link"
          />
        </>
      ) : (
        <></>
      )}
      {currentItemType !== '' && currentItemType !== 'image' ? (
        <button
          onClick={handleAddItem}
          className="bg-[#ff0000] hover:scale-[1.01] transition-all text-white text-xl rounded-lg px-3 py-2"
        >
          Add
        </button>
      ) : (
        <>
          <p className="text-center text-xl text-gray-500 mt-10">
            Start by selecting content type first
          </p>
          <span className="text-red-600 text-base text-left">
            Note : Maximum 2 Images can be uploaded in 1 Blog excluding
            thumbnail Image.
          </span>
        </>
      )}
    </div>
  );
}
