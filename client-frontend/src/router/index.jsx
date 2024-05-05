import useNavigate from '@hooks/useNavigate'
import { useEffect } from 'react'

import Home from '@views/Home'
import Catalogue from '@views/Catalogue'
import CustomizationPage from '@views/CustomizationPage'

const routes = {
    '/home': Home,
    '/home/catalogue': Catalogue,
    '/customization': CustomizationPage,
}

function Router() {
    const { page, navigate } = useNavigate()

    // useEffect(() => {
    //     if (page === '/') {
    //         navigate('/home');
            
    //     }
    // }, [page, navigate]);

    let CurrentPage = () => <h1>404</h1>


    if (routes[page]) {
        CurrentPage = routes[page]
        return <CurrentPage />
    }
    
    return <CurrentPage />
}

export default Router