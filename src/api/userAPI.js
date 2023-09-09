import {baseURL} from './constants';

export const userAPI = () => {
  const accessToken = localStorage.getItem('access_token');

  const signUp = async (userParams) => {
    return fetch(`${baseURL}/users/signup`, {
      method: 'POST',
      body: JSON.stringify(userParams),
    });
  };

  const login = async ({email, password}) => {

    return fetch(`${baseURL}/users/login`, {
      method: 'POST',
      body: JSON.stringify({email, password}),
    });
  };

  const logout = async () => {

    return fetch(`${baseURL}/users/logout`, {
      method: 'POST',
      headers: {
        Authorization: accessToken,
      },
    });
  };

  const getCurrentUser = async () => {

    return fetch(`${baseURL}/users/current`, {
      headers: {
        Authorization: accessToken,
      },
    });
  };

  return {
    signUp,
    login,
    logout,
    getCurrentUser,
  };
};
