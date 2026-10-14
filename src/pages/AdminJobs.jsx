import { useState } from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const defaultJobs = [
  {
    id: 1,
    title: 'Software Developer',
    company: 'TCS',
    location: 'Hyderabad',
    salary: '₹6 LPA',
    qualification: 'B.Tech',
    type: 'Full Time',
    description:
      'Join the development team and work on real-world software projects.',
    minCGPA: 7,
    maxBacklogs: 0,
    eligibleBranches: 'CSE, IT',
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'Infosys',
    location: 'Bangalore',
    salary: '₹5 LPA',
    qualification: 'CSE / IT',
    type: 'Full Time',
    description:
      'Build modern web applications and work with frontend technologies.',
    minCGPA: 6.5,
    maxBacklogs: 0,
    eligibleBranches: 'CSE, IT',
  },
  {
    id: 3,
    title: 'Data Analyst',
    company: 'Accenture',
    location: 'Chennai',
    salary: '₹5.5 LPA',
    qualification: 'Any B.Tech',
    type: 'Full Time',
    description:
      'Analyze business data and create meaningful insights for decision making.',
    minCGPA: 6,
    maxBacklogs: 1,
    eligibleBranches: 'CSE, IT, ECE, EEE, MECH, CIVIL',
  },
  {
    id: 4,
    title: 'Java Developer',
    company: 'Wipro',
    location: 'Hyderabad',
    salary: '₹5.5 LPA',
    qualification: 'B.Tech / MCA',
    type: 'Full Time',
    description:
      'Develop Java-based applications and work with enterprise technologies.',
    minCGPA: 6.5,
    maxBacklogs: 0,
    eligibleBranches: 'CSE, IT',
  },
  {
    id: 5,
    title: 'Python Developer',
    company: 'Cognizant',
    location: 'Pune',
    salary: '₹6.5 LPA',
    qualification: 'CSE / IT',
    type: 'Full Time',
    description:
      'Develop Python applications and work with modern backend technologies.',
    minCGPA: 7,
    maxBacklogs: 0,
    eligibleBranches: 'CSE, IT',
  },
  {
    id: 6,
    title: 'Web Development Intern',
    company: 'Tech Mahindra',
    location: 'Remote',
    salary: '₹20K / Month',
    qualification: 'B.Tech',
    type: 'Internship',
    description:
      'Gain practical experience by working on real-world web development projects.',
    minCGPA: 6,
    maxBacklogs: 2,
    eligibleBranches: 'CSE, IT, ECE',
  },
]

const emptyJob = {
  title: '',
  company: '',
  location: '',
  salary: '',
  qualification: '',
  type: 'Full Time',
  description: '',
  minCGPA: '',
  maxBacklogs: '',
  eligibleBranches: '',
}

