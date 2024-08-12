import useNavigate from '@hooks/useNavigate';
import Home from '@views/Home';
import Catalogue from '@views/Catalogue';
import CustomizationPage from '@views/CustomizationPage';
import Quote from '@views/Quote';
import Filter from '@components/Filter';
import Contact from '@views/Contact';

const routes = {
    '/home': Home,
    '/home/catalogue': Catalogue,
    '/home/catalogue/customization': CustomizationPage,
    '/home/catalogue/customization/quote': Quote,
    '/home/catalogue/filter': Filter,
    '/home/contact': Contact
};

function Router({ selectedCategory, onCategorySelection }) {
    const { page } = useNavigate();

    let CurrentPage = () => <h1>404</h1>;

    if (routes[page]) {
        CurrentPage = routes[page];
        return (
            <CurrentPage 
                selectedCategory={selectedCategory} 
                onCategorySelection={onCategorySelection} 
            />
        );
    }

    return <CurrentPage />;
}

export default Router;
