import React from "react";
import ReactPaginate from "react-paginate";
interface props {
  productList: number,
  handlePageClick: (data: any) => void;
}

export default function Pagination({ productList, handlePageClick }: props): JSX.Element {

  return (

    <ReactPaginate
      pageCount={Math.ceil(productList / 32)}
      nextLabel={">"}
      previousLabel={"<"}
      marginPagesDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    ></ReactPaginate>
  )
}




// import React from "react";
// import { IData } from "../Cards";

// export default function Pagination({ length, page }: IData): JSX.Element {
//     let arr: number[] = [];
//     for (let i = 1; i <= Math.ceil(length / 32); i++) {
//         arr.push(i)
//     }

//   return (
//     <div className="d-flex justify-content-center">
//       <ul className="pagination mt-4">
//         <li className="page-item disabled">
//           <a className="page-link" href="#">
//             &laquo;
//           </a>
//         </li>
//         {arr.map((e, i) => {
//           return (
//             <li key={i} className="page-item">
//               <button className="page-link" onClick={() => page(e)}>
//                 {e}
//               </button>
//             </li>
//           );
//         })}
//         <li className="page-item disabled">
//           <a className="page-link" href="#">
//             &raquo;
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// }



