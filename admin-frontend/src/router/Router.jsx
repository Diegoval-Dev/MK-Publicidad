import useNavigate from '@hooks/useNavigate'
import useToken from '@hooks/useToken'

import Login from '@views/Login'
import Dashboard from '@views/Dashboard'


const routes = {
    '/dashboard': {
        component: Dashboard,
        auth: true,
        role: 'all'
    },
    '/login': {
        component: Login,
        auth: false,
    }
}

function Router() {
    const { page, navigate } = useNavigate()
    const { token } = useToken()


    let CurrentPage = () => <h1>404</h1>


    if (routes[page]) {
      if(routes[page].auth && !token) {
        navigate('/login')
      }else {
        CurrentPage = routes[page].component
      }

    }
    
    return <CurrentPage />
}

export default Router