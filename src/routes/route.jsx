import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from '../pages/Homepage'
import ContactUs from '../pages/ContactUs'
import Packages from '../pages/Packages'
import Gallery from '../pages/Gallery'
import Bookings from '../pages/Bookings'
import PackageDetails from '../pages/Packagedetails'
import About from '../pages/About'
import AddReview from '../components/AddReview'
import LoginPage from '../pages/auth/LoginPage'
import SignUp from '../pages/auth/SignUpPage'
import Index from '../pages/Index'
import UserReview from '../pages/UserDashboard/UserReview'
import BookingHistory from '../pages/UserDashboard/BookingHistory'

import DashboardLayout from '../pages/UserDashboard/DashboardLayout'
import UserPhotoSubmission from '../pages/UserDashboard/UserPhotoSubmission'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { PublicRoute } from '../services/Guard'
import Unsubscribe from '../pages/Unsubscribe'
import VerifySubscriber from '../pages/VerifySubscriber'

function AppRoutes() {
  return (
    <Router>
       <ToastContainer />
      <Routes>

        <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
        <Route path="/signup" element={<PublicRoute element={<SignUp/>} />}/>

    
        <Route path="/" element={<Index />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/packages/:slug" element={<PackageDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/review" element={<AddReview />} />
    

        <Route path="/userreview" element={<UserReview />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/sharephotos" element={<UserPhotoSubmission />} />
         <Route path="/subscribers/unsubscribe" element={<Unsubscribe />} />
         <Route path="/subscribers/verify" element={<VerifySubscriber />} />
          <Route path="/bookinghistory" element={<BookingHistory/>} />

    
      </Routes>
    </Router>
  )
}

export default AppRoutes
