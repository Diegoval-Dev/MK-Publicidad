'use client';
import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';
import NavigationButtons from '@components/utils/NavigationButtons';
import '@styles/contact/ContactForm.css';
import facebookIcon from "@assets/imgs/facebook_icon.png";
import instagramIcon from "@assets/imgs/instagram_icon.png";
import { contact, subscribe } from '../api/contact';
import mkLogo from "@assets/imgs/mk_logo.png";
import { useRouter } from 'next/navigation';

function Contact() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        comentario: ''
    });
    const [hovered, setHovered] = useState(false);
    const [bulletinHovered, setBulletinHovered] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const openError = () => setIsError(true);
    const closeError = () => setIsError(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        contact(formData.nombre, formData.correo, formData.comentario)
        router.push('/categorias')
        
    };

    const Modal = () => {
        return (
          <>
            {isOpen && (
              <div
                className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
                onClick={closeModal}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm"
                >
                  <div className="flex items-center pb-4 text-xl font-medium text-slate-800">
                    Suscripción exitosa
                  </div>
                  <div className="border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                    Se ha suscrito correctamente a nuestro boletín de novedades.
                  </div>
                  <div className="flex items-center pt-4 justify-end">
                    <button
                      onClick={closeModal}
                      className={`font-bold bg-${hovered ? 'color' : 'lime'}-500 text-${hovered ? 'componentes' : 'color-text'} rounded hover:bg-color-prices hover:text-color-componentes transition-colors ml-2 w-20 h-10`}
                      type="button"
                    >
                      Volver
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        );
    };

    const ErrorModal = () => {
        return (
          <>
            {isError && (
              <div
                className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
                onClick={closeError}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm"
                >
                  <div className="flex items-center pb-4 text-xl font-medium text-slate-800">
                    Suscripción fallida
                  </div>
                  <div className="border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                    Ha ocurrido un error al realizar la suscripción. Inténtalo de nuevo más tarde.
                  </div>
                  <div className="flex items-center pt-4 justify-end">
                    <button
                      onClick={closeError}
                      className={`font-bold bg-${hovered ? 'color' : 'red'}-500 text-${hovered ? 'componentes' : 'color-text'} rounded hover:bg-red-800 hover:text-color-componentes transition-colors ml-2 w-20 h-10`}
                      type="button"
                    >
                      Volver
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        );
    };

    const handleSubscription = async () => {
        const response = await subscribe(userEmail);

        if (response) {
            openModal();

        } else {
            openError();
        }
    }

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }, []);

    return (
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Modal />
            <ErrorModal />
            <div className="container flex justify-between w-full p-4">
                <NavigationButtons/>
            </div>

            <div className="container w-[80%] mx-auto border border-black-300 p-4 mt-5 shadow-md rounded-lg">
                <h1 className='centered-title'>Contáctanos</h1>
                <hr className='mb-6'/>
                <form onSubmit={handleSubmit} className='form'>
                    <label htmlFor="nombre" className="font-bold flex justify-start items-center text-sm">Nombre completo:</label>
                    <input 
                        type="text"
                        name='nombre'
                        placeholder='Nombre completo'
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className='input'
                    />

                    <label htmlFor="correo" className="font-bold flex justify-start items-center text-sm">Correo electrónico:</label>
                    <input 
                        type="email"
                        name='correo'
                        placeholder='Correo electrónico'
                        value={formData.correo}
                        onChange={handleInputChange}
                        className='input'
                    />

                    <label htmlFor="comentario" className="font-bold flex justify-start items-center text-sm">Comentario:</label>
                    <textarea 
                        name='comentario'
                        placeholder='Escribe tu comentario'
                        value={formData.comentario}
                        onChange={handleInputChange}
                        className='input'
                    />

                    <button
                        type="submit"
                        className={`font-bold bg-${hovered ? 'color-prices' : 'lime'}-500 text-${hovered ? 'componentes' : 'color-text'} py-2 px-12 rounded hover:bg-color-prices hover:text-color-componentes transition-colors`}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        Enviar
                    </button>
                </form>

                <div className='container border border-black-300 p-3 shadow-md rounded-lg text-[white] mt-8 w-[100%] justify-between items-center text-left bg-[#388E3C] flex'>
                    <div>
                        <h1 className='boardTitle'>Boletín</h1>
                        <p>Recibe nuestras novedades, promociones y recomendaciones</p>
                    </div>
                    <div className='flex items-center justify-center'>
                        <input 
                            className='input text-black'
                            type="text"
                            name='emailBoard'
                            placeholder='Correo electrónico'
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                        <button
                            type='submit'
                            onMouseEnter={() => setBulletinHovered(true)}
                            onMouseLeave={() => setBulletinHovered(false)}
                            onClick={handleSubscription}
                            className={`font-bold bg-${bulletinHovered ? 'color' : 'lime'}-500 text-${bulletinHovered ? 'componentes' : 'color-text'} rounded hover:bg-color-prices hover:text-color-componentes transition-colors ml-2 w-48 h-12`}
                            >¡Estoy dentro!</button>
                    </div>
                </div>

                <div className='grid grid-cols-3 gap-9 mt-5'>
                    <div>
                        <Image src={mkLogo} alt="Logo de MK" width={125} height={125} />
                        <div className=' flex w-[25%]'>
                                <a href="https://m.facebook.com/people/MK-Publicidad-SA/100063825709539/" target='_blank' rel="noopener noreferrer">
                                    <Image src={facebookIcon} alt="Página de Facebook"/>
                                </a>
                                <a href="https://www.instagram.com/mkpublicidad?igsh=cnF3aW55OGp5dHNt" target='_blank' rel="noopener noreferrer">
                                     <Image src={instagramIcon} alt="Página de Instagram"/>
                                </a>
                        </div>
                    </div>
                    <div className='flex text-left'>
                        <ul>
                            <h1 className='footTitle'>Contacto</h1>
                            <li>
                                <p>ventas@mkpublicidadgt.com</p>
                            </li>
                            <li>
                                <p>Cel: +502 5524-5975</p>
                            </li>
                            <li>
                                <p>Oficina: +502 2293-2986</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <h1 className='footTitle'>Servicio al cliente</h1>
                            <li>
                                <p>INSERTAR TUTOS</p>
                            </li>
                        </ul>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Contact;
