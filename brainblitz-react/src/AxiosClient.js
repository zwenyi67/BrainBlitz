import axios from 'axios';

const AxiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

AxiosClient.interceptors.request.use((config)=> {
    const token = localStorage.getItem('ACCESS_TOKEN');

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

AxiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        try {
            const { response } = error;
            if (response && response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
            }
        } catch (err) {
            console.error(err);
        }
        throw error;
    }
);

export default AxiosClient;