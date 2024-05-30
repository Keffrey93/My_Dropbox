import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const EditProfile = () => {
  const [newEmail, setNewEmail] = useState('');
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    setError('');
    setIsUpdateSuccess(false);
    try {
      const updatedUser = await Auth.updateUserAttributes(Auth.user, { email: newEmail });
      console.log('Profile updated successfully:', updatedUser);
      setIsUpdateSuccess(true);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('There was an error updating your profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-5 pt-5 max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <div className="my-3">
        <label htmlFor="email" className="block text-gray-700">New Email:</label>
        <input
          id="email"
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        className={`w-full mt-4 py-2 px-4 rounded-md text-white ${isLoading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
        onClick={handleUpdateProfile}
        disabled={isLoading}
      >
        {isLoading ? 'Updating...' : 'Update Profile'}
      </button>
      {isUpdateSuccess && <p className="mt-3 text-green-500">Profile updated successfully!</p>}
      {error && <p className="mt-3 text-red-500">{error}</p>}
    </div>
  );
};

export default EditProfile;
