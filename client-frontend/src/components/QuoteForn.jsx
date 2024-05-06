import React, { useState } from 'react';

function QuoteForm() {
    const [compania, setCompania] = useState('');
    const [contacto, setContacto] = useState('');
    const [email, setEmail] = useState('');
    const [nit, setNit] = useState('');
    const [direccion, setDireccion] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col items-start'>
            <label>
                Empresa:
                <input type="text" value={compania} onChange={(e) => setCompania(e.target.value)} />
            </label>
            <br />
            <label>
                Contacto:
                <input type="text" value={contacto} onChange={(e) => setContacto(e.target.value)} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <label>
                Nit:
                <input type="text" value={nit} onChange={(e) => setNit(e.target.value)} />
            </label>
            <br />
            <label>
                Dirección:
                <input type="text" value={direccion} onChange={(e) => setNit(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default QuoteForm;