import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import { motion } from 'framer-motion';

const ExplorePage = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (loading || (totalPageNo && pageNo > totalPageNo)) return;

    setLoading(true);
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: { page: pageNo },
      });

      setData(prev => {
        const merged = [...prev, ...response.data.results];
        const uniqueData = Array.from(new Map(merged.map(item => [item.id, item])).values());
        return uniqueData;
      });

      setTotalPageNo(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [params.explore, pageNo, loading, totalPageNo]);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.body.offsetHeight;

    if (scrollTop + windowHeight >= docHeight - 500 && !loading && pageNo < totalPageNo) {
      setPageNo(prev => prev + 1);
    }
  }, [loading, pageNo, totalPageNo]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
    setTotalPageNo(0);
  }, [params.explore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="pt-16 pb-10 min-h-screen relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1f1f1f] to-[#0c0c0c] animate-bg-shift">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,0,150,0.08),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(0,200,255,0.06),transparent_60%)]"></div>
      </div>

      <div className="relative container mx-auto px-4 backdrop-blur-md bg-black/10 shadow-2xl rounded-lg py-10">
        <motion.h3
          className="capitalize text-2xl lg:text-4xl font-extrabold mb-8 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-400 to-pink-500 drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Explore <span className="text-white">{params.explore}</span> Shows
        </motion.h3>

        <motion.div
          className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5 sm:gap-6 md:gap-7 justify-items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {data.map((exploreData, index) => (
            <motion.div
              key={`${params.explore}-${exploreData.id}-${index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Card data={exploreData} media_type={params.explore} />
            </motion.div>
          ))}
        </motion.div>

        {loading && (
          <motion.p
            className="mt-10 text-center text-neutral-400 text-sm italic animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading more shows...
          </motion.p>
        )}

        {pageNo >= totalPageNo && !loading && (
          <motion.p
            className="mt-10 text-center text-neutral-500 text-sm italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            🚀 You’ve reached the end of the collection.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
