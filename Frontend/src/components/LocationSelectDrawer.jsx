import React from 'react'


const LocationSelectDrawer = ({ pickupInput,
    destinationInput,
    locationSelectDrawer,
    locationCloseBtnRef,
    locationInputRef,
    pickuplocationSelectRef,
    closeLocationPanel,
    openLocationPanel,
    pickupFieldFocus,
    pickupFieldBlur,
    destinationFieldFocus,
    destinationFieldBlur,
    getAddressSuggestions,
    suggestions,
    suggestionClickHandler,
    openVehicleSelectPanel }) => {
    return (

        <div className=' LocationSelectDrawer absolute bottom-0 w-screen bg-white px-4 flex flex-col gap-5 overflow-hidden z-9 rounded-t-3xl' ref={locationSelectDrawer}>

            <div className='PANELCLOSEBTN absolute right-3 top-2 text-2xl' ref={locationCloseBtnRef} onClick={() => closeLocationPanel()}>X</div>

            <div ref={locationInputRef} className='h-[100%]  mt-5 flex flex-col gap-2 justify-center' onClick={() => { openLocationPanel() }}>
                <h2 className='font-medium text-3xl'>Find a trip</h2>
                <input value={pickupInput} name='pickup' onChange={(e) => { getAddressSuggestions(e) }} onFocus={() => { pickupFieldFocus() }} onBlur={() => { pickupFieldBlur() }} type="text" className='w-full bg-gray-100 text-xl rounded-xl px-5 h-10' placeholder='Add a pick-up location' />
                <input value={destinationInput} name='destination' onChange={(e) => { getAddressSuggestions(e) }} onFocus={() => { pickupFieldFocus(), destinationFieldFocus() }} onBlur={() => { pickupFieldBlur(), destinationFieldBlur() }} type="text" className='w-full bg-gray-100 text-xl rounded-xl px-5 h-10' placeholder='Enter your destination' />
                <div className='w-full flex'>

                    <button onClick={() => { openVehicleSelectPanel() }} className='bg-black text-white text-xl h-10 w-full rounded-2xl mx-auto'>See Prices</button>
                </div>
            </div>

            <div ref={pickuplocationSelectRef} className='h-[60%] ' >
                <ul>
                    {suggestions.length > 0 && suggestions.map((suggestion, idx) => (
                        <li
                            key={suggestion.place_id}
                            className="flex flex-col px-4 py-2 cursor-pointer hover:bg-gray-100 rounded transition"
                            tabIndex={0}
                            aria-label={suggestion.description}
                            onClick={() => { suggestionClickHandler(suggestion) }}
                        >
                            <span className="font-semibold text-lg">
                                {suggestion.structured_formatting?.main_text}
                            </span>
                            <span className="text-gray-500 text-sm">
                                {suggestion.structured_formatting?.secondary_text}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>

    )
}

export default LocationSelectDrawer
