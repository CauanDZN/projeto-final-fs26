const pool = require('../db');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seuemail@gmail.com',
    pass: 'suasenha',
  },
});

const sendMail = (to, subject, text) => {
  const mailOptions = {
    from: 'seuemail@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

exports.requestService = async (req, res) => {
  const { classId, itemId, issueDescription } = req.body;

  try {
    await pool.query(
      'INSERT INTO service_requests (class_id, item_id, issue_description) VALUES ($1, $2, $3)',
      [classId, itemId, issueDescription]
    );

    sendMail('tecnico@escola.com', 'Nova solicitação de serviço', `Item: ${itemId}, Descrição: ${issueDescription}`);
    res.status(201).json({ message: 'Service request submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.reportService = async (req, res) => {
  const { requestId, technicianId, report } = req.body;

  try {
    await pool.query(
      'INSERT INTO technical_reports (request_id, technician_id, report) VALUES ($1, $2, $3)',
      [requestId, technicianId, report]
    );

    const result = await pool.query('SELECT class_id FROM service_requests WHERE id = $1', [requestId]);
    const classId = result.rows[0].class_id;

    const students = await pool.query('SELECT email FROM users JOIN student_classes ON users.id = student_classes.student_id WHERE class_id = $1', [classId]);
    students.rows.forEach((student) => {
      sendMail(student.email, 'Troca de Sala', 'O técnico fez um relatório e é necessário trocar de sala.');
    });

    res.status(201).json({ message: 'Technical report submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
