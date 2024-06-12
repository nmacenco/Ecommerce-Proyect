import axios from "axios";
import { Dispatch } from "redux";
import { RESET_PASSWORD } from "../../components/users/forgotPassword/ResetForgotPasswords";
import { PWD } from "../../components/users/changePassword/ResetPwd";
import { TYPES_USER} from "../interface";
import swal from "sweetalert";
const URL_USER = "/api";
const URLRESET = "/api/forgotPasswordReset";
const URLRESET2 = "/api/submitPasswordReset";
const URLVALIDATE = "/api/activateAccount/";

const USER_STORAGE = "USER_LOGGED";

const defaultCb = (error: any) => {
  alert(error);
};

/**
 *
 * @param user  ,{ name, surname, email, password, CountryId }
 * @param cb function callback
 * @returns promise<any>
 */
export const CreateUser = (user: any, cb: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(URL_USER + "/signUp", user);
      const data = response.data;

      if (data.errorMsg) {
        return alert("Something happened");
      }

      dispatch({
        type: TYPES_USER.CREATE_USER,
        payload: {},
      });
      cb(user);

    } catch (error) {
      swal({
        title: "Wrong data",
        text: "This email ir already taken.",
        icon: "warning",
        dangerMode: true,
        buttons: {
          confirm: true,
        },
      });
    }
  };
};

/**
 *
 * @param email email of user
 * @param pass  password of user
 * @param cb callback
 * @returns promise<any>
 */

export const GetUSer = (email: string, pass: string, cb = defaultCb) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(URL_USER + "/signIn", {
        email,
        password: pass,
      });
      const TOKEN = response.headers["auth-token"];
      
      if (response.status == 200) {
        dispatch({
          type: TYPES_USER.GET_USER,
          payload: {
            email,
            token: TOKEN,
            name: response.data.data.name,
            role: response.data.data.role,
            google: false,
          },
        });
        window.localStorage.setItem(
          USER_STORAGE,
          JSON.stringify({
            email,
            token: TOKEN,
            name: response.data.data.name,
            role: response.data.data.role,
            google: false,
          })
        );
        cb(null); 
      } else {
        cb(response.data.errorMsg);
      }
    } catch (error) {
      swal({
        title: "Wrong data",
        text: "Please try with a diferent email or password",
        icon: "warning",
        dangerMode: true,
        buttons: {
          cancel: true,
          confirm: true,
        },
      });
    }
  }
};

export const FindUSer = () => {
  const user = window.localStorage.getItem(USER_STORAGE);
  const userExist = user ? JSON.parse(user) : null;

  return {
    type: TYPES_USER.FIND_USER,
    payload: userExist,
  };
};

export const LogoutUser = () => {
  window.localStorage.removeItem(USER_STORAGE);

  return {
    type: TYPES_USER.LOGOUT_USER,
    payload: null,
  };
};

/**
 * Receive the email, name, surname and callback
 * @param user email,name,surname
 * @param cb callback
 * @returns
 */

export const RegisterWithGoogle = (user: any, cb = defaultCb) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(URL_USER + "/signUpWithGoogle", user);

      if (response.data.errorMsg) {
        throw new Error("Error in google: ", response.data.errorMsg);
      }

      const TOKEN = response.headers["auth-token"];

      if (response.status < 300) {
        const newUser = {
          name: user.name,
          email: user.email,
          token: TOKEN,
          role: response.data.data.role,
          google: true,
        };
        dispatch({
          type: TYPES_USER.GET_USER,
          payload: newUser,
        });
        //LO GUARADAMOS EN EL LOCAL STORAGE:
        window.localStorage.setItem(USER_STORAGE, JSON.stringify(newUser));

        cb(null); //ejecutamos el callback
      } else {
        cb(response.data.errorMsg);
      }
    } catch (error) {
      swal({
        title: "Wrong data",
        icon: "warning",
        dangerMode: true,
        buttons: {
          confirm: true,
        },
      });
    }
  };
};

/**
 * The function receive the user email for login with google
 * @param email string
 * @param cb callback
 */

export const LoginWithGoogle = (email: string, cb = defaultCb) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(URL_USER + "/signInWithGoogle", {
        email,
      });

      if (response.data.errorMsg) {
        cb(response.data.errorMsg);
        return null;
      }

      const TOKEN = response.headers["auth-token"];
      const USER = {
        name: response.data.data.name,
        role: response.data.data.role,
        token: TOKEN,
        email,
        google: true,
      };
      dispatch({
        type: TYPES_USER.SIGNIN_GOOGLE,
        payload: USER,
      });
      cb(null);
      //GUARDAR EN EL LOCAL STORAGE:
      window.localStorage.setItem(USER_STORAGE, JSON.stringify(USER));
    } catch (error) {
      swal({
        title: "Wrong data",
        text: "It seems you didn't register yet",
        icon: "warning",
        dangerMode: true,
        buttons: {
          confirm: true,
        },
      });
    }
  };
};

export const updateUser = (token: string, editUser: any) => {
  try {
    return async function (dispatch: Dispatch) {
      await axios.put(URL_USER + "/auth/users", editUser, {
        headers: {
          "auth-token": token,
        },
      });
    };
  } catch (error) {
    console.log("Error updating user", error);
  }
};

export const getSingleUser = (token: string) => {
  try {
    return async function (dispatch: Dispatch) {
      const user = await axios.get(URL_USER + "/auth/users", {
        headers: {
          "auth-token": token,
        },
      });

      return dispatch({
        type: TYPES_USER.GET_SINGLE_USER,
        payload: user.data.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = (password: PWD, token: string | any) => {
  try {
    return async (dispatch: Dispatch) => {
      await axios.put(URL_USER + "/auth/users/passwordReset", password, {
        headers: {
          "auth-token": token,
        },
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const forgotPasswordReset = (email: any) => {
  try {
    return async (dispatch: Dispatch) => {
      await axios.post(`${URLRESET}`, email);
    };
  } catch (error) {
    alert(error);
  }
};

export const resetForgotPassword = (id: any, password: RESET_PASSWORD) => {
  try {
    return async (dispatch: Dispatch) => {
      await axios.put(`${URLRESET2}/${id}`, password);
    };
  } catch (error) {
    alert(error);
  }
};
export const validateAccount = (id: any) => {
  try {
    return async (dispatch: Dispatch) => {
      await axios.get(`${URLVALIDATE}${id}`);
      swal({
        icon: "success",
        text: "Account validated."
      });
    };
    
  } catch (error) {
    alert(error);
  }
};
