import React from "react";
import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { AiFillHome } from 'react-icons/ai';
import { IoSearchOutline } from "react-icons/io5";

export const navigation = [
  { label: 'TV Shows', href: '/tv', icon: <PiTelevisionFill /> },
  { label: 'Movies', href: '/movie', icon: <BiSolidMoviePlay /> }
];

export const mobileNavigation =[
     { label: 'Home', href: '/', icon: <AiFillHome /> }, 
    ...navigation,
    { label : 'search',href : '/search',icon :  <IoSearchOutline/> } 
]