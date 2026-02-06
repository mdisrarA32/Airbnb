import React, { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { userDataContext } from '../Context/UserContext';
import Card from '../Component/Card';
import { getHostScore } from '../utils/calculations';
import { FaChartLine } from "react-icons/fa";

function MyListing() {
  let navigate = useNavigate()
  let { userData } = useContext(userDataContext)

  // Calculate average host score across all listings
  const averageHostScore = useMemo(() => {
    if (!userData?.listing?.length) return 0;
    const totalScore = userData.listing.reduce((sum, list) => sum + Number(getHostScore(list)), 0);
    return (totalScore / userData.listing.length).toFixed(1);
  }, [userData]);

  return (
    <div className='min-h-screen bg-gray-50 pb-20 pt-6 px-4 md:px-8 font-sans'>

      {/* Navigation & Container */}
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 p-3 rounded-full bg-white hover:bg-gray-100 shadow-sm border border-gray-200 transition-all duration-300 group inline-flex items-center gap-2"
        >
          <FaArrowLeftLong className='w-5 h-5 text-gray-600 group-hover:text-black' />
          <span className="font-medium text-gray-600 group-hover:text-black">Back to Home</span>
        </button>

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Host Dashboard</h1>
            <p className="text-gray-500 mt-2">Manage your listings and view performance</p>
          </div>

          {/* Host Score Card */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-4">
            <div className="p-3 bg-rose-50 rounded-xl text-rose-500">
              <FaChartLine className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Performance Score</div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-gray-900">{averageHostScore}</span>
                <span className="text-sm text-gray-400">/ 5.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {userData?.listing?.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
            {userData.listing.map((list) => (
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
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No listings yet</h3>
            <p className="text-gray-500 mb-6">Start earning by listing your property today.</p>
            <button
              onClick={() => navigate('/listingpage1')}
              className="px-6 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition shadow-lg shadow-rose-100"
            >
              Create a Listing
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default MyListing
