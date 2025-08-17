import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const WithUserProtectedRoute = ({ children }) => {
  
  const navigate = useNavigate()
  const token = localStorage.getItem('UserToken')
  
  const { user, setUser } = useContext(UserDataContext)

  useEffect(() => {
    if (!token) {
      navigate('/UserLogin')
      return
    }
    try {
      const getProfile = async function () {
        const data = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).catch((err) => {
          navigate('/UserLogin');
          localStorage.removeItem('UserToken')
          return
        })
        if (data) {
          setUser(data.data.profile)
        }
      }
      getProfile()
    } catch (err) {
      navigate('/UserLogin')
      localStorage.removeItem('UserToken')
      return
    }
  }, [token])

  return (
    <>
      {children}
    </>
  )
}

export default WithUserProtectedRoute
