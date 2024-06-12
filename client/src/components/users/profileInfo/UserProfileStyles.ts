import styled from "styled-components";

export const Container = styled.div`
  margin-top: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    margin-top: 180px;
  }
`;

export const ProfileContainer = styled.div`
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ButtonBox = styled.div`
  width: 80%;
`;
