import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [formData, setFormData] = useState({ name: '', socialHandle: '', images: [] });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('socialHandle', formData.socialHandle);
    Array.from(formData.images).forEach((file) => data.append('images', file));

    await axios.post('/api/users/submit', data);
    alert('Submission successful!');
  };

  return (
    <div className='flex flex-col bg-slate-100 justify-center items-center w-full h-auto'>
    <form onSubmit={handleSubmit} className="bg-white w-[65vw] p-10 space-y-4 shadow-lg">
      <div>
      <h1 className='text-3xl font-semibold'>User Submission Form</h1>
      </div>
      <div>
        <label htmlFor='name'>Name:</label>
      <input
        type="text"
        id='name'
        name="name"
        onChange={handleChange}
        className="mb-2 p-2 border w-full"
        required
      />
      </div>
      <div>
        <label htmlFor='social'>Social Media Handle:</label>
      <input
        type="text"
        name="socialHandle"
        id='social'
        onChange={handleChange}
        className="mb-2 p-2 border w-full"
        required
      />
      </div>
      <div>
        <label htmlFor='images'>Upload images:</label>
      <input
        type="file"
        id='images'
        name="images"
        multiple
        onChange={handleFileChange}
        className="mb-2 p-2 border w-full"
        required
      />
      </div>
      <div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
      </div>
    </form>
    </div>
  );
};

export default UserForm;
