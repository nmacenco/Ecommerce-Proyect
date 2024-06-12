import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { errorMonitor } from "stream";
import { useLocalStorage } from "../../../helpers/useLocalStorage";
import { forgotPasswordReset } from "../../../redux/actions/user";
import swal from "sweetalert";

import { Container, FormContainer1 } from "./EmailResetPasswordStyles";
import { useNavigate } from "react-router";

export function validate(theEmail: any) {
  let error = {
    email: ''
  };

  if (!theEmail.email) {
    error.email = "Email required.";
  } else if (!/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+/gm.test(theEmail.email)) {
    error.email = "It's not a valid email.";
  }


  return error;
}

export default function EmailResetPassword(): JSX.Element {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState({
    email: 'Empty required'
  })
  const [theEmail, setTheEmail] = useState({
    email: ''
  })
  function handleOnBlur(e: any) {
    console.log(e.target.name);

    setError(
      validate({
        ...theEmail,
        [e.target.name]: e.target.value
      })
    );
  }
  function handleOnChange(e: any) {
    e.preventDefault()
    setTheEmail({
      email: e.target.value
    })
  }

  console.log(Object.keys(error).length);
  function handleSubmit(e: any) {
    setShowError(true)
    if (error.email.length === 0) {
      dispatch(forgotPasswordReset(theEmail))
      swal({
        title: "Email sended, check your inbox",
        icon: "success"
      })
      navigate("/products")

    } else {
      e.preventDefault()
      swal({
        title: "Fill field with your email.",
        icon: "error"
      })

    }
  }
  return (
    <Container>
      <FormContainer1>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">Forgot password</h3>
            <div className="form-group mt-5">
              <label htmlFor="staticEmail" className=" col-form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="staticEmail"
                name="email"
                placeholder="Type your email"
                onChange={(e) => handleOnChange(e)}
                onBlur={(e) => handleOnBlur(e)}
              />
              <p className="text-danger">
                {showError ? error.email : "⠀"}
              </p>
            </div>

            <div className="text-center">
              <button onClick={(e) => { handleSubmit(e) }} type="submit" className="btn btn-outline-primary mt-1 ">
                Submit
              </button>
            </div>
          </form >
        </div >
      </FormContainer1 >
    </Container >
  );
}
