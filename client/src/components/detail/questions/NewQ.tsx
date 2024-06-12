import React from "react";
import { useDispatch } from "react-redux";
import { createQuestion } from "../../../redux/actions/productDetail";
import Styled from "./newForm";

interface Prop{
    ProductId:number
}


const NewQ=({ProductId}:Prop):JSX.Element=>{

    const dispatch=useDispatch();

    const createBlock=(event:any)=>{
        event.preventDefault();
        let title = event.target.title.value;
        let body=event.target.body.value;
        dispatch(createQuestion(title,body,ProductId));
        event.target.title.value='';
        event.target.body.value='';

    }

    return(
        <Styled.container>
            <h5 >
                Write your question.
            </h5>

            <Styled.form onSubmit={createBlock} >
                <input type='text' placeholder="Title..." name="title"/>
                <textarea placeholder="Question..." name="body"/>
                <div>
                    <button>Send</button>
                </div>
            </Styled.form>
        </Styled.container>
    )

}

export default NewQ;