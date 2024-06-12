import styled from "styled-components";

export const AdminUsersContainer = styled.div`

    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
`
export const Switch  = styled.label`
/* From cssbuttons.io by @victoryamaykin */
  
    position: relative;
    display: inline-block;
    width: 120px;
    height: 34px;
   
   
    input {
    display: none;
   }
   
   span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #3C3C3C;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;
   }
   
   span::before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
   }
   
   input:checked + span {
    background-color: #0E6EB8;
   }
   
   input:focus + span {
    box-shadow: 0 0 1px #2196F3;
   }
   
   input:checked + span::before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(85px);
   }
   
   /*------ ADDED CSS ---------*/
   span::after {
    content: 'DISABLED';
    color: white;
    display: block;
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    font-size: 10px;
    font-family: Verdana, sans-serif;
   }
   
   input:checked + span::after {
    content: 'ENABLED';
   }
   
   /*--------- END --------*/
   
`

