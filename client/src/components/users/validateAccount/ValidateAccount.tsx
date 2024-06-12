import React from "react";
import { useNavigate } from "react-router";
import { Container } from "../forgotPassword/EmailResetPasswordStyles";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { validateAccount } from "../../../redux/actions/user";
import { useParams } from "react-router";

export default function ValidateAccount(): JSX.Element {
    const {id} = useParams()
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit() {
    dispatch(validateAccount(id));
    navigate("/login");
  }
  function handleOnClick() {
  }
  return (
    <Container>
      <div className="card-body">
        <form
          onSubmit={() => {
            handleSubmit();
          }}
        >
          <h3 className="text-center">Validate Account</h3>
          <div className="text-center">
            <button
              onClick={(e) => {
                handleOnClick();
              }}
              type="submit"
              className="btn btn-outline-primary mt-5 "
            >
              Click here
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}
