import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { createAnswer } from "../../../redux/actions/productDetail";
import Answer from "./Answers";
import Styled from "./QuestionStyle";

interface Prop {
  title: string;
  idA: number;
  body: string;
  answer: string;
  user: any;
}

const Question = ({ title, body, answer, user, idA }: Prop): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const [reply, setReply] = useState<boolean>(false);
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();

  const SendReply = (event: any) => {
    event.preventDefault();
    let reply = event.target.reply.value;

    if (reply) {
      let userId = 1;

      dispatch(createAnswer(idA, Number(id), userId, title, body, reply));
    } else {
      alert("Empty fields.");
    }
  };

  return (
    <Styled.container>
      <Styled.content>
        <main>
          <div>QUESTION: {body ? body : ""}</div>

          <Styled.answers>
            {answer ? <Answer res={answer} /> : <Styled.response><span>Waiting for answer.</span></Styled.response>}
          </Styled.answers>
          {user && user.role !== "user" && !answer ? (
            <>
              <button className="btn-reply" onClick={() => setReply(!reply)}>
                Answer
              </button>
              <form className={reply ? "" : "close"} onSubmit={SendReply}>
                <textarea name="reply" placeholder="Reply..."></textarea>
                <div>
                  <button>Send</button>
                </div>
              </form>
            </>
          ) : null}
        </main>
      </Styled.content>
    </Styled.container>
  );
};

export default Question;
