import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { useLocalStorage } from '../../../helpers/useLocalStorage'
import { getCountries } from '../../../redux/actions/countries'
import { getSingleUser, GetUSer, LogoutUser, updateUser } from '../../../redux/actions/user'
import { ICountries, IUser_Detail } from '../../../redux/interface'
import { State } from '../../../redux/reducers'
import { FormContainer } from '../../admin/createProduct/FormCreateStyles'

export interface EDIT_USER {
    name: string,
    surname: string,
    email: string,
    billing_address: string,
    default_shipping_address: string,
    CountryId: number | string,
}

export default function EditUserAccount(): JSX.Element {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allCountries = useSelector((state: State) => state.countries.countries)
    const user = useSelector((state: State) => state.userDetail.userDetail)
    const [userInStorage, setUserInStorage] = useLocalStorage('USER_LOGGED', '')
    const [editUser, setEditUser] = useState<EDIT_USER>({
        name: user.name,
        surname: user.surname,
        email: user.email,
        billing_address: user.billing_address,
        default_shipping_address: user.default_shipping_address,
        CountryId: user.countryCode,
    })

    useEffect(() => {
        dispatch(getCountries())
        dispatch(getSingleUser(userInStorage.token))
    }, [dispatch])

    const showError = (editUser: EDIT_USER): void => {
        if (editUser.name === "") (document.getElementById("error-name") as HTMLInputElement).textContent = "Name missing"
        else (document.getElementById("error-name") as HTMLInputElement).textContent = ""
        if (editUser.surname === "") (document.getElementById("error-surname") as HTMLInputElement).textContent = "Surname missing"
        else (document.getElementById("error-surname") as HTMLInputElement).textContent = ""
        if (editUser.email === "") (document.getElementById("error-email") as HTMLInputElement).textContent = "Email missing"
        else (document.getElementById("error-email") as HTMLInputElement).textContent = ""
        if (editUser.CountryId === 0) (document.getElementById("error-country") as HTMLSelectElement).textContent = "Country missing"
        else (document.getElementById("error-country") as HTMLSelectElement).textContent = ""
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void => {
        setEditUser({
            ...editUser,
            [e.target.name]: e.target.value
        })

        const idCountry = allCountries.find((country) => country.code === editUser.CountryId)
        if (idCountry) {
            setEditUser({ ...editUser, CountryId: idCountry.id })
        } else if (e.target.name === "CountryId") {
            let CountryName = allCountries.find((s: ICountries) => String(s.id) === e.target.value)
            if (CountryName) {
                setEditUser({
                    ...editUser,
                    billing_address: CountryName.name,
                    default_shipping_address: CountryName.name,
                    CountryId: Number(e.target.value)
                })
            }
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        if (editUser.name !== "" && editUser.surname !== "" && editUser.email !== "" && editUser.CountryId !== 0) {
            console.log(editUser)
            setTimeout(() => {
                dispatch(updateUser(userInStorage.token, editUser))
                dispatch(LogoutUser())
            }, 200)
            swal({
                title: "User edited.",
                text: "Log in again.",
                icon: "success"
            })
            navigate('/login')
        } else {
            showError(editUser)
            swal({
                title: "Fields missing",
                icon: "error"
            })
        }
    }
    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <h3 className="text-center">Edit user</h3>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <input className="form-control" type="text" placeholder="Enter name" name="name" value={editUser.name} onChange={(e) => handleChange(e)} />
                    <small id="error-name" className='text-danger'></small>
                </div>

                <div className="form-group me-1">
                    <label className="form-label mt-4">Surname</label>
                    <input className="form-control" type="text" placeholder="Enter surname" name="surname" value={editUser.surname} onChange={(e) => handleChange(e)} />
                    <small id="error-surname" className='text-danger'></small>
                </div>

                <div className="form-group">
                    <label className="form-label mt-4">Email</label>
                    <input className="form-control" type="email" placeholder="Enter email" name="email" value={editUser.email} onChange={(e) => handleChange(e)} />
                    <small id="error-email" className='text-danger'></small>
                </div>

                <div className="form-group">
                    <label className="form-label mt-4">Select your country</label>
                    <select className="form-select" name="CountryId" onChange={(e) => handleChange(e)}>
                        <option>Countries...</option>
                        {
                            allCountries.length > 0
                                ? allCountries.map((e: ICountries) => {
                                    return <option key={e.id} value={e.id}>{e.name}</option>
                                })
                                : <option>No countries for you...</option>
                        }
                    </select>
                    <small>{user.country} is your country</small>
                    <small id="error-country" className='text-danger'></small>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-outline-primary mt-5 ">Submit</button>
                </div>
            </form>
        </FormContainer>
    )
}