import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <div className="notfound-icon">🌿</div>
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        <p className="notfound-text">
          Oops! The page you're looking for seems to have wandered off to the organic farm.
          Let's get you back on track!
        </p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link to="/products" className="btn btn-outline">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
