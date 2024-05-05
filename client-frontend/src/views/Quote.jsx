import React, { useEffect } from 'react';

import useNavigate from '@hooks/useNavigate';
import NavigationButtons from '../components/NavigationButtons';

function Quote() {
    const { navigate, params } = useNavigate();

    useEffect(() => {
        console.log('Quote page', params);
    }
    , []);

    return (
        <div>
            <h1>Welcome to the Quote Page!</h1>

            <NavigationButtons
                onClick={() => navigate('/home/catalogue',  { category: params.category })}
            />
            <img src={params.screenshot} alt="Screenshot" />
            <p>This is a simple React page.</p>
        </div>
    );
}

export default Quote;