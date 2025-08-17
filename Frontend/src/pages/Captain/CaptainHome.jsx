import { useContext, useEffect, useRef, useState } from 'react'
import { UserDataContext } from '../../context/UserContext'
import { Link } from 'react-router-dom'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import gsap from 'gsap'
import { CaptainDataContext } from '../../context/CaptainContext';
import { SocketContext } from '../../context/SocketContext';
import axios from 'axios';
import LiveTracking from '../../components/LiveTracking';

const CaptainHome = () => {

  const [acceptRidesPanelOpen, setAcceptRidesPanelOpen] = useState(false)
  const [otpConfirmPanelOpen, setOtpConfirmPanelOpen] = useState(false)
  const [ridingPanelOpen, setRidingPanelOpen] = useState(false)
  const [finishedRidePanelOpen, setFinishedRidePanelOpen] = useState(false)
  const [newRide, setNewRide] = useState(false)
  const [newRideData, setNewRideData] = useState({})
  const [captainActive, setCaptainActive] = useState(false)
  const { captain } = useContext(CaptainDataContext)
  const { sendMessage, receiveMessage } = useContext(SocketContext)
  const acceptRidesPanelRef = useRef()
  const captainProfileDrawerRef = useRef()
  const otpConfirmPanelRef = useRef()
  const ridingPanelRef = useRef()
  const finishedRidePanelRef = useRef()


  useEffect(() => {
    sendMessage("join", { userType: "captain", userId: captain._id })

    const updateLocation = () => {
      const userId = captain._id
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>
          sendMessage('updateCaptainLocation', {
            userId: userId,
            ltd: position.coords.latitude,
            lng: position.coords.longitude
          })
        )
      }
    }
    updateLocation()

    // const locationInterval = setInterval(updateLocation,10000)
    // return ()=> clearInterval(locationInterval) 
  }, [])

  useEffect(() => {
    receiveMessage('newRide', (data) => {
      setNewRideData(data);
      setNewRide(true)
      newRideIncoming()
    });
  });

  useEffect(() => {
    getAux()
  }, [captain?._id])




  function closeAcceptRidesPanel() {
    setAcceptRidesPanelOpen(false)
  }
  async function openOtpConfirmPanel() {
    const userId = newRideData.userId
    const rideId = newRideData._id
    const captainId = captain._id
    await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/acceptRide`, { userId, captainId, rideId })
    setOtpConfirmPanelOpen(true)
  }
  async function otpFormHandler(e) {
    e.preventDefault()
    const otp = e.target[0].value
    const userId = newRideData.userId
    const rideId = newRideData._id
    const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/verifyOtp`, { otp, userId, rideId })

    if (result.data) {
      setRidingPanelOpen(true)
    }


  }
  function finishRide() {
    setFinishedRidePanelOpen(true)
  }
  function newRideIncoming() {
    if (captainActive) {
      setNewRide(true)
    }
  }
  async function setCaptainStatus(e) {
    if (!captain?._id) {
      console.warn("captain id not available")
      return
    }

    if (e.target.name === 'active') {
      setCaptainActive(true)
      const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/captainStatusChange`, {
        captainId: captain._id,
        status: "active"
      })
      return
    }
    if (e.target.name === 'inactive') {
      setCaptainActive(false)
      await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/captainStatusChange`, {
        captainId: captain._id,
        status: "inactive"
      })
      return
    }
  }
  async function getAux() {
    try {
      const captainId = captain._id
      const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/aux`, { captainId })
      const status = result.data.status
      if (status === 'active') {
        setCaptainActive(true)
        return
      }
      if (status === 'inactive') {
        setCaptainActive(false)
        return
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }

  useEffect(() => {
    if (newRide) {
      gsap.to(acceptRidesPanelRef.current, {
        height: "45%",
        opacity: 1
      });
      gsap.set(acceptRidesPanelRef.current, { display: 'block' })
      gsap.to(captainProfileDrawerRef.current, {
        height: "0%",
        opacity: 0
      })
    } else {
      gsap.to(acceptRidesPanelRef.current, {
        height: '0%',
        opacity: 0
      });
      gsap.set(acceptRidesPanelRef.current, { display: 'none' })
      gsap.to(captainProfileDrawerRef.current, {
        height: '40%',
        opacity: 1
      })
    }
  }, [newRide])

  useEffect(() => {
    if (otpConfirmPanelOpen) {
      gsap.to(otpConfirmPanelRef.current, {
        height: "25%",
        opacity: 1
      });
      gsap.set(otpConfirmPanelRef.current, { display: 'block' })
      gsap.to(acceptRidesPanelRef.current, {
        height: "0%",
        opacity: 0
      })
    } else {
      gsap.to(otpConfirmPanelRef.current, {
        height: '0%',
        opacity: 0,
      });
      gsap.set(otpConfirmPanelRef.current, { display: 'none' })
    }
  }, [otpConfirmPanelOpen])

  useEffect(() => {
    if (ridingPanelOpen) {
      gsap.to(ridingPanelRef.current, {
        height: "8%",
        opacity: 1
      });
      gsap.to(otpConfirmPanelRef.current, {
        height: "0%",
        opacity: 0
      })
    } else {
      gsap.to(ridingPanelRef.current, {
        height: '0%',
        opacity: 0
      });
    }
  }, [ridingPanelOpen])

  useEffect(() => {
    if (finishedRidePanelOpen) {
      gsap.to(finishedRidePanelRef.current, {
        height: "50%",
        opacity: 1
      });
      gsap.to(ridingPanelRef.current, {
        height: "0%",
        opacity: 0
      })
    } else {
      gsap.to(finishedRidePanelRef.current, {
        height: '0%',
        opacity: 0
      });
    }
  }, [finishedRidePanelOpen])


  return (
    <>

      {/* a button to generate ride */}
      
      <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" className='w-25 absolute top-3 left-3' alt="" /> {/*LOGO*/}
      <LiveTracking/>

      <div className='BACKGROUND h-dvh bg-cover bg-center bg-no-repeat overflow-hidden'> {/*BACKGROUND IMAGE*/}

        <div className="CaptainProfileDrawer absolute bottom-0 w-screen bg-white h-[4]30%] px-6 py-4 flex flex-col gap-4 overflow-hidden z-1 rounded-t-3xl shadow-xl"
          ref={captainProfileDrawerRef}
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Captain Profile</h2>
            <span className="text-sm text-gray-500">Dashboard</span>
          </div>

          {/* Profile + Ratings + Stats */}
          <div className="flex items-center justify-between">
            {/* Profile Image and Name */}
            <div className="flex items-center gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3410/3410160.png" // Replace with actual image
                alt="Driver Avatar"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="text-md font-bold text-gray-800">{captain?.fullname?.firstname} {captain?.fullname?.lastname}</h3>
                <p className="text-sm text-blue-600">{captain?.email}</p>
                <p className="text-sm text-gray-500">{captain?.vehicle?.plate}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex flex-col items-end">
              <span className="text-yellow-500 font-semibold text-xl">4.87 ★</span>
              <span className="text-xs text-gray-500">1,250 Rides</span>
            </div>
          </div>

          {/* Earnings Summary */}
          <div className="flex justify-between border-t pt-3 border-gray-200">
            <div className="flex flex-col text-center">
              <span className="font-bold text-lg text-green-600">₹12,430</span>
              <span className="text-xs text-gray-500">This Week</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="font-bold text-lg text-green-600">₹48,000</span>
              <span className="text-xs text-gray-500">This Month</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="font-bold text-lg text-green-600">₹5.6/km</span>
              <span className="text-xs text-gray-500">Avg. Earnings</span>
            </div>
          </div>

          {/* Start Taking Rides Button */}
          {captainActive ? (
            <button name='inactive' onClick={(e) => setCaptainStatus(e)} className="mt-auto w-full bg-red-500 hover:bg-red-600 transition-all duration-100 text-white py-3 rounded-xl font-semibold" >Stop Taking Rides</button>
          ) : (
            <button
              name='active'
              onClick={(e) => setCaptainStatus(e)}
              className="mt-auto w-full bg-green-500 hover:bg-orange-600 transition-all duration-100 text-white py-3 rounded-xl font-semibold"
            >
              Start Taking Rides
            </button>
          )}

        </div>

        <div className="NewRidePanel bg-white absolute w-full bottom-0 h-[30%] rounded-t-3xl overflow-hidden shadow-xl transition-all duration-100 opacity-100 px-6 py-4 z-2"
          ref={acceptRidesPanelRef}
        >
          {/* Ride Request Section */}
          <div className="border-t pt-3 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">🚗 New Ride Request...</h3>

            {/* Demo Ride Info */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4 shadow-sm">
              <div className="flex justify-between items-start mb-2 gap-4">
                {/* Pickup Address Box */}
                <div className="w-1/2 max-h-[200px] overflow-y-auto">
                  <p className="text-sm text-gray-500">Pickup:</p>
                  <p className="text-md font-semibold text-gray-800 whitespace-normal break-words">
                    {newRideData.origin}
                  </p>
                </div>

                {/* Drop Address Box */}
                <div className="w-1/2 max-h-[200px] overflow-y-auto text-right">
                  <p className="text-sm text-gray-500">Drop:</p>
                  <p className="text-md font-semibold text-gray-800 whitespace-normal break-words">
                    {newRideData.destination}
                  </p>
                </div>
              </div>


              <div className="flex justify-between text-gray-800 w-full bg-yellow-100 p-3 rounded-md shadow-inner">
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-500">Distance</span>
                  <span className="text-lg font-bold text-blue-700">8.2 km</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-500">Est. Fare</span>
                  <span className="text-lg font-bold text-green-700">₹{newRideData.fare}</span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500">Time</span>
                  <span className="text-lg font-bold text-red-700">20 min</span>
                </div>
              </div>

            </div>

            {/* Accept / Reject Buttons */}
            <div className="flex justify-around gap-4 bottom-5 absolute w-[85%]">
              <button
                onClick={() => openOtpConfirmPanel()}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-all duration-100"
              >
                Accept
              </button>
              <button
                onClick={() => setNewRide(false)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition-all duration-100"
              >
                Reject
              </button>
            </div>
          </div>
        </div>

        <div className="OTPconfirmPanel bg-white h-[30%] w-full absolute bottom-0 rounded-t-3xl overflow-hidden shadow-xl transition-all duration-100 opacity-100 px-6 py-6 z-3"
          ref={otpConfirmPanelRef}
        >
          {/* Panel Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-gray-800">Enter OTP to Confirm Ride</h1>
            <p className="text-sm text-gray-500 mt-1">OTP was sent to the rider’s phone</p>
          </div>

          {/* OTP Input Form */}
          <form
            className="flex flex-col items-center gap-4"
            onSubmit={(e) => otpFormHandler(e)}
          >
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              required
              placeholder="Enter 6-digit OTP"
              className="text-center text-lg tracking-widest p-3 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
              type="submit"
              className="w-64 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-100"
            >
              Start Ride
            </button>
          </form>
        </div>


        <div className='RidingPanel  h-0 opacity-0 w-full absolute bottom-0 rounded-3xl flex flex-col items-center z-4 overflow-hidden' ref={ridingPanelRef}>
          <button className='bg-green-500 h-15 w-80' onClick={() => finishRide()}>Finish Ride</button>
        </div>

        <div className="FinishedRidePanel bg-white h-0 opacity-0 w-full absolute bottom-0 rounded-3xl overflow-hidden z-50 shadow-xl transition-all duration-500 ease-in-out" ref={finishedRidePanelRef} >
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              Ride Completed
            </h2>
            <p className="text-md text-gray-600 text-center">
              Here are the details and fare of your completed ride.
            </p>

            {/* Example: Ride details could go here */}
            <div className="bg-gray-100 rounded-xl p-5 text-sm text-gray-700 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <span className="flex-shrink-0 font-medium text-gray-800">Pickup:</span>
                <span className="max-w-[65%] break-words text-right">
                  {newRideData?.origin}
                </span>
              </div>
              <div className="flex justify-between items-start mb-3">
                <span className="flex-shrink-0 font-medium text-gray-800">Drop-off:</span>
                <span className="max-w-[65%] break-words text-right">
                  {newRideData.destination}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900">
                <span>Total Fare:</span>
                <span>₹{newRideData.fare}</span>
              </div>
            </div>


          </div>

          <div className="w-full absolute bottom-4 flex justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-medium px-8 py-3 rounded-full shadow-md transition duration-300">
              Receive Payment
            </button>
          </div>
        </div>


      </div>
    </>
  )
}

export default CaptainHome
