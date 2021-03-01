import baseUrl from '../baseUrl';
import authApi from './authApi';

const fetchUsers = async () => {
  let jwt;
  if (authApi.isAuthenticated()) jwt = authApi.isAuthenticated();
  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (response.status === 401) {
      authApi.clearJWT();
      const error = new Error('Unauthorized!');
      error.success = false;
      throw error;
    }
    return await response.json();
  } catch (err) {
    return err;
  }
};

const fetchUser = async (userId) => {
  let jwt;
  if (authApi.isAuthenticated()) jwt = authApi.isAuthenticated();
  try {
    const response = await fetch(`${baseUrl}/users/profile/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (response.status === 401) {
      authApi.clearJWT();
      const error = new Error('Unauthorized!');
      error.success = false;
      throw error;
    }
    return await response.json();
  } catch (err) {
    return err;
  }
};

const updateUser = async (user, userId) => {
  let jwt;
  if (authApi.isAuthenticated()) jwt = authApi.isAuthenticated();

  try {
    const response = await fetch(`${baseUrl}/users/admin/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(user),
    });
    if (response.status === 401) {
      authApi.clearJWT();
      const error = new Error('Unauthorized!');
      error.success = false;
      throw error;
    }
    return await response.json();
  } catch (err) {
    return err;
  }
};

const deleteUser = async (userId) => {
  let jwt;
  if (authApi.isAuthenticated()) jwt = authApi.isAuthenticated();
  try {
    const response = await fetch(`${baseUrl}/users/profile/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (response.status === 401) {
      authApi.clearJWT();
      const error = new Error('Unauthorized!');
      error.success = false;
      throw error;
    }
    return await response.json();
  } catch (err) {
    return err;
  }
};

const uploadProfileImage = async (file, userId) => {
  console.log('userId in uploadProfileImage', userId);
  let jwt;
  if (authApi.isAuthenticated()) jwt = authApi.isAuthenticated();

  const fd = new FormData();
  fd.append('imageFile', file, file.name);

  try {
    const response = await fetch(`${baseUrl}/users/uploadImage/${userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: fd,
    });
    if (response.status === 401) {
      authApi.clearJWT();
      const error = new Error('Unauthorized!');
      error.success = false;
      throw error;
    }
    return await response.json();
  } catch (err) {
    return err;
  }
};
export default {
  fetchUsers,
  fetchUser,
  updateUser,
  deleteUser,
  uploadProfileImage,
};