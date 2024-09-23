import React from 'react';
import Image from 'next/image';
import logo from '@assets/imgs/mk_logo.png';
import '@styles/layout/Banner.css'; 

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
      <div className="relative w-full h-52 bg-cover bg-cente">
        <div className="w-full h-full bg-opacity-50 flex flex-col items-center justify-center">
        <Image src={logo} alt="Logo" width={200} height={200} />
        </div>
      </div>
    </header>
  );
}

export default Banner;
