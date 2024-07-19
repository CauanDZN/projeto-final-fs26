const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const requestRoutes = require('./routes/requestRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
