import React from 'react';
import { IoClose } from "react-icons/io5";
import useFetchDetails from '../hooks/useFetchDetails';

const VideoPlay = ({ data, close, media_type }) => {
  const { data: videoData } = useFetchDetails(`/${media_type}/${data?.id}/videos`);

  const videoKey = videoData?.results?.[0]?.key;

  return (
    <section
      className="fixed inset-0 bg-neutral-700 bg-opacity-50 z-40 flex justify-center items-center"
      onKeyDown={(e) => { if (e.key === 'Escape') close(); }}
      tabIndex={0}  // Allow section to receive key events
    >
      <div className="bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative shadow-lg overflow-hidden">

        <button
          onClick={close}
          className="absolute -right-1 -top-6 text-3xl z-50 text-white hover:text-red-500 transition-colors"
          aria-label="Close Video"
        >
          <IoClose />
        </button>

        {videoKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Trailer Video Player"  // ✅ Fixed: Added title for accessibility
          ></iframe>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-white text-lg font-semibold">
            No Trailer Available
          </div>
        )}

      </div>
    </section>
  );
};

export default VideoPlay;
