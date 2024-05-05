import useNavigate from '@hooks/useNavigate'

import Home from '@views/Home'
import Catalogue from '@views/Catalogue'
import CustomizationPage from '@views/CustomizationPage'

const routes = {
    '/': Home,
    '/catalogue': Catalogue,
    '/customization': CustomizationPage,
}

function Router() {
    const { page } = useNavigate()
    console.log("PATH",page)

    let CurrentPage = () => <h1>404</h1>

    if (routes[page]) {
        CurrentPage = routes[page]
        return <CurrentPage />
    }

    return <CurrentPage />
}

export default Router