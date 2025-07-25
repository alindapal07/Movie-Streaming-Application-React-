import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const query = location?.search?.slice(3);

  const fetchData = useCallback(async () => {
    if (!query) return;
    try {
      const response = await axios.get(`search/multi`, {
        params: {
          query: query,
          page: page
        }
      });
      setData(prev => [...prev, ...response.data.results]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [query, page]);

  useEffect(() => {
    if (query) {
      setPage(1);
      setData([]);
    }
  }, [query]);

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [fetchData, query]);

  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='py-16'>

      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input
          type='text'
          placeholder='Search here...'
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          value={query?.split("%20").join(" ")}
          className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900'
        />
      </div>

      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Search Results</h3>

        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
          {data.map((searchData, index) => (
            <Card
              key={`${searchData.id}_${index}`}
              data={searchData}
              media_type={searchData.media_type}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default SearchPage;
