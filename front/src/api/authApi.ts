import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080',
});

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    username: string;
    firstname: string;
    email: string;
    password: string;
}

export const login = (loginRequest: LoginRequest) => api.post('/token', loginRequest);
export const register = (registerRequest: RegisterRequest) => api.post('/account', registerRequest);