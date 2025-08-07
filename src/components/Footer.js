import React from 'react';
import { Link } from 'react-router-dom';
import {  FaInstagram,  FaLinkedinIn, FaGit, FaCode,  } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="hidden lg:block bg-white/5 backdrop-blur-md border-t border-white/10 py-6 px-8 shadow-inner rounded-t-3xl">
      
      <div className="flex items-center justify-between max-w-6xl mx-auto">

        {/* Left Links */}
        <div className="flex gap-10 text-sm tracking-wider font-medium text-neutral-300">
          <Link to="https://rxresu.me/alindapal07/web-developer" className="hover:text-yellow-400 transition-all duration-300 uppercase">
            About
          </Link>
          <Link to="https://alindapal-portfolio.vercel.app/" className="hover:text-yellow-400 transition-all duration-300 uppercase">
            Contact
          </Link>
          <Link to="/" className="hover:text-yellow-400 transition-all duration-300 uppercase">
            Privacy
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="https://github.com/alindapal07" className="text-neutral-300 hover:text-yellow-400 transition-colors duration-300 text-lg">
            <FaGit />
          </a>
          <a href="/" className="text-neutral-300 hover:text-yellow-400 transition-colors duration-300 text-lg">
            <FaInstagram />
          </a>
          <a href="https://alindapal-portfolio.vercel.app/" className="text-neutral-300 hover:text-yellow-400 transition-colors duration-300 text-lg">
            <FaCode />
          </a>
          <a href="https://www.linkedin.com/in/alinda-pal/" className="text-neutral-300 hover:text-yellow-400 transition-colors duration-300 text-lg">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-neutral-500 tracking-widest font-light">
        © {new Date().getFullYear()} <span className="text-white font-semibold">Dynamic Coding with Alinda</span> | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
