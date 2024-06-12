import React, { useState, useEffect } from "react";
import { AdminProductIMG } from "./AdminModeCardStyles";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct } from "../../../../redux/actions/admin";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, resetPoducts } from "../../../../redux/actions/products";
import { ORDER } from "../../../products/Cards";
// import { chargeFilter, resetFilterProducts } from "../../../../redux/actions/filterByCategory";
import { getProductDetail } from "../../../../redux/actions/productDetail";
import swal from "sweetalert";
import { State } from "../../../../redux/reducers";
import { Product } from "../../../../redux/interface";
import { useLocalStorage } from "../../../../helpers/useLocalStorage";
import TrashIMG from "../../../../icons/white-trash.png"
import EditIMG from "../../../../icons/edit.png"
import CheckIMG from "../../../../icons/check.png"
import { setPage } from "../../../../redux/actions/setPage";
interface props {
  name: string;
  image: string;
  price: number;
  id?: number;
  isActive: boolean;
  orders: (typeorder: string) => void;
  page: (typeorder: number) => void;
  eliminateFilters: () => void;
}

const AdminModeCard = ({ name, image, price, id, orders, page, isActive, eliminateFilters }: props) => {
  const dispatch = useDispatch()
  const stringId = String(id)
  const navigate = useNavigate()
  const [userInStorage, setuserInStorage] = useLocalStorage('USER_LOGGED', '')
  const allProducts = useSelector((state: State) => state.products.products)
  function deleteHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "This product is now going to be inactive!",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: true,
        confirm: true
      }
    }).then((value) => {
      if (value) {
        const data = { isActive: false }
        dispatch(deleteProduct(stringId, data, userInStorage.token));
        setTimeout(() => {
          dispatch(getProducts())
        }, 300)
        page(1)
        dispatch(resetPoducts())
        eliminateFilters()
        dispatch(setPage(1))
        // orders(stringId)
        swal({
          text: "Product not active",
          icon: "success"
        })
      }
    })

  }
  function activateHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();

    swal({
      title: "Are you sure?",
      text: "This product is now going to be active!",
      icon: "success",
      dangerMode: true,
      buttons: {
        cancel: true,
        confirm: true
      }
    }).then((value) => {
      if (value) {
        const data = { isActive: true }
        dispatch(deleteProduct(stringId, data, userInStorage.token));
        setTimeout(() => {
          dispatch(getProducts())
        }, 200)
        dispatch(setPage(1))
        page(1)
        // orders(stringId)
        eliminateFilters()
        swal({
          text: "Product active",
          icon: "success"
        })
      }
    })

  }


  function handleClickEdit(e: React.MouseEvent<HTMLButtonElement>): void {
    dispatch(getProductDetail(stringId));
    setTimeout(function () {
      navigate(`/editProduct/${id}`)
    }, 500);
  }

  return (
    <tbody >
      <tr className="table-light">
        <th scope="row">
          <AdminProductIMG
            src={image}
            alt={image}
            className="card-img-top"
          ></AdminProductIMG>
        </th>
        <td >
          {name.length > 30 ? (
            <p ><Link className="text-decoration-none" to={`/detail/${id}`}>{name.slice(0, 30)}...</Link></p>
          ) : (
            <p className="card-title m-2"><Link to={`/detail/${id}`}>{name}</Link></p>
          )}
        </td>
        <td > $ {price} </td>
        {
          isActive ?
            <td > Active </td>
            :
            <td > Not Active </td>

        }
        <td >
          {
            isActive ?
              <button
                onClick={(e) => { deleteHandler(e) }}
                type="button"
                className="btn btn-danger btn-sm  "
              >
                <img src={TrashIMG} alt="delete"></img>
              </button>
              :
              <button
                // disabled
                onClick={(e) => { activateHandler(e) }}
                type="button"
                className="btn btn-success btn-sm  "
              >
                <img src={CheckIMG} alt="delete" width={'100%'}></img>
              </button>

          }
        </td>
        <td >
          <button onClick={(e) => handleClickEdit(e)} type="button" className="btn btn-warning btn-sm">
            <img src={EditIMG} alt="edit"></img>
          </button>
        </td>
      </tr>
    </tbody>

  );
};

export default AdminModeCard;
