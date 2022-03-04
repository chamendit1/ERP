import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

const NavBar = () => {

  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

    if(!user) return null


    const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    modeText = body.querySelector(".mode-text");


    function modeChange() {
      body.classList.toggle("dark");
      
      if(body.classList.contains("dark")){
          modeText.innerText = "Light mode";
      }else{
          modeText.innerText = "Dark mode";
          
      }
    }
    return (
        <div>
           <nav className="sidebar close" 
           onMouseEnter={() => sidebar.classList.toggle("close")}
           onMouseLeave={() => sidebar.classList.toggle("close")}>
           <header>
            <div class="image-text">
                  <span class="image"></span>
                  <div class="text logo-text">
                      <span class="name">Codinglab</span>
                      <span class="profession">Web developer</span>
                  </div>
            </div>

              <i class='bx bx-chevron-right toggle'></i>
          </header>

          <div class="menu-bar">
            <div class="menu">

              <li class="search-box">
                  <i class='bx bx-search icon'></i>
                  <input type="text" placeholder="Search..."></input>
              </li>

              <ul className="menu-links">

                <li className="nav-link">
                  <Link to="/dashboard" className="nav-link">
                    <i class='bx bx-home-alt icon' ></i>
                    <span class="text nav-text">Dashboard</span>
                  </Link>
                </li>

                <li class="nav-link">
                <Link to="/orders" className="nav-link">
                          <i class='bx bx-bar-chart-alt-2 icon' ></i>
                          <span class="text nav-text">Orders</span>
                          </Link>
                  </li>

                  <li class="nav-link">
                  <Link to="/dashboard" className="nav-link">
                          <i class='bx bx-bell icon'></i>
                          <span class="text nav-text">Notifications</span>
                          </Link>
                  </li>

                  <li class="nav-link">
                  <Link to="/dashboard" className="nav-link">
                          <i class='bx bx-pie-chart-alt icon' ></i>
                          <span class="text nav-text">Analytics</span>
                          </Link>
                  </li>

                  <li class="nav-link">
                  <Link to="/dashboard" className="nav-link">
                          <i class='bx bx-heart icon' ></i>
                          <span class="text nav-text">Likes</span>
                          </Link>
                  </li>

                  <li class="nav-link">
                      <Link to="/dashboard" className="nav-link">
                          <i class='bx bx-wallet icon' ></i>
                          <span class="text nav-text">Wallets</span>
                      </Link>
                  </li>

              </ul>
            </div>

            <div class="bottom-content">
                <li class="">
                  <Link to="/dashboard" className="nav-link">
                      <i class='bx bx-log-out icon' ></i>
                      <span class="text nav-text">Logout</span>
                  </Link>
                </li>

                <li class="mode">
                    <div class="sun-moon">
                        <i class='bx bx-moon icon moon'></i>
                        <i class='bx bx-sun icon sun'></i>
                    </div>
                    <span class="mode-text text">Dark mode</span>

                    <div class="toggle-switch">
                        <span class="switch" onClick={modeChange}></span>
                    </div>
                </li>
                
            </div>
          </div>
          </nav>
        </div>
    )
}

export default NavBar
