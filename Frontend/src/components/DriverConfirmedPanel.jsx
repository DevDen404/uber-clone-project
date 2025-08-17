import React from 'react'

const DriverConfirmedPanel = ({ driverConfirmedPanelRef,
    vehicleImage,
    vehicleType,
    captainData,
    rideData,
    pickupInput,
    destinationInput,
    fares }) => {
    return (
        <div ref={driverConfirmedPanelRef} className='DriverConfirmedPanel w-full absolute bottom-0 bg-white opacity-0 flex flex-col items-center p-6 rounded-t-3xl shadow-2xl transition-opacity duration-300 z-9' >
            {/* Header Section: Vehicle + Driver */}
            <div className='flex justify-between items-center w-full gap-4 mb-6'>
                {/* Vehicle Image */}
                <img
                    className='w-36 h-20 object-contain'
                    src={vehicleImage[vehicleType]}
                    alt="Vehicle"
                />

                {/* Driver Profile */}
                <div className='flex flex-col items-center text-center'>
                    <img
                        className='w-20 h-20 rounded-full border-4 border-blue-100 mb-2'
                        src="https://cdn-icons-png.flaticon.com/512/3410/3410160.png"
                        alt="Driver"
                    />
                    <p className='text-lg font-semibold text-gray-800'>{captainData?.fullname?.firstname} {captainData?.fullname?.lastname}</p>
                    <p className='text-sm text-gray-500'>{captainData?.vehicle?.plate}</p>
                </div>
            </div>

            {/* OTP Display */}
            <div className='text-2xl font-semibold text-blue-700 tracking-widest bg-blue-50 px-4 py-2 rounded-xl mb-4'>
                OTP: <span className='ml-2 tracking-[0.4em]'>{rideData.otp}</span>
            </div>

            {/* Trip Details */}
            <div className='w-full bg-gray-50 rounded-xl p-4 text-gray-700'>
                <p className='text-sm mb-1'>
                    <span className='font-semibold text-gray-900'>From: </span>{pickupInput}</p>
                <p className='text-sm mb-1'> <span className='font-semibold text-gray-900'>To: </span>{destinationInput}</p>
                <p className='text-sm'>
                    <span className='font-semibold text-gray-900'>Fare:</span> <span className='text-green-600'>₹{fares[vehicleType]}</span>
                </p>
            </div>
        </div>
    )
}

export default DriverConfirmedPanel
