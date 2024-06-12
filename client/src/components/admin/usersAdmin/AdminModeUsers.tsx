import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetUsers } from "../../../redux/actions/adminUser";
import { AdminUsersContainer, ListContainer } from "./AdminModeUsersStyles";
import { State } from "../../../redux/reducers/index";
import { Users } from "../../../redux/interface";
import UserDetail from "./userDetail/UserDetail";
import { useLocalStorage } from "../../../helpers/useLocalStorage";

const AdminUserMode = (): JSX.Element => {
  const dispatch = useDispatch()
  const users = useSelector((state: State) => state.adminUsers.users);
  const [Admorders, setAdmOrders] = useState<string>("");
  const [userInStorage, setuserInStorage] = useLocalStorage('USER_LOGGED', '')

  useEffect(() => {
    setTimeout(() => {
      dispatch(adminGetUsers(userInStorage.token))

    }, 200)
  }, [Admorders])

  const AdmOrders = (typeorder: string): void => {
    setAdmOrders(typeorder);
  };



  return (
    <AdminUsersContainer>
      <ListContainer >
        <h3>User Controller</h3>
        <div className="mt-4" >
          <table className="table table-hover ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
                <th scope="col">IsActive</th>
                <th scope="col">Password Reset </th>
              </tr>
            </thead>
            {
              users.map((user: Users) => {
                if (user.email !== userInStorage.email) {
                  return (
                    <UserDetail
                      key={user.id}
                      id={user.id}
                      surname={user.surname}
                      password={user.password}
                      name={user.name}
                      email={user.email}
                      billing_address={user.billing_address}
                      default_shipping_address={user.default_shipping_address}
                      role={user.role}
                      isActive={user.isActive}
                      country={user.country}
                      countryCode={user.countryCode}
                      CountryId={user.CountryId}
                      needsPasswordReset={user.needsPasswordReset}
                      AdmOrders={AdmOrders}
                    />
                  );
                }
              })}
          </table>
        </div>

      </ListContainer>

    </AdminUsersContainer>
  )
}

export default AdminUserMode; 