function AdminJobs() {
  const [jobs, setJobs] = useState(
    JSON.parse(localStorage.getItem('jobs')) || defaultJobs
  )

  const [newJob, setNewJob] = useState(emptyJob)
  const [editingJobId, setEditingJobId] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')

  const handleDelete = (jobId) => {
    const updatedJobs = jobs.filter(
      (job) => job.id !== jobId
    )

    setJobs(updatedJobs)

    localStorage.setItem(
      'jobs',
      JSON.stringify(updatedJobs)
    )
  }

  const handleEdit = (job) => {
    setEditingJobId(job.id)

    setNewJob({
      title: job.title || '',
      company: job.company || '',
      location: job.location || '',
      salary: job.salary || '',
      qualification: job.qualification || '',
      type: job.type || 'Full Time',
      description: job.description || '',
      minCGPA: job.minCGPA ?? '',
      maxBacklogs: job.maxBacklogs ?? '',
      eligibleBranches:
        job.eligibleBranches || '',
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (editingJobId) {
      const updatedJobs = jobs.map((job) =>
        job.id === editingJobId
          ? {
              ...job,
              ...newJob,
              minCGPA:
                Number(newJob.minCGPA) || 0,
              maxBacklogs:
                Number(newJob.maxBacklogs) || 0,
            }
          : job
      )

      setJobs(updatedJobs)

      localStorage.setItem(
        'jobs',
        JSON.stringify(updatedJobs)
      )

      setEditingJobId(null)
    } else {
      const job = {
        id: Date.now(),
        ...newJob,
        minCGPA:
          Number(newJob.minCGPA) || 0,
        maxBacklogs:
          Number(newJob.maxBacklogs) || 0,
      }

      const updatedJobs = [
        ...jobs,
        job,
      ]

      setJobs(updatedJobs)

      localStorage.setItem(
        'jobs',
        JSON.stringify(updatedJobs)
      )
    }

    setNewJob(emptyJob)
  }

  const cancelEdit = () => {
    setEditingJobId(null)
    setNewJob(emptyJob)
  }

  const filteredJobs = jobs.filter((job) => {
    const search =
      searchTerm.toLowerCase()

    const matchesSearch =
      job.title
        ?.toLowerCase()
        .includes(search) ||
      job.company
        ?.toLowerCase()
        .includes(search) ||
      job.location
        ?.toLowerCase()
        .includes(search) ||
      job.qualification
        ?.toLowerCase()
        .includes(search)

    const matchesType =
      typeFilter === 'All' ||
      job.type === typeFilter

    return matchesSearch && matchesType
  })

  const fullTimeJobs =
    jobs.filter(
      (job) => job.type === 'Full Time'
    ).length

  const internshipJobs =
    jobs.filter(
      (job) => job.type === 'Internship'
    ).length

  return (
    <>
      <Navbar />

      <main className="admin-jobs-page">

        {/* HEADER */}

        <section className="admin-jobs-hero">

          <div className="admin-jobs-grid"></div>

          <div className="admin-jobs-hero-content">

            <div className="admin-jobs-badge">
              <span>●</span>
              ADMIN PORTAL
            </div>

            <h1>
              Manage <span>Jobs.</span>
            </h1>

            <p>
              Create, update and manage placement
              opportunities for students.
            </p>

          </div>

          <Link
            to="/admin"
            className="admin-back-btn"
          >
            ← Admin Dashboard
          </Link>

        </section>


        {/* STAT CARDS */}

        <section className="admin-job-stats">

          <div className="admin-job-stat-card">
            <div className="admin-job-stat-icon">
              💼
            </div>

            <div>
              <span>Total Jobs</span>
              <strong>{jobs.length}</strong>
            </div>
          </div>

          <div className="admin-job-stat-card">
            <div className="admin-job-stat-icon">
              🏢
            </div>

            <div>
              <span>Full Time</span>
              <strong>{fullTimeJobs}</strong>
            </div>
          </div>

          <div className="admin-job-stat-card">
            <div className="admin-job-stat-icon">
              🎓
            </div>

            <div>
              <span>Internships</span>
              <strong>{internshipJobs}</strong>
            </div>
          </div>

          <div className="admin-job-stat-card">
            <div className="admin-job-stat-icon">
              ⚡
            </div>

            <div>
              <span>Active Listings</span>
              <strong>{jobs.length}</strong>
            </div>
          </div>

        </section>


        {/* MAIN CONTENT */}

        <section className="admin-jobs-content">


          {/* CREATE / EDIT */}

          <div className="admin-job-form-card">

            <div className="admin-job-section-heading">

              <div>

                <span>
                  {editingJobId
                    ? 'EDIT JOB'
                    : 'CREATE JOB'}
                </span>

                <h2>
                  {editingJobId
                    ? 'Update Job Opening'
                    : 'Create New Job'}
                </h2>

                <p>
                  Add the job details and eligibility
                  requirements for students.
                </p>

              </div>

              <div className="admin-job-heading-icon">
                {editingJobId ? '✏️' : '+'}
              </div>

            </div>


            <form
              className="admin-job-form"
              onSubmit={handleSubmit}
            >

              <div className="admin-job-form-grid">

                <div className="admin-job-field">
                  <label>Job Title</label>

                  <input
                    type="text"
                    placeholder="Software Developer"
                    value={newJob.title}
                    onChange={(event) =>
                      setNewJob({
                        ...newJob,
                        title:
                          event.target.value,
                      })
                    }
                    required
                  />
                </div>


                <div className="admin-job-field">
                  <label>Company</label>

                  <input
                    type="text"
                    placeholder="TCS"
                    value={newJob.company}
                    onChange={(event) =>
                      setNewJob({
                        ...newJob,
                        company:
                          event.target.value,
                      })
                    }
                    required
                  />
                </div>


                <div className="admin-job-field">
                  <label>Location</label>

                  <input
                    type="text"
                    placeholder="Hyderabad"
                    value={newJob.location}
                    onChange={(event) =>
                      setNewJob({
                        ...newJob,
                        location:
                          event.target.value,
                      })
                    }
                    required
                  />
                </div>


                <div className="admin-job-field">
                  <label>Salary</label>

                  <input
                    type="text"
                    placeholder="₹7 LPA"
                    value={newJob.salary}
                    onChange={(event) =>
                      setNewJob({
                        ...newJob,
                        salary:
                          event.target.value,
                      })
                    }
                    required
                  />
                </div>


                <div className="admin-job-field">
                  <label>Qualification</label>

                  <input
                    type="text"
                    placeholder="B.Tech / MCA"
                    value={newJob.qualification}
                    onChange={(event) =>
                      setNewJob({
                        ...newJob,
                        qualification:
                          event.target.value,
                      })
                    }
                    required
                  />
                </div>


                <div className="admin-job-field">
                  <label>Job Type</label>

                  <select
                    value={newJob.type}
                    onChange={(event) =>
                      setNewJob({
                        ...newJob,
                        type:
                          event.target.value,
                      })
                    }
                  >
                    <option value="Full Time">
                      Full Time
                    </option>

                    <option value="Internship">
                      Internship
                    </option>
                  </select>
                </div>

              </div>


              {/* ELIGIBILITY */}

              <div className="admin-eligibility-box">

                <div className="admin-eligibility-heading">

                  <div>
                    <span>
                      ELIGIBILITY CRITERIA
                    </span>

                    <h3>
                      Who can apply?
                    </h3>
                  </div>

                  <div className="eligibility-icon">
                    ✓
                  </div>

                </div>


                <div className="admin-job-form-grid">

                  <div className="admin-job-field">
                    <label>
                      Minimum CGPA
                    </label>

                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      placeholder="7.0"
                      value={newJob.minCGPA}
                      onChange={(event) =>
                        setNewJob({
                          ...newJob,
                          minCGPA:
                            event.target.value,
                        })
                      }
                      required
                    />
                  </div>


                  <div className="admin-job-field">
                    <label>
                      Maximum Backlogs
                    </label>

                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={newJob.maxBacklogs}
                      onChange={(event) =>
                        setNewJob({
                          ...newJob,
                          maxBacklogs:
                            event.target.value,
                        })
                      }
                      required
                    />
                  </div>


                  <div className="admin-job-field admin-job-full">
                    <label>
                      Eligible Branches
                    </label>

                    <input
                      type="text"
                      placeholder="CSE, IT, ECE"
                      value={
                        newJob.eligibleBranches
                      }
                      onChange={(event) =>
                        setNewJob({
                          ...newJob,
                          eligibleBranches:
                            event.target.value,
                        })
                      }
                      required
                    />
                  </div>

                </div>

              </div>


              {/* DESCRIPTION */}

              <div className="admin-job-field admin-job-description">
                <label>
                  Job Description
                </label>

                <textarea
                  placeholder="Describe the role, responsibilities and opportunity..."
                  value={newJob.description}
                  onChange={(event) =>
                    setNewJob({
                      ...newJob,
                      description:
                        event.target.value,
                    })
                  }
                  required
                />
              </div>


              {/* ACTIONS */}

              <div className="admin-job-form-actions">

                {editingJobId && (
                  <button
                    type="button"
                    className="admin-job-cancel-btn"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  className="admin-job-submit-btn"
                >
                  {editingJobId
                    ? '✓ Update Job'
                    : '+ Create Job'}
                </button>

              </div>

            </form>

          </div>


          {/* JOB LIST */}

          <div className="admin-job-list-card">

            <div className="admin-job-list-heading">

              <div>
                <span>
                  JOB MANAGEMENT
                </span>

                <h2>
                  Available Jobs
                </h2>

                <p>
                  Manage all placement opportunities
                  from one place.
                </p>
              </div>

              <strong>
                {filteredJobs.length}
                <small>
                  / {jobs.length} jobs
                </small>
              </strong>

            </div>


            {/* FILTERS */}

            <div className="admin-job-filters">

              <div className="admin-job-search">

                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search jobs, companies or locations..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                />

              </div>


              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(
                    event.target.value
                  )
                }
              >
                <option value="All">
                  All Types
                </option>

                <option value="Full Time">
                  Full Time
                </option>

                <option value="Internship">
                  Internship
                </option>
              </select>


              <button
                type="button"
                className="admin-clear-btn"
                onClick={() => {
                  setSearchTerm('')
                  setTypeFilter('All')
                }}
              >
                Clear
              </button>

            </div>


            {/* JOB CARDS */}

            <div className="admin-job-list">

              {filteredJobs.length === 0 ? (

                <div className="admin-job-empty">

                  <div>🔍</div>

                  <h3>
                    No Jobs Found
                  </h3>

                  <p>
                    Try changing your search
                    or filter.
                  </p>

                </div>

              ) : (

                filteredJobs.map((job) => (

                  <article
                    className="admin-job-card"
                    key={job.id}
                  >

                    <div className="admin-job-card-top">

                      <div className="admin-job-company-icon">
                        💼
                      </div>

                      <div className="admin-job-card-title">

                        <h3>
                          {job.title}
                        </h3>

                        <p>
                          {job.company}
                        </p>

                      </div>

                      <span className="admin-job-type">
                        {job.type}
                      </span>

                    </div>


                    <div className="admin-job-meta">

                      <span>
                        📍 {job.location}
                      </span>

                      <span>
                        💰 {job.salary}
                      </span>

                      <span>
                        🎓 {job.qualification}
                      </span>

                    </div>


                    <div className="admin-job-eligibility">

                      <div>
                        <small>
                          MIN CGPA
                        </small>

                        <strong>
                          {job.minCGPA ?? '—'}
                        </strong>
                      </div>

                      <div>
                        <small>
                          BACKLOGS
                        </small>

                        <strong>
                          {job.maxBacklogs ?? '—'}
                        </strong>
                      </div>

                      <div className="branches">
                        <small>
                          ELIGIBLE BRANCHES
                        </small>

                        <strong>
                          {job.eligibleBranches ||
                            'All branches'}
                        </strong>
                      </div>

                    </div>


                    <div className="admin-job-card-bottom">

                      <p>
                        {job.description}
                      </p>

                      <div className="admin-job-actions">

                        <button
                          type="button"
                          className="admin-edit-btn"
                          onClick={() =>
                            handleEdit(job)
                          }
                        >
                          ✏️ Edit
                        </button>

                        <button
                          type="button"
                          className="admin-delete-btn"
                          onClick={() =>
                            handleDelete(job.id)
                          }
                        >
                          🗑 Delete
                        </button>

                      </div>

                    </div>

                  </article>

                ))

              )}

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  )
}

export default AdminJobs