import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import validator, { validateForms } from "../../../helpers/validateForm";
import { GetUSer, LoginWithGoogle, LogoutUser } from "../../../redux/actions/user";
import { State } from "../../../redux/reducers";
import Form from "../Form";
import { ButtonsContainer, Forgot } from "../FormStyles";
import { setPage } from "../../../redux/actions/setPage";
import { GoogleLogin } from "react-google-login";
import { createOrderUser } from "../../../redux/actions/ordersUser";
import swal from "sweetalert";
import { useLocalStorage } from "../../../helpers/useLocalStorage";

interface Inputs {
  email: string;
  passUser: string;
}

const Login = (): JSX.Element => {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);
  const [userLoaded, setUserLoaded] = useState<boolean>(false);
  const navigate = useNavigate();
  const productsCart = useSelector((state: State) => state.cart.cart);
  const [userInStorage, setuserInStorage] = useLocalStorage('USER_LOGGED', '')
  const [productsCarrito, setproductsCarrito] = useLocalStorage('cart', '')

  useEffect(() => {
    dispatch(setPage(0));
    dispatch(LogoutUser());
    return () => {
      dispatch(setPage(1));
      console.log(user);
    };
  }, []);

  const [inputs, setInputs] = useState<Inputs>({
    email: "",
    passUser: "",
  });
  const [error, setErrores] = useState<Inputs>({
    email: "",
    passUser: "",
  });

  const RegisterChange = (event: any) => {
    event.preventDefault();
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
    setErrores(validator(error, event.target as HTMLInputElement) as Inputs);
  };

  const LoginFetch = (event: any) => {
    event.preventDefault();
    validateForms(error, inputs);
    dispatch(
      GetUSer(inputs.email, inputs.passUser, (error: any) => {
        if (!error) {
          swal({
            title: "Successfully logged in",
            icon: "success",
          });
          setUserLoaded(true);
        }
      })
    );

  };

  const responseGoogle = (data: any) => {
    const { email } = data.profileObj;
    dispatch(LoginWithGoogle(email, (error) => {
      if (error) {
        swal({
          title: 'Opps! an error ocurred',
          text: error,
          icon: 'error'
        })
      } else {
        swal({
          title: 'Successfully logged in',
          icon: 'success'
        })
        setUserLoaded(!userLoaded);
      }
    }))
  }
  const rejectGoogle = (error: any) => {
    alert('Something happened.')
  }

  const forgotPassword = () => {
    navigate("/emailReset");
  };

  let emailStyle = error.email ? "form-control is-invalid" : "form-control";
  let passStyle = error.passUser ? "form-control is-invalid" : "form-control";

  const CreateOrder = () => { // FUNCIONA PERFECTO, TESTEADO HASTA LA COMPRA 
    if (user) {
      console.log(user);
      dispatch(createOrderUser(user.token, productsCart));
    }
    setTimeout(() => {
      navigate("/products");

    }, 200)
  }


  // if (user) {
  //       navigate("/products");
  // //  //    dispatch(createOrderUser(user.token, productsCart));
  //  //    //     // dispatch(getPendingOrder(user.token));

  return (
    <Form title="Login">
      <div>
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          // className={emailStyle}
          onChange={RegisterChange}
        />
        {error.email && <b className="invalid-feedback">{error.email}</b>}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          name="passUser"
          // className={passStyle}
          onChange={RegisterChange}
        />
        {error.passUser && <b className="invalid-feedback">{error.passUser}</b>}
      </div>
      <Forgot
        className="btn btn-link p-0 m-2 text-decoration-none"
      onClick={forgotPassword}
      >
        Forgot Password?
      </Forgot>
      <ButtonsContainer>


      {/* <div className="w-75">
      {validateForms(error, inputs).length ? (
          <button
            className="btn btn-primary button-links link-Router mb-2  w-100"
            disabled
          >
            SUBMIT
          </button>
        ) : (
          <button
            className="btn btn-primary button-links link-Router mb-2  w-100"
            onClick={LoginFetch}
          >
            SUBMIT
          </button>
        )}

      </div>

      <div className=" border d-flex justify-content-between text-center mb-3  w-75">
      <GoogleLogin
          className=" d-flex justify-content-center    w-50"
          clientId="1023767179189-ja36amq223qs81bf8m8ph3rucekvajoi.apps.googleusercontent.com"
          buttonText=""
          onSuccess={responseGoogle}
          onFailure={rejectGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <Link
          to="/register"
          className="btn btn-secondary link-Router button-links   w-50"
        >
          REGISTER
        </Link>
      </div> */}


      <div className="  d-flex justify-content-between text-center mb-3  w-75">
      <GoogleLogin
          className=" d-flex justify-content-center    w-100"
          clientId="1023767179189-ja36amq223qs81bf8m8ph3rucekvajoi.apps.googleusercontent.com"
          buttonText=""
          onSuccess={responseGoogle}
          onFailure={rejectGoogle}
          cookiePolicy={"single_host_origin"}
        />
        </div>
      <div className=" d-flex justify-content-between text-center mb-3  w-75">
        {validateForms(error, inputs).length ? (
          <button
            className="btn btn-primary button-links link-Router mb-2  w-50"
            disabled
          >
            SUBMIT
          </button>
        ) : (
          <button
            className="btn btn-primary button-links link-Router mb-2  w-50"
            onClick={LoginFetch}
          >
            SUBMIT
          </button>
        )}
        <Link
          to="/register"
          className="btn btn-secondary link-Router button-links mb-2  w-50"
        >
          REGISTER
        </Link>
      </div>

      <button
        className="btn btn-primary button-links link-Router mb-5 mx-2 w-75"
        onClick={CreateOrder}
      >
        Keep Buying
      </button>
      </ButtonsContainer>
    </Form>


  );
};

export default Login;
