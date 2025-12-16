import React from 'react';
import hero from '../assets/hero3.jpg';

const Hero = () => {
  return (
    <section className="relative w-full h-screen">
      {/* Background Image */}
      <img
        src={hero}
        alt="Hero Background"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Centered Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          Welcome to ARAZONE
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white drop-shadow-md max-w-md">
          Discover the latest fashion trends and exclusive collections.
        </p>
        <button className="mt-6 px-8 py-3 bg-[#ffd700] text-black font-semibold rounded-3xl hover:bg-black hover:text-white transition-all duration-300">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
