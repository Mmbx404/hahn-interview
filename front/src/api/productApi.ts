import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080/products',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwt");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => console.log(error)
);

export const getProducts = () => api.get('');
export const getProductById = (id: number) => api.get(`/${id}`);
export const createProduct = (product: any) => api.post('', product);
export const updateProduct = (product: any) => api.patch('', product);
export const deleteProduct = (id: number) => api.delete(`/${id}`);
