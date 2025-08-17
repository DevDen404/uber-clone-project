import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import axios from 'axios'
import { CaptainDataContext } from '../../context/CaptainContext'
import Loading from '../../components/Loading'

const CaptainLogin = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)


  function handleEmailChange(e) {
    setemail(e.target.value)
  }
  function handlePasswordChange(e) {
    setpassword(e.target.value)
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    const credentials = {
      email: email,
      password: password
    }
    try {
      setLoading(true)
      const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, credentials)
      const data = result.data
      localStorage.setItem('CaptainToken', data.token)
      setTimeout(() => {
        setLoading(false)
        navigate('/CaptainHome')
      }, 3000);


    } catch (err) {
      navigate('/CaptainLogin')
    }



  }



  return (<>
    <div className='absolute bg-[#00000026] h-dvh'>{loading && <Loading />}</div>
    
    <div className="h-4/5 w-screen">
      <img src="https://pngimg.com/d/uber_PNG24.png" alt="" className=' w-1/4 px-3 py-3' />
    </div>

    <form onSubmit={(e) => { handleFormSubmit(e) }} className='px-5 py-9 flex flex-col gap-6'>

      <div className=' flex flex-col gap-1'>
        <h1 className='text-2xl font-medium'>What's your Email?</h1>
        <input className='w-full bg-[#eeeeee] text-xl text-gray-500 h-11 px-3 rounded-md' value={email} onChange={(e) => { handleEmailChange(e) }} type="email" placeholder='example@example.com' />
      </div>

      <div className='flex flex-col gap-1'>
        <h2 className='text-2xl font-medium'>Enter Password</h2>
        <input className='w-full bg-[#eeeeee] text-xl text-gray-500 h-11 px-3 rounded-md' value={password} onChange={(e) => { handlePasswordChange(e) }} type="password" placeholder='Enter your password' />
      </div>

      <div className=' mt-4'>
        <button className='bg-black text-2xl font-medium h-11 flex justify-center w-full items-center text-white rounded-lg'>Login</button>
        <div className='mt-3'>
          <span className='text-lg font-medium'>Want to join fleet? </span>
          <span className='text-lg text-blue-500 underline '><Link to={'/CaptainSignUp'}>Create new Account</Link></span>
        </div>
      </div>

      <div className='bg-green-600 text-white mt-4 rounded-lg'>
        <Link to={'/UserLogin'} className='text-xl font-medium h-10 flex justify-center w-full items-center'>Sign in as User</Link>
      </div>
    </form>
  </>
  )
}

export default CaptainLogin
