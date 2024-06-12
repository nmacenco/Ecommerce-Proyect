import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAdmin, orderHistoryStatus, resetOrdersAdmin } from "../../../redux/actions/ordersAdmin";
import OrderAdminRow from "./orderAdminRow/OrderAdminRow";
import { Accordion, Container, Overflow, Table } from "./OrderAdminStyles";
import { State } from "../../../redux/reducers";
import { useLocalStorage } from "../../../helpers/useLocalStorage";

const OrdersAdmin = (): JSX.Element => {
  const dispatch = useDispatch()
  const [userInStorage, setuserInStorage] = useLocalStorage('USER_LOGGED', '')
  const allOrders = useSelector((state: State) => state.ordersAdmin.orders);
  const orders = allOrders.filter(order => order.status !== "PENDING")

  useEffect(() => {
    dispatch(getOrdersAdmin(userInStorage!.token))
    return () => {
      dispatch(resetOrdersAdmin())
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault()
    dispatch(orderHistoryStatus(e.target.value))
  }

  const statusArray: string[] = ['BILLED', 'CANCELED', 'DISPATCHED', 'FINISHED', 'ALL ORDERS']

  return (
    <Container>
      <Accordion className="accordion" id="accordionExample">
        <h3 className="text-center mt-5">Admin Orders</h3>
        <div className="d-flex mt-5">
          <label className="input-group-text">Status: </label>
          <select
            className="custom-select"
            onChange={handleChange}
          >STATUS
            {
              statusArray.map((status: string, i: number) => {
                return <option key={i} value={status}>{status}</option>
              })
            }
          </select>
        </div>
        {orders.length > 0 ? <>
          <Overflow>
            <Table className="table table-hover mt-5">
              <thead>
                <tr>
                  <th scope="col">STATUS</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">ADRESS</th>
                  <th scope="col">TOTAL</th>
                </tr>
              </thead>
              {orders.map(order => {
                return <OrderAdminRow
                  key={order.id}
                  id={order.id}
                  total={order.total_amount}
                  email_address={order.email_address}
                  status={order.status}
                  details={order.details}
                  billing_address={order.shipping_address}
                />
              })}
            </Table>
          </Overflow>
        </> : <h5 className="text-center mt-5 pt-5">Not orders done yet.</h5>}

      </Accordion>

    </Container>
  );
};

export default OrdersAdmin;
