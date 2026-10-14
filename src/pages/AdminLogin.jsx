import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function AdminLogin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    const adminEmail = 'admin@placementpro.com'
    const adminPassword = 'admin123'

    if (
      email.toLowerCase() === adminEmail &&
      password === adminPassword
    ) {
      localStorage.setItem(
        'adminLoggedIn',
        'true'
      )

      alert('Admin login successful!')

      navigate('/admin')
    } else {
      alert('Invalid admin email or password.')
    }
  }

  return (
    <>
      <Navbar />

      <main className="login-page">

        <section className="login-section">

          <div className="login-card">

            <div className="login-heading">

              <p className="hero-small-text">
                ADMIN PORTAL
              </p>

              <h1>
                Admin Login
              </h1>

              <p>
                Login to manage students, jobs and applications.
              </p>

            </div>

            <form
              className="login-form"
              onSubmit={handleLogin}
            >

              <div className="form-group">

                <label>
                  Admin Email
                </label>

                <input
                  type="email"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                />

              </div>

              <button
                type="submit"
                className="primary-btn login-submit"
              >
                Admin Login
              </button>

            </form>

          </div>

        </section>

      </main>

      <Footer />
    </>
  )
}

export default AdminLogin