function validateNit(nit) {
    if (!/^[0-9A-Za-z]+$/.test(nit)) {
        return 'El NIT solo puede contener números y letras.';
    }
    return '';
}

function validateContactName(contactName) {
    if (!/^[a-zA-Z\s]+$/.test(contactName)) {
        return 'El nombre del contacto solo puede contener letras y espacios.';
    }
    return '';
}

function validateCompanyName(companyName) {
    if (!/^[a-zA-Z0-9\s]+$/.test(companyName)) {
        return 'El nombre de la compañía solo puede contener letras, números y espacios.';
    }
    return '';
}

function validatePhoneNumber(phoneNumber) {
    if (!/^[0-9]+$/.test(phoneNumber)) {
        return 'El número de teléfono solo puede contener números.';
    }
    return '';
}


function validateEmail(email) {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return 'Por favor, introduce un correo electrónico válido.';
    }
    return '';
}

export default {
    validateNit,
    validateCompanyName,
    validatePhoneNumber,
    validateEmail,
    validateContactName
};