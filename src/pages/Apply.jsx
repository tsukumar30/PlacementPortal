import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const defaultJobs = [
  {
    id: 1,
    title: 'Software Developer',
    company: 'TCS',
    location: 'Hyderabad',
    salary: '₹6 LPA',
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'Infosys',
    location: 'Bangalore',
    salary: '₹5 LPA',
  },
  {
    id: 3,
    title: 'Data Analyst',
    company: 'Accenture',
    location: 'Chennai',
    salary: '₹5.5 LPA',
  },
  {
    id: 4,
    title: 'Java Developer',
    company: 'Wipro',
    location: 'Hyderabad',
    salary: '₹5.5 LPA',
  },
  {
    id: 5,
    title: 'Python Developer',
    company: 'Cognizant',
    location: 'Pune',
    salary: '₹6.5 LPA',
  },
  {
    id: 6,
    title: 'Web Development Intern',
    company: 'Tech Mahindra',
    location: 'Remote',
    salary: '₹20K / Month',
  },
]

function Apply() {
  const { id } = useParams()
  const navigate = useNavigate()

  const jobs =
    JSON.parse(localStorage.getItem('jobs')) || defaultJobs

  const job = jobs.find(
    (item) => item.id === Number(id)
  )

  // Logged-in student
  const loggedInUser =
    JSON.parse(localStorage.getItem('loggedInUser')) || {}

  const studentEmail =
    loggedInUser.email || ''

  // Account-specific profiles
  const studentProfiles =
    JSON.parse(localStorage.getItem('studentProfiles')) || {}

  const oldProfile =
    JSON.parse(localStorage.getItem('studentProfile')) || {}

  const savedProfile =
    studentProfiles[studentEmail] || {
      name: loggedInUser.name || oldProfile.name || '',
      email: studentEmail || oldProfile.email || '',
      phone: oldProfile.phone || '',
      college: oldProfile.college || '',
      degree: oldProfile.degree || '',
      graduationYear:
        oldProfile.graduationYear || '',
      resume: oldProfile.resume || '',
    }

  const [formData, setFormData] = useState({
    name: savedProfile.name || '',
    email: savedProfile.email || '',
    phone: savedProfile.phone || '',
    college: savedProfile.college || '',
    degree: savedProfile.degree || '',
    graduationYear:
      savedProfile.graduationYear || '',
    resume: savedProfile.resume || '',
    message: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleResumeChange = (event) => {
    const file = event.target.files[0]

    if (!file) {
      return
    }

    setFormData({
      ...formData,
      resume: file.name,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!loggedInUser.email) {
      alert('Please login before applying.')

      navigate('/login')

      return
    }

    const application = {
      id: Date.now(),

      studentEmail:
        loggedInUser.email,

      jobId:
        job.id,

      jobTitle:
        job.title,

      company:
        job.company,

      location:
        job.location,

      salary:
        job.salary,

      ...formData,

      status:
        'Applied',

      appliedDate:
        new Date().toLocaleDateString(),
    }

    const existingApplications =
      JSON.parse(
        localStorage.getItem('applications')
      ) || []

    localStorage.setItem(
      'applications',
      JSON.stringify([
        ...existingApplications,
        application,
      ])
    )

    alert(
  `Application submitted successfully!\n\n` +
  `Job: ${job.title}\n` +
  `Company: ${job.company}\n` +
  `Status: Applied`
)

navigate('/applications')
  }

  if (!job) {
    return (
      <>
        <Navbar />

        <main className="apply-page">

          <div className="apply-not-found">

            <div className="empty-icon">
              🔍
            </div>

            <h1>
              Job Not Found
            </h1>

            <p>
              The job you are trying to apply for does not
              exist or may have been removed.
            </p>

            <Link
              to="/jobs"
              className="primary-btn"
            >
              ← Back to Jobs
            </Link>

          </div>

        </main>

        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="apply-page">

        {/* HEADER */}

        <section className="apply-header">

          <div className="apply-header-content">

            <p className="hero-small-text">
              JOB APPLICATION
            </p>

            <h1>
              Apply for {job.title}
            </h1>

            <p>
              Complete the application below to apply for
              this placement opportunity.
            </p>

          </div>

        </section>

        {/* APPLICATION AREA */}

        <section className="apply-container">

          {/* JOB SUMMARY */}

          <aside className="apply-job-card">

            <div className="company-icon">
              🏢
            </div>

            <p className="apply-card-label">
              APPLYING FOR
            </p>

            <h2>
              {job.title}
            </h2>

            <p className="apply-company">
              {job.company}
            </p>

            <div className="apply-job-info">

              <span>
                📍 {job.location}
              </span>

              <span>
                💰 {job.salary}
              </span>

            </div>

            <div className="apply-summary-divider" />

            <p className="apply-summary-text">
              Make sure your profile information and resume
              are up to date before submitting.
            </p>

            <Link
              to={`/jobs/${job.id}`}
              className="back-job-link"
            >
              ← View Job Details
            </Link>

          </aside>

          {/* FORM */}

          <div className="application-form-card">

            <div className="form-title">

              <p className="details-card-label">
                APPLICATION FORM
              </p>

              <h2>
                Personal Information
              </h2>

              <p>
                Your saved profile information has been
                loaded automatically. You can edit it before
                submitting.
              </p>

            </div>

            <form onSubmit={handleSubmit}>

              {/* NAME + EMAIL */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* PHONE + COLLEGE */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    College / University
                  </label>

                  <input
                    type="text"
                    name="college"
                    placeholder="Enter your college name"
                    value={formData.college}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* DEGREE + YEAR */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Degree
                  </label>

                  <select
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select your degree
                    </option>

                    <option value="B.Tech">
                      B.Tech
                    </option>

                    <option value="B.E">
                      B.E
                    </option>

                    <option value="MCA">
                      MCA
                    </option>

                    <option value="M.Tech">
                      M.Tech
                    </option>

                    <option value="MBA">
                      MBA
                    </option>

                  </select>

                </div>

                <div className="form-group">

                  <label>
                    Graduation Year
                  </label>

                  <select
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select year
                    </option>

                    <option value="2026">
                      2026
                    </option>

                    <option value="2027">
                      2027
                    </option>

                    <option value="2028">
                      2028
                    </option>

                    <option value="2029">
                      2029
                    </option>

                  </select>

                </div>

              </div>

              {/* RESUME */}

              <div className="form-group">

                <label>
                  Resume
                </label>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  required={!formData.resume}
                />

                {formData.resume && (
                  <small className="selected-resume">
                    📄 Selected Resume: {formData.resume}
                  </small>
                )}

                <small>
                  Accepted formats: PDF, DOC, DOCX
                </small>

              </div>

              {/* COVER MESSAGE */}

              <div className="form-group">

                <label>
                  Cover Message
                </label>

                <textarea
                  name="message"
                  rows="5"
                  placeholder="Write a short message to the recruiter..."
                  value={formData.message}
                  onChange={handleChange}
                />

              </div>

              {/* SUBMIT */}

              <div className="submit-application-area">

                <p>
                  🔒 Your application will be associated
                  with your student account.
                </p>

                <button
                  type="submit"
                  className="primary-btn submit-application"
                >
                  Submit Application →
                </button>

              </div>

            </form>

          </div>

        </section>

      </main>

      <Footer />
    </>
  )
}

export default Apply