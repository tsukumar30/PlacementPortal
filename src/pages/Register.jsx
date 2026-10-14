import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = (event) => {
    event.preventDefault()

    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      alert('Please fill in all fields.')
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.')
      return
    }

    const existingAccounts =
      JSON.parse(localStorage.getItem('studentAccounts')) || []

    const oldAccount =
      JSON.parse(localStorage.getItem('studentAccount')) || null

    // Include the old account if it exists
    const allAccounts = [...existingAccounts]

    if (
      oldAccount &&
      !allAccounts.some(
        (account) => account.email === oldAccount.email
      )
    ) {
      allAccounts.push(oldAccount)
    }

    const accountExists = allAccounts.some(
      (account) =>
        account.email.toLowerCase() === email.toLowerCase()
    )

    if (accountExists) {
      alert('An account with this email already exists.')
      return
    }

    const studentAccount = {
      name: name,
      email: email,
      password: password,
    }

    const updatedAccounts = [
      ...allAccounts,
      studentAccount,
    ]

    localStorage.setItem(
      'studentAccounts',
      JSON.stringify(updatedAccounts)
    )

    // Keep the latest account for compatibility
    localStorage.setItem(
      'studentAccount',
      JSON.stringify(studentAccount)
    )

    localStorage.setItem(
      'studentProfile',
      JSON.stringify({
        name: name,
        email: email,
      })
    )

    alert('Account created successfully!')

    navigate('/login')
  }

  return (
    <>
      <Navbar />

      <main className="login-page">

        {/* Premium Header */}
        <section className="premium-page-header register-header">
          <div className="header-grid"></div>

          <div className="premium-page-header-content">

            <div className="premium-page-badge">
              STUDENT PORTAL
            </div>

            <h1>
              Create <span>Your Account</span>
            </h1>

            <p>
              Create your student account and start exploring
              placement opportunities.
            </p>

          </div>
        </section>


        {/* Registration Section */}
        <section className="login-section">

          <div className="login-card">

            <div className="login-heading">

              <div className="login-icon">
                ✨
              </div>

              <h2>
                Create Account
              </h2>

              <p>
                Fill in your details to get started.
              </p>

            </div>


            <form
              className="login-form"
              onSubmit={handleRegister}
            >

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                />

              </div>


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
                  placeholder="Create a password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  required
                />

              </div>


              <button
                type="submit"
                className="primary-btn login-submit"
              >
                Create Account
              </button>


              <p className="register-text">
                Already have an account?

                <Link to="/login">
                  Login
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

export default Register