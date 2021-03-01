import authApi from "./authApi";
import baseUrl from "../baseUrl";

const fetchProfile = async (jwt = "") => {
  if(!jwt){
    if (authApi.isAuthenticated()) jwt = authApi.isAuthenticated();
  }
  try {
    const response = await fetch(`${baseUrl}/users/profile`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (response.status === 401) {
      authApi.clearJWT();
      const error = new Error("Unauthorized!");
      error.success = false;
      throw error;
    }
    return await response.json();
  } catch (err) {
    return err;
  }
};

const updateProfile = async (profile) => {
  let jwt;
  if (authApi.isAuthenticated()) jwt = authApi.isAuthenticated();
  try {
    const response = await fetch(`${baseUrl}/users/profile`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(profile),
    });
    if (response.status === 401) {
      authApi.clearJWT();
      const error = new Error("Unauthorized!");
      error.success = false;
      throw error;
    }
    return await response.json();
  } catch (err) {
    return err;
  }
};

const uploadProfileImage = async (file) => {
  let jwt;
  if (authApi.isAuthenticated()) jwt = authApi.isAuthenticated();

  const fd = new FormData();
  fd.append("imageFile", file, file.name);

  try {
    const response = await fetch(`${baseUrl}/users/profile/uploadImage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: fd,
    });
    if (response.status === 401) {
      authApi.clearJWT();
      const error = new Error("Unauthorized!");
      error.success = false;
      throw error;
    }
    return await response.json();
  } catch (err) {
    return err;
  }
};

export default {
  fetchProfile,
  updateProfile,
  uploadProfileImage,
};
