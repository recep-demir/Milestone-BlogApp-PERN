import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchFail, fetchStart, logoutSuccess, registerSuccess, loginSuccess } from '../features/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toastSuccessNotify, toastErrorNotify } from '../helper/ToastNotify';
import useAxios from './useAxios';

const useAuthCalls = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector(state => state.auth)
  const { axiosWithToken } = useAxios()
  
  // Eğer .env dosyasından okuyamazsa otomatik olarak localhost:8000'i kullansın (Invalid URL hatasını çözer)
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000/";

  const register = async (userInfo) =>{
    dispatch(fetchStart())

    try {
      // 1. Kullanıcı kaydını oluştur
      const { data } = await axios.post(`${BASE_URL}users/`, userInfo);
      console.log("Kayıt API Yanıtı:", data);
      
      dispatch(registerSuccess(data));        
      toastSuccessNotify("Registered successfully! Logging in..." );

      // 2. Kayıt başarılı olduktan sonra otomatik olarak Giriş (Login) yap
      const loginData = {
        username: userInfo.username,
        password: userInfo.password
      };
      
      // Auto-login tetikle
      await login(loginData);
      
    } catch (error) {
      console.error("Kayıt Hatası:", error);
      dispatch(fetchFail());
      toastErrorNotify(error.response?.data?.message || "Registration failed!");
    }
  };

  const login = async (userInfo) => {
    dispatch(fetchStart())
    try {
      const { data } = await axios.post(`${BASE_URL}auth/login`, userInfo);
      
      dispatch(loginSuccess(data));
      localStorage.setItem("token", data.token); // Login başarılı olunca token'ı kaydet
      
      toastSuccessNotify("Login successful - Welcome!");
      navigate("/");
      
    } catch (error) {
        console.error("Giriş Hatası:", error);
        dispatch(fetchFail());
        toastErrorNotify(error.response?.data?.message || "Login failed!");
    }
  };

  const logout = async () => {
    dispatch(fetchStart());

    try {
      await axiosWithToken.get("auth/logout/")
      
      localStorage.removeItem("token");      
      dispatch(logoutSuccess())
      toastSuccessNotify("User logged out successfully")
      navigate("/login");
    } catch (error) {
      console.log(error)
      dispatch(fetchFail())
    }
  };

  return { register, login, logout }
}

export default useAuthCalls