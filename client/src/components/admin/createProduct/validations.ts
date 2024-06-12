import { ProductForm } from "../../../redux/interface";

 export interface Errors {
  name: string;
  BrandId: string;
  image: string;
  description: string;
  subcategory: string;
  weight: string;
  price: string;
  stock: string;
}

export function errorsCheck(props: ProductForm): Errors | Boolean{
  let errors: Errors = {
    name: "",
    BrandId: "",
    image: "",
    description: "",
    subcategory: "",
    weight: "",
    price: "",
    stock: "",
  };
  let flag: boolean = false;

  //NAME
  if (!props.name) {
    flag = true;
    errors.name = "Name required.";
  }

  //BRAND
  if (!props.BrandId) {
    flag = true;
    errors.BrandId = "Brand required.";
  }

  //IMAGE
  if (!props.image) {
    flag = true;
    errors.image = "Image required.";
  }

  //DESCRIPTION
  if (!props.description) {
    flag = true;
    errors.description = "Description required.";
  }

  //WEIGHT
  if (!props.weight || props.weight <= 0) {
    flag = true;
    errors.weight = "Weight required.";
  }

  //price
  if (!props.price || props.price <= 0) {
    flag = true;
    errors.price = "price required.";
  }
  if (props.price > 99999) {
    flag = true;
    errors.price = "Max price is $100.000.";
  }

  //price
  if (!props.SubcategoryId) {
    flag = true;
    errors.subcategory = "Subcategory required.";
  }

  //STOCK
  if (!props.stock || props.stock < 1) {
    flag = true;
    errors.stock = "Stock required.";
  }

  let errorsCheckResult: boolean | Errors = false;

  if (flag) errorsCheckResult = errors;

  return errorsCheckResult;
}
