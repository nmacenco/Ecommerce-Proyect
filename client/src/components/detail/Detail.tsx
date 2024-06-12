import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetail,
  deleteProductDetail,
} from "../../redux/actions/productDetail";
import { State } from "../../redux/reducers/index";
import { useParams, Link, useNavigate } from "react-router-dom";
import Review from "./reviews/Review";
import Loading from "../loading/Loading";
import {
  DetailContainer,
  Box,
  ImgPriceContainer,
  Price,
  DeleteEditButton,
  ImagesContainer,
} from "./DetailStyles";
import { resetFilterProducts } from "../../redux/actions/filterByCategory";
import swal from "sweetalert";
import Question from "./questions/Question";
import NewQ from "./questions/NewQ";
import { addProductCart, addProductOrder } from "../../redux/actions/cart";
import { ProductCart } from "../../redux/interface";
import { useLocalStorage } from "../../helpers/useLocalStorage";
import TrashIMG from "../../icons/white-trash.png";
import EditIMG from "../../icons/edit.png";
import { createWish, resetPoducts } from "../../redux/actions/products";
import { deleteProduct } from "../../redux/actions/admin";

export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const product = useSelector((state: State) => state.productDetail);
  const user = useSelector((state: State) => state.user);
  const wishes = useSelector((state: State) => state.products.wishList);
  const productsCart = useSelector((state: State) => state.cart.cart);
  const [userInStorage, setuserInStorage] = useLocalStorage("USER_LOGGED", "");
  const productInCart = productsCart.find(
    (product: ProductCart) => product.productId == product.productId
  );
  const [isWish, setWish] = useState<boolean>(false);

  const wishEncountered = wishes.find((wish: any) => wish.id === Number(id));

  const AddWishList = () => {
    if (user) {
      dispatch(
        createWish(Number(id), user!.token, (error: any) => {
          if (error) {
            swal({
              text: error,
              icon: "error",
            });
            setWish(!isWish);
          } else {
            setWish(!isWish);
            swal({
              text: "Product added to your wishlist",
              icon: "success",
            });
          }
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getProductDetail(id));

    return () => {
      dispatch(deleteProductDetail());
      // dispatch(resetFilterProducts());
      // dispatch(resetPoducts());
    };
  }, [wishes]);

  function addCartHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    const productToAdd = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
      quantity: 0,
    };
    const quantity = productInCart ? productInCart.quantity + 1 : 1;
    if (Number(quantity) <= Number(product.stock)) {
      productToAdd.quantity = quantity;
      dispatch(addProductCart(productToAdd));
      user && id && dispatch(addProductOrder(user.token, Number(id)));
    }
  }

  function deleteHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "This product is now going to be inactive!",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then((value) => {
      if (value) {
        const data = { isActive: false };
        dispatch(deleteProduct(id, data, userInStorage.token));
        // dispatch(resetFilterProducts())
        dispatch(resetPoducts());
        navigate("/products");
        swal({
          text: "Product deleted",
          icon: "success",
        });
      }
    });
  }

  return (
    <DetailContainer>
      {product.name.length > 0 ? (
        <Box>
          <div>
            <h3>{product.name}</h3>
          </div>
          <div className="card">
            <div className="card-body">
              <ImgPriceContainer>
                <ImagesContainer>
                  <img
                    src={product.image}
                    alt="product-image"
                    className="w-75"
                  ></img>
                </ImagesContainer>
                <Price>
                  <h3>$ {product.price}</h3>
                  <p>Current stock: {product.stock}</p>

                  {product.quantity === product.stock ||
                  (productInCart &&
                    productInCart.quantity === product.stock || product.stock == 0) ? (
                    <button
                      type="button"
                      className="btn btn-primary btn"
                      disabled
                    >
                      No stock
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary btn"
                      onClick={(e) => addCartHandler(e)}
                    >
                      Add to cart
                    </button>
                  )}
                  {user != null &&
                    (wishEncountered || isWish ? null : (
                      <button
                        className="btn btn-danger wish"
                        onClick={AddWishList}
                      >
                        Add to WishList
                      </button>
                    ))}
                  {userInStorage && userInStorage.role === "admin" ? (
                    <DeleteEditButton>
                      <button
                        onClick={deleteHandler}
                        type="button"
                        className="btn btn-danger btn-sm"
                      >
                        <img src={TrashIMG} alt="delete"></img>
                      </button>
                      <Link to={`/editProduct/${product.id}`}>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm"
                        >
                          <img src={EditIMG} alt="edit"></img>
                        </button>
                      </Link>
                    </DeleteEditButton>
                  ) : (
                    <div></div>
                  )}
                </Price>
              </ImgPriceContainer>
            </div>
          </div>
        </Box>
      ) : (
        <Loading></Loading>
      )}
      <Box className="mt-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" data-bs-toggle="tab" href="#home">
              Description
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#profile">
              Reviews
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link " data-bs-toggle="tab" href="#questions">
              Questions
            </a>
          </li>
        </ul>
        <div id="myTabContent" className="tab-content">
          <div className="tab-pane fade active show m-2" id="home">
            <p>{product.description}</p>
          </div>
          <div className="tab-pane fade m-2" id="profile">
            {product.reviews && product.reviews.length > 0 ?
              product.reviews.map((rew, i) => {
                return (
                  <Review
                    name={rew.review.User.name}
                    title={rew.review.title}
                    stars={rew.review.stars}
                    key={i}
                    texto={rew.review.description}
                  />
                );
              }) : <span>Not reviews done yet.</span>}
          </div>
          <div className="tab-pane fade m-2" id="questions">
            {user ? <NewQ ProductId={product.id!} /> : null}
            {product.questions && product.questions.length > 0 ?
              product.questions.map((question, i) => {
                return (
                  <Question
                    title={question.question.title}
                    body={question.question.description}
                    key={i}
                    answer={question.question.answer}
                    user={user}
                    idA={question.question.id}
                  />
                );
              }) : <span>Not questions done yet.</span>}
          </div>
        </div>
      </Box>
    </DetailContainer>
  );
}
