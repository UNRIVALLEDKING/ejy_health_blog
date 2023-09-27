import { BsFillImageFill } from 'react-icons/bs';

export default function EditorDashboard({ setCurrentItemType }) {
  return (
    <div className="flex justify-around w-full mt-10">
      <div className="flex w-full justify-around bg-[#ff0000] text-white text-xl rounded-md shadow-md py-3">
        <button className="font-bold" onClick={() => setCurrentItemType('h2')}>
          H2
        </button>
        <button
          className="font-semibold"
          onClick={() => setCurrentItemType('h3')}
        >
          H3
        </button>
        <button
          className="font-base"
          onClick={() => setCurrentItemType('paragraph')}
        >
          P
        </button>
        <button onClick={() => setCurrentItemType('image')}>
          <BsFillImageFill />
        </button>
        <button onClick={() => setCurrentItemType('list')}>List</button>
      </div>
    </div>
  );
}
