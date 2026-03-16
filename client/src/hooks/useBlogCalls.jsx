import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentToState, blogSuccess, categorySuccess, commentSuccess, createBlogSuccess, fetchFail, fetchStart, toggleLikeInState } from '../features/blogSlice'
import axios from 'axios' // Doğrudan axios kullanacağız, aracı kullanmıyoruz!

const useBlogCalls = () => {
    const dispatch = useDispatch()
    const BASE_URL = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000/"
    const { token } = useSelector(state => state.auth)

    // GARANTİ TOKEN FONKSİYONU: Her istekte taze token çeker ve tırnak işaretlerini temizler
    const getAuthHeader = () => {
        const rawToken = token || localStorage.getItem("token") || "";
        const cleanToken = rawToken.replace(/['"]+/g, ''); // Fazladan tırnak varsa temizler
        return {
            headers: { Authorization: `Token ${cleanToken}` }
        };
    };

    const getBlogs = async () => {
        dispatch(fetchStart())
        try {
            const { data } = await axios.get(`${BASE_URL}blogs`)           
            dispatch(blogSuccess(data))
        } catch (error) {
            dispatch(fetchFail())
        }
    }

    const getSingleBlog = async (id) => {
        try {
            await axios.get(`${BASE_URL}blogs/${id}`, getAuthHeader());
            // Sayaç arttıktan sonra Redux'taki tüm listeyi güncelliyoruz ki ekrana anında yansısın
            getBlogs(); 
        } catch (error) {
            console.error("Okunma sayısı artırılamadı:", error);
        }
    };

    const getCommentsByID = async (blogId) => {
      dispatch(fetchStart());
      try {
        const { data } = await axios.get(`${BASE_URL}comments?filter[blogId]=${blogId}`);
        dispatch(commentSuccess(data));
      } catch (error) {
        dispatch(fetchFail());
      }
    };
    
    const addComment = async (blogId, comment) => {
        dispatch(fetchStart());
        try {
          // POST işleminde getAuthHeader()'ı zorla ekliyoruz
          const { data } = await axios.post(`${BASE_URL}comments`, { blogId, comment }, getAuthHeader());
          dispatch(addCommentToState(data));
        } catch (error) {
          console.error("Yorum ekleme hatası:", error);
          dispatch(fetchFail());
        }
    };

    const getCategories = async () => {
        dispatch(fetchStart())
        try {
          const { data } = await axios.get(`${BASE_URL}categories`);
          dispatch(categorySuccess(data));
        } catch (error) {
          dispatch(fetchFail());
        }
    }

    const addBlog = async (blogData) => {
        dispatch(fetchStart())
        try {
            const {data} = await axios.post(`${BASE_URL}blogs`, blogData, getAuthHeader())
            dispatch(createBlogSuccess(data))
        } catch (error) {
            console.log("Create Blog Error:", error)
            dispatch(fetchFail())            
        }
    }

    const deleteBlog = async (blogId) => {
        dispatch(fetchStart());
        try {
          await axios.delete(`${BASE_URL}blogs/${blogId}`, getAuthHeader());
          getBlogs(); // Silince listeyi yenile
        } catch (error) {
          console.error("Delete blog error:", error);
          dispatch(fetchFail());
        }
    };

    const toggleLike = async (id, userId) => {
        try {
          await axios.post(`${BASE_URL}blogs/${id}/postLike`, {}, getAuthHeader());
          dispatch(toggleLikeInState({ blogId: id, userId }));
        } catch (error) {
          console.error("Like error:", error);
        }
    };

  return { getBlogs,getSingleBlog, toggleLike, addComment, getCategories, addBlog, deleteBlog, getCommentsByID }
}

export default useBlogCalls