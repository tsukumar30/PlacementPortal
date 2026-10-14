import { useState } from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function AdminStudents() {
  const [students, setStudents] = useState(() => {
    const accounts =
      JSON.parse(localStorage.getItem('studentAccounts')) || []

    const oldAccount =
      JSON.parse(localStorage.getItem('studentAccount')) || null

    const studentProfiles =
      JSON.parse(localStorage.getItem('studentProfiles')) || {}

    const allAccounts = [...accounts]

    // Include old account if it is not already in the accounts list
    if (
      oldAccount &&
      !allAccounts.some(
        (account) =>
          account.email?.toLowerCase() ===
          oldAccount.email?.toLowerCase()
      )
    ) {
      allAccounts.push(oldAccount)
    }

    return allAccounts.map((account) => {
      const profile =
        studentProfiles[account.email] || {}

      return {
        name: account.name,
        email: account.email,
        phone: profile.phone || 'Not provided',
        college: profile.college || 'Not provided',
        degree: profile.degree || 'Not provided',
        graduationYear:
          profile.graduationYear || 'Not provided',
      }
    })
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [degreeFilter, setDegreeFilter] = useState('All')

  const handleRemove = (email) => {
    const updatedStudents = students.filter(
      (student) => student.email !== email
    )

    setStudents(updatedStudents)

    // Remove account from studentAccounts
    const accounts =
      JSON.parse(localStorage.getItem('studentAccounts')) || []

    const updatedAccounts = accounts.filter(
      (account) =>
        account.email?.toLowerCase() !==
        email?.toLowerCase()
    )

    localStorage.setItem(
      'studentAccounts',
      JSON.stringify(updatedAccounts)
    )

    // Remove profile
    const studentProfiles =
      JSON.parse(localStorage.getItem('studentProfiles')) || {}

    const updatedProfiles = {
      ...studentProfiles,
    }

    delete updatedProfiles[email]

    localStorage.setItem(
      'studentProfiles',
      JSON.stringify(updatedProfiles)
    )
  }

  const filteredStudents = students.filter((student) => {
    const searchText =
      searchTerm.toLowerCase()

    const matchesSearch =
      student.name
        ?.toLowerCase()
        .includes(searchText) ||
      student.email
        ?.toLowerCase()
        .includes(searchText) ||
      student.college
        ?.toLowerCase()
        .includes(searchText) ||
      student.degree
        ?.toLowerCase()
        .includes(searchText)

    const matchesDegree =
      degreeFilter === 'All' ||
      student.degree === degreeFilter

    return matchesSearch && matchesDegree
  })

  const degreeOptions = [
    ...new Set(
      students
        .map((student) => student.degree)
        .filter(
          (degree) =>
            degree &&
            degree !== 'Not provided'
        )
    ),
  ]

  return (
    <>
      <Navbar />

      <main className="dashboard-page">

        {/* Admin Welcome */}

        <section className="dashboard-welcome">

          <div>

            <p className="hero-small-text">
              ADMIN PORTAL
            </p>

            <h1>
              Manage Students
            </h1>

            <p>
              View registered student information and placement
              details.
            </p>

          </div>

          <Link
            to="/admin"
            className="primary-btn"
          >
            ← Admin Dashboard
          </Link>

        </section>

        <section className="dashboard-content">

          <div className="recent-applications">

            {/* Heading */}

            <div className="dashboard-section-heading">

              <div>

                <p className="dashboard-label">
                  STUDENT MANAGEMENT
                </p>

                <h2>
                  Registered Students
                </h2>

              </div>

              <span className="application-count">
                {students.length} Students
              </span>

            </div>

            {/* Search and Filter */}

            {students.length > 0 && (
              <div className="application-filters">

                <input
                  type="text"
                  placeholder="Search name, email, college or degree..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                />

                <select
                  value={degreeFilter}
                  onChange={(event) =>
                    setDegreeFilter(
                      event.target.value
                    )
                  }
                >

                  <option value="All">
                    All Degrees
                  </option>

                  {degreeOptions.map((degree) => (
                    <option
                      value={degree}
                      key={degree}
                    >
                      {degree}
                    </option>
                  ))}

                </select>

                <button
                  type="button"
                  className="clear-filter-btn"
                  onClick={() => {
                    setSearchTerm('')
                    setDegreeFilter('All')
                  }}
                >
                  Clear Filters
                </button>

              </div>
            )}

            {/* No Students */}

            {students.length === 0 ? (

              <div className="empty-applications">

                <span>👥</span>

                <h3>
                  No Students Registered
                </h3>

                <p>
                  Registered students will appear here.
                </p>

              </div>

            ) : filteredStudents.length === 0 ? (

              <div className="empty-applications">

                <span>🔍</span>

                <h3>
                  No Students Found
                </h3>

                <p>
                  Try changing your search or degree filter.
                </p>

              </div>

            ) : (

              /* Student Cards */

              filteredStudents.map((student) => (

                <div
                  className="dashboard-action"
                  key={student.email}
                >

                  <span>
                    👤
                  </span>

                  <div>

                    <strong>
                      {student.name}
                    </strong>

                    <small>
                      Email: {student.email}
                    </small>

                    <small>
                      Phone: {student.phone}
                    </small>

                    <small>
                      College: {student.college}
                    </small>

                    <small>
                      Degree: {student.degree}
                    </small>

                    <small>
                      Graduation Year: {
                        student.graduationYear
                      }
                    </small>

                  </div>

                  <button
                    type="button"
                    className="login-btn"
                    onClick={() =>
                      handleRemove(student.email)
                    }
                  >
                    Remove
                  </button>

                </div>

              ))

            )}

          </div>

        </section>

      </main>

      <Footer />
    </>
  )
}

export default AdminStudents