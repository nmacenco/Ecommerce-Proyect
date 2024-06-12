import { TYPES_ADMIN, Order, AdminActions } from "../interface";

export interface ORDERS {
    orders: Order[],
    copyOrders: Order[],
}
const INITIAL_STATE = {
    orders: [],
    copyOrders: [],
};


export const ordersAdminReducer = (state: ORDERS = INITIAL_STATE, action: AdminActions): any => {
    switch (action.type) {
        case TYPES_ADMIN.GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                copyOrders: action.payload,
            }
        case TYPES_ADMIN.RESET_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case TYPES_ADMIN.O_ORDERS:
            let newOrder: Order[] = []
            newOrder = state.copyOrders.filter((e: Order) => e.status.toLowerCase() === action.payload.toLowerCase())
            if (action.payload.toUpperCase() === 'ALL ORDERS') {
                newOrder = state.copyOrders
            }


            return {
                ...state,
                orders: newOrder
            }
        default: {
            return {
                ...state
            }
        }
    }
};