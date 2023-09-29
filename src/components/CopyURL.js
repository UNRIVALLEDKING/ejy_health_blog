'use client';

import { toast } from 'react-toastify';

export default function CopyURL({ url }) {
  const copy = () => {
    navigator.clipboard.writeText(url);
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
