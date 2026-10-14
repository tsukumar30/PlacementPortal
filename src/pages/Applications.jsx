import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Applications() {
  const [applications, setApplications] = useState([])
  const [selectedApplication, setSelectedApplication] =
    useState(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const loadApplications = () => {
    const loggedInUser =
      JSON.parse(localStorage.getItem('loggedInUser')) || {}

    const savedApplications =
      JSON.parse(localStorage.getItem('applications')) || []

    const studentApplications =
      savedApplications.filter(
        (application) =>
          application.studentEmail?.toLowerCase() ===
          loggedInUser.email?.toLowerCase()
      )

    setApplications(studentApplications)
  }

  useEffect(() => {
    loadApplications()

    const handleFocus = () => {
      loadApplications()
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  const closeApplication = () => {
    setSelectedApplication(null)
  }

  const getStatusClass = (status) => {
    return (
      status
        ?.toLowerCase()
        .replace(/\s+/g, '-') || 'applied'
    )
  }

  const getStatusStep = (status) => {
    switch (status) {
      case 'Applied':
        return 1
      case 'Under Review':
        return 2
      case 'Shortlisted':
        return 3
      case 'Selected':
        return 4
      case 'Rejected':
        return 0
      default:
        return 1
    }
  }

  const getStatusMessage = (status) => {
    switch (status) {
      case 'Under Review':
        return 'Your application is currently being reviewed by the placement team.'

      case 'Shortlisted':
        return 'Great news! You have been shortlisted for this opportunity.'

      case 'Selected':
        return 'Congratulations! You have been selected for this opportunity.'

      case 'Rejected':
        return 'Your application was not selected for this opportunity.'

      default:
        return 'Your application has been submitted successfully.'
    }
  }

  const filteredApplications =
    applications.filter((application) => {
      const searchText =
        searchTerm.toLowerCase().trim()

      const matchesSearch =
        application.jobTitle
          ?.toLowerCase()
          .includes(searchText) ||
        application.company
          ?.toLowerCase()
          .includes(searchText) ||
        application.location
          ?.toLowerCase()
          .includes(searchText)

      const matchesStatus =
        statusFilter === 'All' ||
        application.status === statusFilter

      return matchesSearch && matchesStatus
    })

  const totalApplications =
    applications.length

  const selectedCount =
    applications.filter(
      (application) =>
        application.status === 'Selected'
    ).length

  const shortlistedCount =
    applications.filter(
      (application) =>
        application.status === 'Shortlisted'
    ).length

  const reviewCount =
    applications.filter(
      (application) =>
        application.status === 'Under Review'
    ).length

  return (
    <>
      <Navbar />

      <main className="applications-page">

        {/* HEADER */}

        <section className="applications-header">

          <p className="hero-small-text">
            MY APPLICATIONS
          </p>

          <h1>
            Track Your Applications
          </h1>

          <p>
            View and track all the placement opportunities
            you have applied for.
          </p>

        </section>

        <section className="applications-container">

          {/* APPLICATION SUMMARY */}

          {applications.length > 0 && (
            <div className="application-overview">

              <div className="application-overview-card">
                <span>📋</span>

                <div>
                  <strong>
                    {totalApplications}
                  </strong>

                  <small>
                    Total Applications
                  </small>
                </div>

              </div>

              <div className="application-overview-card">
                <span>⏳</span>

                <div>
                  <strong>
                    {reviewCount}
                  </strong>

                  <small>
                    Under Review
                  </small>
                </div>

              </div>

              <div className="application-overview-card">
                <span>⭐</span>

                <div>
                  <strong>
                    {shortlistedCount}
                  </strong>

                  <small>
                    Shortlisted
                  </small>
                </div>

              </div>

              <div className="application-overview-card">
                <span>🏆</span>

                <div>
                  <strong>
                    {selectedCount}
                  </strong>

                  <small>
                    Selected
                  </small>
                </div>

              </div>

            </div>
          )}

          {/* STATUS NOTIFICATIONS */}

          {applications.some(
            (application) =>
              application.status &&
              application.status !== 'Applied'
          ) && (

            <div className="application-status-notice">

              <span className="application-status-notice-icon">
                🔔
              </span>

              <div>

                <strong>
                  Application Status Update
                </strong>

                <p>
                  {(() => {
                    const latestUpdatedApplication =
                      [...applications]
                        .filter(
                          (application) =>
                            application.status &&
                            application.status !== 'Applied'
                        )
                        .sort(
                          (a, b) =>
                            new Date(
                              b.statusUpdatedDate || 0
                            ) -
                            new Date(
                              a.statusUpdatedDate || 0
                            )
                        )[0]

                    if (!latestUpdatedApplication) {
                      return 'Your applications have been updated.'
                    }

                    return `${latestUpdatedApplication.jobTitle} — ${latestUpdatedApplication.status}. ${getStatusMessage(
                      latestUpdatedApplication.status
                    )}`
                  })()}
                </p>

              </div>

            </div>
          )}

          {/* APPLICATION TOOLBAR */}

          {applications.length > 0 && (

            <div className="applications-toolbar">

              <div>

                <h2>
                  Your Applications
                </h2>

                <span className="application-count">
                  {applications.length} Applications
                </span>

              </div>

              <div className="application-filters">

                <input
                  type="text"
                  placeholder="Search job, company or location..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                />

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value
                    )
                  }
                >

                  <option value="All">
                    All Status
                  </option>

                  <option value="Applied">
                    Applied
                  </option>

                  <option value="Under Review">
                    Under Review
                  </option>

                  <option value="Shortlisted">
                    Shortlisted
                  </option>

                  <option value="Selected">
                    Selected
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                </select>

                <button
                  type="button"
                  className="clear-filter-btn"
                  onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('All')
                  }}
                >
                  Clear
                </button>

              </div>

            </div>

          )}

          {/* NO APPLICATIONS */}

          {applications.length === 0 ? (

            <div className="no-applications">

              <div className="empty-icon">
                📋
              </div>

              <h2>
                No Applications Yet
              </h2>

              <p>
                You haven't applied for any jobs yet.
              </p>

              <Link
                to="/jobs"
                className="primary-btn"
              >
                Browse Jobs →
              </Link>

            </div>

          ) : filteredApplications.length === 0 ? (

            <div className="no-applications">

              <div className="empty-icon">
                🔍
              </div>

              <h2>
                No Applications Found
              </h2>

              <p>
                Try changing your search or status filter.
              </p>

            </div>

          ) : (

            filteredApplications.map(
              (application) => {

                const status =
                  application.status ||
                  'Applied'

                const currentStep =
                  getStatusStep(status)

                return (

                  <div
                    className="application-card"
                    key={application.id}
                  >

                    <div className="application-top">

                      <div className="application-job-info">

                        <div className="application-company-icon">
                          💼
                        </div>

                        <div>

                          <h2>
                            {application.jobTitle ||
                              'Job Application'}
                          </h2>

                          <p>
                            {application.company ||
                              'Company not provided'}
                          </p>

                        </div>

                      </div>

                      <span
                        className={`status ${getStatusClass(
                          status
                        )}`}
                      >
                        {status}
                      </span>

                    </div>

                    <div className="application-details">

                      <span>
                        📍 {application.location ||
                          'Location not provided'}
                      </span>

                      <span>
                        💰 {application.salary ||
                          'Not provided'}
                      </span>

                      <span>
                        🎓 {application.degree ||
                          'Not provided'}
                      </span>

                      <span>
                        📅 Applied: {
                          application.appliedDate ||
                          'Date not available'
                        }
                      </span>

                    </div>

                    {/* STATUS UPDATE */}

                    {application.statusUpdatedDate && (
                      <div className="application-updated-date">
                        🔄 Status updated: {
                          application.statusUpdatedDate
                        }
                      </div>
                    )}

                    {/* STATUS PROGRESS */}

                    {status !== 'Rejected' && (

                      <div className="application-progress">

                        <div
                          className={`progress-step ${
                            currentStep >= 1
                              ? 'active'
                              : ''
                          }`}
                        >
                          <span>✓</span>

                          <small>
                            Applied
                          </small>

                        </div>

                        <div
                          className={`progress-line ${
                            currentStep >= 2
                              ? 'active'
                              : ''
                          }`}
                        />

                        <div
                          className={`progress-step ${
                            currentStep >= 2
                              ? 'active'
                              : ''
                          }`}
                        >
                          <span>2</span>

                          <small>
                            Review
                          </small>

                        </div>

                        <div
                          className={`progress-line ${
                            currentStep >= 3
                              ? 'active'
                              : ''
                          }`}
                        />

                        <div
                          className={`progress-step ${
                            currentStep >= 3
                              ? 'active'
                              : ''
                          }`}
                        >
                          <span>3</span>

                          <small>
                            Shortlisted
                          </small>

                        </div>

                        <div
                          className={`progress-line ${
                            currentStep >= 4
                              ? 'active'
                              : ''
                          }`}
                        />

                        <div
                          className={`progress-step ${
                            currentStep >= 4
                              ? 'active'
                              : ''
                          }`}
                        >
                          <span>✓</span>

                          <small>
                            Selected
                          </small>

                        </div>

                      </div>

                    )}

                    {status === 'Rejected' && (

                      <div className="rejected-notice">
                        ❌ Application was not selected
                        for this opportunity.
                      </div>

                    )}

                    <div className="application-card-footer">

                      <span>
                        Application ID: #
                        {application.id}
                      </span>

                      <button
                        type="button"
                        className="view-application-btn"
                        onClick={() =>
                          setSelectedApplication(
                            application
                          )
                        }
                      >
                        View Application →
                      </button>

                    </div>

                  </div>

                )
              }
            )

          )}

        </section>

      </main>

      {/* APPLICATION DETAILS MODAL */}

      {selectedApplication && (

        <div
          className="application-modal-overlay"
          onClick={closeApplication}
        >

          <div
            className="application-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <p className="modal-label">
                  APPLICATION DETAILS
                </p>

                <h2>
                  {selectedApplication.jobTitle}
                </h2>

                <p>
                  {selectedApplication.company}
                </p>

              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeApplication}
              >
                ×
              </button>

            </div>

            <div className="modal-status">

              <span
                className={`status ${getStatusClass(
                  selectedApplication.status
                )}`}
              >
                {selectedApplication.status ||
                  'Applied'}
              </span>

            </div>

            {/* APPLICANT INFORMATION */}

            <div className="modal-section">

              <h3>
                Applicant Information
              </h3>

              <div className="modal-grid">

                <div>
                  <span>Full Name</span>

                  <strong>
                    {selectedApplication.name ||
                      'Not provided'}
                  </strong>
                </div>

                <div>
                  <span>Email</span>

                  <strong>
                    {selectedApplication.email ||
                      selectedApplication.studentEmail ||
                      'Not provided'}
                  </strong>
                </div>

                <div>
                  <span>Phone</span>

                  <strong>
                    {selectedApplication.phone ||
                      'Not provided'}
                  </strong>
                </div>

                <div>
                  <span>College</span>

                  <strong>
                    {selectedApplication.college ||
                      'Not provided'}
                  </strong>
                </div>

                <div>
                  <span>Degree</span>

                  <strong>
                    {selectedApplication.degree ||
                      'Not provided'}
                  </strong>
                </div>

                <div>
                  <span>Graduation Year</span>

                  <strong>
                    {selectedApplication.graduationYear ||
                      'Not provided'}
                  </strong>
                </div>

              </div>

            </div>

            {/* JOB INFORMATION */}

            <div className="modal-section">

              <h3>
                Job Information
              </h3>

              <div className="modal-grid">

                <div>
                  <span>Company</span>

                  <strong>
                    {selectedApplication.company ||
                      'Not provided'}
                  </strong>
                </div>

                <div>
                  <span>Location</span>

                  <strong>
                    {selectedApplication.location ||
                      'Not provided'}
                  </strong>
                </div>

                <div>
                  <span>Salary</span>

                  <strong>
                    {selectedApplication.salary ||
                      'Not provided'}
                  </strong>
                </div>

                <div>
                  <span>Applied Date</span>

                  <strong>
                    {selectedApplication.appliedDate ||
                      'Not available'}
                  </strong>
                </div>

                {selectedApplication.statusUpdatedDate && (
                  <div>
                    <span>Status Updated</span>

                    <strong>
                      {selectedApplication.statusUpdatedDate}
                    </strong>
                  </div>
                )}

              </div>

            </div>

            {/* RESUME */}

            <div className="modal-section">

              <h3>
                Resume
              </h3>

              <div className="resume-box">
                📄 {selectedApplication.resume ||
                  'Resume not provided'}
              </div>

            </div>

            {/* COVER MESSAGE */}

            {selectedApplication.message && (

              <div className="modal-section">

                <h3>
                  Cover Message
                </h3>

                <div className="message-box">
                  {selectedApplication.message}
                </div>

              </div>

            )}

            <button
              type="button"
              className="primary-btn modal-done-btn"
              onClick={closeApplication}
            >
              Done
            </button>

          </div>

        </div>

      )}

      <Footer />
    </>
  )
}

export default Applications