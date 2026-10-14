import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Contact() {
  return (
    <>
      <Navbar />

      <main className="contact-page">

        {/* Premium Header */}
        <section className="premium-page-header contact-header">
          <div className="header-grid"></div>

          <div className="premium-page-header-content">

            <div className="premium-page-badge">
              GET IN TOUCH
            </div>

            <h1>
              Contact <span>PlacementPro</span>
            </h1>

            <p>
              Have a question or need help?
              Send us a message and we'll be happy to help.
            </p>

          </div>
        </section>


        {/* Contact Area */}
        <section className="contact-section">

          {/* Contact Information */}
          <div className="contact-info">

            <p className="about-label">
              CONTACT INFORMATION
            </p>

            <h2>
              Let's Talk
            </h2>

            <p>
              Whether you are a student looking for opportunities
              or a company looking for talented candidates,
              we'd love to hear from you.
            </p>


            <div className="contact-item">

              <span>📧</span>

              <div>
                <h3>Email</h3>
                <p>support@placementpro.com</p>
              </div>

            </div>


            <div className="contact-item">

              <span>📞</span>

              <div>
                <h3>Phone</h3>
                <p>+91 98765 43210</p>
              </div>

            </div>


            <div className="contact-item">

              <span>📍</span>

              <div>
                <h3>Location</h3>
                <p>Andhra Pradesh, India</p>
              </div>

            </div>

          </div>


          {/* Contact Form */}
          <div className="contact-form">

            <h2>
              Send Us a Message
            </h2>

            <form>

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                />

              </div>


              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                />

              </div>


              <div className="form-group">

                <label>
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Enter subject"
                />

              </div>


              <div className="form-group">

                <label>
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your message..."
                ></textarea>

              </div>


              <button
                type="submit"
                className="primary-btn"
              >
                Send Message
              </button>

            </form>

          </div>

        </section>

      </main>

      <Footer />
    </>
  )
}

export default Contact