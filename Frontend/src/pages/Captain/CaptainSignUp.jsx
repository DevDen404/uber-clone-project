import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CaptainDataContext } from '../../context/CaptainContext'
import axios from 'axios'

const CaptainSignUp = () => {
    const navigate = useNavigate()
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [vehicleColor, setvehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setvehicleCapacity] = useState(1)
    const [vehicleType, setvehicleType] = useState('')
    const { captain, setCaptain } = useContext(CaptainDataContext)

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
    function handleVehicleColorChange(e) {
        setvehicleColor(e.target.value)
    }
    function handleVehicleTypeChange(e) {
        setvehicleType(e.target.value)
    }
    function handleVehicleCapacityChange(e) {
        setvehicleCapacity(e.target.value)
    }
    function handleVehiclePlateChange(e) {
        setVehiclePlate(e.target.value)
    }
    async function  handleFormSubmit(e) {
        e.preventDefault();
        const newCaptain = {
            fullname: {
                firstname: firstname,
                lastname: lastname
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        }
    
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, newCaptain)
        if(result.status===201){

            const data = result.data
            setCaptain(data.captain)
            localStorage.setItem('CaptainToken', data.token)
            setfirstname('')
            setlastname('')
            setemail('')
            setpassword('')
            setvehicleColor('')
            setVehiclePlate('')
            setvehicleCapacity(1)
            setvehicleType('')
            navigate('/CaptainHome')
        }
    }



    return (<>
        <div className="h-4/5 w-screen">
            <img src="https://pngimg.com/d/uber_PNG24.png" alt="" className=' w-1/4 px-3 py-3' />
        </div>

        <form onSubmit={(e) => { handleFormSubmit(e) }} className='px-5 py-9 flex flex-col gap-6'>

            <div className=' flex flex-col gap-1'>
                <h1 className='text-2xl font-medium'>Enter your name</h1>
                <div className='flex gap-2'>
                    <input required className='w-1/2 bg-[#eeeeee] text-xl text-gray-500 h-11 px-3 rounded-md' value={firstname} onChange={(e) => { handlefirstnameChange(e) }} type="text" placeholder='First name' />
                    <input required className='w-1/2 bg-[#eeeeee] text-xl text-gray-500 h-11 px-3 rounded-md' value={lastname} onChange={(e) => { handlelastnameChange(e) }} type="text" placeholder='Last name' />
                </div>
            </div>

            <div className=' flex flex-col gap-1'>
                <h1 className='text-2xl font-medium'>What's your Email?</h1>
                <input required className='w-full bg-[#eeeeee] text-xl text-gray-500 h-11 px-3 rounded-md' value={email} onChange={(e) => { handleEmailChange(e) }} type="email" placeholder='example@example.com' />
            </div>

            <div className='flex flex-col gap-1'>
                <h2 className='text-2xl font-medium'>Enter new password</h2>
                <input required className='w-full bg-[#eeeeee] text-xl text-gray-500 h-11 px-3 rounded-md' value={password} onChange={(e) => { handlePasswordChange(e) }} type="password" placeholder='Enter your password' />
            </div>

            <div className='flex flex-col gap-1'>
                <h2 className='text-2xl font-medium mb-4'>Enter your vehicle details:</h2>

                <div>
                    <h3 className='text-xl'>Color</h3>
                    <input required className='w-full bg-[#eeeeee] text-lg  text-gray-500 h-11 px-3 rounded-md' value={vehicleColor} onChange={(e) => { handleVehicleColorChange(e) }} type="text" placeholder='Vehicle color' />

                    <h3 className='text-xl'>Plate number</h3>
                    <input required className='w-full bg-[#eeeeee] text-lg  text-gray-500 h-11 px-3 rounded-md' value={vehiclePlate} onChange={(e) => { handleVehiclePlateChange(e) }} type="text" placeholder='Enter plate number (AB00CD1234)' />

                    <h3 className='text-xl'>Vehicle type</h3>
                    <select
                        className='w-full bg-[#eeeeee] text-lg text-gray-500 h-11 px-3 rounded-md'
                        value={vehicleType}
                        onChange={handleVehicleTypeChange}
                    >
                        <option className='text-sm' value="">Select vehicle type</option>
                        <option className='text-sm' value="RICKSHAW">RICKSHAW</option>
                        <option className='text-sm' value="CAR">CAR</option>
                        <option className='text-sm' value="BIKE">BIKE</option>
                    </select>


                    <h3 className='text-xl'>Capacity</h3>
                    <input required className='w-full bg-[#eeeeee] text-lg  text-gray-500 h-11 px-3 rounded-md' value={vehicleCapacity} onChange={(e) => { handleVehicleCapacityChange(e) }} type="number" placeholder='Enter your vehicle capacity (minimum: 1)' />
                </div>
            </div>

            <div className=' mt-4'>
                <button className='rounded-lg bg-black text-2xl font-medium h-11 flex justify-center w-full items-center text-white'>Create account</button>
                <div className='mt-3'>
                    <span className='text-lg font-medium'>Already registered? </span>
                    <span className='text-lg text-blue-500 underline'><Link to={'/CaptainLogin'}>Login</Link></span>
                </div>
            </div>

            <div className='bg-blue-700 text-white mt-4 rounded-lg'>
                <Link to={'/CaptainLogin'} className='text-xl font-medium h-10 flex justify-center w-full items-center'>Back</Link>
            </div>
        </form>


    </>
    )
}

export default CaptainSignUp
