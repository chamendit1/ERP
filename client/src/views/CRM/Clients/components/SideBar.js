import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import './SideBar.css'

const SideBar = () => {

  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])


    if(!user) return null

    return (
        <div>
          <nav className="sidebar">

              <ul className="sidebar-nav">


              <li class="side-item">
                  <Link to="/dashboard" className="side-link">
                    <span class="link-text">Dashboard</span>
                  </Link>
                </li>

                <li class="side-item">
                  <Link to="/customers" className="side-link">
                    <span class="link-text">Customers</span>
                  </Link>
                </li>

                <li class="side-item">
                  <Link to="/invoices" className="side-link">
                    <span class="link-text">Invoices</span>
                  </Link>
                </li>

                <li class="side-item">
                  <Link to="/orders" className="side-link">
                    <span class="link-text">Orders</span>
                  </Link>
                </li>


                <li class="side-item">
                  <Link to="/settings" className="side-link">
                    <span class="link-text">Settings</span>
                  </Link>
                </li>

                <li class="side-item">
                  <Link to="/inventories" className="side-link">
                    <span class="link-text">Inventory</span>
                  </Link>
                </li>

                <li class="side-item">
                  <Link to="/manufacturing" className="side-link">
                    <span class="link-text">Manufacturing</span>
                  </Link>
                </li>
            </ul>
          </nav>
        </div>
    )
}

export default SideBar
