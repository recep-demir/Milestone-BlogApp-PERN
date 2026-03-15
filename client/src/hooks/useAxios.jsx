import axios from 'axios';
import { useSelector } from 'react-redux';

const useAxios = () => {
    const { token } = useSelector(state => state.auth);

    // 1. Burada header TANIMLAMIYORUZ, sadece temel URL'yi veriyoruz.
    const axiosWithToken = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000/",
    });

    // 2. INTERCEPTOR EKLİYORUZ: Her istek gitmeden saniyeler önce çalışır
    axiosWithToken.interceptors.request.use((config) => {
        // Redux'ta token yoksa LocalStorage'dan al
        const currentToken = token || localStorage.getItem("token");
        if (currentToken) {
            config.headers.Authorization = `Token ${currentToken}`;
        }
        return config;
    });

    return { axiosWithToken };
}

export default useAxios;