import './AnnouncementBar.css';

function AnnouncementBar() {
  // Announcement messages
  const announcements = [
    "All India Deliveries Available",
    "COD available",
    "Get 10% off on Orders above ₹899",
    "Get 15% off + Free Gift on Order above ₹1199",
    "Get 15% off + A Special Gift on Order above ₹2999",
    "Free Delivery across all India",
    "PAN India Deliveries Available",
    "100% Organic & Certified Products",
    "Same Day Delivery in Metro Cities"
  ];

  // Render announcement items with separator
  const renderAnnouncements = () => {
    return announcements.map((announcement, index) => (
      <div key={index} className="announcement-item">
        <span className="announcement-bullet">●</span>
        <span className="announcement-text">{announcement}</span>
      </div>
    ));
  };

  return (
    <div className="announcement-bar">
      <div className="announcement-wrapper">
        <div className="announcement-track">
          {/* First set of announcements */}
          <div className="announcement-content">
            {renderAnnouncements()}
          </div>
          {/* Duplicate set for seamless infinite scroll */}
          <div className="announcement-content" aria-hidden="true">
            {renderAnnouncements()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementBar;
