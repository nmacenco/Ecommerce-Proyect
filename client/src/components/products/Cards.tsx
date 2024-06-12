import React, { useEffect, useState } from "react";
import Card from "./card/Card";
import Filter from "./filter/Filter";
import { CardsContainer, ProductsContainer, ReactPaginateContainer } from "./CardsStyles";
import Pagination from "./pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/reducers/index";
import { Data_Paginate, FILTER_BOX, Product, Subcategory } from "../../redux/interface";
import Loading from "../loading/Loading";
import Categories from "../admin/categoriesAdmin/Categories";
import NotFound from "../notFound/NotFound";
import { filterByBrand, filterProducts } from "../../redux/actions/filterByCategory";
import { execPath } from "process";
import { getSubcategories } from "../../redux/actions/categories";
import { getProducts, getWish, productNotFound, resetPoducts } from "../../redux/actions/products";
import { setPage } from "../../redux/actions/setPage";
import { getOrdersAdmin } from "../../redux/actions/ordersAdmin";
import { getPendingOrder } from "../../redux/actions/cart";
import { createOrderUser, getcurrentOrder } from "../../redux/actions/ordersUser";

export interface ORDER {
  page: (numberOfPage: number) => void;
  orders: (typeorder: string) => void;
}

const Cards = (): JSX.Element => {
  const dispatch = useDispatch();
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const [load, setLoad] = useState<boolean>(false)
  let currentPage = useSelector((state: State) => state.page);
  const [order, setOrder] = useState<string>("");
  const [filterBox, setFilterBox] = useState<FILTER_BOX>({
    subcategory: "",
    brand: ""
  })
  const productsList = useSelector((state: State) => state.products.products);
  const notFound = useSelector((state: State) => state.products.not_found);
  const user = useSelector((state: State) => state.user);
  const allSubcategories = useSelector((state: State) => state.categories.subcategories);
  const productsCart = useSelector((state: State) => state.cart.cart);
  const page = (numberOfPage: number): void => {
    // setCurrentPage(numberOfPage);
    dispatch(setPage(numberOfPage))
  };
  const orders = (typeorder: string): void => {
    if (typeorder !== 'asc-price order' && typeorder !== 'des-price order' && typeorder !== 'des-name order' && typeorder !== 'asc-name order' && typeorder !== 'Order by order') {
      let existCat = allSubcategories.filter((e: Subcategory) => e.name === typeorder)
      if (existCat.length === 1) {
        setFilterBox({ ...filterBox, subcategory: typeorder })
        dispatch(resetPoducts())
        if (filterBox.brand.length !== 0) {
          dispatch(filterByBrand(filterBox.brand))
        }
        dispatch(filterProducts(typeorder))
      }
      else {
        setFilterBox({ ...filterBox, brand: typeorder })
        dispatch(resetPoducts())
        if (filterBox.subcategory.length !== 0) {
          dispatch(filterProducts(filterBox.subcategory))
        }
        dispatch(filterByBrand(typeorder))
      }
    }
    setOrder(typeorder);
  };

  useEffect(() => {
    dispatch(getSubcategories())
    dispatch(getProducts());

    if (user) {
      // dispatch(createOrderUser(user.token, productsCart));
      dispatch(getWish(user.token))
      setTimeout(() => {
        dispatch(getPendingOrder(user.token));

      }, 300)

    }

  }, [])

  // useEffect(() => {
  //   dispatch(getSubcategories())
  // }, [dispatch])

  useEffect(() => {
    dispatch(productNotFound(true))
    eliminateFilters()
  }, [productsList.length === 0])

  const finalProduct = currentPage * 32;
  const firstProduct = finalProduct - 32;
  let newProductsList: Product[] = [];
  (newProductsList = productsList.filter((product: Product) => product.isActive === true));
  (newProductsList = newProductsList.slice(firstProduct, finalProduct));
  // if (filteredProductList.length > 0) {
  //   newProductsList = filteredProductList.filter(product => product.isActive)
  //   activeProductsList = newProductsList.slice(firstProduct, finalProduct)
  // }
  // else (activeProductsList = productsList.slice(firstProduct, finalProduct))

  // implementing react paginate

  const handlePageClick = (data: Data_Paginate): void => {
    dispatch(setPage(data.selected + 1))
    // setCurrentPage(data.selected + 1);
  };

  useEffect(() => {
    setTimeout(() => {
      LoadCharge(true)
    }, 500)
  }, [setLoad])

  const LoadCharge = (bool: boolean): void => {
    setLoad(bool)
  }

  const resetFilter = (e: string): void => {
    if (filterBox.subcategory.length === 0 || filterBox.brand.length === 0) {
      dispatch(resetPoducts())
      console.log('reset')
    } else if (filterBox.subcategory === e) {
      dispatch(resetPoducts())
      dispatch(filterByBrand(filterBox.brand))
    }
    else {
      dispatch(resetPoducts())
      dispatch(filterProducts(filterBox.subcategory))
    }
    let existCat = allSubcategories.filter((s: any) => s.name === e)
    if (existCat.length === 0) setFilterBox({ ...filterBox, brand: "" })
    else setFilterBox({ ...filterBox, subcategory: "" })
  }

  function eliminateFilters(): void {
    setFilterBox({
      ...filterBox,
      subcategory: "",
      brand: ""
    })
  }
  return (
    <ProductsContainer className="row row-cols-xl-2 row-cols-md-1 mx-auto">
      <div className="col-xl-3 col-sm-12">
        <Categories page={page} orders={orders} />
      </div>
      <div className="col-xl-9 col-md-12">
        <CardsContainer className="w-100 ">
          <Filter page={page} orders={orders} />

          {
            productsList.length == 0 ?
            <Loading/>
              :
              newProductsList.length > 0 ?
                <>
                  {filterBox.subcategory.length !== 0 ? <span><button onClick={() => resetFilter(filterBox.subcategory)} className="btn btn-primary mt-2 mr-2">{`${filterBox.subcategory} X`}</button></span> : ""}
                  {filterBox.brand.length !== 0 ? <span><button onClick={() => resetFilter(filterBox.brand)} className="btn btn-primary mt-2 mr-2">{`${filterBox.brand} X`}</button></span> : ""}
                  <div className="mt-3 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xxl-4 g-4 d-flex justify-content-center">
                    {newProductsList.map((e: Product) => {
                      if (e.stock > 0) {
                        return (
                          <div className="col" key={e.id}>
                            <Card
                              stock={e.stock}
                              name={e.name}
                              image={e.image}
                              price={e.price}
                              id={e.id}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                  <ReactPaginateContainer>
                    <Pagination
                      productList={productsList.length}
                      handlePageClick={handlePageClick}
                    ></Pagination>
                  </ReactPaginateContainer>
                </> : (
                  <NotFound
                    eliminateFilters={eliminateFilters}
                  />
                )
          }
        </CardsContainer>
      </div>
    </ProductsContainer>
  )
};

export default Cards;
