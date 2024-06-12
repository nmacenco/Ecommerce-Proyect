import { EDIT_USER } from "../../components/users/editAccount/EditUserAccount";
import { IUser_Detail, TYPES_USER, UserActions } from "../interface";

export interface USER_STATE {
    userDetail: IUser_Detail
}

const INITIAL_STATE = {
    userDetail: {  name: '',
        surname: '',
        email: '',
        billing_address: '',
        default_shipping_address: '',
        country: '',
        countryCode: 0 }
}


export const userDetailReducer = (state: USER_STATE = INITIAL_STATE, action: UserActions): USER_STATE => {
    switch (action.type) {
        case TYPES_USER.GET_SINGLE_USER:
            return {
                ...state,
                userDetail: action.payload
            }

        default: return {
            ...state
        }
    }


}