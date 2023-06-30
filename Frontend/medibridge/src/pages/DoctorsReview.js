import React, { useState, useEffect } from 'react';
import axios from '../Utils/axioss';
import StarReview from './StarReview';
import './DoctorsReview.css';

const DoctorReviews = () => {
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. John Doe' },
    { id: 2, name: 'Dr. Jane Smith' },
    { id: 3, name: 'Dr. David Johnson' },
  ]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [review, setReview] = useState('');

  useEffect(() => {
    // Fetch doctors
    axios
      .get('doctors')
      .then(response => setDoctors(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleReviewSubmission = () => {
    if (!selectedDoctor || !review) {
      return;
    }

    // Submit the review
    axios
      .post('reviews', { doctorId: selectedDoctor.id, review })
      .then(response => {
        // Handle successful review submission (e.g., show a success message)
        console.log('Review submitted successfully');
      })
      .catch(error => {
        // Handle error (e.g., display an error message)
        console.error('Failed to submit review:', error);
      });
  };

  return (
    <div className="review-container">
      <h2>Doctor Reviews</h2>
      <select onChange={e => setSelectedDoctor(doctors.find(doctor => doctor.id === parseInt(e.target.value)))}>
        <option value="">Select a doctor</option>
        {doctors.map(doctor => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name}
          </option>
        ))}
      </select>
      <StarReview rating={3.5} />
      <textarea
        value={review}
        onChange={e => setReview(e.target.value)}
        placeholder="Write your review"
      />
      <button onClick={handleReviewSubmission}>Submit Review</button>
    </div>
  );
};

export default DoctorReviews;
