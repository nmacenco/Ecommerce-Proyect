
import { Product, TYPES_PRODUCT } from "../interface";

export const chargeFilter = (value: Product[]) => {
  try {
    return ({
      type: TYPES_PRODUCT.CHARGE_FILTERS,
      payload: value
    })
  } catch (error) {
    alert(error);
  }
}

export const removeFilter = (event: string) => {
  try {
    return ({
      type: TYPES_PRODUCT.REMOVE_FILTER,
      payload: event
    })
  } catch (error) {
    alert(error);
  }
}

export const filterProducts = (event: string) => {
  try {
    return ({
      type: TYPES_PRODUCT.FILTERED_CAT_PRODUCTS,
      payload: event
    });
  } catch (error) {
    alert(error);
  }
};
export const resetFilterProducts = () => {
  try {
    return ({
      type: TYPES_PRODUCT.RESET_FILTERED_PRODUCTS,
      payload: []
    });
  } catch (error) {
    alert(error);
  }
};

export const searchProducts = (productName: string) => {

  return {
    type: TYPES_PRODUCT.SEARCH_PRODUCTS,
    payload: productName
  }

}