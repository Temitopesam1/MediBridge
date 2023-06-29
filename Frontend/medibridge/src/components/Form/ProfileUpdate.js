import React, { useState, useEffect } from 'react';
import getCurrentUser from '../../utils/getCurrentUser';

const ProfileForm = () => {
  const currentUser = getCurrentUser(); // Get the user information from local storage

  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    provider: currentUser.provider || false,
    age: currentUser.age || '',
    address: currentUser.address || '',
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update the user information in local storage
    localStorage.setItem('user', JSON.stringify(formData));
    // Handle success or show a success message to the user
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Provider:
        <input
          type="checkbox"
          name="provider"
          checked={formData.provider}
          onChange={handleChange}
        />
      </label>
      <br />
      {formData.provider ? (
        // Render additional fields for doctors
        <>
          <label>
            Specialty:
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Hospital:
            <input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
            />
          </label>
          <br />
        </>
      ) : (
        // Render additional fields for patients
        <>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Date of Birth:
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </label>
          <br />
        </>
      )}
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileForm;
