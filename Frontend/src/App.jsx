import React from 'react'
import { Link, Route, Routes } from "react-router-dom"
import UserLogin from "./pages/User/UserLogin"
import CaptainLogin from "./pages/Captain/CaptainLogin"
import UserSignUp from "./pages/User/UserSignUp"
import CaptainSignUp from "./pages/Captain/CaptainSignUp"
import GetStarted from './pages/GetStarted'
import UserHome from './pages/User/UserHome'
import WithUserProtectedRoute from './HOC/WithUserProtectedRoute'
import UserLogout from './pages/User/UserLogout'
import CaptainHome from './pages/Captain/CaptainHome'
import WithCaptainProtectedRoute from './HOC/WithCaptainProtectedRoute'
import CaptainLogout from './pages/Captain/CaptainLogout'
import Loading from './components/Loading'
const App = () => {
  return (<>
    <Routes>
      <Route path='/' element={<GetStarted />} />

      <Route path='/UserHome' element={
        <WithUserProtectedRoute>
          <UserHome />
        </WithUserProtectedRoute>
      } />

      <Route path='/UserLogin' element={<UserLogin />} />
      <Route path='/CaptainLogin' element={<CaptainLogin />} />
      <Route path='/UserSignUp' element={<UserSignUp />} />
      <Route path='/CaptainSignUp' element={<CaptainSignUp />} />

      <Route path='/UserLogout' element={

        <UserLogout />

      } />

      <Route path='/CaptainHome' element={
        <WithCaptainProtectedRoute>
          <CaptainHome />
        </WithCaptainProtectedRoute>
      } />

      <Route path='/CaptainLogout' element={<CaptainLogout/>} />
      <Route path='/loading' element={<Loading/>} />

    </Routes>
  </>
  )
}

export default App
