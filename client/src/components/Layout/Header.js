import React from 'react';
import { NavLink, Link } from "react-router-dom"
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../../context/auth';
import SearchInput from '../Forms/SearchInput';

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      user: null,
      token: ''

    })
    localStorage.removeItem("auth");
    alert("Logout Successfully")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand"> <ShoppingBagOutlinedIcon style={{ fontSize: '35px', paddingBottom: '2px' }} /> Muzammil's Market</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to='/' className="nav-link" aria-current="page">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/category' className="nav-link" aria-current="page">Category</NavLink>
              </li>
              {
                !auth.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink to='/register' className="nav-link">Register</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to='/login' className="nav-link">Login</NavLink>
                    </li>
                  </>
                ) :
                  (
                    <>
                      <li className="nav-item dropdown">
                        <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          {auth?.user?.name}
                        </NavLink>
                        <ul className="dropdown-menu">
                          <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>Dashboard</NavLink></li>
                          <li><NavLink onClick={handleLogout} to='/login' className="dropdown-item">Logout</NavLink></li>
                        </ul>
                      </li>
                    </>
                  )
              }
              <li className="nav-item">
                <NavLink to='/cart' className="nav-link"><ShoppingCartIcon />(0)</NavLink>
              </li>

            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header