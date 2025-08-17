import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import { UserDataContext } from '../../context/UserContext'
import Loading from '../../components/Loading'
import {toast } from 'react-toastify';
import ToastComponent from '../../components/ToastComponent'

const UserLogin = () => {
    const notify = (msg) => toast(msg)
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
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
        if (credentials.email.length < 3 || credentials.password.length < 6) {
            notify("Please enter valid email and password")
            return
        }
        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, credentials)
            if (response.status === 200) {
                const data = response.data
                setUser(data.result)
                localStorage.setItem('UserToken', data.token)
                document.cookie = `UserToken=${`${data.token}`}; path=/; SameSite=Lax`
                setTimeout(() => {
                    setLoading(false)
                    navigate('/UserHome')
                }, 3000);

            }

        } catch (error) {
            setLoading(false)
            const status = error.response.status
            if(status === 400){notify("Invalid email or password.")}
            if(status === 401){notify("Invalid email or password")}
            if(status === 404){notify("Email not registered. Please register as new user.")}
            if(status === 500){notify("Server Error. Please try again after later.")}
        }



    }


    return (<>
        <ToastComponent />
        <div className='absolute bg-[#00000026]'>{loading && <Loading />}</div>

        <div className="h-4/5 w-screen">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1024px-Uber_logo_2018.svg.png" alt="" className=' w-2/7 px-3 py-3' />
        </div>

        <form onSubmit={(e) => { handleFormSubmit(e) }} className='px-5 py-9 flex flex-col gap-6'>

            <div className=' flex flex-col gap-1'>
                <h1 className='text-2xl font-medium'>What's your Email?</h1>
                <input name='email' className='w-full bg-[#eeeeee] text-xl text-gray-500 h-11 px-3 rounded-md' value={email} onChange={(e) => { handleEmailChange(e) }} type="email" placeholder='example@example.com' />
            </div>

            <div className='flex flex-col gap-1'>
                <h2 className='text-2xl font-medium'>Enter Password</h2>
                <input name='password' className='w-full bg-[#eeeeee] text-xl text-gray-500 h-11 px-3 rounded-md' value={password} onChange={(e) => { handlePasswordChange(e) }} type="password" placeholder='Enter your password' />
            </div>

            <div className=' mt-4'>
                <button className='rounded-lg bg-black text-2xl font-medium h-11 flex justify-center w-full items-center text-white'>Login</button>
                <div className='mt-3'>
                    <span className='text-lg font-medium'>New here? </span>
                    <span className='text-lg text-blue-500 underline'><Link to={'/UserSignUp'}>Create new Account</Link></span>
                </div>
            </div>

            <div className='bg-[#f57506] text-white mt-4 rounded-lg'>
                <Link to={'/CaptainLogin'} className='text-xl font-medium h-10 flex justify-center w-full items-center'>Sign in as Captain</Link>
            </div>
        </form>


    </>
    )
}

export default UserLogin
