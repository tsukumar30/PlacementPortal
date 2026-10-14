import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <div className="hero-badge">
          <span>●</span>
          COLLEGE PLACEMENT PORTAL
        </div>

        <h1>
          Build Your Career.
          <br />
          <span>Start Your Journey.</span>
        </h1>

        <p className="hero-description">
          Discover placement opportunities, connect with top
          companies and take the next step toward your career.
        </p>

        <div className="hero-buttons">

          <Link
            to="/jobs"
            className="primary-btn hero-primary-btn"
          >
            Explore Jobs →
          </Link>

          <Link
            to="/login"
            className="secondary-btn hero-secondary-btn"
          >
            Student Login
          </Link>

        </div>

        <div className="hero-highlights">

          <div>
            <span>✓</span>
            Verified Opportunities
          </div>

          <div>
            <span>✓</span>
            Easy Applications
          </div>

          <div>
            <span>✓</span>
            Track Applications
          </div>

        </div>

      </div>

      <div className="hero-visual">

        <div className="hero-visual-card">

          <div className="hero-visual-top">
            <span>PLACEMENT STATUS</span>
            <span className="hero-status-dot">●</span>
          </div>

          <div className="hero-visual-icon">
            💼
          </div>

          <h3>
            Your Career Starts Here
          </h3>

          <p>
            Explore opportunities and connect with companies.
          </p>

          <div className="hero-visual-stats">

            <div>
              <strong>50+</strong>
              <small>Jobs</small>
            </div>

            <div>
              <strong>20+</strong>
              <small>Companies</small>
            </div>

            <div>
              <strong>24/7</strong>
              <small>Access</small>
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Hero