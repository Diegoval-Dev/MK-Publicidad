import useNavigate from '@hooks/useNavigate'
import { useEffect } from 'react'

import Home from '@views/Home'
import Catalogue from '@views/Catalogue'
import CustomizationPage from '@views/CustomizationPage'
import Quote from '@views/Quote'

const routes = {
    '/home': Home,
    '/home/catalogue': Catalogue,
    '/home/catalogue/customization': CustomizationPage,
    '/home/catalogue/customization/quote': Quote,
}

function Router() {
    const { page, navigate } = useNavigate()


    let CurrentPage = () => <h1>404</h1>


    if (routes[page]) {
        CurrentPage = routes[page]
        return <CurrentPage />
    }
    
    return <CurrentPage />
}

export default Router