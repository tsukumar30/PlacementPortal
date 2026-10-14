import { useState } from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Profile() {
  const loggedInUser =
    JSON.parse(localStorage.getItem('loggedInUser')) || {}

  const studentEmail = loggedInUser.email || ''

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
      branch: oldProfile.branch || '',
      graduationYear:
        oldProfile.graduationYear || '',
      cgpa: oldProfile.cgpa || '',
      backlogs: oldProfile.backlogs || '',
      skills: oldProfile.skills || '',
      resume: oldProfile.resume || '',
    }

  const [profile, setProfile] = useState({
    name: savedProfile.name || '',
    email: savedProfile.email || '',
    phone: savedProfile.phone || '',
    college: savedProfile.college || '',
    degree: savedProfile.degree || '',
    branch: savedProfile.branch || '',
    graduationYear:
      savedProfile.graduationYear || '',
    cgpa: savedProfile.cgpa || '',
    backlogs: savedProfile.backlogs || '',
    skills: savedProfile.skills || '',
    resume: savedProfile.resume || '',
  })

  const [editing, setEditing] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setProfile({
      ...profile,
      [name]: value,
    })
  }

  const handleSave = () => {
    const updatedProfiles = {
      ...studentProfiles,
      [studentEmail]: profile,
    }

    localStorage.setItem(
      'studentProfiles',
      JSON.stringify(updatedProfiles)
    )

    localStorage.setItem(
      'studentProfile',
      JSON.stringify(profile)
    )

    setEditing(false)

    alert('Profile updated successfully!')
  }

  const calculateCompletion = () => {
    const fields = [
      profile.name,
      profile.email,
      profile.phone,
      profile.college,
      profile.degree,
      profile.branch,
      profile.graduationYear,
      profile.cgpa,
      profile.backlogs,
      profile.skills,
      profile.resume,
    ]

    const completedFields =
      fields.filter(
        (field) =>
          field &&
          field.toString().trim() !== ''
      ).length

    return Math.round(
      (completedFields / fields.length) * 100
    )
  }

  const completion = calculateCompletion()

  const skillsList = profile.skills
    ? profile.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => skill !== '')
    : []

  return (
    <>
      <Navbar />

      <main className="profile-page">

        {/* PREMIUM PROFILE HEADER */}

        <section className="premium-page-header profile-header">
          <div className="header-grid"></div>

          <div className="premium-page-header-content">

            <div className="premium-page-badge">
              STUDENT PROFILE
            </div>

            <h1>
              My <span>Profile</span>
            </h1>

            <p>
              Build your professional profile and keep your
              placement information up to date.
            </p>

          </div>
        </section>


        {/* PROFILE BODY */}

        <section className="profile-container">

          {/* PROFILE OVERVIEW CARD */}

          <div className="profile-overview-card">

            <div className="profile-overview-main">

              <div className="profile-avatar-large">
                {profile.name
                  ? profile.name
                      .charAt(0)
                      .toUpperCase()
                  : 'S'}
              </div>

              <div className="profile-overview-info">

                <p className="profile-overview-label">
                  STUDENT PROFILE
                </p>

                <h2>
                  {profile.name ||
                    'Student Name'}
                </h2>

                <p className="profile-degree">
                  {profile.degree ||
                    'Degree not added'}
                </p>

                <p className="profile-college">
                  🏫 {profile.college ||
                    'College / University not added'}
                </p>

                <div className="profile-contact-mini">

                  <span>
                    ✉️ {profile.email ||
                      'Email not added'}
                  </span>

                  <span>
                    📱 {profile.phone ||
                      'Phone not added'}
                  </span>

                </div>

              </div>

            </div>


            {!editing && (

              <button
                type="button"
                className="primary-btn profile-edit-btn"
                onClick={() => setEditing(true)}
              >
                ✏️ Edit Profile
              </button>

            )}

          </div>


          {/* PROFILE COMPLETION */}

          <div className="profile-completion-card">

            <div className="completion-header">

              <div>

                <p>
                  PROFILE COMPLETION
                </p>

                <h3>
                  {completion}% Complete
                </h3>

              </div>

              <div className="completion-percentage">
                {completion}%
              </div>

            </div>


            <div className="completion-bar">

              <div
                className="completion-progress"
                style={{
                  width: `${completion}%`,
                }}
              />

            </div>


            <div className="completion-footer">

              <span>
                {completion === 100
                  ? 'Your profile is complete ✓'
                  : 'Complete your profile to improve your placement readiness.'}
              </span>

              {completion < 100 && !editing && (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                >
                  Complete Profile →
                </button>
              )}

            </div>

          </div>


          {/* PERSONAL INFORMATION */}

          <section className="profile-section">

            <div className="profile-section-heading">

              <div>

                <p className="profile-label">
                  PERSONAL INFORMATION
                </p>

                <h2>
                  Basic Details
                </h2>

                <span>
                  Your primary contact information
                </span>

              </div>

              <div className="profile-section-icon">
                👤
              </div>

            </div>


            <div className="profile-grid">

              <div className="profile-field">

                <label>
                  Full Name
                </label>

                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="profile-value">
                    {profile.name ||
                      'Not provided'}
                  </div>
                )}

              </div>


              <div className="profile-field">

                <label>
                  Email Address
                </label>

                {editing ? (
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="profile-value">
                    {profile.email ||
                      'Not provided'}
                  </div>
                )}

              </div>


              <div className="profile-field">

                <label>
                  Phone Number
                </label>

                {editing ? (
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="profile-value">
                    {profile.phone ||
                      'Not provided'}
                  </div>
                )}

              </div>

            </div>

          </section>


          {/* EDUCATION */}

          <section className="profile-section">

            <div className="profile-section-heading">

              <div>

                <p className="profile-label">
                  EDUCATION
                </p>

                <h2>
                  Academic Details
                </h2>

                <span>
                  Your current academic information
                </span>

              </div>

              <div className="profile-section-icon">
                🎓
              </div>

            </div>


            <div className="profile-grid">

              <div className="profile-field">

                <label>
                  College / University
                </label>

                {editing ? (
                  <input
                    type="text"
                    name="college"
                    value={profile.college}
                    onChange={handleChange}
                    placeholder="Enter your college"
                  />
                ) : (
                  <div className="profile-value">
                    {profile.college ||
                      'Not provided'}
                  </div>
                )}

              </div>


              <div className="profile-field">

                <label>
                  Degree / Course
                </label>

                {editing ? (
                  <input
                    type="text"
                    name="degree"
                    value={profile.degree}
                    onChange={handleChange}
                    placeholder="Example: B.Tech"
                  />
                ) : (
                  <div className="profile-value">
                    {profile.degree ||
                      'Not provided'}
                  </div>
                )}

              </div>


              <div className="profile-field">

                <label>
                  Branch
                </label>

                {editing ? (
                  <select
                    name="branch"
                    value={profile.branch}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select your branch
                    </option>
                    <option value="CSE">
                      Computer Science & Engineering
                    </option>
                    <option value="ECE">
                      Electronics & Communication Engineering
                    </option>
                    <option value="EEE">
                      Electrical & Electronics Engineering
                    </option>
                    <option value="Mechanical">
                      Mechanical Engineering
                    </option>
                    <option value="Civil">
                      Civil Engineering
                    </option>
                    <option value="IT">
                      Information Technology
                    </option>
                    <option value="AI & DS">
                      Artificial Intelligence & Data Science
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>
                ) : (
                  <div className="profile-value">
                    {profile.branch ||
                      'Not provided'}
                  </div>
                )}

              </div>


              <div className="profile-field">

                <label>
                  Graduation Year
                </label>

                {editing ? (
                  <input
                    type="text"
                    name="graduationYear"
                    value={profile.graduationYear}
                    onChange={handleChange}
                    placeholder="Example: 2027"
                  />
                ) : (
                  <div className="profile-value">
                    {profile.graduationYear ||
                      'Not provided'}
                  </div>
                )}

              </div>


              <div className="profile-field">

                <label>
                  CGPA
                </label>

                {editing ? (
                  <input
                    type="number"
                    name="cgpa"
                    value={profile.cgpa}
                    onChange={handleChange}
                    placeholder="Example: 8.2"
                    min="0"
                    max="10"
                    step="0.01"
                  />
                ) : (
                  <div className="profile-value">
                    {profile.cgpa
                      ? `${profile.cgpa} / 10`
                      : 'Not provided'}
                  </div>
                )}

              </div>


              <div className="profile-field">

                <label>
                  Active Backlogs
                </label>

                {editing ? (
                  <input
                    type="number"
                    name="backlogs"
                    value={profile.backlogs}
                    onChange={handleChange}
                    placeholder="Example: 0"
                    min="0"
                    step="1"
                  />
                ) : (
                  <div className="profile-value">
                    {profile.backlogs !== ''
                      ? profile.backlogs
                      : 'Not provided'}
                  </div>
                )}

              </div>

            </div>

          </section>


          {/* PROFESSIONAL DETAILS */}

          <section className="profile-section">

            <div className="profile-section-heading">

              <div>

                <p className="profile-label">
                  PROFESSIONAL PROFILE
                </p>

                <h2>
                  Skills & Resume
                </h2>

                <span>
                  Highlight your skills and keep your resume ready
                </span>

              </div>

              <div className="profile-section-icon">
                💼
              </div>

            </div>


            <div className="profile-grid">

              {/* SKILLS */}

              <div className="profile-field profile-full">

                <label>
                  Skills
                </label>

                {editing ? (

                  <textarea
                    name="skills"
                    value={profile.skills}
                    onChange={handleChange}
                    placeholder="Example: Python, Java, React, SQL"
                    rows="4"
                  />

                ) : (

                  <div className="skills-display">

                    {skillsList.length > 0 ? (

                      skillsList.map(
                        (skill, index) => (
                          <span key={index}>
                            {skill}
                          </span>
                        )
                      )

                    ) : (

                      <p>
                        No skills added yet
                      </p>

                    )}

                  </div>

                )}

              </div>


              {/* RESUME */}

              <div className="profile-field profile-full">

                <label>
                  Resume
                </label>

                {editing ? (

                  <div className="resume-edit-area">

                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(event) => {

                        const file =
                          event.target.files[0]

                        if (file) {
                          setProfile({
                            ...profile,
                            resume: file.name,
                          })
                        }

                      }}
                    />

                    <small>
                      Accepted formats: PDF, DOC, DOCX
                    </small>

                    {profile.resume && (

                      <div className="selected-resume">
                        📄 {profile.resume}
                      </div>

                    )}

                  </div>

                ) : (

                  <div className="resume-display">

                    <div className="resume-icon">
                      📄
                    </div>

                    <div>

                      <strong>
                        {profile.resume ||
                          'No resume added'}
                      </strong>

                      <small>
                        {profile.resume
                          ? 'Resume attached to your profile'
                          : 'Add your resume to complete your profile'}
                      </small>

                    </div>

                  </div>

                )}

              </div>

            </div>

          </section>


          {/* EDIT CONTROLS */}

          {editing && (

            <div className="profile-buttons">

              <button
                type="button"
                className="secondary-btn"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="primary-btn"
                onClick={handleSave}
              >
                ✓ Save Profile
              </button>

            </div>

          )}


          {/* QUICK ACTIONS */}

          {!editing && (

            <section className="profile-quick-actions">

              <div className="quick-actions-heading">

                <p className="profile-label">
                  QUICK ACTIONS
                </p>

                <h2>
                  Continue Your Placement Journey
                </h2>

              </div>


              <div className="profile-bottom">

                <Link
                  to="/applications"
                  className="profile-link-card"
                >

                  <span>
                    📋
                  </span>

                  <div>

                    <strong>
                      My Applications
                    </strong>

                    <small>
                      View and track your job applications
                    </small>

                  </div>

                  <b>
                    →
                  </b>

                </Link>


                <Link
                  to="/jobs"
                  className="profile-link-card"
                >

                  <span>
                    💼
                  </span>

                  <div>

                    <strong>
                      Explore Jobs
                    </strong>

                    <small>
                      Find new placement opportunities
                    </small>

                  </div>

                  <b>
                    →
                  </b>

                </Link>

              </div>

            </section>

          )}

        </section>

      </main>

      <Footer />
    </>
  )
}

export default Profile