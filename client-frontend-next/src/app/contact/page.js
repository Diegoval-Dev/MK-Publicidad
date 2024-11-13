'use client';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import NavigationButtons from '@components/utils/NavigationButtons';
import '@styles/contact/ContactForm.css';
import facebookIcon from "@assets/imgs/facebook_icon.png";
import instagramIcon from "@assets/imgs/instagram_icon.png";
import { contact } from '../api/contact';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        contact(formData.nombre, formData.correo, formData.comentario)
        router.push('/categorias')
        
    };

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }, []);

    return (
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
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
                            className='input'
                            type="text"
                            name='emailBoard'
                            placeholder='Correo electrónico'
                        />
                        <button
                            type='submit'
                            className={`font-bold bg-${hovered ? 'color' : 'lime'}-500 text-${hovered ? 'componentes' : 'color-text'} rounded hover:bg-color-prices hover:text-color-componentes transition-colors ml-2 w-48 h-12`}
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
