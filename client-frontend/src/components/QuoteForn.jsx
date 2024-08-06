import React, { useState, useCallback } from 'react';
import validationUtils from './ValidationUtils';
import quoteSending from './QuoteSending';

function QuoteForm() {
    const [formData, setFormData] = useState({
        compania: '',
        contacto: '',
        phoneNumber: '',
        email: '',
        nit: '',
        direccion: ''
    });

    const [errors, setErrors] = useState({});
    const [hovered, setHovered] = useState(false);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        validateField(name, value);
    }, []);

    const validateField = (name, value) => {
        let errorMessage = '';

        switch (name) {
            case 'compania':
                errorMessage = validationUtils.validateCompanyName(value);
                break;
            case 'contacto':
                errorMessage = validationUtils.validateContactName(value);
                break;
            case 'phoneNumber':
                errorMessage = validationUtils.validatePhoneNumber(value);
                break;
            case 'email':
                errorMessage = validationUtils.validateEmail(value);
                break;
            case 'nit':
                errorMessage = validationUtils.validateNit(value);
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage
        }));
    };

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        const currentErrors = {};
        for (const field in formData) {
            const error = validateField(field, formData[field]);
            if (error) {
                currentErrors[field] = error;
            }
        }

        if (Object.keys(currentErrors).length === 0) {
            if (quoteSending(formData)) {
                console.log('Todo cristalino');
            }
        } else {
            setErrors(currentErrors);
        }
    }, [formData]);

    return (
        <div className="max-w-md mx-auto mr-4">
            <form onSubmit={handleSubmit} className='quote-form p-4 border-2 border-gray-300 rounded mb-4 bg-color-table '>
                <label htmlFor="compania" className="font-bold flex justify-start items-center text-sm">EMPRESA:</label>
                <input
                    type="text"
                    name="compania"
                    placeholder="Nombre de la empresa"
                    value={formData.compania}
                    onChange={handleInputChange}
                    className={`w-full border-b mb-1 focus:outline-none text-right bg-color-table ${errors.compania ? 'border-red-600' : 'border-gray-300'}`}
                />
                {errors.compania && <span className="error font-bold text-sm text-red-600">{errors.compania}</span>}

                <label htmlFor="contacto" className="font-bold flex justify-start items-center text-sm">CONTACTO:</label>
                <input
                    type="text"
                    name="contacto"
                    placeholder="Nombre del contacto"
                    value={formData.contacto}
                    onChange={handleInputChange}
                    className={`w-full border-b mb-1 focus:outline-none text-right bg-color-table ${errors.contacto ? 'border-red-600' : 'border-gray-300'}`}
                />
                {errors.contacto && <span className="error font-bold text-sm text-red-600">{errors.contacto}</span>}

                <label htmlFor="phoneNumber" className="font-bold flex justify-start items-center text-sm">NÚMERO DE TELÉFONO:</label>
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Número de teléfono"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full border-b mb-1 focus:outline-none text-right bg-color-table ${errors.phoneNumber ? 'border-red-600' : 'border-gray-300'}`}
                />
                {errors.phoneNumber && <span className="error font-bold text-sm text-red-600">{errors.phoneNumber}</span>}

                <label htmlFor="email" className="font-bold flex justify-start items-center text-sm">EMAIL:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border-b mb-1 focus:outline-none text-right bg-color-table ${errors.email ? 'border-red-600' : 'border-gray-300'}`}
                />
                {errors.email && <span className="error font-bold text-sm text-red-600">{errors.email}</span>}

                <label htmlFor="nit" className="font-bold flex justify-start items-center text-sm">NIT:</label>
                <input
                    type="text"
                    name="nit"
                    placeholder="Número de NIT"
                    value={formData.nit}
                    onChange={handleInputChange}
                    className={`w-full border-b mb-1 focus:outline-none text-right bg-color-table ${errors.nit ? 'border-red-600' : 'border-gray-300'}`}
                />
                {errors.nit && <span className="error font-bold text-sm text-red-600">{errors.nit}</span>}

                <label htmlFor="direccion" className="font-bold flex justify-start items-center text-sm">DIRECCIÓN:</label>
                <input
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    className="w-full border-b mb-3 focus:outline-none text-right bg-color-table"
                />

                <button
                    type="submit"
                    className={`font-bold bg-${hovered ? 'color-prices' : 'lime'}-500 text-${hovered ? 'componentes' : 'color-text'} py-2 px-12 rounded hover:bg-color-prices hover:text-color-componentes transition-colors`}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default QuoteForm;
