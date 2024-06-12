import styled from "styled-components";

export const ContainerLog = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

export const LogForm = styled.form`
  background-color: #e1e1e1;
  padding: 10px 20px;

  .div-inputs {
    display: flex;
    justify-content: space-between;
    div {
      width: 50%;
    }
    div:nth-child(1) {
      margin-right: 10px;
    }
  }
  .div-data {
    display: flex;
    align-items: center;
    div:nth-child(3) {
      margin-left: 10px;
    }
    div:nth-child(2) {
      margin-left: 10px;
    }
  }
`;

export const Content = styled.div`

  input {
    width: 100%;
    margin: 15px 3px;
    background-clip: padding-box;
    border: 0 solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 11px 15px;
    outline: none;
  }
  b {
    height: 9px !important;
    margin-top: -12px;
    margin-bottom: 20px;
    font-size: 0.8rem;
  }
  input:focus {
    box-shadow: 0 0 0 0.25rem rgb(206 198 198 / 25%);
  }
  article {
    width: 96%;
    margin: 20px 2% 10px 2%;
    height: 50px;
    text-align: right;
    .button-links {
      padding: 8px 10px;
      margin-right: 10px;
    }
  }

  .google {
    padding: 7px 12px;
    border-radius: 20px;
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
    div {
      width: 30px;
      height: 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .google:active {
    box-shadow: 0 0 0 0.25rem rgb(206 198 198 / 25%);
  }

  .form-log {
    width: 50%;
    margin: 10px 25%;
    button {
      width: 100% !important;
    }
  }
`;

export const Forgot = styled.div`
  &:hover {
    color: #808080;
  }
`;
export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
