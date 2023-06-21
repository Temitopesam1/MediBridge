import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarReview from './StarReview';
import styled from 'styled-components';


const Review = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DoctorReviews = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [review, setReview] = useState('');

  useEffect(() => {
    // Fetch doctors
    axios.get('/api/doctors')
      .then(response => setDoctors(response.data))
      .catch(error => console.error(error));
  }, []);



  const handleReviewSubmission = () => {
    if (!selectedDoctor || !review) {
      return;
    }

    // Submit the review
    axios.post('/api/reviews', { doctorId: selectedDoctor.id, review })
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
    <Review>
      <h2>Doctor Reviews</h2>
      <select onChange={e => setSelectedDoctor(doctors.find(doctor => doctor.id === e.target.value))}>
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
    </Review>
  );
};

export default DoctorReviews;
