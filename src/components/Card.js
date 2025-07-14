import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Card = ({ data, trending, index, media_type }) => {
  const imageURL = useSelector(state => state.movieoData.imageURL);
  const mediaType = data.media_type ?? media_type;

  return (
    <Link
      to={`/${mediaType}/${data.id}`}
      className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded-3xl relative group transform transition-transform duration-500 ease-in-out shadow-xl hover:shadow-2xl hover:scale-[1.08] hover:rotate-[0.5deg]"
    >
      {/* Poster */}
      {data?.poster_path ? (
        <img
          src={imageURL + data?.poster_path}
          alt={data?.title || data?.name}
          className="h-full w-full object-cover rounded-3xl group-hover:brightness-110 group-hover:contrast-125 transition-all duration-500 ease-in-out"
        />
      ) : (
        <div className="bg-neutral-800 h-full w-full flex justify-center items-center text-neutral-400 text-sm font-poppins tracking-wide rounded-3xl">
          No image found
        </div>
      )}

      {/* Trending Badge */}
      {trending && (
        <div className="absolute top-4 left-0">
          <div className="py-1 px-4 bg-gradient-to-r from-red-600 via-yellow-400 to-pink-500 text-white font-poppins font-semibold text-[10px] uppercase tracking-widest rounded-tr-2xl rounded-br-2xl shadow-md animate-pulse hover:scale-110 hover:brightness-125 transition-transform duration-300">
            #{index} Trending
          </div>
        </div>
      )}

      {/* Bottom Overlay */}
      <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent backdrop-blur-md shadow-inner rounded-b-3xl group-hover:bg-gradient-to-t group-hover:from-black/80 group-hover:via-black/50 group-hover:to-transparent transition-all duration-500">

        {/* Movie Title */}
        <h2 className="font-bebas text-2xl uppercase tracking-widest text-white truncate transform group-hover:scale-110 group-hover:text-yellow-400 group-hover:drop-shadow-[0_3px_8px_rgba(255,255,255,0.85)] transition-all duration-300">
          {data?.title || data?.name}
        </h2>

        {/* Date & Rating */}
        <div className="text-xs sm:text-sm text-neutral-300 flex justify-between items-center mt-2 font-poppins font-semibold">

          <p className="italic drop-shadow-sm group-hover:text-white group-hover:drop-shadow-[0_1px_4px_rgba(255,255,255,0.8)] transition-all duration-300">
            {moment(data.release_date).format('MMM D, YYYY')}
          </p>

          <p className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-red-500 text-black px-3 py-1 rounded-full shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-300">
            ⭐ {Number(data.vote_average).toFixed(1)}
          </p>
        </div>

      </div>
    </Link>
  );
};

export default Card;
