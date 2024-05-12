
import logo from '@assets/imgs/mk_logo.png';

function Banner() {
    return (
        <div className="flex justify-center">
            <img src={logo} alt="Logo de MK" className="w-80"/>
        </div>
    );
}

export default Banner;
