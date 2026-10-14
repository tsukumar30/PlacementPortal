import { useState } from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function AdminApplications() {
  const [applications, setApplications] = useState(
    JSON.parse(localStorage.getItem('applications')) || []
  )

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [expandedApplication, setExpandedApplication] =
    useState(null)

  const studentAccounts =
    JSON.parse(localStorage.getItem('studentAccounts')) || []

  const studentProfiles =
    JSON.parse(localStorage.getItem('studentProfiles')) || {}

  // Get student name using email
  const getStudentName = (email) => {
    const student = studentAccounts.find(
      (account) =>
        account.email?.toLowerCase() ===
        email?.toLowerCase()
    )

    return student?.name || 'Unknown Student'
  }

  // Get student profile using email
  const getStudentProfile = (email) => {
    return (
      studentProfiles[email] ||
      studentProfiles[email?.toLowerCase()] ||
      {}
    )
  }

  // Search and filter applications
  const filteredApplications = applications.filter(
    (application) => {
      const studentName = getStudentName(
        application.studentEmail
      )

      const searchText =
        searchTerm.toLowerCase().trim()

      const matchesSearch =
        application.jobTitle
          ?.toLowerCase()
          .includes(searchText) ||
        application.company
          ?.toLowerCase()
          .includes(searchText) ||
        application.studentEmail
          ?.toLowerCase()
          .includes(searchText) ||
        studentName
          ?.toLowerCase()
          .includes(searchText)

      const matchesStatus =
        statusFilter === 'All' ||
        application.status === statusFilter

      return matchesSearch && matchesStatus
    }
  )

  // Change application status
  const handleStatusChange = (
    applicationId,
    newStatus
  ) => {
    const updatedDate =
      new Date().toLocaleString()

    const updatedApplications =
      applications.map((application) => {
        if (application.id === applicationId) {
          return {
            ...application,
            status: newStatus,
            statusUpdatedDate: updatedDate,
          }
        }

        return application
      })

    setApplications(updatedApplications)

    localStorage.setItem(
      'applications',
      JSON.stringify(updatedApplications)
    )
  }

  const getStatusClass = (status) => {
    return (
      status
        ?.toLowerCase()
        .replace(/\s+/g, '-') || 'applied'
    )
  }

  return (
    <>
      <Navbar />

      <main className="dashboard-page">

        {/* ADMIN WELCOME */}

        <section className="dashboard-welcome">

          <div>

            <p className="hero-small-text">
              ADMIN PORTAL
            </p>

            <h1>
              Manage Applications
            </h1>

            <p>
              View student applications and review
              applicant information.
            </p>

          </div>

          <Link
            to="/admin"
            className="primary-btn"
          >
            ← Admin Dashboard
          </Link>

        </section>


        {/* APPLICATIONS */}

        <section className="dashboard-content">

          <div className="recent-applications">

            {/* HEADING */}

            <div className="dashboard-section-heading">

              <div>

                <p className="dashboard-label">
                  APPLICATION MANAGEMENT
                </p>

                <h2>
                  All Applications
                </h2>

              </div>

              <span className="application-count">
                {applications.length} Applications
              </span>

            </div>


            {/* SEARCH AND FILTER */}

            {applications.length > 0 && (

              <div className="application-filters">

                <input
                  type="text"
                  placeholder="Search student, job or company..."
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
                  Clear Filters
                </button>

              </div>

            )}


            {/* NO APPLICATIONS */}

            {applications.length === 0 ? (

              <div className="empty-applications">

                <span>📋</span>

                <h3>
                  No Applications Yet
                </h3>

                <p>
                  Student applications will appear here
                  once they are submitted.
                </p>

              </div>

            ) : filteredApplications.length === 0 ? (

              <div className="empty-applications">

                <span>🔍</span>

                <h3>
                  No Applications Found
                </h3>

                <p>
                  Try changing your search or status filter.
                </p>

              </div>

            ) : (

              /* APPLICATION CARDS */

              filteredApplications.map(
                (application) => {

                  const studentName =
                    getStudentName(
                      application.studentEmail
                    )

                  const studentProfile =
                    getStudentProfile(
                      application.studentEmail
                    )

                  const isExpanded =
                    expandedApplication ===
                    application.id

                  const status =
                    application.status ||
                    'Applied'

                  return (

                    <div
                      className="admin-application-card"
                      key={application.id}
                    >

                      {/* APPLICATION ICON */}

                      <div className="admin-application-icon">
                        📋
                      </div>


                      {/* APPLICATION INFORMATION */}

                      <div className="admin-application-info">

                        <h3>
                          {application.jobTitle ||
                            'Job Application'}
                        </h3>

                        <p className="admin-application-company">
                          {application.company ||
                            'Company not provided'}
                        </p>

                        <div className="admin-application-details">

                          <span>
                            👤 {studentName}
                          </span>

                          <span>
                            ✉️ {application.studentEmail ||
                              'Unknown'}
                          </span>

                          <span>
                            📅 {application.appliedDate ||
                              'Date not available'}
                          </span>

                        </div>


                        {/* STUDENT ACADEMIC SUMMARY */}

                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px',
                            marginTop: '12px',
                          }}
                        >

                          <span>
                            🎓 {studentProfile.degree ||
                              application.degree ||
                              'Degree not provided'}
                          </span>

                          <span>
                            🏫 {studentProfile.college ||
                              application.college ||
                              'College not provided'}
                          </span>

                          <span>
                            📚 {studentProfile.branch ||
                              'Branch not provided'}
                          </span>

                        </div>


                        {/* VIEW DETAILS */}

                        <button
                          type="button"
                          onClick={() =>
                            setExpandedApplication(
                              isExpanded
                                ? null
                                : application.id
                            )
                          }
                          style={{
                            marginTop: '14px',
                            background: 'transparent',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            color: '#60a5fa',
                            fontWeight: 600,
                          }}
                        >
                          {isExpanded
                            ? 'Hide Student Details ↑'
                            : 'View Student Details →'}
                        </button>


                        {/* EXPANDED STUDENT DETAILS */}

                        {isExpanded && (

                          <div
                            style={{
                              marginTop: '16px',
                              padding: '18px',
                              borderRadius: '14px',
                              background:
                                'rgba(59, 130, 246, 0.07)',
                              border:
                                '1px solid rgba(59, 130, 246, 0.18)',
                            }}
                          >

                            <strong>
                              Student Information
                            </strong>

                            <div
                              style={{
                                display: 'grid',
                                gridTemplateColumns:
                                  'repeat(auto-fit, minmax(150px, 1fr))',
                                gap: '14px',
                                marginTop: '14px',
                              }}
                            >

                              <div>
                                <small>
                                  Full Name
                                </small>

                                <strong>
                                  {studentName}
                                </strong>
                              </div>

                              <div>
                                <small>
                                  Email
                                </small>

                                <strong>
                                  {application.studentEmail ||
                                    'Not provided'}
                                </strong>
                              </div>

                              <div>
                                <small>
                                  Phone
                                </small>

                                <strong>
                                  {application.phone ||
                                    studentProfile.phone ||
                                    'Not provided'}
                                </strong>
                              </div>

                              <div>
                                <small>
                                  College
                                </small>

                                <strong>
                                  {studentProfile.college ||
                                    application.college ||
                                    'Not provided'}
                                </strong>
                              </div>

                              <div>
                                <small>
                                  Degree
                                </small>

                                <strong>
                                  {studentProfile.degree ||
                                    application.degree ||
                                    'Not provided'}
                                </strong>
                              </div>

                              <div>
                                <small>
                                  Branch
                                </small>

                                <strong>
                                  {studentProfile.branch ||
                                    'Not provided'}
                                </strong>
                              </div>

                              <div>
                                <small>
                                  CGPA
                                </small>

                                <strong>
                                  {studentProfile.cgpa ||
                                    'Not provided'}
                                </strong>
                              </div>

                              <div>
                                <small>
                                  Active Backlogs
                                </small>

                                <strong>
                                  {studentProfile.backlogs !==
                                    undefined &&
                                  studentProfile.backlogs !== ''
                                    ? studentProfile.backlogs
                                    : 'Not provided'}
                                </strong>
                              </div>

                              <div>
                                <small>
                                  Graduation Year
                                </small>

                                <strong>
                                  {studentProfile.graduationYear ||
                                    application.graduationYear ||
                                    'Not provided'}
                                </strong>
                              </div>

                            </div>

                            <p
                              style={{
                                marginTop: '14px',
                                marginBottom: 0,
                                fontSize: '13px',
                                opacity: 0.7,
                              }}
                            >
                              Academic information is shown
                              for admin review only. No automatic
                              eligibility decision is made.
                            </p>

                          </div>

                        )}

                      </div>


                      {/* STATUS */}

                      <div className="admin-application-status">

                        <label>
                          Application Status
                        </label>

                        <select
                          value={status}
                          onChange={(event) =>
                            handleStatusChange(
                              application.id,
                              event.target.value
                            )
                          }
                        >

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


                        <span
                          className={`status ${getStatusClass(
                            status
                          )}`}
                          style={{
                            display: 'inline-block',
                            marginTop: '10px',
                          }}
                        >
                          {status}
                        </span>


                        {application.statusUpdatedDate && (

                          <small
                            style={{
                              display: 'block',
                              marginTop: '8px',
                              opacity: 0.65,
                            }}
                          >
                            Updated:{' '}
                            {application.statusUpdatedDate}
                          </small>

                        )}

                      </div>

                    </div>

                  )
                }
              )

            )}

          </div>

        </section>

      </main>

      <Footer />
    </>
  )
}

export default AdminApplications