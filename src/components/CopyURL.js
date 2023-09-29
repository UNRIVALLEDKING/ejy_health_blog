'use client';

import { toast } from 'react-toastify';

export default function CopyURL({ url }) {
  const copy = () => {
    const newUrl = decodeURIComponent(url);
    navigator.clipboard.writeText(newUrl);
    toast('Copied to clipboard');
  };
  return (
    <>
      <button onClick={copy} className={`text-base`}>
        Copy URL
      </button>
    </>
  );
}
