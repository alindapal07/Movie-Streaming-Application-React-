import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import userIcon from '../assets/user.png';
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from '../constants/navigation';  // ✅ Fixed wrong path: 'contants' ➔ 'constants'

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ") || "";
  const [searchInput, setSearchInput] = useState(removeSpace);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);  // ✅ Optional: added eslint-disable if you don't want extra dependencies warning

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className='fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40'>
      <div className='container mx-auto px-3 flex items-center h-full'>

        <Link to={"/"}>
          <img
            src={logo}
            alt='Logo'           // ✅ Added meaningful alt text
            width={120}
          />
        </Link>

        <nav className='hidden lg:flex items-center gap-1 ml-5'>
          {navigation.map((nav, index) => (
            <div key={nav.label + "header" + index}>  {/* ✅ Moved key to correct place */}
              <NavLink
                to={nav.href}
                className={({ isActive }) =>
                  `px-2 hover:text-neutral-100 ${isActive ? "text-neutral-100" : ""}`
                }
              >
                {nav.label}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className='ml-auto flex items-center gap-5'>
          <form className='flex items-center gap-2' onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Search here...'
              className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button type='submit' className='text-2xl text-white'>
              <IoSearchOutline />
            </button>
          </form>

          <div className='w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all'>
            <img
              src={userIcon}
              alt="User Icon"                 // ✅ Added alt text
              className='w-full h-full'      // ✅ Fixed: used className, not width=''
            />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
