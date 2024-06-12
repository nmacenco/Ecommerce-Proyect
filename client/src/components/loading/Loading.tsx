import React from "react";
import { Ring } from '@uiball/loaders'
import { LoadingContainer } from './LoadingStyles';

const Loading = () => {

    return (
        <LoadingContainer>
            <Ring size={35} color="black" />
        </LoadingContainer>
    )
}


export default Loading; 
