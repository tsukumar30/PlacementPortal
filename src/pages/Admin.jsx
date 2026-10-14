import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Admin() {
  const navigate = useNavigate()

  const handleAdminLogout = () => {
    localStorage.removeItem('adminLoggedIn')

    alert('Admin logged out successfully!')

    navigate('/admin-login')
  }

  const [jobs] = useState(
    JSON.parse(localStorage.getItem('jobs')) || []
  )

  const [applications] = useState(
    JSON.parse(localStorage.getItem('applications')) || []
  )

  const studentAccounts =
    JSON.parse(localStorage.getItem('studentAccounts')) || []

  const totalStudents = studentAccounts.length
  const totalJobs = jobs.length
  const totalApplications = applications.length

  const totalShortlisted = applications.filter(
    (application) =>
      application.status === 'Shortlisted'
  ).length

  const totalSelected = applications.filter(
    (application) =>
      application.status === 'Selected'
  ).length

  const totalRejected = applications.filter(
    (application) =>
      application.status === 'Rejected'
  ).length

  const totalUnderReview = applications.filter(
    (application) =>
      application.status === 'Under Review'
  ).length

  const recentApplications = [...applications]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3)

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
              Admin Dashboard
            </h1>

            <p>
              Manage students, jobs, applications and placement
              activities from one place.
            </p>

          </div>

          <div>

            <Link
              to="/jobs"
              className="primary-btn"
            >
              View Jobs →
            </Link>

            <button
              type="button"
              className="login-btn"
              onClick={handleAdminLogout}
              style={{ marginLeft: '10px' }}
            >
              Admin Logout
            </button>

          </div>

        </section>

        {/* Main Statistics */}

        <section className="dashboard-stats">

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              👥
            </div>

            <div>
              <h2>{totalStudents}</h2>
              <p>Total Students</p>
            </div>

          </div>

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              💼
            </div>

            <div>
              <h2>{totalJobs}</h2>
              <p>Available Jobs</p>
            </div>

          </div>

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              📋
            </div>

            <div>
              <h2>{totalApplications}</h2>
              <p>Applications</p>
            </div>

          </div>

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              ⭐
            </div>

            <div>
              <h2>{totalShortlisted}</h2>
              <p>Shortlisted</p>
            </div>

          </div>

        </section>

        {/* Placement Overview */}

        <section className="dashboard-content">

          <div className="recent-applications">

            <div className="dashboard-section-heading">

              <div>

                <p className="dashboard-label">
                  PLACEMENT ANALYTICS
                </p>

                <h2>
                  Placement Overview
                </h2>

              </div>

            </div>

            <div className="admin-analytics-grid">

              <div className="admin-analytics-card">

                <span>
                  ⭐
                </span>

                <div>
                  <strong>
                    {totalShortlisted}
                  </strong>

                  <small>
                    Shortlisted
                  </small>
                </div>

              </div>

              <div className="admin-analytics-card">

                <span>
                  🏆
                </span>

                <div>
                  <strong>
                    {totalSelected}
                  </strong>

                  <small>
                    Selected
                  </small>
                </div>

              </div>

              <div className="admin-analytics-card">

                <span>
                  ⏳
                </span>

                <div>
                  <strong>
                    {totalUnderReview}
                  </strong>

                  <small>
                    Under Review
                  </small>
                </div>

              </div>

              <div className="admin-analytics-card">

                <span>
                  ❌
                </span>

                <div>
                  <strong>
                    {totalRejected}
                  </strong>

                  <small>
                    Rejected
                  </small>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Recent Applications */}

        <section className="dashboard-content">

          <div className="recent-applications">

            <div className="dashboard-section-heading">

              <div>

                <p className="dashboard-label">
                  RECENT ACTIVITY
                </p>

                <h2>
                  Recent Applications
                </h2>

              </div>

              <Link
                to="/admin/applications"
                className="primary-btn"
              >
                View All →
              </Link>

            </div>

            {recentApplications.length === 0 ? (

              <div className="empty-applications">

                <span>
                  📋
                </span>

                <h3>
                  No Applications Yet
                </h3>

                <p>
                  Student applications will appear here.
                </p>

              </div>

            ) : (

              recentApplications.map((application) => {

                const student =
                  studentAccounts.find(
                    (studentAccount) =>
                      studentAccount.email?.toLowerCase() ===
                      application.studentEmail?.toLowerCase()
                  )

                return (

                  <div
                    className="dashboard-action"
                    key={application.id}
                  >

                    <span>
                      👤
                    </span>

                    <div>

                      <strong>
                        {student?.name ||
                          application.name ||
                          'Student'}
                      </strong>

                      <small>
                        {application.jobTitle ||
                          'Job Application'}
                      </small>

                      <small>
                        {application.company ||
                          'Company not provided'}
                      </small>

                      <small>
                        Status: {application.status ||
                          'Applied'}
                      </small>

                    </div>

                    <b>
                      →
                    </b>

                  </div>

                )
              })

            )}

          </div>

        </section>

        {/* Quick Management */}

        <section className="dashboard-content">

          <div className="recent-applications">

            <div className="dashboard-section-heading">

              <div>

                <p className="dashboard-label">
                  ADMIN MANAGEMENT
                </p>

                <h2>
                  Quick Management
                </h2>

              </div>

            </div>

            <Link
              to="/admin/applications"
              className="dashboard-action"
            >

              <span>
                📋
              </span>

              <div>

                <strong>
                  Manage Applications
                </strong>

                <small>
                  View and update student applications
                </small>

              </div>

              <b>
                →
              </b>

            </Link>

            <Link
              to="/admin/jobs"
              className="dashboard-action"
            >

              <span>
                💼
              </span>

              <div>

                <strong>
                  Manage Jobs
                </strong>

                <small>
                  Add and manage placement opportunities
                </small>

              </div>

              <b>
                →
              </b>

            </Link>

            <Link
              to="/admin/students"
              className="dashboard-action"
            >

              <span>
                👥
              </span>

              <div>

                <strong>
                  Manage Students
                </strong>

                <small>
                  View registered student information
                </small>

              </div>

              <b>
                →
              </b>

            </Link>

          </div>

        </section>

      </main>

      <Footer />
    </>
  )
}

export default Admin