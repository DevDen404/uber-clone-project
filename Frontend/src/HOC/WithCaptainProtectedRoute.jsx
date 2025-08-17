import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading'

const WithCaptainProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('CaptainToken')
  const { captain, setCaptain } = useContext(CaptainDataContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate('/CaptainLogin')
      return
    }
    try {
      const getProfile = async function () {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).catch((err) => {
          navigate('/CaptainLogin');
          localStorage.removeItem('CaptainToken')
          return
        })
        if (result) {
          setCaptain(result.data.captain)
          setLoading(false)
        }
      }
      getProfile()
    } catch (err) {
      navigate('/CaptainLogin')
      localStorage.removeItem('CaptainToken')
      return
    }
  }, [token])

  if(loading){
    return <div className='text-2xl flex justify-center items-center h-screen w-full'><div><Loading/></div></div>
  }
  return (
    <>
      {children}
    </>
  )
}

export default WithCaptainProtectedRoute
