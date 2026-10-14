import { Link, useParams } from 'react-router-dom'

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
    responsibilities: [
      'Develop and maintain software applications',
      'Work with development teams',
      'Write clean and efficient code',
      'Participate in testing and debugging',
    ],
    requirements: [
      'B.Tech degree',
      'Basic programming knowledge',
      'Problem-solving skills',
      'Good communication skills',
    ],
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
    responsibilities: [
      'Build responsive web interfaces',
      'Work with frontend development tools',
      'Collaborate with designers',
      'Improve website performance',
    ],
    requirements: [
      'CSE / IT background',
      'HTML, CSS and JavaScript knowledge',
      'Basic React knowledge',
      'Problem-solving skills',
    ],
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
    responsibilities: [
      'Analyze business datasets',
      'Create reports and dashboards',
      'Identify useful business insights',
      'Work with different teams',
    ],
    requirements: [
      'Any B.Tech degree',
      'Basic SQL knowledge',
      'Basic Python knowledge',
      'Analytical thinking',
    ],
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
    responsibilities: [
      'Develop Java applications',
      'Debug and test applications',
      'Work with development teams',
      'Maintain application quality',
    ],
    requirements: [
      'B.Tech / MCA',
      'Java programming knowledge',
      'Object-oriented programming',
      'Problem-solving skills',
    ],
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
    responsibilities: [
      'Develop Python applications',
      'Work with backend technologies',
      'Debug and improve applications',
      'Collaborate with developers',
    ],
    requirements: [
      'CSE / IT background',
      'Python programming knowledge',
      'Basic database knowledge',
      'Problem-solving skills',
    ],
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
    responsibilities: [
      'Assist with web development',
      'Build simple web components',
      'Learn modern development practices',
      'Work with the development team',
    ],
    requirements: [
      'B.Tech student',
      'Basic HTML and CSS knowledge',
      'Basic JavaScript knowledge',
      'Willingness to learn',
    ],
  },
]

function JobDetails() {
  const { id } = useParams()

  const storedJobs =
    JSON.parse(localStorage.getItem('jobs')) || defaultJobs

  const storedJob = storedJobs.find(
    (item) => item.id === Number(id)
  )

  const defaultJob = defaultJobs.find(
    (item) => item.id === Number(id)
  )

  if (!storedJob && !defaultJob) {
    return (
      <>
        <Navbar />

        <main className="job-details-page">
          <div className="job-not-found">
            <div className="empty-icon">
              🔍
            </div>

            <h1>Job Not Found</h1>

            <p>
              The job you are looking for does not exist or
              may have been removed.
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

  const job = {
    ...defaultJob,
    ...storedJob,

    responsibilities:
      storedJob?.responsibilities ||
      defaultJob?.responsibilities ||
      [
        'Work on assigned projects',
        'Collaborate with the development team',
        'Complete tasks on time',
        'Follow company development practices',
      ],

    requirements:
      storedJob?.requirements ||
      defaultJob?.requirements ||
      [
        'Relevant educational qualification',
        'Basic technical knowledge',
        'Problem-solving skills',
        'Good communication skills',
      ],
  }

  return (
    <>
      <Navbar />

      <main className="job-details-page">

        {/* HEADER */}

        <section className="job-details-header">

          <div className="job-details-header-content">

            <Link
              to="/jobs"
              className="details-back-link"
            >
              ← Back to Jobs
            </Link>

            <div className="job-details-heading-row">

              <div className="job-details-company-icon">
                {job.company?.charAt(0)?.toUpperCase() || 'J'}
              </div>

              <div>

                <div className="job-details-badges">

                  <span className="job-details-type">
                    {job.type}
                  </span>

                  <span className="job-details-company-badge">
                    ● Open Position
                  </span>

                </div>

                <h1>
                  {job.title}
                </h1>

                <p className="job-company">
                  {job.company}
                </p>

              </div>

            </div>

            <div className="job-meta">

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

          </div>

        </section>


        {/* CONTENT */}

        <section className="job-details-container">

          <div className="job-details-main">

            {/* ABOUT */}

            <div className="details-card">

              <p className="details-card-label">
                JOB OVERVIEW
              </p>

              <h2>
                About the Job
              </h2>

              <p className="details-description">
                {job.description}
              </p>

            </div>


            {/* RESPONSIBILITIES */}

            <div className="details-card">

              <p className="details-card-label">
                WHAT YOU'LL DO
              </p>

              <h2>
                Responsibilities
              </h2>

              <ul>
                {job.responsibilities.map(
                  (item, index) => (
                    <li key={index}>

                      <span className="detail-check">
                        ✓
                      </span>

                      <span>
                        {item}
                      </span>

                    </li>
                  )
                )}
              </ul>

            </div>


            {/* REQUIREMENTS */}

            <div className="details-card">

              <p className="details-card-label">
                WHAT YOU NEED
              </p>

              <h2>
                Requirements
              </h2>

              <ul>
                {job.requirements.map(
                  (item, index) => (
                    <li key={index}>

                      <span className="detail-check">
                        ✓
                      </span>

                      <span>
                        {item}
                      </span>

                    </li>
                  )
                )}
              </ul>

            </div>

          </div>


          {/* APPLY SIDEBAR */}

          <aside className="apply-card">

            <div className="apply-card-icon">
              🚀
            </div>

            <p className="details-card-label">
              READY TO APPLY?
            </p>

            <h2>
              Take the Next Step
            </h2>

            <p>
              Apply for this opportunity and start your
              placement journey.
            </p>

            <div className="apply-card-divider" />

            <div className="apply-card-info">

              <span>
                Position
              </span>

              <strong>
                {job.title}
              </strong>

            </div>

            <div className="apply-card-info">

              <span>
                Company
              </span>

              <strong>
                {job.company}
              </strong>

            </div>

            <Link
              to={`/apply/${job.id}`}
              className="primary-btn apply-btn"
            >
              Apply Now
              <span>
                →
              </span>
            </Link>

            <Link
              to="/jobs"
              className="back-jobs"
            >
              Browse Other Jobs
            </Link>

          </aside>

        </section>

      </main>

      <Footer />
    </>
  )
}

export default JobDetails