import React, { useState } from 'react';
import validationUtils from './ValidationUtils';
import { quoteSending, quoteCreation } from './QuoteSending';
import { useRouter } from 'next/navigation';
import '@styles/quote/QuoteForm.css';

function QuoteForm(quotationDetails) {
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
    const router = useRouter();

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

        if (quoteSending(email, nit, compania, contacto, phoneNumber, direccion, quotationDetails)) {
            quoteCreation(email, nit, compania, contacto, phoneNumber, direccion, quotationDetails);
            //router.push('/quote-sent');
        }
    };

    return (
        <div className="quote-form-container">
            <form onSubmit={handleSubmit} className='quote-form'>
                <label>EMPRESA:</label>
                <input type="text" placeholder='Compañía S.A.' value={compania} onChange={(e) => setCompania(e.target.value)} />
                {companiaError && <span className="error">{companiaError}</span>}

                <label>CONTACTO:</label>
                <input type="text" placeholder='Nombre de la persona que solicita la cotización' value={contacto} onChange={(e) => setContacto(e.target.value)} />

                <label>NÚMERO DE TELÉFONO:</label>
                <input type="text" placeholder='00000000' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                {phoneNumberError && <span className="error">{phoneNumberError}</span>}

                <label>EMAIL:</label>
                <input type="email" placeholder='example@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                {emailError && <span className="error">{emailError}</span>}

                <label>NIT:</label>
                <input type="text" placeholder='Número de Identificación Tributario' value={nit} onChange={(e) => setNit(e.target.value)} />
                {nitError && <span className="error">{nitError}</span>}

                <label>DIRECCIÓN:</label>
                <input type="text" placeholder='Calle 5 Z 2' value={direccion} onChange={(e) => setDireccion(e.target.value)} />

                <button type="submit" className={`hover:bg-${hovered ? 'color-prices' : 'lime'}-500 text-${hovered ? 'componentes' : 'color-text'}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>Enviar</button>
            </form>
        </div>
    );
}

export default QuoteForm;
