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
  },
]

function Jobs() {
  const storedJobs =
    JSON.parse(localStorage.getItem('jobs')) || defaultJobs

  const [search, setSearch] = useState('')
  const [company, setCompany] = useState('All')
  const [location, setLocation] = useState('All')
  const [jobType, setJobType] = useState('All')

  const companies = [
    ...new Set(
      storedJobs
        .map((job) => job.company)
        .filter(Boolean)
    ),
  ]

  const locations = [
    ...new Set(
      storedJobs
        .map((job) => job.location)
        .filter(Boolean)
    ),
  ]

  const jobTypes = [
    ...new Set(
      storedJobs
        .map((job) => job.type)
        .filter(Boolean)
    ),
  ]

  const filteredJobs = storedJobs.filter((job) => {
    const searchText = search.toLowerCase().trim()

    const matchesSearch =
      job.title?.toLowerCase().includes(searchText) ||
      job.company?.toLowerCase().includes(searchText) ||
      job.location?.toLowerCase().includes(searchText) ||
      job.qualification?.toLowerCase().includes(searchText)

    const matchesCompany =
      company === 'All' || job.company === company

    const matchesLocation =
      location === 'All' || job.location === location

    const matchesJobType =
      jobType === 'All' || job.type === jobType

    return (
      matchesSearch &&
      matchesCompany &&
      matchesLocation &&
      matchesJobType
    )
  })

  const clearFilters = () => {
    setSearch('')
    setCompany('All')
    setLocation('All')
    setJobType('All')
  }

  const hasActiveFilters =
    search.trim() ||
    company !== 'All' ||
    location !== 'All' ||
    jobType !== 'All'

  return (
    <>
      <Navbar />

      <main className="jobs-page">

        {/* PAGE HEADER */}
        <section className="jobs-header">
          <div className="jobs-header-badge">
            <span>●</span>
            PLACEMENT OPPORTUNITIES
          </div>

          <h1>
            Find Your Next <span>Opportunity.</span>
          </h1>

          <p>
            Explore the latest placement opportunities from
            companies looking for talented students.
          </p>
        </section>

        {/* MAIN CONTENT */}
        <section className="jobs-container">

          {/* FILTER CARD */}
          <div className="jobs-filter-card">

            <div className="jobs-filter-heading">
              <div>
                <h2>Find the right job</h2>
                <p>
                  Search and filter opportunities based on your preferences.
                </p>
              </div>

              <div className="jobs-filter-icon">
                🔎
              </div>
            </div>

            <div className="jobs-filters">

              <div className="filter-group filter-search">
                <label>Search Jobs</label>

                <div className="filter-input-wrapper">
                  <span>🔎</span>

                  <input
                    type="text"
                    placeholder="Job title, company, location..."
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                  />
                </div>
              </div>

              <div className="filter-group">
                <label>Company</label>

                <select
                  value={company}
                  onChange={(event) =>
                    setCompany(event.target.value)
                  }
                >
                  <option value="All">
                    All Companies
                  </option>

                  {companies.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Location</label>

                <select
                  value={location}
                  onChange={(event) =>
                    setLocation(event.target.value)
                  }
                >
                  <option value="All">
                    All Locations
                  </option>

                  {locations.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Job Type</label>

                <select
                  value={jobType}
                  onChange={(event) =>
                    setJobType(event.target.value)
                  }
                >
                  <option value="All">
                    All Job Types
                  </option>

                  {jobTypes.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* RESULTS BAR */}
          <div className="jobs-results-bar">

            <div className="job-results">
              <strong>{filteredJobs.length}</strong>
              <span>
                {filteredJobs.length === 1
                  ? ' opportunity found'
                  : ' opportunities found'}
              </span>
            </div>

            <div className="jobs-results-actions">
              <span>
                {storedJobs.length} total jobs
              </span>

              {hasActiveFilters && (
                <button
                  type="button"
                  className="clear-filter-btn"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              )}
            </div>

          </div>

          {/* JOB GRID */}
          <div className="job-grid">

            {filteredJobs.length > 0 ? (

              filteredJobs.map((job) => (

                <article
                  className="job-card"
                  key={job.id}
                >

                  <div className="job-card-top">

                    <div className="job-company-icon">
                      {job.company?.charAt(0)?.toUpperCase() || 'J'}
                    </div>

                    <span className="job-type">
                      {job.type}
                    </span>

                  </div>

                  <div className="job-card-header">

                    <h2>{job.title}</h2>

                    <p>{job.company}</p>

                  </div>

                  <div className="job-details">

                    <span>
                      <b>📍</b>
                      {job.location}
                    </span>

                    <span>
                      <b>💰</b>
                      {job.salary}
                    </span>

                    <span>
                      <b>🎓</b>
                      {job.qualification}
                    </span>

                  </div>

                  <p className="job-description">
                    {job.description}
                  </p>

                  <div className="job-card-footer">

                    <span className="job-status">
                      <span>●</span>
                      Open Position
                    </span>

                    <Link
                      to={`/jobs/${job.id}`}
                      className="job-view-btn"
                    >
                      View Details
                      <span>→</span>
                    </Link>

                  </div>

                </article>

              ))

            ) : (

              <div className="no-jobs">

                <div className="empty-icon">
                  🔍
                </div>

                <h2>No Jobs Found</h2>

                <p>
                  We couldn't find any opportunities matching
                  your current search or filters.
                </p>

                <button
                  type="button"
                  className="clear-filter-btn"
                  onClick={clearFilters}
                >
                  Reset Search
                </button>

              </div>

            )}

          </div>

        </section>

      </main>

      <Footer />
    </>
  )
}

export default Jobs