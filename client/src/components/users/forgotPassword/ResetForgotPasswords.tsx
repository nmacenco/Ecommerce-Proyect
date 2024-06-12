import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router';
import swal from 'sweetalert'
import { forgotPasswordReset, resetForgotPassword, resetPassword } from '../../../redux/actions/user';
import { FormContainer } from '../../admin/createProduct/FormCreateStyles'

export interface RESET_PASSWORD {
    password: string;
    passwordConfirm: string;
}

export default function ResetForcePassword(): JSX.Element {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useParams<string>()
    const [reset, setReset] = useState<RESET_PASSWORD>({
        password: "",
        passwordConfirm: ""
    })

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()
        setReset({
            ...reset,
            [e.target.name]: e.target.value
        })
        console.log(reset.password)
    }

    const handleShow = (password: string, passwordConfirm: string): void => {
        if (password.length < 8 || password.length > 20) {
            (document.getElementById("password") as HTMLInputElement).textContent = "Must be 8-20 characters long"
        } else (document.getElementById("password") as HTMLInputElement).textContent = ""

        if (password !== passwordConfirm) {
            (document.getElementById("passwordConfirm") as HTMLInputElement).textContent = "Passwords don't match"
        } else (document.getElementById("passwordConfirm") as HTMLInputElement).textContent = ""

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (reset.password !== "" && reset.passwordConfirm !== "") {
            handleShow(reset.password, reset.passwordConfirm)
            if (reset.password === reset.passwordConfirm && reset.password.length >= 8 && reset.password.length <= 20) {
                dispatch(resetForgotPassword(token, reset))
                swal({
                    title: "Reset password",
                    icon: "success"
                })

                navigate("/products") // PONER RUTA DE PERFIL DE USUARIO
            } else {
                swal({
                    title: "Don't match passwords",
                    icon: "error"
                })
            }
        } else {
            swal({
                title: "Fields missing",
                icon: "error"
            })
        }
    }

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <h3 className="text-center mb-5 mt-5">Forgot password</h3>
                <div className="form-group mt-3">
                    <label className="col-form-label">New password</label>
                    <input type="password" className="form-control" placeholder='Password' name="password" onChange={(e) => changePassword(e)} />
                    <small id="password" className="text-danger"></small>
                </div>
                <div className="form-group mt-3">
                    <label className="col-form-label">Repeat password</label>
                    <input type="password" className="form-control" placeholder='Repeat password' name="passwordConfirm" onChange={(e) => changePassword(e)} />
                    <small id="passwordConfirm" className="text-danger"></small>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-outline-primary mt-5 ">Submit</button>
                </div>
            </form>
        </FormContainer>
    )
}