import React from "react";
import { IData } from "../Cards";

export default function Pagination({ length, page }: IData): JSX.Element {
    let arr: number[] = [];
    for (let i = 1; i <= Math.ceil(length / 32); i++) {
        arr.push(i)
    }

  return (
    <div className="d-flex justify-content-center">
      <ul className="pagination mt-4">
        <li className="page-item disabled">
          <a className="page-link" href="#">
            &laquo;
          </a>
        </li>
        {arr.map((e, i) => {
          return (
            <li key={i} className="page-item">
              <button className="page-link" onClick={() => page(e)}>
                {e}
              </button>
            </li>
          );
        })}
        <li className="page-item disabled">
          <a className="page-link" href="#">
            &raquo;
          </a>
        </li>
      </ul>
    </div>
  );
}
