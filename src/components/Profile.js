import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import Loader from './Loader';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userProfile = await Auth.currentAuthenticatedUser();
      setUser(userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="mt-5 pt-5">
      <h2 className="text-2xl font-semibold mb-5">User Profile</h2>
      <div className="mb-4">
        <p className="text-lg font-medium">Username:</p>
        <h5 className="text-xl font-bold">{user.username}</h5>
      </div>
      <div className="mb-4">
        <p className="text-lg font-medium">Email:</p>
        <h5 className="text-xl font-bold">{user.attributes.email}</h5>
      </div>
    </div>
  );
};

export default Profile;
