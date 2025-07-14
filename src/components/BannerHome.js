import React, { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const BannerHome = () => {
  const bannerData = useSelector(state => state.movieoData.bannerData);
  const imageURL = useSelector(state => state.movieoData.imageURL);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentImage(prev => prev < bannerData.length - 1 ? prev + 1 : prev);
  }, [bannerData.length]);

  const handlePrevious = useCallback(() => {
    setCurrentImage(prev => prev > 0 ? prev - 1 : prev);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerData.length, currentImage, handleNext]);

  return (
    <section className='w-full h-full'>
      <div className='flex min-h-full max-h-[95vh] overflow-hidden transition-transform duration-700 ease-in-out'>
        {bannerData.map((data, index) => (
          <div
            key={data.id + "bannerHome" + index}
            className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all duration-500 ease-in-out'
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            <div className='w-full h-full'>
              <img
                src={imageURL + data.backdrop_path}
                alt={data?.title || data?.name || "Banner Image"}
                className='h-full w-full object-cover transition-transform duration-700 ease-in-out'
              />
            </div>

            <div className='absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex'>
              <button onClick={handlePrevious} className='bg-white p-1 rounded-full text-xl z-10 text-black shadow-md hover:scale-110 transition-all'>
                <FaAngleLeft />
              </button>
              <button onClick={handleNext} className='bg-white p-1 rounded-full text-xl z-10 text-black shadow-md hover:scale-110 transition-all'>
                <FaAngleRight />
              </button>
            </div>

            <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>

            <div className='container mx-auto'>
              <div className='w-full absolute bottom-0 max-w-md px-8 pb-10'>
                <h2 className='font-black text-4xl lg:text-5xl text-white tracking-tight leading-snug mb-4'>
                  <span className='bg-gradient-to-r from-red-600 via-yellow-400 to-pink-500 bg-clip-text text-transparent'>
                    {data?.title || data?.name}
                  </span>
                </h2>

                <p className='text-base text-neutral-300 font-light leading-relaxed mb-5'>
                  {data.overview?.length > 150 ? `${data.overview.slice(0, 150)}...` : data.overview}
                </p>

                <div className='flex items-center gap-6 text-neutral-300 text-sm mb-6'>
                  <div className='flex items-center gap-2 bg-neutral-800 bg-opacity-60 px-4 py-1 rounded-full border border-neutral-700 shadow-sm hover:scale-105 transition-all duration-300'>
                    <span className='text-yellow-400 text-lg font-semibold'>⭐</span>
                    <span className='text-white text-sm font-medium'>
                      {Number(data.vote_average).toFixed(1)}
                    </span>
                  </div>

                  <div className='flex items-center gap-2 bg-neutral-800 bg-opacity-60 px-4 py-1 rounded-full border border-neutral-700 shadow-sm hover:scale-105 transition-all duration-300'>
                    <span className='text-blue-400 text-lg font-semibold'>👁️</span>
                    <span className='text-white text-sm font-medium'>
                      {Number(data.popularity).toFixed(0)}
                    </span>
                  </div>
                </div>

                <Link to={`/${data?.media_type}/${data.id}`}>
                  <button className='bg-gradient-to-r from-red-600 via-pink-500 to-orange-400 text-white font-semibold uppercase tracking-wide px-6 py-3 rounded-full shadow-md hover:shadow-xl hover:scale-105 hover:brightness-110 transition-all duration-300'>
                    ▶ Play Now
                  </button>
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerHome;