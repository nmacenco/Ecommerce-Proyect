import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { productNotFound, resetPoducts } from "../../redux/actions/products";
import { NotFoundContainer } from "./NotFoundStyles";

export interface NOT_FOUND {
    eliminateFilters: () => void;
}

const NotFound = ({ eliminateFilters }: NOT_FOUND): JSX.Element => {
    const dispatch = useDispatch()
    useEffect(() => {
        eliminateFilters()
        // dispatch(productNotFound(true))
        setTimeout(function () {
            dispatch(productNotFound(false))
            dispatch(resetPoducts())
        }, 3000);
    }, [])

    return (
        <NotFoundContainer>
            <h1>No products found</h1>
        </NotFoundContainer>
    )
}


export default NotFound; 