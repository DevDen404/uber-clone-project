import React from 'react'

const VehicleSelectPanel = ({ setIsLocationPanelOpen, fares, selectVehicle, setisVehiclePanelOpen, vehicleSelectPanelRef, setPickupInput, setDestinationInput }) => {
    function closeVehicleSelectPanel(){
        setisVehiclePanelOpen(false)
        setIsLocationPanelOpen(false)
    }
    return (
        <div ref={vehicleSelectPanelRef} className='VehicleSelectDrawer absolute bottom-0 bg-white w-full p-2 flex flex-col justify-center gap-3  overflow-hidden rounded-t-3xl' >

            <div onClick={() => {closeVehicleSelectPanel()}} className='absolute right-2 top-2 text-2xl'>X</div>
            <h2 className='text-2xl font-semibold' >Choose your ride</h2>

            <ul className='flex flex-col overflow-hidden'>
                <li name='car' vehicle='car' onClick={(e) => { selectVehicle(e) }} className='bg-white rounded-lg p-3 mb-2 shadow text-black cursor-pointer hover:bg-violet-100 transition flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-4'>
                        <img className='w-28 inline' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
                        <div>
                            <span className='font-semibold text-lg block'>UBER GO</span>
                            <span className='text-sm text-gray-700 font-semibold block'>4 seats</span>
                            <span className='text-sm text-gray-500'>Affordable everyday rides</span>
                        </div>
                    </div>
                    <div className='text-right'>
                        <span className='font-bold text-lg'>₹{fares['car']}</span>
                    </div>
                </li>

                <li name='auto' vehicle='auto' onClick={(e) => { selectVehicle(e) }} className='bg-white rounded-lg p-3 mb-2 shadow text-black cursor-pointer hover:bg-violet-100 transition flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-4'>
                        <img className='w-28 inline' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                        <div>
                            <span className='font-semibold text-lg block'>UBER AUTO</span>
                            <span className='text-sm text-gray-700 font-semibold block'>3 seats</span>
                            <span className='text-sm text-gray-500'>Fast and economical rickshaw rides</span>
                        </div>
                    </div>
                    <div className='text-right'>
                        <span className='font-bold text-lg'>₹{fares['auto']}</span>
                    </div>
                </li>

                <li name='moto' vehicle='moto' onClick={(e) => { selectVehicle(e) }} className='bg-white rounded-lg p-3 mb-2 shadow text-black cursor-pointer hover:bg-violet-100 transition flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-4'>
                        <img className='w-28 inline' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                        <div>
                            <span className='font-semibold text-lg block'>UBER MOTO</span>
                            <span className='text-sm text-gray-700 font-semibold block'>1 seat</span>
                            <span className='text-sm text-gray-500'>Quick and low-cost bike rides</span>
                        </div>
                    </div>
                    <div className='text-right'>
                        <span className='font-bold text-lg'>₹{fares['moto']}</span>
                    </div>
                </li>
            </ul>


        </div>
    )
}

export default VehicleSelectPanel
