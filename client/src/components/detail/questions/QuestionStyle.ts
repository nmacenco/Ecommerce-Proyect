import styled from "styled-components";

const QuestionContainer = styled.div`
  padding:20px;
  border: 0.5px solid grey;
  width: 100%; 
  margin-top: 10px;

`;

const QuestionContent = styled.div`
  width: 100%;

  main {

    .btn-reply {
      margin-top:10px;
      border: none;
      padding: 7px 12px;
    }
  }

  form {
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    textarea{
      padding: 7px 5px;
      outline: none;
    }

    div {
      direction: rtl;

      button {
        margin-top:5px;
        border: none;
        padding: 5px 10px;
        font-weight: bold;
      }
    }
  }

  .close {
    padding: 0px;
    height: 0px;
    overflow: hidden;
    margin: 0px;
  }
`;

const ShowQuestions = styled.div`
  width: 80%;

  aside.show-answer {
    color: blue;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 10px;
  }
  
`;

const response = styled.article`
  margin-top: 10px;
  width: 100%;
`;

const Styled = {
  container: QuestionContainer,
  content: QuestionContent,
  answers: ShowQuestions,
  response: response,
};

export default Styled;
