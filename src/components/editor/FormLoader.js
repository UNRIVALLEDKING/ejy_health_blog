import { ejyHealthLogo } from '@/assets';
import Image from 'next/image';
import ImageUploadLoader from './ImageUploadLoader';

export default function FormLoader({ loader }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[999] bg-white">
      <div className="w-[90%] xl:w-2/4 fixed p-4 flex-col gap-y-4 shadow-xl min-h-[60vh] flex items-center justify-center max-h-[80vh] rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white">
        <Image
          src={ejyHealthLogo}
          className="w-20 animate-pulse"
          alt="EJY Health Logo"
        />
        <ImageUploadLoader LoadingMessage={loader} />
      </div>
    </div>
  );
}
