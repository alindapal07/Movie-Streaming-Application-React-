import React from 'react';
import BannerHome from '../components/BannerHome';
import { useSelector } from 'react-redux';
import HorizontalScollCard from '../components/HorizontalScollCard';
import useFetch from '../hooks/useFetch';

const Home = () => {
  const trendingData = useSelector(state => state.movieoData.bannerData);
  const { data: nowPlayingData } = useFetch('/movie/now_playing');
  const { data: topRatedData } = useFetch('/movie/top_rated');
  const { data: popularTvShowData } = useFetch('/tv/popular');
  const { data: onTheAirShowData } = useFetch('/tv/on_the_air');
  const { data: upcoming } = useFetch('/movie/upcoming');

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* 🔥 Animated Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1f1f1f] to-[#0c0c0c] animate-bg-shift">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,0,150,0.08),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(0,200,255,0.06),transparent_60%)]"></div>
      </div>

      {/* 🔗 Foreground Content */}
      <div className="relative pb-16 backdrop-blur-md bg-black/10 shadow-2xl rounded-lg">

        <BannerHome />

        {trendingData?.length > 0 && (
          <HorizontalScollCard 
            data={trendingData} 
            heading="Trending" 
            trending={true} 
            direction="left" 
          />
        )}

        {nowPlayingData?.length > 0 && (
          <HorizontalScollCard 
            data={nowPlayingData} 
            heading="Now Playing" 
            media_type="movie" 
            direction="right" 
          />
        )}

        {topRatedData?.length > 0 && (
          <HorizontalScollCard 
            data={topRatedData} 
            heading="Top Rated" 
            media_type="movie" 
            direction="left" 
          />
        )}

        {popularTvShowData?.length > 0 && (
          <HorizontalScollCard 
            data={popularTvShowData} 
            heading="Popular TV Show" 
            media_type="movie" 
            direction="right" 
          />
        )}

        {onTheAirShowData?.length > 0 && (
          <HorizontalScollCard 
            data={onTheAirShowData} 
            heading="On The Air" 
            media_type="movie" 
            direction="left" 
          />
        )}

        {upcoming?.length > 0 && (
          <HorizontalScollCard 
            data={upcoming} 
            heading="Upcoming" 
            media_type="movie" 
            direction="right" 
          />
        )}

      </div>
    </div>
  );
};

export default Home;
