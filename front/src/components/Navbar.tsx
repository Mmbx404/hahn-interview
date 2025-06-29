import {useLocation, useNavigate} from 'react-router-dom';
import {TabMenu} from 'primereact/tabmenu';
import {useAuth} from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {setIsAuthenticated} = useAuth();

    const items = [
        {label: 'Products', icon: 'pi pi-list', command: () => navigate('/products')},
        {label: 'Add Product', icon: 'pi pi-plus', command: () => navigate('/products/new')},
        {
            label: 'Logout', icon: 'pi pi-sign-out', command: () => {
                localStorage.removeItem('jwt');
                setIsAuthenticated(false)
                navigate('/login');
            }
        },
    ];

    // Find active index based on current path
    const activeIndex = items.findIndex(item => {
        if (item.label === 'Products' && location.pathname === '/products') return true;
        if (item.label === 'Add Product' && location.pathname === '/products/new') return true;
        return false;
    });

    return (
        <TabMenu model={items} activeIndex={activeIndex}/>
    );
};

export default Navbar;
