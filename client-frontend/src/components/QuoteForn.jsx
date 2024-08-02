import React, { useState } from 'react';
import validationUtils from './ValidationUtils';
import quoteSending from './QuoteSending';

function QuoteForm() {
    const [compania, setCompania] = useState('');
    const [companiaError, setCompaniaError] = useState('');
    const [contacto, setContacto] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nit, setNit] = useState('');
    const [nitError, setNitError] = useState('');
    const [contactoError, setContactoError] = useState('');
    const [direccion, setDireccion] = useState('');
    
    const [hovered, setHovered] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const nitValidationError = validationUtils.validateNit(nit);
        if (nitValidationError) {
            setNitError(nitValidationError);
            return;
        }

        const companyNameValidationError = validationUtils.validateCompanyName(compania);
        if (companyNameValidationError) {
            setCompaniaError(companyNameValidationError);
            return;
        }

        const phoneNumberValidationError = validationUtils.validatePhoneNumber(phoneNumber); // Validación del número de teléfono
        if (phoneNumberValidationError) {
            setPhoneNumberError(phoneNumberValidationError);
            return;
        }

        const emailValidationError = validationUtils.validateEmail(email);
        if (emailValidationError) {
            setEmailError(emailValidationError);
            return;
        }

        if (quoteSending(email, nit, compania, contacto, phoneNumber, direccion)) {
            console.log('Todo cristalino');

        }
    };

    return (
        <div className="max-w-md mx-auto mr-4">
            <form onSubmit={handleSubmit} className='quote-form p-4 border-2 border-gray-300 rounded mb-4 bg-color-table '>
                <label className="font-bold flex justify-start items-center text-sm">EMPRESA:</label>
                <input type="text" value={compania} onChange={(e) => setCompania(e.target.value)} className="w-full border-b border-gray-300 mb-1 focus:outline-none text-right bg-color-table" />
                {companiaError && <span className="error font-bold text-sm text-red-600">{companiaError}</span>}

                <label className="font-bold flex justify-start items-center text-sm">CONTACTO:</label>
                <input type="text" value={contacto} onChange={(e) => setContacto(e.target.value)} className="w-full border-b border-gray-300 mb-1 focus:outline-none text-right bg-color-table" />

                <label className="font-bold flex justify-start items-center text-sm">NÚMERO DE TELÉFONO:</label>
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full border-b border-gray-300 mb-1 focus:outline-none text-right bg-color-table" />
                {phoneNumberError && <span className="error font-bold text-sm text-red-600">{phoneNumberError}</span>}

                <label className="font-bold flex justify-start items-center text-sm">EMAIL:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b border-gray-300 mb-1 focus:outline-none text-right bg-color-table" />
                {emailError && <span className="error font-bold text-sm text-red-600">{emailError}</span>}

                <label className="font-bold flex justify-start items-center text-sm">NIT:</label>
                <input type="text" value={nit} onChange={(e) => setNit(e.target.value)} className="w-full border-b border-gray-300 mb-1 focus:outline-none text-right bg-color-table" />
                {nitError && <span className="error font-bold text-sm text-red-600">{nitError}</span>}

                <label className="font-bold flex justify-start items-center text-sm">DIRECCIÓN:</label>
                <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} className="w-full border-b border-gray-300 mb-3 focus:outline-none text-right bg-color-table" />

                <button type="submit" className={`font-bold bg-${hovered ? 'color-prices' : 'lime'}-500 text-${hovered ? 'componentes' : 'color-text'} py-2 px-12 rounded hover:bg-color-prices hover:text-color-componentes transition-colors`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} > Submit </button>
            </form>
        </div>
    );
}

export default QuoteForm;