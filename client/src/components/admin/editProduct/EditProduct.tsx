import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";
import { useLocalStorage } from "../../../helpers/useLocalStorage";
import { putProducts } from "../../../redux/actions/admin";
import { getBrands } from "../../../redux/actions/brands";
import {
  getCategories,
  getSubcategories,
} from "../../../redux/actions/categories";
import { resetFilterProducts } from "../../../redux/actions/filterByCategory";
import { getProductDetail } from "../../../redux/actions/productDetail";
import { resetPoducts } from "../../../redux/actions/products";
import { ProductForm, Subcategory } from "../../../redux/interface";
import { State } from "../../../redux/reducers";
import { errorsCheck } from "../createProduct/validations";
import { EditContainer, Textarea } from "./EditProductStyles";

export default function EditProduct(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productDetail = useSelector((state: State) => state.productDetail);
  const brands = useSelector((state: State) => state.brands.brands);
  const categories = useSelector((state: State) => state.categories.categories);
  const subcategories = useSelector(
    (state: State) => state.categories.subcategories
  );
  const { id } = useParams<string>();
  const [brandSelected, setBrandSelected] = useState<Boolean>(false);
  const [subcategorySelected, setSubcategorySelected] = useState<Boolean>(
    false
  );
  const [subcategoriesFiltered, setSubcategoriesFiltered] = useState<
    Subcategory[]
  >([]);
  const [editProduct, setEditProduct] = useState<ProductForm>({
    name: productDetail.name,
    image: productDetail.image,
    price: productDetail.price,
    description: productDetail.description,
    weight: productDetail.weight,
    stock: productDetail.stock,
    soldCount: productDetail.soldCount,
    BrandId: productDetail.BrandId,
    SubcategoryId: productDetail.SubcategoryId,
  });
  const [errorsList, setErrorsList] = useState<any>(false)
  const [userInStorage , setuserInStorage] = useLocalStorage('USER_LOGGED','')

  useEffect(() => {
    dispatch(getProductDetail(id));
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getSubcategories());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    if (e.target.name == "BrandId") setBrandSelected(true);
    if (e.target.name == "SubcategoryId") setSubcategorySelected(true);
    setEditProduct({
      ...editProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    const subcategoriesFiltered = subcategories.filter(
      (s: Subcategory) => Number(s.CategoryId) == Number(e.target.value)
    );
    setSubcategoriesFiltered(subcategoriesFiltered);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let errors = errorsCheck(editProduct);
    setErrorsList(errors)
    if (errors === false) {
      dispatch(putProducts(editProduct, id , userInStorage.token));
      swal({
        title: "Product edited successfully.",
        icon: "success",
        buttons: {
          confirm: true,
        },
      }).then((value) => {
        if (value) {
          dispatch(resetFilterProducts())
          dispatch(resetPoducts())
          navigate("/products")
        }
      })
    } else {
      swal({
        title: "Complete the form properly.",
        icon: "error"
      })
    }
  };

  return (
    <EditContainer>
      <form onSubmit={handleSubmit}>
        <h3 className="text-center">Edit Product</h3>
        <p className="text-center mt-4">{productDetail.name}</p>
        <div className="form-group">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="staticEmail"
            name="name"
            placeholder="Enter name"
            onChange={(e) => handleChange(e)}
            value={editProduct.name}
          />
          <p className="text-danger">{errorsList.name ? errorsList.name : "⠀"}</p>
        </div>
        <div className="form-group me-1">
          <label className="form-label mt-4">Brand</label>
          <select
            className="form-select"
            name="BrandId"
            onChange={(e) => handleChange(e)}
          >
            <option hidden>Select brand</option>
            {brands.map((brand) => {
              return (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              );
            })}
          </select>
          {!brandSelected ? (
            <p className=" mt-2 fs-5">
              Current brand: {productDetail.brand}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label mt-4">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="image"
            placeholder="Enter image URL"
            onChange={(e) => handleChange(e)}
            value={editProduct.image}
          />
          <p className="text-danger">{errorsList.image ? errorsList.image : "⠀"}</p>
        </div>
        <div className="form-group">
          <label htmlFor="exampleTextarea" className="form-label mt-4">
            Description
          </label>
          <Textarea
            className="form-control"
            id="exampleTextarea"
            name="description"
            placeholder="Enter description"
            onChange={(e) => handleChange(e)}
            value={editProduct.description}
          />
          <p className="text-danger">{errorsList.description ? errorsList.description : "⠀"}</p>
        </div>
        <div className="d-flex">
          <div className="form-group flex-fill">
            <label className="form-label mt-4">Category</label>
            <select className="form-select" onChange={(e) => handleCategory(e)}>
              <option>Select category</option>
              {categories.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group flex-fill ms-2">
            <label className="form-label mt-4">Subcategory</label>
            <select
              className="form-select"
              onChange={(e) => handleChange(e)}
              name="SubcategoryId"
            >
              <option>Select subcategory</option>
              {subcategoriesFiltered.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
            {!subcategorySelected ? (
              <p className=" mt-2 fs-5">
                Current subcategory: {productDetail.subcategory}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className="form-group mr-1 mr-md-2">
            <label htmlFor="exampleTextarea" className="form-label mt-4">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleTextarea"
              name="price"
              placeholder="Enter price"
              onChange={(e) => handleChange(e)}
              value={editProduct.price}
            />
            <p className="text-danger">{errorsList.price ? errorsList.price : "⠀"}</p>
          </div>
          <div className="form-group mx-2 mx-md-3">
            <label htmlFor="exampleTextarea" className="form-label mt-4">
              Weight
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleTextarea"
              name="weight"
              placeholder="Enter weight"
              onChange={(e) => handleChange(e)}
              value={editProduct.weight}
            />
            <p className="text-danger">{errorsList.weight ? errorsList.weight : "⠀"}</p>
          </div>
          <div className="form-group ml-1 ml-md-2">
            <label htmlFor="exampleTextarea" className="form-label mt-4">
              Stock
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleTextarea"
              name="stock"
              placeholder="Enter stock number"
              onChange={(e) => handleChange(e)}
              value={editProduct.stock}
            />
            <p className="text-danger">{errorsList.stock ? errorsList.stock : "⠀"}</p>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-outline-primary mt-5 ">
            Submit
          </button>
        </div>
      </form>
    </EditContainer>
  );
}
