export enum TYPES_USER {
  CREATE_USER,
  GET_USER,
  LOGOUT_USER,
  FIND_USER,
  SIGNIN_GOOGLE = "SIGNIN_GOOGLE",
  SIGNUP_GOOGLE = "SIGNUP_GOOGLE=",
  GET_SINGLE_USER = "GET_SINGLE_USER",
}
export enum TYPES_ADMIN_USER {
  GET_USERS = "GET_USERS",
  RESET_USERS = "RESET_USERS",
  UPDATE_USER = "UPDATE_USER",
}

export enum TYPES_DETAIL {
  PRODUCT_DETAIL = "PRODUCT_DETAIL",
  DELETE_PRODUCT_DETAIL = "DELETE_PRODUCT_DETAIL",
  CREATE_QUESTION = "CREATE_QUESTION",
  CREATE_REWIE = "CREATE_REWIE",
  UPDATE_QUESTION = "UPDATE_QUESTION",
}

export enum TYPES_ADMIN {
  DELETE_PRODUCTS = "DELETE_PRODUCTS",
  GET_ORDERS = "GET_ORDERS",
  RESET_ORDERS = 'RESET_ORDERS',
  O_ORDERS = 'O_ORDERS'
}

export enum TYPES_CATEGORIES {
  GET_CATEGORIES = "GET_CATEGORIES",
  GET_SUBCATEGORIES = "GET_SUBCATEGORIES",
  RESET_SUBCATEGORIES = "RESET_SUBCATEGORIES",
}

export enum TYPES_BRANDS {
  GET_BRANDS = "GET_BRANDS",
}
export enum TYPES_PAGE {
  SET_PAGE = "SET_PAGE",
}

export enum TYPES_PRODUCT {
  DELETE_WISHE = "DELETE_WISHE",
  CREATE_WISHE = "CREATE_WISHE",
  GET_WISHES = "GET_WISHES",
  SEARCH_PRODUCTS = "SEARCH_PRODUCTS",
  GET_PRODUCTS = "GET_PRODUCTS",
  ORDER_PRODUCTS = "ORDER_PRODUCTS",
  // CHARGE_FILTERS = "CHARGE_FILTERS",
  // REMOVE_FILTER = "REMOVE_FILTER",
  // FILTERED_CAT_PRODUCTS = "FILTERED_CAT_PRODUCTS",
  // FILTERED_BRAND_PRODUCTS = "FILTERED_BRAND_PRODUCTS",
  RESET_FILTERED_PRODUCTS = "RESET_FILTERED_PRODUCTS",
  RESET_PRODUCTS = "RESET_PRODUCTS",
  PRODUCT_NOT_FOUND = "PRODUCT_NOT_FOUND",
  FILTER_BY_BRAND = "FILTER_BY_BRAND",
  FILTERED_PRODUCTS = "FILTERED_PRODUCTS",
}

export enum TYPES_CART {
  ADD_PRODUCT = "ADD_PRODUCT",
  REMOVE_PRODUCT = "REMOVE_PRODUCT",
  CLEAR_CART = "CLEAR_CART",
  GET_ACTIVEORDER = "GET_ACTIVEORDER",
}

export enum TYPES_COUNTRIES {
  GET_COUNTRIES = "GET_COUNTRIES",
}

export enum TYPES_ORDERS_USER {
  GET_ORDERS = "GET_ORDERS_USER",
  GET_ORDER = 'GET_ORDER_USER',
  RESET_ORDER = 'RESET_ORDER'
}

//=======================
// Objects Interfaces

export type Page = number;

// dicson fijate si este User te sirve si no borralo por fa, se usa en una action por eso no lo borro

export interface User {
  name: string;
  lastName: string;
  password: string;
  email: string;
  token: string;
  role: string;
}

export interface Users {
  CountryId: number;
  countryCode: string;
  country: string;
  email: string;
  id: number;
  name: string;
  surname: string;
  password: string;
  billing_address: string;
  default_shipping_address: string;
  role: string;
  isActive: boolean;
  tokens: string[];
  needsPasswordReset: boolean;
}

export interface ProductCart {
  productId?: number;
  productName: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
}

export interface ProductForm {
  id?: number;
  name: string;
  price: number;
  description: string;
  image: string;
  weight: number;
  stock: number;
  soldCount: number;
  SubcategoryId: number;
  BrandId: number;
}

export interface Brand {
  name: string;
  id: number;
}

export interface Product {
  SubcategoryId: number;
  id?: number;
  name: string;
  image: string;
  price: number;
  description: string;
  weight: number;
  stock: number;
  soldCount: number;
  BrandId: number;
  brand: string;
  subcategory: string;
  CategoryId: number;
  category: number;
  quantity: number;
  questions: any[];
  reviews: any[];
  isActive: boolean;
}
export interface Order {
  id: number;
  total_amount: number;
  email_address: string;
  status: string;
  user: string;
  shipping_address: string;
  paidAt: string;
  details: any[];
  userID: number;
}

