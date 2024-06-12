import React from "react";
import { ContainerLog, Content, LogForm } from "./FormStyles";

interface Prop {
  title: string;
  children: JSX.Element | JSX.Element[];
}

const Form = ({ title, children }: Prop): JSX.Element => {
  const sendLogin = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const width = title === "Register" ? { width: "600px" } : { width: "340px" };

  return (
    <div className="container text-center mb-5">
      <h3 className="pt-5">{title}</h3>
      <ContainerLog>
        <LogForm onSubmit={sendLogin} autoComplete="off" style={width}>
          <Content>{children}</Content>
        </LogForm>
      </ContainerLog>
    </div>
  );
};

export default Form;
