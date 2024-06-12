import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { addProductCart, addProductOrder } from "../../../redux/actions/cart";
import { deleteWish, getWish } from "../../../redux/actions/products";
import { State } from "../../../redux/reducers";
import { CardContainer, WishContainer, WishGrid, WishImg, WishName } from "./whis";
import CartIMG from "../../../icons/cart-icon.png";
import DeleteIMG from "../../../icons/white-trash.png";

const WishList = (): JSX.Element => {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);
  const wishes = useSelector((state: State) => state.products.wishList);
  const products = useSelector((state: State) => state.products.copyProducts);

  useEffect(() => {
    if (user && !wishes.length) {
      dispatch(getWish(user!.token));
    }
  }, []);

  const WishDelete = (event: any) => {
    if (user) {
      dispatch(deleteWish(event.target.id, user!.token));
    }
  };

  const addProductToCart = (event: any) => {
    let index = event.target.id;

    const encountered = products.find(
      (product) => product.id === Number(index)
    );
    if (encountered) {
      const productToAdd = {
        productId: encountered.id,
        productName: encountered.name,
        price: encountered.price,
        image: encountered.image,
        stock: encountered.stock,
        quantity: 1,
      };
      productToAdd.quantity = 1;
      dispatch(addProductCart(productToAdd));
      user &&
        productToAdd.productId &&
        dispatch(addProductOrder(user!.token, productToAdd.productId));
      dispatch(
        deleteWish(Number(index), user!.token, (error) => {
          if (error) {
            swal({
              text: "Error.",
              content: error,
              icon: "error",
            });
          } else {
            swal({
              title: "Success",
              text: "Added to cart.",
              icon: "success",
            });
          }
        })
      );
    } else {
      alert("The product does not exist");
    }
  };

  return (
    <WishContainer>
      <h3 className="mt-4">WishList</h3>
      <WishGrid className={wishes.length ? "" : ""}>
        <tbody>
          {wishes.length ? (
            <div>
              {/* <tr>
                <th className="title">Product</th>
                <th className="title">Name</th>
                <th className="title">Price</th>
                <th className="title">Stock Status</th>
                <th className="title">Actions</th>
              </tr> */}
            </div>
          ) : (
            <div className="text-center">
              <h5 className="text-center mt-5 pt-5">Wishlist empty.</h5>
              <Link to="/products">
                <button className="btn btn-primary">See products</button>
              </Link>
            </div>
          )}
          <div className="mt-5">
          {wishes.map((wish, i) => {
            return (
              <CardContainer>
                <tr
                  key={wish.id.toString()}
                  className="d-flex flex-column flex-md-row justify-content-between align-items-center"
                >
                  <Link to={`/detail/${wish.id}`} className="text-decoration-none d-flex align-items-center flex-column flex-md-row my-4 my-md-0 ">
                    <td>
                      <WishImg src={wish.image} alt="" />
                    </td>
                    <WishName className="item-borders ms-0 ms-md-5">{wish.name}</WishName>
                  </Link>
                  <td className="item-borders"><h5>${wish.price}</h5></td>
                  <td className="item-borders">
                    {wish.stock ? "In Stock" : "Not stock"}
                  </td>
                  <td className="my-4 my-md-0">
                    <div className="d-flex">
                      <button
                        className="btn btn-sm btn-primary me-1"
                        id={wish.id}
                        onClick={addProductToCart}
                      >
                        <img src={CartIMG} alt="add cart"></img>
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-1"
                        onClick={WishDelete}
                        id={wish.id.toString()}
                      >
                        <img src={DeleteIMG} alt="delete"></img>
                      </button>
                    </div>
                  </td>
                </tr>
              </CardContainer>
            );
          })}
          </div>
        </tbody>
      </WishGrid>
    </WishContainer>
  );
};
export default WishList;