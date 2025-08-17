import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../../context/UserContext';
const UserLogout = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(UserDataContext)
  useEffect(() => {
    const token = localStorage.getItem('UserToken');
    if (!token) {
      navigate('/UserLogin');
      return;
    }

    const logoutUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


      } catch (error) {
        if (error.response && (error.response.status === 400 || error.response.status === 401)) {
          console.error('Logout error:', error.response.data);
        }
      } finally {
        localStorage.removeItem('UserToken');
        setUser({})
        navigate('/UserLogin');
      }
    };

    logoutUser();
  }, [navigate]);

  return null; // ✅ Return null or a loading spinner if you want
};

export default UserLogout;
