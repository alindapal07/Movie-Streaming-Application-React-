import React, { useRef, useEffect, useCallback } from 'react';
import Card from './Card';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const HorizontalScollCard = ({ data = [], heading, trending, media_type, direction = 'left' }) => {
  const containerRef = useRef(null);
  const autoScrollInterval = useRef(null);
  const inactivityTimeout = useRef(null);

  const SCROLL_AMOUNT = 300;
  const AUTO_SCROLL_STEP = 1; 
  const AUTO_SCROLL_SPEED = 16; // 60fps ~= 16ms

  const handleNext = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
    }
  }, []);

  const handlePrevious = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    if (!autoScrollInterval.current) {
      autoScrollInterval.current = setInterval(() => {
        if (containerRef.current) {
          const scrollAmount = direction === 'right' ? AUTO_SCROLL_STEP : -AUTO_SCROLL_STEP;
          containerRef.current.scrollLeft += scrollAmount;
        }
      }, AUTO_SCROLL_SPEED);
    }
  }, [direction]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  }, []);

  const resetInactivityTimer = useCallback(() => {
    stopAutoScroll();
    clearTimeout(inactivityTimeout.current);
    inactivityTimeout.current = setTimeout(() => {
      startAutoScroll();
    }, 2000);
  }, [startAutoScroll, stopAutoScroll]);

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'touchstart', 'keydown', 'wheel'];
    events.forEach(event => window.addEventListener(event, resetInactivityTimer));

    resetInactivityTimer();

    return () => {
      stopAutoScroll();
      events.forEach(event => window.removeEventListener(event, resetInactivityTimer));
      clearTimeout(inactivityTimeout.current);
    };
  }, [resetInactivityTimer, stopAutoScroll]);

  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">{heading}</h2>

      <div className="relative overflow-visible">
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-scroll scroll-smooth py-4 scrollbar-hide"
          style={{ padding: '0 12px' }} // extra spacing for smoothness
        >
          {data.map((item, index) => (
            <Card
              key={`${item.id}_${index}`}
              data={item}
              index={index + 1}
              trending={trending}
              media_type={media_type}
            />
          ))}
        </div>

        <div className="absolute top-0 hidden lg:flex justify-between w-full h-full items-center pointer-events-none">
          <button
            onClick={() => { handlePrevious(); resetInactivityTimer(); }}
            className="bg-white p-2 text-black rounded-full -ml-2 shadow-lg pointer-events-auto hover:scale-110 transition-transform"
          >
            <FaAngleLeft />
          </button>

          <button
            onClick={() => { handleNext(); resetInactivityTimer(); }}
            className="bg-white p-2 text-black rounded-full -mr-2 shadow-lg pointer-events-auto hover:scale-110 transition-transform"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScollCard;
