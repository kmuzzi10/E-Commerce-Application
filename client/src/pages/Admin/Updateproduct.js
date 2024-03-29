import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios"
import AdminMenu from '../../components/Layout/AdminPages/AdminMenu'
import { Select } from "antd"
import { useNavigate, useParams } from 'react-router-dom'
const { Option } = Select
const Updateproduct = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [photo, setPhoto] = useState("")
    const [id, setId] = useState("")



    //get singlr product

    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            setName(data.product.name)
            setId(data.product._id)
            setDescription(data.product.description)
            setPrice(data.product.price)
            setQuantity(data.product.quantity)
            setShipping(data.product.shipping)
            setCategory(data.product.category._id)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getSingleProduct()
    }, [])
    //get category

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (err) {
            console.log(err)
            alert('Something went wrong in getting categories')
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    //update product
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            photo && productData.append("photo", photo)
            productData.append("category", category)
            const { data } = axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData)
            if (data?.success) {
                alert(data?.message)
            } else {

                alert("Product Updated Successfully")
                navigate('/dashboard/admin/products')
            }
        } catch (error) {
            console.log(error)
            alert('Something Went Wrong')
        }
    }

    //delete product

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            let answer = window.prompt('Are you sure want to delete this product')
            if(!answer) return ;
         const {data} = axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)
         alert("product deleted successfully")
         navigate(`/dashboard/admin/products`)
        } catch (err) {
            console.log(err)
            alert("Something Went Wrong")
        }
    }
    return (
        <Layout title={'Update product'}>
            <div className='fluid-container m-3 p-3'>
                <div className='row'>
                    <div className='col-lg-3 col-md-4 col-sm-4'>
                        <AdminMenu />
                    </div>
                    <div className='col-lg-9 col-md-8 col-sm-8'>
                        <h1>Update Product</h1>
                        <div className='m-1 w-75'>
                            <Select bordered={false} placeholder="Select a category" size='large' showSearch className='form-control mb-3' onChange={(value) => { setCategory(value) }} value={category}>
                                {
                                    categories?.map(c => (
                                        <Option key={c._id} value={c._id}>
                                            {c.name}
                                        </Option>
                                    ))
                                }

                            </Select>
                            <div className='mb-3'>
                                <label className='btn btn-outline-secondary'>
                                    {photo ? photo.name : "Upload Photo"}
                                    <input type='file' name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo ? (
                                    <div className='text-center'>
                                        <img src={URL.createObjectURL(photo)} alt="product-photo" height={'200px'} className='img img-responsive' />

                                    </div>
                                ) : (
                                    <div className='text-center'>
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`} alt="product-photo" height={'200px'} className='img img-responsive' />

                                    </div>
                                )}
                            </div>
                            <div className='mb-3'>
                                <input type='text' placeholder='Enter Name of Product' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div
                                className='mb-3'>  <textarea type='text' placeholder='Enter Description of Product' className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div
                                className='mb-3'>  <input type='number' placeholder='Enter Price of Product' className='form-control' value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div
                                className='mb-3'> <input type='number' placeholder='Enter Quantity of Product' className='form-control' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div
                                className='mb-3'>
                                <Select bordered={false} placeholder='Select Shipping' size='large' showSearch className='form-control' onChange={(value) => setShipping(value)} value={shipping ? "yes" : "no"} >
                                    <Option value='0'>
                                        No
                                    </Option>
                                    <Option value='1'>
                                        Yes
                                    </Option>
                                </Select>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-primary' onClick={handleUpdate}>Update Product</button>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-danger' onClick={handleDelete}>Delete Product</button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Updateproduct