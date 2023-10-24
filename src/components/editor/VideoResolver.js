'use client';
import { useState, useEffect } from 'react';

function resolveYouTubeUrl(videoUrl) {
  let isShorts = false;
  let videoId = '';

  if (videoUrl.includes('/shorts/')) {
    isShorts = true;
    videoId = videoUrl.split('/shorts/')[1].split('?')[0];
  } else if (videoUrl.includes('youtu.be/')) {
    videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
  } else if (videoUrl.includes('watch?v=')) {
    videoId = videoUrl.split('watch?v=')[1].split('&')[0];
  }

  if (videoId) {
    const src = `https://www.youtube.com/embed/${videoId}`;
    if (isShorts) {
      return { src: `${src}`, width: 315, height: 560 };
    }
    return { src, width: 560, height: 315 };
  }

  return null;
}

export default function VideoResolver({ videoData }) {
  const [iframeSrc, setIframeSrc] = useState(null);

  useEffect(() => {
    const resolvedData = resolveYouTubeUrl(videoData.text);
    if (resolvedData) {
      setIframeSrc(resolvedData);
    }
  }, [videoData.text]);

  return (
    <div className="w-full">
      {iframeSrc && (
        <iframe
          width={iframeSrc.width}
          height={iframeSrc.height}
          src={iframeSrc.src}
          title="YouTube video player"
          className={`mx-auto my-2 max-w-full`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}
