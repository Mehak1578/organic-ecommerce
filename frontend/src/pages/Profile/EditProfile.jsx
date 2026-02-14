import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './EditProfile.css';

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pincode: '',
    street: '',
    city: '',
    state: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        pincode: user.pincode || '',
        street: user.address || user.street || '',
        city: user.city || '',
        state: user.state || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const updatedUser = {
        ...user,
        name: formData.name,
        phone: formData.phone,
        pincode: formData.pincode,
        address: formData.street,
        city: formData.city,
        state: formData.state
      };

      updateUser(updatedUser);
      alert('Profile updated successfully');
      navigate('/account');
    } catch (err) {
      console.error('Failed to update profile in client state:', err);
      alert('Could not update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-card">
        <h1>Edit Profile</h1>
        <p className="edit-profile-subtitle">Update your personal details for a better shopping experience.</p>

        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="edit-form-grid">
            <div className="edit-form-field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="edit-form-field">
              <label htmlFor="email">Email (read-only)</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                readOnly
                className="readonly-input"
              />
            </div>

            <div className="edit-form-field">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="edit-form-field">
              <label htmlFor="pincode">Pincode</label>
              <input
                id="pincode"
                name="pincode"
                type="text"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>

            <div className="edit-form-field edit-form-field-full">
              <label htmlFor="street">Street Address</label>
              <input
                id="street"
                name="street"
                type="text"
                value={formData.street}
                onChange={handleChange}
              />
            </div>

            <div className="edit-form-field">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="edit-form-field">
              <label htmlFor="state">State</label>
              <input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="edit-profile-actions">
            <button
              type="button"
              className="edit-btn-secondary"
              onClick={() => navigate('/account')}
              disabled={saving}
            >
              Cancel
            </button>
            <button type="submit" className="edit-btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
