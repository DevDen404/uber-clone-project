import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
const DriverConfirmPanel = ({ driverConfirmPanelRef,vehicleImage,vehicleType }) => {
    return (
        <div ref={driverConfirmPanelRef} className='DriverConfirmPanel w-full absolute bottom-0 overflow-hidden bg-white opacity-0 flex flex-col rounded-t-3xl'>
            <div className='flex justify-between mx-5 mt-10'>
                <img className='w-40' src={vehicleImage[vehicleType]} alt="Vehicle Image" />
                <div className='absolute left-41 top-10 text-6xl text-gray-500'>..........</div>
                <img className='w-20 h-22' src="https://cdn-icons-png.flaticon.com/512/3410/3410160.png" alt="" />

            </div>

            <div className='text-2xl text-gray-800 flex justify-center mt-10'>
                Waiting for driver confirmation
            </div>

            <div className=''>
                <DotLottieReact
                    src="https://lottie.host/eeca9687-98fb-4d13-8aae-67a5174f529d/GoEpI0oXKp.lottie"
                    loop
                    autoplay

                />
            </div>
        </div>
    )
}

export default DriverConfirmPanel
