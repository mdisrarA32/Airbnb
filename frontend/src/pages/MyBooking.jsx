import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { userDataContext } from '../Context/UserContext';
import Card from '../Component/Card';

function MyBooking() {
  let navigate = useNavigate()
  let { userData } = useContext(userDataContext)


  return (
    <div className='min-h-screen bg-gray-50 pb-20 pt-6 px-4 md:px-8 font-sans'>

      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 p-3 rounded-full bg-white hover:bg-gray-100 shadow-sm border border-gray-200 transition-all duration-300 group inline-flex items-center gap-2"
        >
          <FaArrowLeftLong className='w-5 h-5 text-gray-600 group-hover:text-black' />
          <span className="font-medium text-gray-600 group-hover:text-black">Back to Home</span>
        </button>

        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">My Bookings</h1>
          <p className="text-gray-500 mt-2">Places you've booked for your trips</p>
        </div>

        {/* Listings Grid */}
        {userData.booking?.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
            {userData.booking.map((list) => (
              <Card
                key={list._id}
                title={list.title}
                landMark={list.landMark}
                city={list.city}
                image1={list.image1}
                image2={list.image2}
                image3={list.image3}
                rent={list.rent}
                id={list._id}
                isBooked={list.isBooked}
                ratings={list.ratings}
                host={list.host}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="text-6xl mb-4">✈️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No trips booked... yet!</h3>
            <p className="text-gray-500 mb-6">Time to dust off your bags and start planning your next adventure.</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition shadow-lg shadow-rose-100"
            >
              Start Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBooking
