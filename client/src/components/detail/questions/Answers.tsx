import React from 'react';
import Styled from './QuestionStyle';

interface Prop{
    res:string
}

const Answer=({res}:Prop):JSX.Element=>{
    return(
            <Styled.response>
                <span>RESPONSE: </span>
                {res ? res : ''}
            </Styled.response>
    )

}

export default Answer;