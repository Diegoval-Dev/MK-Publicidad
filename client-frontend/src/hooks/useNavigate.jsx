import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types';

const NavigationContext = createContext({ page: '/', navigate: () => { }, params: {} })

const NavigationProvider = ({ children }) => {
    const path = window.location.pathname

    const [page, setPage] = useState(path || '/')
    const [params, setParams] = useState({})

    useEffect(() => {
        if (path) {
            setPage(path)
        }

        const handlePopState = () => {
            setPage(window.location.pathname);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [path])

    const navigate = (url, params = {}) => {
    console.log('Navigating to', url);
    const separator = page === '/' ? '' : page.endsWith('/') ? '' : '/';
    const newUrl = `${page}${separator}${url}`;
    console.log('New URL', newUrl)
    setPage(newUrl)
    setParams(params)
    window.history.pushState({}, '', newUrl);
}

    return (
        <NavigationContext.Provider value={{ page, navigate, params }}>
            {children}
        </NavigationContext.Provider>
    )
}

export const useNavigate = () => {
    return useContext(NavigationContext)
}

NavigationProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default useNavigate
export { NavigationProvider }