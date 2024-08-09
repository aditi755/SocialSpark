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
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'https://twitter-clone-2-khaki.vercel.app/api';
axios.defaults.withCredentials = true;
function App() {
  const {data:authUser, isLoading, error, isError} = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try{
        console.log(axios.defaults.baseURL);
        const res = await fetch("/api/auth/me"); //change
        console.log(axios.defaults.baseURL);
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
