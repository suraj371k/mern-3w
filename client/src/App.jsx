import React from 'react';
import UserForm from './components/UserForm';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  return (
    <div className="p-4">
      <UserForm />
      <AdminDashboard />
    </div>
  );
};

export default App;
