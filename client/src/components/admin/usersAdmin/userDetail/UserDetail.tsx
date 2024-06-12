import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import {useLocalStorage} from '../../../../helpers/useLocalStorage'
import { adminEditUser, adminForcedPasswordReset, adminGetUsers, adminresetUsers } from "../../../../redux/actions/adminUser";
interface props {
  id: number;
  name: string;
  surname: string;
  email: string;
  billing_address: string;
  default_shipping_address: string;
  role: string;
  isActive: boolean;
  country: string;
  countryCode: string;
  CountryId: number;
  password : string ; 
  needsPasswordReset : boolean ; 
  AdmOrders: (typeorder: string) => void;
}

const UserDetail = ({
  id,
  name,
  password,
  surname,
  email,
  billing_address,
  default_shipping_address,
  role,
  isActive,
  country,
  countryCode,
  CountryId,
  needsPasswordReset,
  AdmOrders
}: props) => {
  const dispatch = useDispatch()
  const [theToken , setTheToken] = useLocalStorage('USER_LOGGED','')

  
    function  roleOnChange (e:any) {
      e.preventDefault()

      if ( e.target.value === 'admin') {
        dispatch(adminEditUser( e.target.id ,{
          role : 'admin',
          isActive,
          needsPasswordReset
        }, theToken.token))
      } else {
        dispatch(adminEditUser( e.target.id ,{
          role : 'user',
          isActive,
          needsPasswordReset
        }, theToken.token));
      }
      // e.target.value = ''
      dispatch(adminresetUsers());
      AdmOrders(e.target.value)
      setTimeout(() => {
      }, 500)
    }
    
    function isActiveOnChange(e: any): void {
      e.preventDefault();
      if (e.target.value === 'true' ) {
        // setUserUpdate({...userUpdate , isActive: false})
        dispatch(adminEditUser( e.target.id ,{
          role,
          needsPasswordReset,
          isActive: false,
        }, theToken.token))
      }else if (e.target.value === 'false' ) {
        // setUserUpdate({...userUpdate , isActive: true})
        dispatch(adminEditUser( e.target.id ,{
          role,
          needsPasswordReset,
          isActive: true,

        }, theToken.token))
      }
      dispatch(adminresetUsers());
      AdmOrders(e.target.value)
    }
    const [theEmail , setTheEmail ] = useState({
      email : email 
    })
    function handleClickReset(e:any) : void {
      // console.log(email);
      dispatch(adminForcedPasswordReset(theEmail, theToken.token))
      swal({
        text: "Email sended",
        icon: "success"
      })
    }


  return (
    <tbody>
      <tr className="table-light">
        <th scope="row">{name}</th>
        <td className="form-group">
          <select  onChange={(e)=> roleOnChange(e)} defaultValue={role} className="form-select" id={`${id}`} >
            <option disabled hidden>
              {role}
            </option>
            <option  value = {'admin'}>Admin</option>
            <option value = {'user'}>User</option>
          </select>
        </td>
        <td>
          <div className="form-check form-switch">
            {
              isActive ? 
              <input
                value={`${isActive}`}
                className="form-check-input"
                type="checkbox"
                checked
                id={`${id}`}
                onChange={(e) => isActiveOnChange(e)}
              /> 
              :
              <input
                value={`${isActive}`}
                className="form-check-input"
                type="checkbox"
                id={`${id}`}
                onChange={(e) => isActiveOnChange(e)}
              /> 
            }
            {/* <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Checked switch checkbox input</label> */}
          </div>
          {/* <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(e)=> isActiveOnChange(e)}  value={'prueba'}/>
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Default switch checkbox input</label>
      </div> */}
        </td>

        <td>
          <button
              onClick={(e)=> handleClickReset(e)}
            type="button"
            className="btn btn-warning btn-sm"
          >
            Reset
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default UserDetail;


/// mensaje de error, genera problemas a la hora de actualizar 

      // console.log(e.target.id);
      
      // setUserUpdate({...userUpdate , role: e.target.value})
      // swal({
      //   title: "Are you sure?",
      //   text: "Do you want to change this user role?",
      //   icon: "warning",
      //   dangerMode: true,
      //   buttons: {
      //     cancel: true,
      //     confirm: true
      //   }
      // }).then( (value) => {
      //   if (value) {
      //     if ( e.target.value === 'admin') {
      //       dispatch(adminEditUser( e.target.id ,{
      //         role : 'admin',
      //         isActive,
      //         needsPasswordReset
      //       }))
      //       console.log(e.target)
      //     } else {
      //       dispatch(adminEditUser( e.target.id ,{
      //         role : 'user',
      //         isActive,
      //         needsPasswordReset
      //       }));
      //     }
      //     swal({
      //       text: "Role changed",
      //       icon: "success"
      //     })
      //   }
      // })
