import React from 'react'

const VehicleConfirmPanel = ({ vehicleType,
    vehicleImage,
    pickupInput,
    destinationInput,
    fares,
    vehicleConfirmPanelRef,
    openDriverConfirmPanel }) => {
    return (
        <div ref={vehicleConfirmPanelRef} className="VehicleConfirmDrawer absolute bottom-0 overflow-hidden bg-white flex flex-col gap-10 w-full rounded-t-3xl">

            <div className='flex mt-10'>
                <img className='w-50' src={vehicleImage[vehicleType]} alt="" />
                <span className='font-semibold text-2xl flex w-full items-center pt-4'>UBER GO</span>
            </div>

            <div className="flex justify-between items-start mx-4 gap-4 bg-gray-50 p-2 rounded-xl shadow-inner border">
                {/* Pickup */}
                <div className="w-1/2 flex flex-col items-start">
                    <div className="text-sm text-gray-500 font-semibold mb-1">Pickup Address</div>
                    <div className="text-gray-800 text-base font-medium break-words">{pickupInput || "Not provided"}</div>
                </div>

                {/* Vertical Divider */}
                <div className="w-[1px] bg-gray-300 h-auto mx-2" />

                {/* Destination */}
                <div className="w-1/2 flex flex-col items-start">
                    <div className="text-sm text-gray-500 font-semibold mb-1">Destination Address</div>
                    <div className="text-gray-800 text-base font-medium break-words">{destinationInput || "Not provided"}</div>
                </div>
            </div>


            <div className='w-full flex justify-center font-bold text-2xl'>
                <h3>Total Fare: ₹<span>{fares[vehicleType]}.00</span></h3>
            </div>

            <button onClick={() => openDriverConfirmPanel()} className='bg-black text-white h-15 text-2xl font-semibold mx-4 rounded-2xl absolute w-90 bottom-5'>Confirm Ride</button>
        </div>
    )
}

export default VehicleConfirmPanel
