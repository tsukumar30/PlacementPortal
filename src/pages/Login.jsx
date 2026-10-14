import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    const studentAccounts =
      JSON.parse(localStorage.getItem('studentAccounts')) || []

    const oldAccount =
      JSON.parse(localStorage.getItem('studentAccount')) || null

    // Include old account if it exists
    const allAccounts = [...studentAccounts]

    if (
      oldAccount &&
      !allAccounts.some(
        (account) =>
          account.email.toLowerCase() ===
          oldAccount.email.toLowerCase()
      )
    ) {
      allAccounts.push(oldAccount)
    }

    const matchedAccount = allAccounts.find(
      (account) =>
        account.email.toLowerCase() === email.toLowerCase() &&
        account.password === password
    )

    if (!matchedAccount) {
      alert('Invalid email or password.')
      return
    }

    localStorage.setItem(
      'loggedInUser',
      JSON.stringify(matchedAccount)
    )

    alert(`Welcome, ${matchedAccount.name}!`)

    navigate('/dashboard')
  }

  return (
    <>
      <Navbar />

      <main className="login-page">

        {/* Premium Header */}
        <section className="premium-page-header login-header">
          <div className="header-grid"></div>

          <div className="premium-page-header-content">

            <div className="premium-page-badge">
              STUDENT PORTAL
            </div>

            <h1>
              Welcome <span>Back</span>
            </h1>

            <p>
              Login to access your placement opportunities,
              applications, and student dashboard.
            </p>

          </div>
        </section>


        {/* Login Section */}
        <section className="login-section">

          <div className="login-card">

            <div className="login-heading">

              <div className="login-icon">
                👤
              </div>

              <h2>
                Student Login
              </h2>

              <p>
                Enter your account details to continue.
              </p>

            </div>


            <form
              className="login-form"
              onSubmit={handleLogin}
            >

              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
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
                Login
              </button>


              <p className="register-text">
                Don't have an account?

                <Link to="/register">
                  Create Account
                </Link>
              </p>

            </form>

          </div>

        </section>

      </main>

      <Footer />
    </>
  )
}

export default Login