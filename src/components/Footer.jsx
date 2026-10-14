import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main">

        {/* BRAND */}

        <div className="footer-brand">

          <Link
            to="/"
            className="footer-logo"
          >
            Placement<span>Pro</span>
          </Link>

          <p>
            Connecting students with career opportunities
            and helping them take the next step toward
            their professional journey.
          </p>

        </div>

        {/* QUICK LINKS */}

        <div className="footer-column">

          <h3>
            Quick Links
          </h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/jobs">
            Jobs
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </div>

        {/* STUDENT */}

        <div className="footer-column">

          <h3>
            Student
          </h3>

          <Link to="/login">
            Student Login
          </Link>

          <Link to="/register">
            Create Account
          </Link>

          <Link to="/jobs">
            Explore Jobs
          </Link>

          <Link to="/applications">
            My Applications
          </Link>

        </div>

        {/* PORTAL */}

        <div className="footer-column">

          <h3>
            Placement Portal
          </h3>

          <p>
            Discover opportunities, apply for jobs
            and track your placement journey.
          </p>

          <span className="footer-status">
            <span>●</span>
            Portal Active
          </span>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 PlacementPro. All rights reserved.
        </p>

        <p>
          Built for students. Built for careers.
        </p>

      </div>

    </footer>
  )
}

export default Footer