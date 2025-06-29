import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {useAuth} from "../context/AuthContext";
import AuthPage from "./AuthPage";
import ProductListPage from "./ProductListPage";
import ProductFormPage from "./ProductFormPage";

function SimpleRouter() {
    const {isAuthenticated, setIsAuthenticated} = useAuth();
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login"/>}/>
                <Route path="/login" element={<AuthPage/>}/>

                {/* Protected Routes */}
                <Route
                    path="/products"
                    element={isAuthenticated ? <ProductListPage/> : <Navigate to="/login"/>}
                />
                <Route
                    path="/products/new"
                    element={isAuthenticated ? <ProductFormPage/> : <Navigate to="/login"/>}
                />
                <Route
                    path="/products/edit/:id"
                    element={isAuthenticated ? <ProductFormPage/> : <Navigate to="/login"/>}
                />

                {/* Fallback for any unknown path */}
                <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
        </Router>
    );
}

export default SimpleRouter;
