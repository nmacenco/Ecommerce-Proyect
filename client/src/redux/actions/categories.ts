import axios from "axios";
import { Dispatch } from "redux";
import { FORM_SUB } from "../../components/admin/categoriesAdmin/create/CreateCategories";

import { Category, TYPES_CATEGORIES } from "../interface";

const URL = "/api";

export function getCategories() {
  return async function (dispatch: Dispatch) {
    const categories = await axios.get(URL + "/categories");

    return dispatch({
      type: TYPES_CATEGORIES.GET_CATEGORIES,
      payload: categories.data.data,
    });
  };
}
export function getSubcategories() {
  return async function (dispatch: Dispatch) {
    const subcategories = await axios.get(URL + "/subcategories");

    return dispatch({
      type: TYPES_CATEGORIES.GET_SUBCATEGORIES,
      payload: subcategories.data.data,
    });
  };
}

export function createCategories(category: Category, token: string) {
  return async function (dispatch: Dispatch) {
    await axios.post(URL + "/admin/categories", category, {
      headers: {
        'auth-token': token
      }
    })
  }
}

export function createSubcategories(subcategory: FORM_SUB, token: string) {
  return async function (dispatch: Dispatch) {
    await axios.post(URL + "/admin/subcategories", subcategory, {
      headers: {
        'auth-token': token
      }
    })
  }
}

export const resetSubcategories = () => {
  try {
    return ({
      type: TYPES_CATEGORIES.RESET_SUBCATEGORIES,
      payload: []
    });
  } catch (error) {
    alert(error);
  }
};

export const deleteCategory = (id: string, token: string) => {
  try {
    return async function (dispatch: Dispatch) {
      await axios.delete(URL + `/admin/categories/${id}`, {
        headers: {
          'auth-token': token
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const deleteSubcategory = (id: string, token: string) => {
  try {
    return async function (dispatch: Dispatch) {
      console.log(id)
      await axios.delete(URL + `/admin/subcategories/${id}`, {
        headers: {
          'auth-token': token
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}