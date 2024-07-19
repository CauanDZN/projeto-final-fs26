import React, { useState, useEffect } from 'react';
import api from '../api';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const response = await api.get('/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    };
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      {user.role === 'student' && <StudentDashboard user={user} />}
      {user.role === 'teacher' && <TeacherDashboard user={user} />}
      {user.role === 'technician' && <TechnicianDashboard user={user} />}
      {user.role === 'coordinator' && <CoordinatorDashboard user={user} />}
    </div>
  );
};

const StudentDashboard = ({ user }) => {
  return <div>Student Dashboard</div>;
};

const TeacherDashboard = ({ user }) => {
  return <div>Teacher Dashboard</div>;
};

const TechnicianDashboard = ({ user }) => {
  return <div>Technician Dashboard</div>;
};

const CoordinatorDashboard = ({ user }) => {
  return <div>Coordinator Dashboard</div>;
};

export default Dashboard;