export interface Question {
  id?: number;
  title: string;
  description: string;
  answer: string;
}
export interface Rewie {
  id?: number;
  title: string;
  description: string;
  ProductId: number;
}

export interface Category {
  id?: number;
  name: string;
}
export interface Subcategory {
  id?: number;
  name: string;
  CategoryId: number;
}

export interface Data_Paginate {
  selected: number;
}

export interface FILTER_BOX {
  subcategory: string;
  brand: string;
}

export interface IData {
  length: number;
  page: (numberOfPage: number) => void;
}

export interface ICountries {
  name: string;
  code: string;
  id: number;
}

export interface IUser_Detail {
  name: string;
  surname: string;
  email: string;
  billing_address: string;
  default_shipping_address: string;
  country: string;
  countryCode: number;
}

//=======================
// User Actions

export interface CREATE_USER {
  type: TYPES_USER.CREATE_USER;
  payload: User;
}
export interface GET_USER {
  type: TYPES_USER.GET_USER;
  payload: User;
}
export interface LOGOUT_USER {
  type: TYPES_USER.LOGOUT_USER;
  payload: null;
}
export interface FIND_USER {
  type: TYPES_USER.FIND_USER;
  payload: User;
}
export interface GET_SINGLE_USER {
  type: TYPES_USER.GET_SINGLE_USER;
  payload: any;
}
export interface SIGNUP_GOOGLE {
  type: TYPES_USER.SIGNUP_GOOGLE;
  payload: User;
}

export interface SIGNIN_GOOGLE {
  type: TYPES_USER.SIGNIN_GOOGLE;
  payload: User;
}

//=======================
// Countries Actions

export interface GET_COUNTRIES {
  type: TYPES_COUNTRIES.GET_COUNTRIES;
  payload: ICountries[];
}
// Admin User Actions

export interface ADMIN_USER {
  type: TYPES_ADMIN_USER.GET_USERS;
  payload: Users[];
}
export interface ADMIN_RESET_USER {
  type: TYPES_ADMIN_USER.RESET_USERS;
  payload: [];
}

//=======================
// Category Actions

export interface GET_CATEGORIES {
  type: TYPES_CATEGORIES.GET_CATEGORIES;
  payload: Category[];
}
export interface GET_SUBCATEGORIES {
  type: TYPES_CATEGORIES.GET_SUBCATEGORIES;
  payload: Subcategory[];
}
export interface RESET_SUBCATEGORIES {
  type: TYPES_CATEGORIES.RESET_SUBCATEGORIES;
  payload: Subcategory[];
}

//======================
//Brands Actions

export interface GET_BRANDS {
  type: TYPES_BRANDS.GET_BRANDS;
  payload: Brand[];
}
//======================
//Page Actions

export interface SET_PAGE {
  type: TYPES_PAGE.SET_PAGE;
  payload: Page;
}

//====================
//Cart Actions
export interface ADD_PRODUCT {
  type: TYPES_CART.ADD_PRODUCT;
  payload: ProductCart;
}

export interface REMOVE_PRODUCT {
  type: TYPES_CART.REMOVE_PRODUCT;
  payload: ProductCart;
}

export interface CLEAR_CART {
  type: TYPES_CART.CLEAR_CART;
  payload: null;
}

//=====================
//Products Actions
export interface PRODUCT_DETAIL {
  type: TYPES_DETAIL.PRODUCT_DETAIL;
  payload: Product;
}

export interface ORDER_PRODUCTS {
  type: TYPES_PRODUCT.ORDER_PRODUCTS;
  //aca deberia ir un objeto con value(strinfg) y products(array de productos)
  payload: any;
}
export interface FILTER_PRODUCTS {
  type: TYPES_PRODUCT.FILTERED_PRODUCTS;
  //aca deberia ir un objeto con value(strinfg) y products(array de productos)
  payload: any;
}
// export interface CHARGE_FILTERS {
//   type: TYPES_PRODUCT.CHARGE_FILTERS;
//   payload: Product[];
// }
// export interface REMOVE_FILTER {
//   type: TYPES_PRODUCT.REMOVE_FILTER;
//   payload: Product[];
// }
// export interface FILTERED_CAT_PRODUCTS {
//   type: TYPES_PRODUCT.FILTERED_CAT_PRODUCTS;
//   //aca deberia ir un objeto con value(strinfg) y products(array de productos)
//   payload: Product[];
// }
// export interface FILTERED_BRAND_PRODUCTS {
//   type: TYPES_PRODUCT.FILTERED_BRAND_PRODUCTS;
//   payload: Product[];
// }
export interface RESET_FILTERED_PRODUCTS {
  type: TYPES_PRODUCT.RESET_FILTERED_PRODUCTS;
  //aca deberia ir un objeto con value(strinfg) y products(array de productos)
  payload: Product[];
}
export interface FILTER_BY_BRAND {
  type: TYPES_PRODUCT.FILTER_BY_BRAND;
  //aca deberia ir un objeto con value(strinfg) y products(array de productos)
  payload: any;
}
export interface GET_PRODUCTS {
  type: TYPES_PRODUCT.GET_PRODUCTS;
  payload: Product[];
}

