import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, } from 'react'
import axios from 'axios'
import { UserDataContext } from '../../context/UserContext'
const UserSignUp = () => {
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)

    function handleEmailChange(e) {
        setemail(e.target.value)
    }
    function handlePasswordChange(e) {
        setpassword(e.target.value)
    }
    function handlefirstnameChange(e) {
        setfirstname(e.target.value)
    }
    function handlelastnameChange(e) {
        setlastname(e.target.value)
    }
    async function handleFormSubmit(e) {
        e.preventDefault();
        const newUser = {
            fullname: {
                firstname: firstname,
                lastname: lastname
            },
            email: email,
            password: password
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser)
        if (response.status === 200) {
            const data = response.data
            setUser(data.result)
            localStorage.setItem('UserToken', data.token)
            navigate('/UserHome')
        }
    }


    return (<>
        <div className="h-4/5 w-screen">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1024px-Uber_logo_2018.svg.png" alt="" className=' w-2/7 px-3 py-3' />
        </div>

        <form onSubmit={(e) => { handleFormSubmit(e) }} className='px-5 py-9 flex flex-col gap-6'>

            <div className=' flex flex-col gap-1'>
                <h1 className='text-2xl font-medium'>Enter your name</h1>
                <div className='flex gap-2'>
                    <input className='w-1/2 bg-[#eeeeee] text-xl text-gray-500 h-11 px-3 rounded-md' value={firstname} onChange={(e) => { handlefirstnameChange(e) }} type="text" placeholder='First name' />
                    <input className='w-1/2 bg-[#eeeeee] text-xl text-gray-500 h-11 px-3 rounded-md' value={lastname} onChange={(e) => { handlelastnameChange(e) }} type="text" placeholder='Last name' />
                </div>
            </div>

            <div className=' flex flex-col gap-1'>
                <h1 className='text-2xl font-medium'>What's your Email?</h1>
                <input className='w-full bg-[#eeeeee] text-xl text-gray-500 h-11 px-3 rounded-md' value={email} onChange={(e) => { handleEmailChange(e) }} type="email" placeholder='example@example.com' />
            </div>

            <div className='flex flex-col gap-1'>
                <h2 className='text-2xl font-medium'>Enter new password</h2>
                <input className='w-full bg-[#eeeeee] text-xl text-gray-500 h-11 px-3 rounded-md' value={password} onChange={(e) => { handlePasswordChange(e) }} type="password" placeholder='Enter your password' />
            </div>

            <div className=' mt-4'>
                <button className='rounded-lg bg-black text-2xl font-medium h-11 flex justify-center w-full items-center text-white'>Create account</button>
                <div className='mt-3'>
                    <span className='text-lg font-medium'>Already registered? </span>
                    <span className='text-lg text-blue-500 underline'><Link to={'/UserLogin'}>Login</Link></span>
                </div>
            </div>

            <div className='bg-blue-700 text-white mt-4 rounded-lg'>
                <Link to={'/UserLogin'} className='rounded-lg text-xl font-medium h-10 flex justify-center w-full items-center'>Back</Link>
            </div>
        </form>


    </>
    )
}

export default UserSignUp
