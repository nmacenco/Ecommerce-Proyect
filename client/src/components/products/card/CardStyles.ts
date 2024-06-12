import styled from "styled-components";

export const ProductIMG = styled.img`
  height: 280px;
  padding: 2rem;
`;

export const CardComponent = styled.div`
  position: relative;
  /* width: 22em; */
  height: 420px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  /* pointer-events: none; */
`;

export const CardFooter = styled.div`
  // height: 60px;
  padding: 0 !important;
`;
