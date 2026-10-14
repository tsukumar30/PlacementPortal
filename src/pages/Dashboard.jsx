import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Dashboard() {
  const [applications, setApplications] = useState([])

  const loggedInUser =
    JSON.parse(localStorage.getItem('loggedInUser')) || {}

  const studentEmail = loggedInUser.email || ''

  const studentProfiles =
    JSON.parse(localStorage.getItem('studentProfiles')) || {}

  const oldProfile =
    JSON.parse(localStorage.getItem('studentProfile')) || {}

  const savedProfile =
    studentProfiles[studentEmail] || {}

  const userName =
    savedProfile.name ||
    loggedInUser.name ||
    oldProfile.name ||
    'Student'

  useEffect(() => {
    const savedApplications =
      JSON.parse(localStorage.getItem('applications')) || []

    const studentApplications =
      savedApplications.filter(
        (application) =>
          application.studentEmail?.toLowerCase() ===
          studentEmail.toLowerCase()
      )

    setApplications(studentApplications)
  }, [studentEmail])

  const totalApplications =
    applications.length

  const appliedCount =
    applications.filter(
      (application) =>
        application.status === 'Applied'
    ).length

  const reviewCount =
    applications.filter(
      (application) =>
        application.status === 'Under Review'
    ).length

  const shortlistedCount =
    applications.filter(
      (application) =>
        application.status === 'Shortlisted'
    ).length

  const selectedCount =
    applications.filter(
      (application) =>
        application.status === 'Selected'
    ).length

  const rejectedCount =
    applications.filter(
      (application) =>
        application.status === 'Rejected'
    ).length

  const recentApplications =
    [...applications]
      .sort((a, b) => b.id - a.id)
      .slice(0, 3)

  return (
    <>
      <Navbar />

      <main className="dashboard-page">

        {/* Premium Dashboard Header */}
        <section className="premium-page-header dashboard-welcome">
          <div className="header-grid"></div>

          <div className="premium-page-header-content dashboard-header-content">

            <div className="premium-page-badge">
              STUDENT DASHBOARD
            </div>

            <h1>
              Welcome Back, <span>{userName}</span> 👋
            </h1>

            <p>
              Track your placement journey and manage your
              applications from one place.
            </p>

            <div className="dashboard-header-action">
              <Link
                to="/jobs"
                className="primary-btn"
              >
                Explore Jobs →
              </Link>
            </div>

          </div>
        </section>


        {/* MAIN STATISTICS */}
        <section className="dashboard-stats">

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              📋
            </div>

            <div>
              <h2>
                {totalApplications}
              </h2>

              <p>
                Total Applications
              </p>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              🟢
            </div>

            <div>
              <h2>
                {appliedCount}
              </h2>

              <p>
                Applied
              </p>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              🔎
            </div>

            <div>
              <h2>
                {reviewCount}
              </h2>

              <p>
                Under Review
              </p>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              ⭐
            </div>

            <div>
              <h2>
                {shortlistedCount}
              </h2>

              <p>
                Shortlisted
              </p>
            </div>

          </div>

        </section>


        {/* PLACEMENT STATUS */}
        <section className="dashboard-content">

          <div className="recent-applications">

            <div className="dashboard-section-heading">

              <div>

                <p className="dashboard-label">
                  PLACEMENT STATUS
                </p>

                <h2>
                  Application Overview
                </h2>

              </div>

            </div>


            <div className="student-status-grid">

              <div className="student-status-card">

                <span>
                  🏆
                </span>

                <div>
                  <strong>
                    {selectedCount}
                  </strong>

                  <small>
                    Selected
                  </small>
                </div>

              </div>


              <div className="student-status-card">

                <span>
                  ⭐
                </span>

                <div>
                  <strong>
                    {shortlistedCount}
                  </strong>

                  <small>
                    Shortlisted
                  </small>
                </div>

              </div>


              <div className="student-status-card">

                <span>
                  ⏳
                </span>

                <div>
                  <strong>
                    {reviewCount}
                  </strong>

                  <small>
                    Under Review
                  </small>
                </div>

              </div>


              <div className="student-status-card">

                <span>
                  ❌
                </span>

                <div>
                  <strong>
                    {rejectedCount}
                  </strong>

                  <small>
                    Rejected
                  </small>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* MAIN CONTENT */}
        <section className="dashboard-content">

          {/* RECENT APPLICATIONS */}
          <div className="recent-applications">

            <div className="dashboard-section-heading">

              <div>

                <p className="dashboard-label">
                  APPLICATION ACTIVITY
                </p>

                <h2>
                  Recent Applications
                </h2>

              </div>

              <Link
                to="/applications"
                className="dashboard-view-link"
              >
                View All →
              </Link>

            </div>


            {recentApplications.length > 0 ? (

              <div className="dashboard-application-list">

                {recentApplications.map(
                  (application) => (

                    <div
                      className="dashboard-application"
                      key={application.id}
                    >

                      <div className="dashboard-company-icon">
                        🏢
                      </div>

                      <div className="dashboard-application-info">

                        <h3>
                          {application.jobTitle ||
                            'Job Application'}
                        </h3>

                        <p>
                          {application.company ||
                            'Company not provided'}
                        </p>

                        <div className="dashboard-application-meta">

                          <span>
                            📍 {application.location ||
                              'Location not provided'}
                          </span>

                          <span>
                            📅 {application.appliedDate ||
                              'Date not available'}
                          </span>

                        </div>

                      </div>


                      <span
                        className={`status ${
                          application.status
                            ?.toLowerCase()
                            .replace(/\s+/g, '-')
                        }`}
                      >
                        {application.status ||
                          'Applied'}
                      </span>

                    </div>

                  )
                )}

              </div>

            ) : (

              <div className="dashboard-empty">

                <div>
                  📋
                </div>

                <h3>
                  No applications yet
                </h3>

                <p>
                  Start exploring jobs and apply for your
                  first opportunity.
                </p>

                <Link
                  to="/jobs"
                  className="primary-btn"
                >
                  Browse Jobs
                </Link>

              </div>

            )}

          </div>


          {/* QUICK ACTIONS */}
          <aside className="dashboard-actions">

            <p className="dashboard-label">
              QUICK ACTIONS
            </p>

            <h2>
              What would you like to do?
            </h2>


            <Link
              to="/jobs"
              className="dashboard-action"
            >

              <span>
                💼
              </span>

              <div>
                <strong>
                  Browse Jobs
                </strong>

                <small>
                  Find new opportunities
                </small>
              </div>

              <b>
                →
              </b>

            </Link>


            <Link
              to="/applications"
              className="dashboard-action"
            >

              <span>
                📋
              </span>

              <div>
                <strong>
                  My Applications
                </strong>

                <small>
                  Track your applications
                </small>
              </div>

              <b>
                →
              </b>

            </Link>


            <Link
              to="/profile"
              className="dashboard-action"
            >

              <span>
                👤
              </span>

              <div>
                <strong>
                  My Profile
                </strong>

                <small>
                  Manage your profile
                </small>
              </div>

              <b>
                →
              </b>

            </Link>

          </aside>

        </section>

      </main>

      <Footer />
    </>
  )
}

export default Dashboard