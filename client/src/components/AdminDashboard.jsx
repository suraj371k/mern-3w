import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users/submissions').then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>
      {users.map((user) => (
        <div key={user._id} className="p-4 border mb-4 rounded shadow-lg">
          <h3 className='text-xl font-bold'>{user.name}</h3>
          <p className='text-[#6b6969]'>{user.socialHandle}</p>
          <div className="flex gap-2">
            {user.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000/${image}`}
                alt="User submission"
                className="w-16 h-16 object-cover mt-2"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
