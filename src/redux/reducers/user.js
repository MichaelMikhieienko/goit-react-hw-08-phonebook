// index.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {userAPI} from '../../api/userAPI';

const initialState = {
  isAuth: false,
  userParams: null,
};

export const getCurrentUser = createAsyncThunk(
  'user/current',
  async (params, {getState}) => {
    const response = await userAPI().getCurrentUser();
    if (response.status >= 400) {
      return Promise.reject(response.statusMessage);
    }

    return response.json();
  },
);

export const login = createAsyncThunk(
  'user/login',
  async (userParams) => {
    const response = await userAPI().login(userParams);
    if (response.status >= 400) {
      return Promise.reject(response.statusMessage);
    }

    return response.json();
  },
);

export const signup = createAsyncThunk(
  'user/signup',
  async (userParams) => {
    const response = await userAPI().signUp(userParams);
    if (response.status >= 400) {
      return Promise.reject(response.statusMessage);
    }

    return response.json();
  },
);

export const logout = createAsyncThunk(
  'user/loguot',
  async () => {
    await userAPI().logout();
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.userParams = action.payload.user;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isAuth = false;
        state.userParams = null;
      });

    builder.addCase(signup.fulfilled, (state, action) => {
      localStorage.setItem('access_token', action.payload.token);

      state.isAuth = true;
      state.userParams = action.payload.user;
    });

    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('access_token', action.payload.token);
        state.isAuth = true;
        state.userParams = action.payload.user;

      })
      .addCase(login.rejected, (state, action) => {
        state.isAuth = false;
      });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuth = false;
      state.userParams = null;
    });
  },
});

export default userSlice.reducer;