export interface GET_WISHES {
  type: TYPES_PRODUCT.GET_WISHES;
  payload: any[];
}
export interface CREATE_WISHE {
  type: TYPES_PRODUCT.CREATE_WISHE;
  payload: number;
}
export interface DELETE_WISHE {
  type: TYPES_PRODUCT.DELETE_WISHE;
  payload: number;
}

export interface RESET_PRODUCTS {
  type: TYPES_PRODUCT.RESET_PRODUCTS;
  payload: [];
}
export interface PRODUCT_NOT_FOUND {
  type: TYPES_PRODUCT.PRODUCT_NOT_FOUND;
  payload: boolean;
}

export interface SEARCH_PRODUCTS {
  type: TYPES_PRODUCT.SEARCH_PRODUCTS;
  payload: Product[];
}

export interface DELETE_PRODUCT_DETAIL {
  type: TYPES_DETAIL.DELETE_PRODUCT_DETAIL;
  payload: Product;
}

export interface CREATE_QUESTION {
  type: TYPES_DETAIL;
  payload: any;
}

export interface CREATE_REWIE {
  type: TYPES_DETAIL;
  payload: any;
}

export interface UPDATE_QUESTION {
  type: TYPES_DETAIL.UPDATE_QUESTION;
  payload: {
    id: number;
    answer: string;
  };
}

//======================
//Admin Actions
export interface DELETE_PRODUCT {
  type: TYPES_ADMIN.DELETE_PRODUCTS;
  payload: number;
}
export interface GET_ORDERS {
  type: TYPES_ADMIN.GET_ORDERS;
  payload: Order[];
}
export interface RESET_ORDERS {
  type: TYPES_ADMIN.RESET_ORDERS;
  payload: Order[];
}
export interface O_ORDERS {
  type: TYPES_ADMIN.O_ORDERS;
  payload: string
}

export interface GET_ACTIVEORDER {
  type: TYPES_CART.GET_ACTIVEORDER;
  payload: Order;
}

export interface GET_ORDERS_USER {
  type: TYPES_ORDERS_USER.GET_ORDERS;
  payload: Order[];
}
export interface GET_ORDER_USER {
  type: TYPES_ORDERS_USER.GET_ORDER;
  payload: Order;
}
export interface RESET_ORDER {
  type: TYPES_ORDERS_USER.RESET_ORDER;
  payload: {};
}


export interface AXIOSDATA {
  successMsg: string;
  data: Product[];
}
export interface USERSAXIOSDATA {
  successMsg: string;
  data: Users[];
}

export type Actions =
  | PRODUCT_DETAIL
  | DELETE_PRODUCT_DETAIL
  | CREATE_QUESTION
  | CREATE_REWIE
  | UPDATE_QUESTION;

export type UserActions =
  | SIGNIN_GOOGLE
  | SIGNUP_GOOGLE
  | CREATE_USER
  | GET_USER
  | LOGOUT_USER
  | FIND_USER
  | GET_SINGLE_USER;

export type AdminUserActions = ADMIN_USER | ADMIN_RESET_USER;

export type ProductActions =
  | GET_PRODUCTS
  | ORDER_PRODUCTS
  | FILTER_PRODUCTS
  // | CHARGE_FILTERS
  // | REMOVE_FILTER
  // | FILTERED_CAT_PRODUCTS
  // | FILTERED_BRAND_PRODUCTS
  | RESET_FILTERED_PRODUCTS
  | SEARCH_PRODUCTS
  | RESET_PRODUCTS
  | PRODUCT_NOT_FOUND
  | FILTER_BY_BRAND
  | GET_WISHES
  | CREATE_WISHE
  | DELETE_WISHE;

export type CategoriesActions =
  | GET_CATEGORIES
  | GET_SUBCATEGORIES
  | RESET_SUBCATEGORIES;

export type BrandsActions = GET_BRANDS;

export type AdminActions = DELETE_PRODUCT | GET_ORDERS | RESET_ORDERS | O_ORDERS;

export type SetPage = SET_PAGE;

export type CartActions = ADD_PRODUCT | REMOVE_PRODUCT | CLEAR_CART | GET_ACTIVEORDER;

export type CountriesActions = GET_COUNTRIES;


export type UserOrdersActions = GET_ORDERS_USER | GET_ORDER_USER | RESET_ORDER;