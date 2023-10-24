import { BsFillImageFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { AiFillYoutube, AiOutlineUnorderedList } from 'react-icons/ai';
import CustomTooltip from '../ToolTip/CustomTooltip';

export default function EditorDashboard({ setCurrentItemType, imageState }) {
  const handleImage = () => {
    if (imageState) {
      toast.warning("Can't Upload more than 2 Images");
    } else {
      setCurrentItemType('image');
    }
  };
  return (
    <div className="flex justify-around w-full mt-10">
      <div className="grid grid-flow-col divide-x-2 w-full bg-[#ff0000] text-white text-base xl:text-xl rounded-md shadow-md py-3">
        <CustomTooltip toolTipMessage={'Heading 2'}>
          <button
            className="font-bold"
            onClick={() => setCurrentItemType('h2')}
          >
            H2
          </button>
        </CustomTooltip>
        <CustomTooltip toolTipMessage={'Heading 3'}>
          <button
            className="font-semibold"
            onClick={() => setCurrentItemType('h3')}
          >
            H3
          </button>
        </CustomTooltip>
        <CustomTooltip toolTipMessage={'Paragraph'}>
          <button
            className="font-base"
            onClick={() => setCurrentItemType('paragraph')}
          >
            P
          </button>
        </CustomTooltip>
        <CustomTooltip toolTipMessage={'List'}>
          <button onClick={() => setCurrentItemType('list')}>
            <AiOutlineUnorderedList className="mx-auto" />
          </button>
        </CustomTooltip>
        <CustomTooltip toolTipMessage={'Image'}>
          <button onClick={handleImage}>
            <BsFillImageFill className="mx-auto" />
          </button>
        </CustomTooltip>
        <CustomTooltip toolTipMessage={'Video'}>
          <button onClick={() => setCurrentItemType('video')}>
            <AiFillYoutube size={30} className="mx-auto" />
          </button>
        </CustomTooltip>
      </div>
    </div>
  );
}
