import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('loggedInUser')
  )

  const loggedInUser =
    JSON.parse(localStorage.getItem('loggedInUser')) || {}

  const userName =
    loggedInUser.name || 'Profile'

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')

    setIsLoggedIn(false)

    alert('Logged out successfully!')

    navigate('/login')
  }

  const isActive = (path) => {
    return location.pathname === path
      ? 'active-nav-link'
      : ''
  }

  return (
    <nav className="navbar">

      {/* LOGO */}

      <Link
        to="/"
        className="logo"
      >
        Placement<span>Pro</span>
      </Link>

      {/* NAVIGATION */}

      <div className="nav-links">

        <Link
          to="/"
          className={isActive('/')}
        >
          Home
        </Link>

        <Link
          to="/jobs"
          className={isActive('/jobs')}
        >
          Jobs
        </Link>

        <Link
          to="/about"
          className={isActive('/about')}
        >
          About
        </Link>

        <Link
          to="/contact"
          className={isActive('/contact')}
        >
          Contact
        </Link>

      </div>

      {/* USER ACTIONS */}

      {isLoggedIn ? (

        <div className="navbar-user-actions">

          <Link
            to="/profile"
            className={`profile-nav-link ${
              location.pathname === '/profile'
                ? 'active-profile-link'
                : ''
            }`}
          >
            <span className="profile-nav-icon">
              👤
            </span>

            <span>
              {userName}
            </span>
          </Link>

          <button
            type="button"
            className="login-btn navbar-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      ) : (

        <Link
          to="/login"
          className="login-btn navbar-login-btn"
        >
          Student Login
        </Link>

      )}

    </nav>
  )
}

export default Navbar