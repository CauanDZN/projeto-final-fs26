const pool = require('../db');

exports.evaluateClass = async (req, res) => {
  const { userId, classId, rating, comments } = req.body;

  try {
    await pool.query(
      'INSERT INTO educational_evaluations (student_id, class_id, rating, comments) VALUES ($1, $2, $3, $4)',
      [userId, classId, rating, comments]
    );
    res.status(201).json({ message: 'Evaluation submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
