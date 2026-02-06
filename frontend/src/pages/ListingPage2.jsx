import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";

import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";

import { IoBedOutline } from "react-icons/io5";

import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { useContext } from 'react';
import { listingDataContext } from '../Context/ListingContext';

function ListingPage2() {

  let navigate = useNavigate()
  let { category, setCategory } = useContext(listingDataContext)

  const categories = [
    { id: 'villa', label: 'Villa', icon: GiFamilyHouse },
    { id: 'farmHouse', label: 'Farm House', icon: FaTreeCity },
    { id: 'poolHouse', label: 'Pool House', icon: MdOutlinePool },
    { id: 'rooms', label: 'Rooms', icon: MdBedroomParent },
    { id: 'flat', label: 'Flat', icon: BiBuildingHouse },
    { id: 'pg', label: 'PG', icon: IoBedOutline },
    { id: 'cabin', label: 'Cabin', icon: GiWoodCabin },
    { id: 'shops', label: 'Shops', icon: SiHomeassistantcommunitystore },
  ]

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-4 relative font-sans'>
      {/* Back Button */}
      <button
        onClick={() => navigate("/listingpage1")}
        className="absolute top-6 left-6 p-3 rounded-full bg-white/50 hover:bg-white shadow-sm transition-all duration-300 backdrop-blur-sm z-10 group"
      >
        <FaArrowLeftLong className='w-5 h-5 text-gray-600 group-hover:text-gray-900' />
      </button>

      {/* Glass Card */}
      <div className="w-full max-w-4xl bg-white/30 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] overflow-hidden p-8 md:p-12 relative my-10 flex flex-col items-center">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Best describes your place?</h1>
          <p className="text-gray-500 mt-2 text-sm">Select a category that fits your listing</p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 w-full'>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`
                                flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2
                                ${category === cat.id
                  ? "bg-rose-50 border-rose-500 shadow-md transform scale-105"
                  : "bg-white/60 border-transparent hover:border-gray-300 hover:bg-white/80 hover:-translate-y-1"}
                            `}
              onClick={() => setCategory(cat.id)}
            >
              <cat.icon className={`w-8 h-8 mb-3 ${category === cat.id ? "text-rose-600" : "text-gray-600"}`} />
              <h3 className={`font-semibold ${category === cat.id ? "text-rose-700" : "text-gray-700"}`}>
                {cat.label}
              </h3>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <div className="mt-12 w-full flex justify-end">
          <button
            className={`
                            px-12 py-4 rounded-full font-bold shadow-lg transition-all duration-200 text-lg tracking-wide transform
                            ${category
                ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-rose-500/30 hover:-translate-y-0.5"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"}
                        `}
            onClick={() => navigate("/listingpage3")}
            disabled={!category}
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  )
}

export default ListingPage2
