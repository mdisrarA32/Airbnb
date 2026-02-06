import React, { useContext, useState } from 'react'
import { GiConfirmed } from "react-icons/gi";
import { bookingDataContext } from '../Context/BookingContext';
import { useNavigate } from 'react-router-dom';
import Star from '../Component/Star';
import { userDataContext } from '../Context/UserContext';
import { authDataContext } from '../Context/AuthContext';
import { listingDataContext } from '../Context/ListingContext';
import axios from 'axios';
import { FaHeart } from "react-icons/fa";

function Booked() {
  let { bookingData } = useContext(bookingDataContext)
  let [star, setStar] = useState(0)
  let { serverUrl } = useContext(authDataContext)

  let { getCurrentUser } = useContext(userDataContext)
  let { getListing, cardDetails } = useContext(listingDataContext)

  let navigate = useNavigate()

  const handleRating = async (id) => {
    try {
      if (!id) {
        // Fallback if cardDetails is lost, navigate home
        navigate("/")
        return;
      }
      let result = await axios.post(serverUrl + `/api/listing/ratings/${id}`, {
        ratings: star
      }, { withCredentials: true })
      await getListing()
      await getCurrentUser()

      console.log(result);
      navigate("/")

    } catch (error) {
      console.log(error)
    }
  }

  const handleStar = async (value) => {
    setStar(value)
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4'>

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">

        {/* Success Header */}
        <div className="bg-green-50 p-8 flex flex-col items-center justify-center text-center border-b border-green-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-sm animate-bounce">
            <GiConfirmed className='w-10 h-10 text-green-600' />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Booking Confirmed!</h1>
          <p className="text-gray-600 mt-2">Pack your bags, you're going places.</p>
        </div>

        {/* Details */}
        <div className="p-8 space-y-6">

          {bookingData && (
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-500 font-medium">Booking ID</span>
                <span className="font-mono font-bold text-gray-800">{bookingData._id}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-gray-500">Contact</span>
                <span className="font-semibold text-gray-800">{bookingData.host?.email}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-gray-500">Total Paid</span>
                <span className="font-bold text-rose-600 text-lg">₹{bookingData.totalRent}</span>
              </div>
            </div>
          )}

          {/* Rating Section */}
          <div className="text-center pt-4">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Rate Your Experience</p>
            <div className="flex justify-center mb-4">
              <Star onRate={handleStar} />
            </div>
            <p className="text-sm text-gray-500 h-6">
              {star > 0 ? `You selected ${star} star${star > 1 ? 's' : ''}` : 'Tap a star to rate'}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition shadow-lg flex items-center justify-center gap-2"
              onClick={() => handleRating(cardDetails?._id)}
            >
              Submit & Continue <FaHeart className="text-red-500" />
            </button>
            <button
              className="w-full py-3 text-gray-500 font-semibold hover:bg-gray-50 rounded-xl transition"
              onClick={() => navigate("/")}
            >
              Skip
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Booked
