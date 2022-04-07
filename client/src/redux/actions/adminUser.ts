import axios from "axios";
import { Dispatch } from "redux";
import { TYPES_ADMIN_USER, USERSAXIOSDATA } from "../interface";

const URL = "http://localhost:3001/api/admin/users";

export const adminGetUsers = () => {
  try {
    return async (dispatch: Dispatch) => {
      const allUsers = await axios.get(`${URL}`, {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjQ5MjkyODczfQ.nPKDcQG-Rfl6zEwNqabYt5Ap2EpBlhZuLvmgHxVzMO8",
        },
      });

      return dispatch({
        type: TYPES_ADMIN_USER.GET_USERS,
        payload: allUsers.data.users,
      });
    };
  } catch (error) {
    alert(error);
  }
};
export const adminEditUser = () => {
  try {
    return async (dispatch: Dispatch) => {
      const allUsers = await axios.get(`${URL}`, {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjQ5MjkyODczfQ.nPKDcQG-Rfl6zEwNqabYt5Ap2EpBlhZuLvmgHxVzMO8",
        },
      });

      return dispatch({
        type: TYPES_ADMIN_USER.GET_USERS,
        payload: allUsers.data.users,
      });
    };
  } catch (error) {
    alert(error);
  }
};
