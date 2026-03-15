import axios from 'axios';
import { useSelector } from 'react-redux';

const useAxios = () => {
    const { token } = useSelector(state => state.auth)

    // .env okunamazsa varsayılan olarak lokal backend adresini kullan
    const BASE_URL = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000/";

    const axiosWithToken = axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Token ${token}`
        }
    });

  return { axiosWithToken }
}

export default useAxios;