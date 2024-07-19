import React, { useState } from 'react';
import api from '../api';

const Request = ({ classId }) => {
  const [itemId, setItemId] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/requests/request', {
        classId,
        itemId,
        issueDescription,
      });
      // Feedback para o usuário
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={itemId} onChange={(e) => setItemId(e.target.value)}>
        <option value="1">Ar-Condicionado</option>
        <option value="2">Projetor</option>
        <option value="3">Lousa</option>
        <option value="4">Limpeza</option>
      </select>
      <textarea
        value={issueDescription}
        onChange={(e) => setIssueDescription(e.target.value)}
        placeholder="Issue Description"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Request;
