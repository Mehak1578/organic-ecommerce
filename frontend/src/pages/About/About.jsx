import './About.css';

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="page-title">About OrganicShop</h1>
          <p className="page-subtitle">
            Your trusted partner for fresh, organic, and sustainable products
          </p>
        </div>
      </section>

      <div className="container">
        {/* Our Story */}
        <section className="about-section">
          <div className="about-content">
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80" 
                alt="Organic farm"
              />
            </div>
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2018, OrganicShop was born from a simple belief: everyone deserves 
                access to fresh, organic, and sustainably-grown food. What started as a small 
                local farmers market stand has grown into a thriving online marketplace serving 
                thousands of health-conscious customers.
              </p>
              <p>
                We work directly with local farmers and organic producers who share our commitment 
                to quality, sustainability, and ethical farming practices. Every product in our 
                store is carefully selected and verified to meet strict organic certification standards.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="about-section reverse">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Mission</h2>
              <p>
                Our mission is to make organic living accessible, affordable, and convenient for 
                everyone. We believe that healthy eating shouldn't be a luxury—it's a fundamental 
                right that everyone should enjoy.
              </p>
              <p>
                We're committed to supporting local farmers, reducing our environmental footprint, 
                and building a community of conscious consumers who care about what they eat and 
                where it comes from.
              </p>
            </div>
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80" 
                alt="Fresh organic produce"
              />
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="values-section">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>
                We prioritize eco-friendly practices in everything we do, from sourcing to 
                packaging and delivery.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Trust</h3>
              <p>
                Transparency and honesty guide our relationships with farmers, partners, 
                and customers.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h3>Quality</h3>
              <p>
                We never compromise on quality. Every product is handpicked and meets our 
                rigorous standards.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">💚</div>
              <h3>Community</h3>
              <p>
                We're building a community of people who care about health, wellness, and 
                the planet.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🌾</div>
              <div className="stat-number">50+</div>
              <div className="stat-label">Local Farmers</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">😊</div>
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🧺</div>
              <div className="stat-number">500+</div>
              <div className="stat-label">Organic Products</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-number">100%</div>
              <div className="stat-label">Certified Organic</div>
            </div>
          </div>
        </section>

        {/* Team Section - Professional Design */}
        <section className="team-section">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">Passionate people behind OrganicShop</p>
          <div className="team-grid">
            
            {/* Team Member 1 - Founder & CEO */}
            <div className="team-card">
              <div className="team-photo">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces" 
                  alt="John Anderson - Founder & CEO"
                />
              </div>
              <div className="team-info">
                <h3>John Anderson</h3>
                <p className="team-role">Founder & CEO</p>
                <p className="team-bio">
                  Former organic farmer with 15 years of experience in sustainable agriculture 
                  and a passion for building healthy communities.
                </p>
              </div>
            </div>

            {/* Team Member 2 - Head of Operations */}
            <div className="team-card">
              <div className="team-photo">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces" 
                  alt="Sarah Mitchell - Head of Operations"
                />
              </div>
              <div className="team-info">
                <h3>Sarah Mitchell</h3>
                <p className="team-role">Head of Operations</p>
                <p className="team-bio">
                  Logistics expert with MBA in Supply Chain Management, ensuring fresh 
                  products reach you in perfect condition every time.
                </p>
              </div>
            </div>

            {/* Team Member 3 - Quality Control Manager */}
            <div className="team-card">
              <div className="team-photo">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces" 
                  alt="David Chen - Quality Control Manager"
                />
              </div>
              <div className="team-info">
                <h3>David Chen</h3>
                <p className="team-role">Quality Control Manager</p>
                <p className="team-bio">
                  Certified organic inspector with a passion for excellence and 
                  10+ years ensuring the highest quality standards.
                </p>
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
