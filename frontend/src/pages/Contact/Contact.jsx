import { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      {/* ========================================
          PAGE HEADER - Clean & Centered
          ======================================== */}
      <section className="contact-header">
        <div className="container">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* ========================================
          MAIN CONTENT - 2 Column Layout
          ======================================== */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            
            {/* LEFT COLUMN: Contact Form Card */}
            <div className="form-column">
              <div className="form-card">
                <h2 className="form-card-title">Send us a Message</h2>
                <p className="form-card-subtitle">Fill out the form below and we'll get back to you within 24 hours.</p>
                
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-submit">
                    Send Message 📤
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT COLUMN: Contact Information Cards */}
            <div className="info-column">
              <h2 className="info-column-title">Get in Touch</h2>
              
              {/* Info Cards Stack */}
              <div className="info-cards-stack">
                
                {/* Email Card */}
                <div className="info-card">
                  <div className="info-card-icon">📧</div>
                  <div className="info-card-content">
                    <h3>Email Us</h3>
                    <p>support@organicshop.in</p>
                    <p className="info-secondary">info@organicshop.in</p>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="info-card">
                  <div className="info-card-icon">📞</div>
                  <div className="info-card-content">
                    <h3>Call Us</h3>
                    <p>+91 98765 43210</p>
                    <p className="info-secondary">Mon-Fri: 9AM - 6PM</p>
                  </div>
                </div>

                {/* Address Card */}
                <div className="info-card">
                  <div className="info-card-icon">📍</div>
                  <div className="info-card-content">
                    <h3>Visit Us</h3>
                    <p>2nd Floor, Green Plaza</p>
                    <p className="info-secondary">Sector 62, Noida, UP 201301</p>
                  </div>
                </div>

                {/* Business Hours Card */}
                <div className="info-card">
                  <div className="info-card-icon">⏰</div>
                  <div className="info-card-content">
                    <h3>Business Hours</h3>
                    <p>Mon-Fri: 9AM - 6PM</p>
                    <p className="info-secondary">Weekend: 10AM - 4PM</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="social-card">
                <h3>Follow Us</h3>
                <div className="social-icons">
                  {/* Facebook */}
                  <a href="#" className="social-icon" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a href="#" className="social-icon" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>

                  {/* Twitter (X) */}
                  <a href="#" className="social-icon" aria-label="Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a href="#" className="social-icon" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================
          MAP SECTION - Full Width Below Form
          ======================================== */}
      <section className="map-section">
        <div className="container">
          <h2 className="map-section-title">Find Us on the Map</h2>
          <div className="map-container">
            {/* Real Google Maps Embed - Sector 62, Noida, India */}
            <div className="map-wrapper">
              <iframe
                title="OrganicShop Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.5361634472874!2d77.36067431508067!3d28.60746549389373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5456ef36d9f%3A0x3b7191b1286136c8!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1704902400000!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              >
              </iframe>
            </div>
            <p className="map-address">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              OrganicShop Pvt. Ltd., 2nd Floor, Green Plaza, Sector 62, Noida, Uttar Pradesh 201301, India
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
