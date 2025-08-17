import { useContext, useEffect, useRef, useState } from 'react'
import { UserDataContext } from '../../context/UserContext'
import gsap from 'gsap'
import axios from 'axios';
import { SocketContext } from '../../context/SocketContext'
import Loading from '../../components/Loading';
import LocationSelectDrawer from '../../components/LocationSelectDrawer';
import VehicleSelectPanel from '../../components/VehicleSelectPanel';
import VehicleConfirmPanel from '../../components/VehicleConfirmPanel';
import DriverConfirmPanel from '../../components/DriverConfirmPanel';
import DriverConfirmedPanel from '../../components/DriverConfirmedPanel';
import LiveTracking from '../../components/LiveTracking';
import Notify from '../../components/ToastEmitter'
import ToastComponent from '../../components/ToastComponent';

const Home = () => {
  const { user } = useContext(UserDataContext)
  const { receiveMessage, sendMessage } = useContext(SocketContext)

  //States are mentioned here
  const [IsLocationPanelOpen, setIsLocationPanelOpen] = useState(false)
  const [isVehiclePanelOpen, setisVehiclePanelOpen] = useState(false)
  const [isVehicleConfirmPanelOpen, setIsVehicleConfirmPanelOpen] = useState(false)
  const [driverConfirmPanel, setDriverConfirmPanel] = useState(false)
  const [driverConfirmedPanel, setDriverConfirmedPanel] = useState(false)
  const [mapPanelOpen, setMapPanelOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [pickupFieldFocused, setIsPickupFieldFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pickupInput, setPickupInput] = useState('')
  const [destinationInput, setDestinationInput] = useState('')
  const [selectedInput, setSelectedInput] = useState('')
  const [fares, setFares] = useState({})
  const [vehicleType, setVehicleType] = useState('')
  const vehicleImage = {
    car: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png",
    auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
    moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
  }
  const [captainData, setCaptainData] = useState({})
  const [rideData, setRideData] = useState({})
  //REFs are mentioned here
  const locationSelectDrawer = useRef()
  const locationInputRef = useRef()
  const locationCloseBtnRef = useRef()
  const pickuplocationSelectRef = useRef()
  const vehicleSelectPanelRef = useRef()
  const vehicleConfirmPanelRef = useRef()
  const driverConfirmPanelRef = useRef()
  const driverConfirmedPanelRef = useRef()
  const mapPanelRef = useRef()


  // functions are mentioned here
  function openDriverConfirmedPanel() {
    setDriverConfirmedPanel(true)
  }
  function openLocationPanel() {
    setIsLocationPanelOpen(true)
  }

  function closeLocationPanel() {
    setIsLocationPanelOpen(false)
    setPickupInput("")
    setDestinationInput("")
  }
  async function openVehicleSelectPanel() {
    if (pickupInput.length < 4 || destinationInput.length < 4) { Notify("Please enter valid pickup and destination"); return }
    setLoading(true)
    try {
      const token = localStorage.getItem('UserToken')
      const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/getFare`, {
        params: {
          origin: pickupInput,
          destination: destinationInput
        },
        headers: {
          Authorization: `bearer ${token}`
        }
      })
      setFares(result.data)
      setisVehiclePanelOpen(true)
    } catch (error) {
      if (error.status === 404) {
        Notify("No routes found. Please enter valid address")
      }else{
        Notify("Something went wrong. Please check address")
      }
    }
    setLoading(false)



  }
  function openVehicleConfirmPanel() {
    setIsVehicleConfirmPanelOpen(true)
  }

  async function openDriverConfirmPanel() {
    setLoading(true)
    const rideDetail = { origin: pickupInput, destination: destinationInput, vehicleType: vehicleType }
    const token = localStorage.getItem('UserToken')
    await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/createRide`, rideDetail,
      {
        headers: {
          Authorization: `bearer ${token}`
        }
      }
    )
    setLoading(false)
    setDriverConfirmPanel(true)
  }

  async function getAddressSuggestions(e) {

    if (e.target.name === 'pickup') {
      setPickupInput(e.target.value)
    }
    if (e.target.name === 'destination') {
      setDestinationInput(e.target.value)
    }
    if (e.target.value.length < 3) {
      return;
    }

    const token = await localStorage.getItem('UserToken')
    if (!token) {
      throw new Error("Invalid token")
    }
    try {
      
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/map/getAddressSuggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
      setSuggestions([]);
    }
  }

  function pickupFieldFocus() {
    setIsPickupFieldFocused(true);
    setSelectedInput('pickup')
  }
  function pickupFieldBlur() {
    setIsPickupFieldFocused(false);
  }
  function destinationFieldFocus() {
    setSelectedInput('destination')
  }
  function destinationFieldBlur() {
  }
  function suggestionClickHandler(suggestion) {
    const input = `${suggestion.structured_formatting?.main_text} ${suggestion.structured_formatting?.secondary_text}`
    if (selectedInput === 'pickup') {
      setPickupInput(input)
    }
    if (selectedInput === 'destination') {
      setDestinationInput(input)
    }

  }
  function selectVehicle(e) {
    setLoading(true)
    const vehicle = e.currentTarget.getAttribute('vehicle')
    setVehicleType(vehicle)
    setLoading(false)
    openVehicleConfirmPanel()
  }

  //effects are mentioned here
  useEffect(() => {
    if (IsLocationPanelOpen) {
      gsap.to(locationSelectDrawer.current, {
        height: '100%'
      });
      gsap.to(locationInputRef.current, {
        height: '20%'
      });
      gsap.to(locationCloseBtnRef.current, {
        opacity: 1
      })
      gsap.to(pickuplocationSelectRef.current, {
        height: '80%'
      })
      gsap.set(pickuplocationSelectRef.current, {
        display: "block"
      })
    } else {
      gsap.to(locationSelectDrawer.current, {
        height: '30%'
      })
      gsap.to(locationCloseBtnRef.current, {
        opacity: 0
      })
      gsap.to(pickuplocationSelectRef.current, {
        height: '0%'
      })
      gsap.set(pickuplocationSelectRef.current, {
        display: "none"
      })
      gsap.to(locationInputRef.current, {
        height: '100%'
      })
    }

  }, [IsLocationPanelOpen])

  useEffect(() => {
    if (isVehiclePanelOpen) {
      gsap.to(locationSelectDrawer.current, {
        height: '0%'
      });

      gsap.to(vehicleSelectPanelRef.current, {
        height: '50%'
      })

    } else {
      gsap.to(vehicleSelectPanelRef.current, {
        height: '0%'
      })
      gsap.to(locationSelectDrawer.current, {
        height: '30%'
      });
    }

  }, [isVehiclePanelOpen])

  useEffect(() => {
    if (isVehicleConfirmPanelOpen) {
      gsap.to(vehicleSelectPanelRef.current, {
        height: '0%',
        opacity: 0
      });

      gsap.to(vehicleConfirmPanelRef.current, {
        height: '50%'
      })

    } else {
      gsap.to(vehicleConfirmPanelRef.current, {
        height: '0%',
      })
      gsap.to(vehicleSelectPanelRef.current, {
        height: '25%'
      });
    }

  }, [isVehicleConfirmPanelOpen])

  useEffect(() => {
    if (driverConfirmPanel) {
      gsap.to(vehicleConfirmPanelRef.current, {
        height: '0%',
        opacity: 0
      })

      gsap.to(driverConfirmPanelRef.current, {
        height: '50%',
        opacity: 1
      })
    }
    else {
      gsap.to(driverConfirmPanelRef.current, {
        height: '0%',
        opacity: 0
      })
    }
  }, [driverConfirmPanel])
  useEffect(() => {
    if (pickupFieldFocused) {
      gsap.to(pickuplocationSelectRef.current, {
        opacity: 1
      })
    }
    else {
      gsap.to(pickuplocationSelectRef.current, {
        opacity: 0,
        height: '0%'
      })
    }
  }, [pickupFieldFocused])
  useEffect(() => {
    if (driverConfirmedPanel) {
      gsap.set(driverConfirmedPanelRef.current, { display: 'block' });
      gsap.to(driverConfirmedPanelRef.current, {
        height: "50%",
        opacity: 1
      })
      gsap.to(driverConfirmPanelRef.current, {
        height: "0%",
        opacity: 0
      })
      gsap.set(driverConfirmPanelRef.current, { display: 'none' });
    } else {
      gsap.set(driverConfirmedPanelRef.current, { display: 'none' });
      gsap.to(driverConfirmedPanelRef.current, {
        height: "0%",
        opacity: 0
      })
    }
  }, [driverConfirmedPanel])
  useEffect(() => {
    if (mapPanelOpen) {
      gsap.set(mapPanelRef.current, { display: 'block', z: 10 });
      gsap.to(mapPanelRef.current, {
        height: "100%",
        opacity: 1
      })
      gsap.to(driverConfirmedPanelRef.current, {
        height: "0%",
        opacity: 0
      })
      gsap.set(driverConfirmedPanelRef.current, { display: 'none' });
    } else {
      gsap.set(mapPanelRef.current, { display: 'none' });
      gsap.to(mapPanelRef.current, {
        height: "0%",
        opacity: 0
      })
    }
  }, [mapPanelOpen])
  // useeffects for SOCKET
  useEffect(() => {
    sendMessage("join", { userType: "user", userId: user._id })
  })

  useEffect(() => {
    receiveMessage('rideData', (data) => { setRideData(data);console.log(data) })
    receiveMessage('rideAccepted', (data) => {
      console.log(data)
      setCaptainData(data)
      openDriverConfirmedPanel()
    });
    receiveMessage('otpVerified', (data) => {
      setMapPanelOpen(true)
    });

  });




  return (<>
    <ToastComponent />
    <div className='fixed z-10'>{loading && <div className=' bg-[#00000026] h-dvh'><Loading /></div>}</div>
    <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" className='w-25 absolute top-3 left-3' alt="" />
    <LiveTracking mapPanelOpen={mapPanelOpen} />
    <div className='BACKGROUND h-dvh bg-cover bg-center bg-no-repeat overflow-hidden'> {/*BACKGROUND IMAGE*/}

      <LocationSelectDrawer pickupInput={pickupInput}
        destinationInput={destinationInput}
        locationSelectDrawer={locationSelectDrawer}
        locationCloseBtnRef={locationCloseBtnRef}
        locationInputRef={locationInputRef}
        pickuplocationSelectRef={pickuplocationSelectRef}
        closeLocationPanel={closeLocationPanel}
        openLocationPanel={openLocationPanel}
        pickupFieldFocus={pickupFieldFocus}
        pickupFieldBlur={pickupFieldBlur}
        destinationFieldFocus={destinationFieldFocus}
        destinationFieldBlur={destinationFieldBlur}
        getAddressSuggestions={getAddressSuggestions}
        suggestions={suggestions}
        suggestionClickHandler={suggestionClickHandler}
        openVehicleSelectPanel={openVehicleSelectPanel}

      />

      <VehicleSelectPanel fares={fares}
        selectVehicle={selectVehicle}
        setisVehiclePanelOpen={setisVehiclePanelOpen}
        vehicleSelectPanelRef={vehicleSelectPanelRef}
        setPickupInput={setPickupInput}
        setDestinationInput={setDestinationInput}
        setIsLocationPanelOpen={setIsLocationPanelOpen}
      />

      <VehicleConfirmPanel vehicleType={vehicleType}
        vehicleImage={vehicleImage}
        pickupInput={pickupInput}
        destinationInput={destinationInput}
        fares={fares}
        vehicleConfirmPanelRef={vehicleConfirmPanelRef}
        openDriverConfirmPanel={openDriverConfirmPanel} />

      <DriverConfirmPanel driverConfirmPanelRef={driverConfirmPanelRef}
        vehicleImage={vehicleImage}
        vehicleType={vehicleType}
      />

      <DriverConfirmedPanel driverConfirmedPanelRef={driverConfirmedPanelRef}
        vehicleImage={vehicleImage}
        vehicleType={vehicleType}
        captainData={captainData}
        rideData={rideData}
        pickupInput={pickupInput}
        destinationInput={destinationInput}
        fares={fares}
      />

      <div ref={mapPanelRef} className="MapPanel w-full absolute bottom-0 h-full bg-white opacity-0 flex flex-col rounded-t-3xl shadow-2xl transition-opacity duration-300 z-9"
      >
        {/* Top Panel: Driver + Vehicle Details */}
        <div className="flex-shrink-0 flex flex-col px-4 py-3 bg-white" style={{ flexBasis: '20%' }}>
          {/* Header Section */}
          <div className="flex justify-between items-center gap-4 mb-2">
            {/* Vehicle Image */}
            <img
              className="w-16 h-10 object-contain"
              src={vehicleImage[vehicleType]}
              alt="Vehicle"
            />

            {/* Driver Profile */}
            <div className="flex items-center gap-2">
              <img
                className="w-10 h-10 rounded-full border-2 border-blue-200"
                src="https://cdn-icons-png.flaticon.com/512/3410/3410160.png"
                alt="Driver"
              />
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">
                  {captainData?.fullname?.firstname} {captainData?.fullname?.lastname}
                </p>
                <p className="text-xs text-gray-500">{captainData?.vehicle?.plate}</p>
              </div>
            </div>
          </div>

          {/* OTP */}
          <div className="text-sm font-semibold text-blue-700 tracking-wider bg-blue-50 px-3 py-1 rounded-xl self-start">
            OTP: <span className="ml-2 tracking-[0.3em]">{rideData.otp}</span>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-grow w-full bg-gray-100">
          {/* Replace this with actual Map component when ready */}
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg">
            MAP
          </div>
        </div>
      </div>

    </div>
  </>
  )
}

export default Home
