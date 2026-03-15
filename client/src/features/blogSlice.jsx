import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blog',
  initialState:{
    loading:false,
    error:false,
    token:null,
    blogs:[],
    comments:[],
    categories:[],
  },
  reducers: {
    fetchStart: (state) => {
        state.loading = true;
        state.error = false;
      },
      fetchFail: (state) => {
        state.loading = false;
        state.error = true;
      },
      blogSuccess: (state,{payload}) =>{
        state.loading =false;
        state.error =false;
        state.blogs = payload.result; // payload.data yerine payload.result
        console.log("slice eklenen blog", payload.result)  
      },
      commentSuccess: (state,{payload}) =>{
        state.loading =false;
        state.error =false;
        state.comments = payload.result; // payload.data yerine payload.result
        console.log("slice eklenen comments", payload.result)       
      },
      addCommentToState: (state, { payload }) => {
        state.comments.push(payload.result); // payload.data yerine payload.result
      },
      categorySuccess: (state,{payload}) =>{
        state.loading =false;
        state.error =false;
        state.categories = payload.result; // payload.data yerine payload.result
        console.log("kategori" , payload.result)
      },
      createBlogSuccess: (state, { payload }) => {
        state.blogs.push(payload.result); // payload.data yerine payload.result
      },

      toggleLikeInState: (state, { payload }) => {
        // _id yerine id yaptık
        const blog = state.blogs.find((b) => b.id === payload.blogId);
        if (blog) {
          // SQL'de array olarak değil de tablo ilişkisi olarak tuttuk.
          // Geçici olarak frontend'de çalışması için:
          if (!blog.likes) blog.likes = [];
          
          const userIndex = blog.likes.indexOf(payload.userId);
          if (userIndex === -1) {
            blog.likes.push(payload.userId);
          } else {
            blog.likes.splice(userIndex, 1);
          }
        }
      },
  },
});

export const { 
    fetchStart, fetchFail, blogSuccess, toggleLikeInState, 
    commentSuccess, addCommentToState, categorySuccess, createBlogSuccess 
} = blogSlice.actions;

export default blogSlice.reducer;