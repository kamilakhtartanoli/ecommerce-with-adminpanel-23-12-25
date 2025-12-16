import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="fixed w-full top-0 right-0 z-50">
      {/* Glass background */}
      <div className="backdrop-blur-md bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src={logo} alt="logo" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
            <span className="text-black text-xl font-medium">
              ARAZON<br/>
              <span className='text-slate-400 font-light text-md'>SHOPPING STORE</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 font-medium text-lg">
            <Link to='/'><li className="hover:text-white hover:bg-black transition ease-linear px-4 py-1 rounded-3xl cursor-pointer">Home</li></Link>
            <Link to='/about'><li className="hover:text-white hover:bg-black transition ease-linear px-4 py-1 rounded-3xl cursor-pointer">About</li></Link>
            <Link to='/services'><li className="hover:text-white hover:bg-black transition ease-linear px-4 py-1 rounded-3xl cursor-pointer">Services</li></Link>
            <Link to='/contact'><li className="hover:text-white hover:bg-black transition ease-linear px-4 py-1 rounded-3xl cursor-pointer">Contact</li></Link>
          </ul>

          {/* Mobile Toggle */}
          <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gradient-to-r from-yellow-400 to-orange-500 backdrop-blur-lg text-white pl-6 py-4 space-y-4 transition-all duration-300">
            <Link to='/'><p className="cursor-pointer hover:underline">Home</p></Link>
            <Link to='/about'><p className="cursor-pointer hover:underline">About</p></Link>
            <Link to='/services'><p className="cursor-pointer hover:underline">Services</p></Link>
            <Link to='/contact'><p className="cursor-pointer hover:underline">Contact</p></Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
