import React from 'react'
import { useSearch } from '../../context/search'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
const SearchInput = () => {

    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`)
            setValues({ ...values, results: data })
            navigate('/search')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={values.keyword} onChange={(e) => setValues({ ...values, keyword: e.target.value })} />
                <button className="btn btn-secondary-success" type="submit"> <SearchIcon /></button>
            </form>

        </div>
    )
}

export default SearchInput