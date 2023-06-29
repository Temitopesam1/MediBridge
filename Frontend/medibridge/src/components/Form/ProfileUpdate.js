import React, { useState, useEffect } from 'react';
import getCurrentUser from '../../Utils/getCurrentUser';

const ProfileForm = () => {
  const currentUser = getCurrentUser(); // Get the user information from local storage

  const [formData, setFormData] = useState({
    name: currentUser.fullName || '',
    email: currentUser.email || '',
    age: currentUser.age || '',
    address: currentUser.homeAddress || '',
    contactNumber: currentUser.contactNumber || '',
    gender: currentUser.gender || '',
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
        Full Name:
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
        Age:
        <input
          type="checkbox"
          name="age"
          checked={formData.age}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Home Address:
        <input
          type="checkbox"
          name="address"
          checked={formData.address}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Contact Number:
        <input
          type="checkbox"
          name="provider"
          checked={formData.provider}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Gender:
        <input
          type="checkbox"
          name="gender"
          checked={formData.gender}
          onChange={handleChange}
        />
      </label>
      <br />
      {formData.specialty ? (
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
            Practice Hospital:
            <input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            License Number:
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Affiliation:
            <input
              type="text"
              name="affiliation"
              value={formData.affiliation}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Charge Per Session:
            <input
              type="text"
              name="charges"
              value={formData.charges}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Experience:
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Education And Qualifications:
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Biography:
            <input
              type="text"
              name="biography"
              value={formData.biography}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Office Address:
            <input
              type="text"
              name="officeAddress"
              value={formData.officeAddress}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Availability:
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Accepted Insurance:
            <input
              type="text"
              name="acceptedInsurance"
              value={formData.acceptedInsurance}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Languages:
            <input
              type="text"
              name="languages"
              value={formData.languages}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Area Of Expertise:
            <input
              type="text"
              name="areaOfExpertise"
              value={formData.areaOfExpertise}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Professional Memberships:
            <input
              type="text"
              name="professionalMembership"
              value={formData.professionalMembership}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Research Publications:
            <input
              type="text"
              name="researchPublications"
              value={formData.researchPublications}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Department:
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </label>
          <br />
        </>
      ) : (
        // Render additional fields for patients
        <>
          <label>
            Job:
            <input
              type="text"
              name="job"
              value={formData.job}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Surgeries:
            <input
              type="text"
              name="surgeries"
              value={formData.surgeries}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Allergies:
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Family History:
            <input
              type="text"
              name="familyHistory"
              value={formData.familyHistory}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Insurance Provider:
            <input
              type="text"
              name="insuranceProvider"
              value={formData.insuranceProvider}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Policy Number:
            <input
              type="text"
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Medical Condition:
            <input
              type="text"
              name="medicalCondition"
              value={formData.medicalCondition}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Emergency Contact:
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
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
