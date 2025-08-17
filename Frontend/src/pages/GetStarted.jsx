import React from 'react'
import { Link } from 'react-router-dom'

const GetStarted = () => {
    return (
        <div className='h-dvh w-full'>
            <div className="h-4/5 w-screen bg-[url('https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1024px-Uber_logo_2018.svg.png" alt="" className='invert w-3/10 px-3 py-3' />
            </div>

            <div className='h-1/5  w-full flex flex-col'>
                <div className='h-1/3 pt-4 flex flex-col justify-center'>
                    <h1 className='px-5 font-bold text-3xl'>Get Started with Uber</h1>
                </div>
                <div className=' h-2/3 flex flex-col justify-center rounded-lg'>
                    <Link to={'/UserLogin'} className='bg-black text-white flex mx-6 justify-center h-2/4 text-2xl font-medium items-center'>Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default GetStarted
