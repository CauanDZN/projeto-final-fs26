import React, { useState } from 'react';
import api from '../api';

const Evaluation = ({ user, classId }) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/evaluations/evaluate', {
        userId: user.id,
        classId,
        rating,
        comments,
      });
      // Feedback para o usuário
    } catch (error) {
      console.error('Error submitting evaluation:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        min="0"
        max="5"
      />
      {rating < 5 && (
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Comments"
        />
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Evaluation;
