import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import swal from 'sweetalert'
import { useLocalStorage } from '../../../../helpers/useLocalStorage'
import { deleteCategory, deleteSubcategory, getCategories, getSubcategories } from '../../../../redux/actions/categories'
import { Category } from '../../../../redux/interface'
import { State } from '../../../../redux/reducers'
import { FormContainer } from '../../createProduct/FormCreateStyles'

export interface CATEGORIES {
    category: number;
    subcategory: number;
}

export default function DeleteCateogires(): JSX.Element {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allCategories = useSelector((state: State) => state.categories.categories)
    const allSubcategories = useSelector((state: State) => state.categories.subcategories)
    const [userInStorage, setUserInStorage] = useLocalStorage('USER_LOGGED', '')
    const [categories, setCategories] = useState<CATEGORIES>({
        category: 0,
        subcategory: 0
    })
    let onlyCategories: any = [];

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getSubcategories())
    }, [])

    if (allCategories.length > 0) {
        let sub = allSubcategories.map(e => e.CategoryId)
        let unicsSub: any = new Set(sub)
        let result = [...unicsSub]
        let newArr = []
        for (let i in allCategories) {
            if (!result.includes(allCategories[i].id)) {
                newArr.push(allCategories[i].id)
            }
        }

        for (let i in newArr) {
            for (let j in allCategories) {
                if (Number(newArr[i]) === Number(allCategories[j].id)) {
                    onlyCategories.push(allCategories[j])
                }
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setCategories({
            ...categories,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (categories.subcategory !== 0) {
            dispatch(deleteSubcategory(String(categories.subcategory), userInStorage.token))
            swal({
                title: 'Deleted subcategory',
                icon: 'success'
            })
            setTimeout(() => {
                navigate('/productsAdminMode')
            }, 1000)
        }
        else if (categories.category !== 0) {
            dispatch(deleteCategory(String(categories.category), userInStorage.token))
            swal({
                title: 'Deleted category',
                icon: 'success'
            })
            setTimeout(() => {
                navigate('/productsAdminMode')
            }, 1000)
        } else {
            swal({
                title: 'Not selected any categoriy or subcategory',
                icon: 'error'
            })
        }

    }

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <h3 className='text-center'>Delete category</h3>
                <small className='form-text text-muted'>Only categories and subcategories without any connected product will be removed</small><br />
                <small className='form-text text-muted'>If there are no categories it is because they are all connected to a subcategory</small>

                <div className='form-group flex-fill ms-2'>
                    <label className="form-label mt-4">Delete Categories</label>

                    <select
                        onChange={(e) => handleChange(e)}
                        className="form-select"
                        id="exampleSelect1"
                        name="category"
                    >
                        <option hidden>Select category</option>
                        {
                            allCategories.length > 0
                                ? onlyCategories.map((e: Category) => { return <option key={e.id} value={e.id}>{e.name}</option> })
                                : <option>Not categories without any connected</option>
                        }
                    </select>

                </div>
                <div className='form-group flex-fill ms-2'>
                    <label className="form-label mt-4">Delete Subcategories</label>
                    <select
                        onChange={(e) => handleChange(e)}
                        className="form-select"
                        id="exampleSelect1"
                        name="subcategory"
                    >
                        <option hidden>Select subcategory</option>
                        {
                            allSubcategories.length > 0
                                ? allSubcategories.map((e: Category) => { return <option key={e.id} value={e.id}>{e.name}</option> })
                                : <option>Not subcategories created</option>
                        }
                    </select>
                </div>
                <div className='text-center'>
                    <button type='submit' className='btn btn-outline-primary mt-5'>Submit</button>
                </div>
            </form>
        </FormContainer>
    )
}