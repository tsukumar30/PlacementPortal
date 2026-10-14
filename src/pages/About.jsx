import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function About() {
  return (
    <>
      <Navbar />

      <main className="about-page">

        {/* Premium Header */}
        <section className="premium-page-header about-header">
          <div className="header-grid"></div>

          <div className="premium-page-header-content">

            <div className="premium-page-badge">
              ABOUT PLACEMENTPRO
            </div>

            <h1>
              Connecting Students With <span>Opportunities</span>
            </h1>

            <p>
              PlacementPro helps students discover career opportunities,
              prepare for placements, and connect with leading companies.
            </p>

          </div>
        </section>


        {/* Mission */}
        <section className="about-section">

          <div className="about-content">

            <p className="about-label">
              OUR MISSION
            </p>

            <h2>
              Making Campus Placements Simple
            </h2>

            <p>
              Our goal is to create a simple and centralized platform
              where students can discover job opportunities and
              companies can connect with talented graduates.
            </p>

            <p>
              PlacementPro brings job listings, placement information,
              and student opportunities together in one platform.
            </p>

          </div>

        </section>


        {/* Values */}
        <section className="values-section">

          <div className="section-heading">

            <p>
              WHAT WE OFFER
            </p>

            <h2>
              Everything Students Need
            </h2>

          </div>


          <div className="values-container">

            <div className="value-card">

              <div className="value-icon">
                🎯
              </div>

              <h3>
                Career Opportunities
              </h3>

              <p>
                Discover relevant placement opportunities
                from different companies.
              </p>

            </div>


            <div className="value-card">

              <div className="value-icon">
                🚀
              </div>

              <h3>
                Career Growth
              </h3>

              <p>
                Find opportunities that help you start
                and grow your professional career.
              </p>

            </div>


            <div className="value-card">

              <div className="value-icon">
                🤝
              </div>

              <h3>
                Student & Company Connection
              </h3>

              <p>
                Create a connection between talented
                students and companies.
              </p>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  )
}

export default About