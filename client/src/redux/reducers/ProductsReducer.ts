import HashTable from "../../helpers/hashTable";
import { Product, ProductActions, TYPES_PRODUCT } from "../interface";

export interface PRODUCTS {
  products: Product[];
  copyProducts: Product[];
  productSearch: any;
  not_found: boolean;
  wishList: any[];
}

const INITIAL_STATE = {
  products: [],
  copyProducts: [],
  productSearch: [],
  not_found: false,
  wishList: [],
};

export const reducerProduct = (
  state: PRODUCTS = INITIAL_STATE,
  action: ProductActions
): PRODUCTS => {
  switch (action.type) {
    case TYPES_PRODUCT.GET_PRODUCTS:
      const newTable = new HashTable();

      action.payload.forEach((product) => {
        // console.log("ADD ITEM",product.name);
        if (product.isActive === true && product.stock > 0) {
          newTable.addItem(product.name);
        }
      });
      // console.log("La hastable es: ", newTable);

      const active = action.payload.sort(function (
        a: Product,
        b: Product
      ) {
        if (a.isActive < b.isActive) return 1;
        if (a.isActive > b.isActive) return -1;
        return 0;
      })
      return {
        ...state,
        products: active,
        copyProducts: active,
        productSearch: newTable,
      };

    case TYPES_PRODUCT.RESET_PRODUCTS:
      return {
        ...state,
        products: state.copyProducts
      };
    case TYPES_PRODUCT.FILTERED_PRODUCTS:
      let allProducts: Product[] = state.products;
      const filteredProducts = allProducts.filter(
        (product) => product.subcategory === action.payload
      );
      return {
        ...state,
        products: filteredProducts,
      };
    case TYPES_PRODUCT.FILTER_BY_BRAND:
      let allProduct: Product[] = state.products;

      const filteredByBrand = allProduct.filter(
        (product) => product.brand === action.payload
      );
      return {
        ...state,
        products: filteredByBrand,
      };
    case TYPES_PRODUCT.SEARCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case TYPES_PRODUCT.PRODUCT_NOT_FOUND:
      return {
        ...state,
        not_found: action.payload,
      };

    case TYPES_PRODUCT.GET_WISHES:
      return {
        ...state,
        wishList: action.payload,
      };
    case TYPES_PRODUCT.CREATE_WISHE:
      const newWish = state.products.find(
        (product) => product.id == action.payload
      );
      console.log("PRODUCTS");
      return {
        ...state,
        wishList: state.wishList.concat(newWish),
      };

    case TYPES_PRODUCT.DELETE_WISHE:
      //
      // console.log(
      //   state.wishList.filter((wish) => wish.id !== Number(action.payload))
      // );
      return {
        ...state,
        wishList: [
          ...state.wishList.filter(
            (wish) => wish.id !== Number(action.payload)
          ),
        ],
      };

    default: {
      return {
        ...state,
      };
    }
  }
};
