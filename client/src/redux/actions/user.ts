import axios from "axios";
import { Dispatch } from "redux"
import { EDIT_USER } from "../../components/users/EditUserAccount";
import { TYPES_USER, User } from "../interface";
import {RESET_PASSWORD} from '../../components/users/ResetForgotPasswords'
import swal from "sweetalert";
const URL_USER = "http://localhost:3001/api";
const URLRESET = "http://localhost:3001/api/forgotPasswordReset"
const URLRESET2 = "http://localhost:3001/api/submitPasswordReset"
const USER_STORAGE = "USER_LOGGED";
export const CreateUser=(user:any,cb:any)=>{
    return async(dispatch:Dispatch)=>{
        try{
            // console.log(URL_USER + "/signUp");
            const response = await axios.post(URL_USER + "/signUp", user);
            // if(data.error){
            //     throw new Error("Error "+data.error);
            // }
            const data=response.data;
            // console.log(response.headers);
            // console.log('data: ',data);
            if(data.errorMsg){
               return  alert('ALgo paso!');
            }

            const newUser={
                    name:user.name,
                    email:user.email,
                    token:response.headers['auth-token']
                }
                console.log(response);
                
            dispatch({
                type: TYPES_USER.CREATE_USER,
                payload: newUser
            })
            // console.log('despachando el usuario');
            cb();

            window.localStorage.setItem(USER_STORAGE,JSON.stringify({...newUser ,  name : response.data.data.name , role : response.data.data.role }));// Cambiar cuando exista un usuario


        } catch (error) {
            swal({
                title: "Wrong data",
                text: "This email ir already taken!",
                icon: "warning",
                dangerMode: true,
                buttons: {
                  cancel: true,
                  confirm: true,
                },
            })

        }
    }
}


export const GetUSer = (email: string, pass: string , cb :any ) => {

    return async (dispatch: Dispatch) => {

        try {

            const response = await axios.post(URL_USER + "/signIn", {
                email,
                password: pass,
            });
            const TOKEN = response.headers["auth-token"];
            // console.log('TOKEN: ',TOKEN);
            console.log(response.data.data);
            if(response.status==200){
                dispatch({
                    type: TYPES_USER.GET_USER,
                    payload: {
                        email,
                        token: TOKEN ,
                        name : response.data.data.name , 
                        role : response.data.data.role
                    }
                })
                window.localStorage.setItem(
                  USER_STORAGE,
                  JSON.stringify({email,token:TOKEN , name : response.data.data.name , role : response.data.data.role })
                );
                cb();//Ejecutamos un callback wajajaj
            } 
        }catch(error){
            swal({
                title: "Wrong data",
                text: "The email is not in data base!",
                icon: "warning",
                dangerMode: true,
                buttons: {
                  cancel: true,
                  confirm: true,
                },
              })
        }

    }

}

export const FindUSer = () => {

    const user= window.localStorage.getItem(USER_STORAGE);
    const userExist= user ? JSON.parse(user) : null;
    // console.log(userExist);
    
    return {
        type: TYPES_USER.FIND_USER,
        payload: userExist
    }
}

export const LogoutUser = () => {

    // console.log(window.localStorage.getItem(USER_STORAGE));
    window.localStorage.removeItem(USER_STORAGE);

    return {
        type: TYPES_USER.LOGOUT_USER,
        payload: null,
    };
}

let url = "/signInWithGoogle";
export const IdentGoogle = (url: string, cb: any) => {

    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(URL_USER + url);

            if (response.data.errorMsg) {
                throw new Error("Error in google: ", response.data.errorMsg);
            }

            const TOKEN = response.headers["auth-token"];
            // console.log('TOKEN HEADERS: ', TOKEN);
            // console.log('Data: ', response.data);

            dispatch({
                type: TYPES_USER.GET_USER,
                payload: response.data.data
            })

            cb()//ejecutamos el callback

        } catch (error) {
            console.log("Error en sig in google: ", error);
        }
    }
}

export const updateUser = (token: string, editUser: any) => {
    try {
        // console.log(editUser)
        return async function (dispatch: Dispatch) {
            await axios.put(URL_USER + "/auth/users", editUser, {
                headers: {
                    "auth-token": token
                },
            })
        }
    } catch (error) {
        console.log("Error updating user", error)
    }
}

export const getSingleUser = (token: string) => {
    try {
        return async function (dispatch: Dispatch) {
            const user = await axios.get(URL_USER + "/auth/users", {
                headers: {
                    "auth-token": token
                }
            })
            // console.log(user.data.data);
            
            return dispatch({
                type: TYPES_USER.GET_SINGLE_USER,
                payload: user.data.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}


export const forgotPasswordReset = (email : any ) => {
    // console.log(UserToUpdate);
    try {
      return async (dispatch: Dispatch) => {
         await axios.post(`${URLRESET}`, email);
      };
    } catch (error) {
      alert(error);
    }
  };

export const resetPassword = ( id : any , password : RESET_PASSWORD ) => {
    // console.log(UserToUpdate);
    
    try {
      return async (dispatch: Dispatch) => {
         await axios.put(`${URLRESET2}/${id}`, password );
      };
    } catch (error) {
      alert(error);
    }
  };