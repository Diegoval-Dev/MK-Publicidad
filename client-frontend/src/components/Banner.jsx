import React from 'react';
import logo from '@assets/imgs/mk_logo.png';
import '../styles/Banner.css'; 
function Banner() {
  return (
    <header className="header">
      <div className="top-bar">
        <div className="carousel">
          <div className="carousel-content">
            <span>Ponemos tu marca en todo...</span>
          </div>
        </div>
      </div>
      <div className="relative w-full h-52 bg-cover bg-center">
        <div className="absolute top-0 left-0 w-full h-8 bg-lime-700"></div>
        <div className="w-full h-full bg-opacity-50 flex flex-col items-center justify-center">
          <img src={logo} alt="Logo de MK" className="w-40 mb-4" />
        </div>
      </div>
    </header>
  );
}

export default Banner;
