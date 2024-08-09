import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes, Route} from "react-router-dom"
import SignUpPage from './pages/auth/signup/SignUpPage'
import LoginPage from './pages/auth/login/LoginPage'
import HomePage from './pages/home/HomePage'
import Sidebar from './components/common/Sidebar'
import RightPanel from './components/common/RightPanel'
import NotificationPage from './pages/notification/NotificationPage'
import ProfilePage from './pages/profile/ProfilePage'
import { Toaster } from 'react-hot-toast'
import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from './components/common/LoadingSpinner'
import { Navigate } from 'react-router-dom'
function App() {
  const {data:authUser, isLoading, error, isError} = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try{
        const res = await fetch("https://twitter-clone-liard-three.vercel.app/api/auth/me"); //change
        const data = await res.json();
        if(data.error) return null;  //fix
        if(!res.ok){
          throw new Error(data.error || "something went erong")
        }
        console.log("authuser is here", data)
        return data;

      } catch (err) {
        throw new Error (err);
      }
    },
    retry: false
  })

  if(isLoading){
    return (
      <div className="h-screen flex justify-center itemss-center ">
         <LoadingSpinner size="lg"/>
      </div>
    )
  }

  return (
    <div className="flex max-w-6xl mx-auto">
      {authUser && <Sidebar />}
    <Routes>
      <Route path="/" element={authUser? <HomePage />: <Navigate to="/login" />}/>
      <Route path="/signup" element={!authUser ? <SignUpPage />: <Navigate to="/"/> }/>
      <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />}/>
      <Route path="/notifications" element={authUser ? <NotificationPage /> : <Navigate to="/login" />}/>
      <Route path="/profile/:username" element={authUser ? <ProfilePage/> : <Navigate to="/login" />}/>
    </Routes>
    {authUser && <RightPanel/>}
    <Toaster />
    </div>
  )
}

export default App
