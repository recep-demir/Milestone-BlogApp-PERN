import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState:{
    currentUser: null,
    loading: false,
    error: false,
    token: null,
    userId: null,
    email: null,
  },
  reducers: {
    fetchStart: state => {
      state.loading = true;
      state.error = false;
    },
    fetchFail: state => {
      state.loading = false;
      state.error = true;
    },
    registerSuccess: (state,{payload}) =>{
      state.loading= false;
      // DİKKAT: payload.data yerine payload.result olabilir backend yapına göre
      state.currentUser = payload.result.username;
      state.userId = payload.result.id; // id yerine id
      state.email = payload.result.email;
      state.token = payload.token;
    },
    loginSuccess:(state,{payload})=>{
      state.token = payload?.token;
      state.currentUser = payload?.user?.username;
      console.log("autslicadaki curentuser",state.currentUser);
      state.userId = payload?.user?.id; // id yerine id yaptık
      console.log("userId autslic",state.userId);
      state.email = payload?.user?.email;
      state.loading = false;
    },
    logoutSuccess: (state) => {
      state.loading= false;
      state.token = null;
      state.currentUser = null;
      state.userId = null;
    },
  },
});

export const {
    fetchStart,
    fetchFail,
    registerSuccess,
    loginSuccess,
    logoutSuccess,
  } = authSlice.actions;
export default authSlice.reducer;