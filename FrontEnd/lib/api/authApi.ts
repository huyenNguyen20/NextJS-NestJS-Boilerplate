import baseUrl from "../baseUrl";
/**
 * Authentication API
 */
const signup = async (user) => {
  try {
    const response = await fetch(`${baseUrl}/auth/local/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const login = async (user) => {
  try {
    const response = await fetch(`${baseUrl}/auth/local/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.status === 401) {
      const error = new Error("Unauthorized!");
      error.success = false;
      throw error;
    }
    return await response.json();
  } catch (err) {
    return err;
  }
};



const logout = async () => {
  try {
    const response = await fetch(`${baseUrl}/auth/logout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    clearJWT();
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const clearJWT = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    document.cookie = "nest-cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  }
};
/**
 * JWT retrieval and storage
 */
const authenticate = async (jwt, cb) => {
  if (typeof window !== "undefined") {
    await localStorage.setItem("jwt", JSON.stringify(jwt));
    cb();
  }
};

const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  if (
    localStorage.getItem("jwt") &&
    JSON.parse(localStorage.getItem("jwt")) !== undefined
  ) {
    return JSON.parse(localStorage.getItem("jwt"));
  }
  return false;
};



/**
 * Send Confirmation Email
 */
const sendConfirmEmail = async (userId) => {
  try {
    const response = await fetch(
      `${baseUrl}/email/sendConfirmEmail/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 401) {
      const error = new Error(
        "Unauthorized. Please log into your account to continue."
      );
      error.success = false;
      throw error;
    }
    return await response.json();
  } catch (err) {
    return err;
  }
};

/**
 * Reset Password API
 */
const sendResetPasswordEmail = async (email) => {
  try {
    const response = await fetch(`${baseUrl}/email/resetPassword`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return await response.json();
  } catch (err) {
    return err;
  }
};

const sendNewPassword = async (password, email) => {
  try {
    const response = await fetch(
      `${baseUrl}/email/resetPassword/password`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
      }
    );
    return await response.json();
  } catch (err) {
    return err;
  }
};

export default {
  signup,
  login,
  authenticate,
  isAuthenticated,
  logout,
  clearJWT,
  sendConfirmEmail,
  sendResetPasswordEmail,
  sendNewPassword,
};
