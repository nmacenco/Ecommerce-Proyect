import React, { useEffect } from "react";
import "bootswatch/dist/lux/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Detail from "./components/detail/Detail";
import Login from "./components/log/login/Login";
import Register from "./components/log/register/Register";
import Loading from "./components/loading/Loading";
import Edit from "./components/admin/editProduct/EditProduct";
import FormCreate from "./components/admin/createProduct/FormCreate";
import Home from "./components/home/Home";
import AdminModeCards from "./components/admin/productsAdmin/AdminModeCards";
import { useDispatch, useSelector } from "react-redux";
import { FindUSer } from "./redux/actions/user";
import Cart from "./components/cart/Cart";
import CreateCategories from "./components/admin/categoriesAdmin/create/CreateCategories";
import ResetForcePassword from "./components/users/forgotPassword/ResetForgotPasswords";
import EditUserAccount from "./components/users/editAccount/EditUserAccount";
import AdminUserMode from "./components/admin/usersAdmin/AdminModeUsers";
import EmailResetPassword from './components/users/forgotPassword/EmailResetPassword'
import { ResetPwd } from "./components/users/changePassword/ResetPwd";
import UserProfile from "./components/users/profileInfo/UserProfile";
import WishList from "./components/users/wishList/WishList";
import DeleteCategories from "./components/admin/categoriesAdmin/delete/DeleteCategories";
import ValidateAccount from "./components/users/validateAccount/ValidateAccount";
import OrdersHistory from "./components/users/ordersHistory/OrdersHistory";
import About from "./components/nav/about/About";
import OrdersAdmin from "./components/admin/ordersAdmin/OrdersAdmin";
import ShippingAddressForm from "./components/checkout/shippingAddress/shippingAddressForm";
import PreviewOrder from "./components/checkout/previewOrder/PreviewOrder";
import NewReview from "./components/users/ordersHistory/orderRow/newReview/NewReview";
import { State } from "./redux/reducers";
import Cards from "./components/products/Cards";



function App(): JSX.Element {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);

  useEffect(() => {
    dispatch(FindUSer());
  }, []);



  return (
    <div className="App">

      <BrowserRouter>

        <Nav />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/createProduct" element={<FormCreate />} />
          <Route path="/editProduct/:id" element={(user && user.role == 'admin') ? <Edit /> : <Navigate to='/login' />} />
          <Route path="/products" element={<Cards />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/createCategory" element={(user && user.role == 'admin') ? <CreateCategories /> : <Navigate to='/login' />} />
          <Route path="/sessions/recover/:token" element={<ResetForcePassword />} />
          <Route path="/editUser/:token" element={user ? <EditUserAccount /> : <Navigate to='/products' />} />
          <Route path="/productsAdminMode" element={(user && user.role == 'admin') ? <AdminModeCards /> : <Navigate to='/login' />} />
          <Route path="/usersAdminMode" element={(user && user.role == 'admin') ? <AdminUserMode /> : <Navigate to='/login' />} />
          <Route path="/emailReset" element={<EmailResetPassword />} />
          <Route path="/resetpwd" element={user ? <ResetPwd /> : <Navigate to='/login' />} />
          <Route path="/profile" element={user ? <UserProfile /> : <Navigate to='/products' />} />
          <Route path="/ordersHistory" element={<OrdersHistory />} />
          <Route path="/wishList" element={user ? <WishList /> : <Navigate to='/products' />} />
          <Route path="/deleteCategory" element={(user && user.role == 'admin') ? <DeleteCategories /> : <Navigate to='/login' />} />
          <Route path="/validateAccount/:id" element={<ValidateAccount />} />
          <Route path="/about" element={<About />} />
          <Route path="/ordersAdmin" element={(user && user.role == 'admin') ? <OrdersAdmin /> : <Navigate to='/login' />} />
          <Route path="/shippingAddress" element={user ? <ShippingAddressForm /> : <Navigate to='products' />} />
          <Route path="/previewOrder" element={user ? <PreviewOrder /> : <Navigate to='/login' />} />
          <Route path="/newReview/:userId/:productId" element={user ? <NewReview /> : <Navigate to='/products' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
