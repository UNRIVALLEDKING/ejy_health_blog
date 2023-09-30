'use client';

import { toast } from 'react-toastify';

export default function CopyURL({ url }) {
  const copy = () => {
    const newUrl = decodeURIComponent(url);
    navigator.clipboard.writeText(newUrl);
    toast('Copied to clipboard');
  };
  const copySm = () => {
    const newUrl = decodeURIComponent(url);
    navigator.clipboard.writeText(newUrl);
    toast.success('Copied to clipboard', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  return (
    <>
      <button onClick={copySm} className={`inline-block xl:hidden text-base`}>
        Copy URL
      </button>
      <button onClick={copy} className={`hidden xl:inline-block text-base`}>
        Copy URL
      </button>
    </>
  );
}
