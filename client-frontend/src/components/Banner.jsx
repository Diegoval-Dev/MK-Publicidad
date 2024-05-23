import logo from '@assets/imgs/mk_logo.png';

function Banner() {
  return (
    <div className="relative w-full h-52 bg-cover bg-center">
      <div className="absolute top-0 left-0 w-full h-8 bg-lime-700"></div>
      <div className="w-full h-full bg-opacity-50 flex flex-col items-center justify-center">
        <img src={logo} alt="Logo de MK" className="w-40 mb-4" />
      </div>
    </div>
  );
}

export default Banner;
