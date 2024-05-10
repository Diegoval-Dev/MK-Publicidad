import React, { useState } from 'react';
import validationUtils from './validationUtils';


function QuoteForm() {
    const [compania, setCompania] = useState('');
    const [companiaError, setCompaniaError] = useState('');
    const [contacto, setContacto] = useState('');
    const [contactoError, setContactoError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nit, setNit] = useState('');
    const [nitError, setNitError] = useState('');
    const [direccion, setDireccion] = useState('');

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

        const contactNumberValidationError = validationUtils.validateContactNumber(contacto);
        if (contactNumberValidationError) {
            setContactoError(contactNumberValidationError);
            return;
        }

        const emailValidationError = validationUtils.validateEmail(email);
        if (emailValidationError) {
            setEmailError(emailValidationError);
            return;
        }

        console.log('Formulario enviado correctamente');
    };


    return (
        <form onSubmit={handleSubmit} className='flex flex-col items-start'>
            <label>
                Empresa:
                <input type="text" value={compania} onChange={(e) => setCompania(e.target.value)} />
                {companiaError && <span className="error">{companiaError}</span>}
            </label>
            <br />
            <label>
                Contacto:
                <input type="text" value={contacto} onChange={(e) => setContacto(e.target.value)} />
                {contactoError && <span className="error">{contactoError}</span>}
            </label>
            <br />
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {emailError && <span className="error">{emailError}</span>}
            </label>
            <br />
            <label>
                Nit:
                <input type="text" value={nit} onChange={(e) => setNit(e.target.value)} />
                {nitError && <span className="error">{nitError}</span>}
            </label>
            <br />
            <label>
                Dirección:
                <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default QuoteForm;