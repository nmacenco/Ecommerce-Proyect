import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router";
import { getProducts, orderProducts, productNotFound } from "../../../redux/actions/products";
import { Product } from "../../../redux/interface";
import { State } from "../../../redux/reducers";
import { ORDER } from "../Cards";
import { Select } from "./FilterStyles";

const Filter = ({ page, orders }: ORDER): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation()
  const user = useSelector((state: State) => state.user);
  const allProducts = useSelector((state: State) => state.products.products);
  // const filteredProducts = useSelector((state: State) => state.filteredProducts.filteredProducts);
  let counter: any[] = []
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  function handleSort(e: React.ChangeEvent<HTMLSelectElement>): void {
    e.preventDefault();
    dispatch(productNotFound(false))
    // filteredProducts.length > 0 ? 
    // dispatch(orderProducts(e.target.value, filteredProducts)) :
    dispatch(orderProducts(e.target.value, allProducts));
    page(1)
    orders(`${e.target.value} order`);
    e.target.value = e.target[0].innerHTML
    console.log('ejecuto')
  }
  return (
    <div className="card mt-3">
      <div className=" d-flex">
        <Select
          defaultValue={"Order by"}
          className="form-select"
          onChange={(e) => handleSort(e)}
        >
          <option disabled hidden>Order by</option>
          <option value="asc-price">Higher price</option>
          <option value="des-price">Lower price</option>
          <option value="asc-name">A - Z</option>
          <option value="des-name">Z - A</option>
        </Select>
        {
          location.pathname === "/productsAdminMode" ?
            <Select
              defaultValue={"Active or Not"}
              className="form-select"
              onChange={(e) => handleSort(e)}
            >
              <option disabled hidden>Active or Not</option>
              <option value="isActive">Active</option>
              <option value="notActive">Not active</option>
            </Select>
            : ""
        }

        <p className="ms-auto m-3">{!allProducts.length ? '' : allProducts.map(product => {
          if (product.stock > 0 && product.isActive === true) { counter.push(product.id) }
        })} {counter.length}
          {
            location.pathname === "/productsAdminMode" ? ' Active Products' : ' Products'
          }
        </p>
        {/* <p className="ms-auto m-3">{!filteredProducts.length ? '' : filteredProducts.map(product => {
          if (product.isActive) { counter.push(product.id) }
        })} {counter.length}  products </p> */}
      </div>
    </div>
  );
};

export default Filter;
