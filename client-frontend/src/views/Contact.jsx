import { useState, useCallback } from 'react';
import Banner from '../components/Banner';
import NavigationButtons from '../components/NavigationButtons';
import { useNavigate } from '@hooks/useNavigate';
import '../styles/ContactForm.css';

function Contact() {
    const { navigate } = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        comentario: ''
    });

    const [hovered, setHovered] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Datos del formulario:', formData);
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
            <Banner />
            <div className="container flex justify-between w-full p-4">
                <NavigationButtons
                    onClick={() => navigate('/home')}
                />
            </div>

            <div className="container w-[80%] mx-auto border border-black-300 p-4 mt-5 shadow-md rounded-lg">
                <h1 className='centered-title'>Contáctanos</h1>
                <hr className='mb-6'/>
                <form onSubmit={handleSubmit} className='form'>
                    <label htmlFor="nombre" className="font-bold flex justify-start items-center text-sm">Nombre completo:</label>
                    <input 
                        type="text"
                        name='nombre'  // Asegúrate de que el nombre coincida con la clave de formData
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

                <div className='container border border-black-300 p-3 mt-5 shadow-md rounded-lg text-[white] mt-8 w-[100%] p-6 justify-between items-center text-left bg-[#388E3C] flex'>
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
                            className={`font-bold bg-${hovered ? 'color-prices' : 'lime'}-500 text-${hovered ? 'componentes' : 'color-text'} rounded hover:bg-color-prices hover:text-color-componentes transition-colors`}
                            >¡Estoy dentro!</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
