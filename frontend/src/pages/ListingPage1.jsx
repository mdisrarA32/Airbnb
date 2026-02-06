import React, { useContext, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { getSmartPriceSuggestion } from '../utils/calculations';

function ListingPage1() {
  let navigate = useNavigate()
  let { title, setTitle,
    description, setDescription,
    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,
    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,
    rent, setRent,
    city, setCity,
    landmark, setLandmark,
    category, setCategory,
    listingData
  } = useContext(listingDataContext)


  const handleImage1 = (e) => {
    let file = e.target.files[0]
    setBackEndImage1(file)
    setFrontEndImage1(URL.createObjectURL(file))
  }
  const handleImage2 = (e) => {
    let file = e.target.files[0]
    setBackEndImage2(file)
    setFrontEndImage2(URL.createObjectURL(file))
  }
  const handleImage3 = (e) => {
    let file = e.target.files[0]
    setBackEndImage3(file)
    setFrontEndImage3(URL.createObjectURL(file))
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-4 relative font-sans'>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 p-3 rounded-full bg-white/50 hover:bg-white shadow-sm transition-all duration-300 backdrop-blur-sm z-10 group"
      >
        <FaArrowLeftLong className='w-5 h-5 text-gray-600 group-hover:text-gray-900' />
      </button>

      {/* Glass Card */}
      <div className="w-full max-w-2xl bg-white/30 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] overflow-hidden p-8 md:p-12 relative my-10">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Create Listing</h1>
          <p className="text-gray-500 mt-2 text-sm">Fill in the details to setup your home</p>
        </div>

        <form
          className='flex flex-col gap-6'
          onSubmit={(e) => {
            e.preventDefault()
            navigate("/listingpage2")
          }}
        >

          {/* Title */}
          <div className='group'>
            <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1.5 ml-1'>Title</label>
            <input
              type="text"
              id='title'
              className='w-full px-5 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-100 focus:outline-none transition-all duration-300 placeholder:text-gray-400 text-gray-700'
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder='e.g. Cozy Cottage in the Woods'
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="des" className='block text-sm font-medium text-gray-700 mb-1.5 ml-1'>Description</label>
            <textarea
              id="des"
              className='w-full px-5 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-100 focus:outline-none transition-all duration-300 placeholder:text-gray-400 h-32 resize-none text-gray-700'
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder='Tell guests what makes your place specific...'
            ></textarea>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { id: 'img1', label: 'Cover Image', handler: handleImage1 },
              { id: 'img2', label: 'Image 2', handler: handleImage2 },
              { id: 'img3', label: 'Image 3', handler: handleImage3 },
            ].map((img, idx) => (
              <div key={idx}>
                <label htmlFor={img.id} className='block text-sm font-medium text-gray-700 mb-1.5 ml-1'>{img.label}</label>
                <input
                  type="file"
                  id={img.id}
                  className='w-full text-sm text-gray-500
                                file:mr-4 file:py-2.5 file:px-4
                                file:rounded-xl file:border-0
                                file:text-xs file:font-bold
                                file:bg-white/80 file:text-rose-600
                                hover:file:bg-white
                                cursor-pointer bg-white/50 rounded-xl border border-gray-200 p-1'
                  required
                  onChange={img.handler}
                />
              </div>
            ))}
          </div>

          {/* Rent, City, Landmark Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label htmlFor="rent" className='block text-sm font-medium text-gray-700 mb-1.5 ml-1'>Rent / Day</label>
              <input
                type="number"
                id='rent'
                className='w-full px-5 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-100 focus:outline-none transition-all duration-300 placeholder:text-gray-400 text-gray-700'
                required
                onChange={(e) => setRent(e.target.value)}
                value={rent}
                placeholder='0.00'
              />
              {city && getSmartPriceSuggestion(city, category, listingData) && (
                <p className="text-xs text-rose-500 mt-1 font-medium bg-rose-50 p-2 rounded-lg border border-rose-100 flex items-center gap-2">
                  <span className="bg-rose-100 p-1 rounded-full px-2">💡</span>
                  <span>
                    Avg in {city}: ₹{getSmartPriceSuggestion(city, category, listingData).avg}
                    <span className="text-gray-400 font-normal ml-1">(₹{getSmartPriceSuggestion(city, category, listingData).min} - ₹{getSmartPriceSuggestion(city, category, listingData).max})</span>
                  </span>
                </p>
              )}
            </div>
            <div>
              <label htmlFor="city" className='block text-sm font-medium text-gray-700 mb-1.5 ml-1'>City</label>
              <input
                type="text"
                id='city'
                className='w-full px-5 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-100 focus:outline-none transition-all duration-300 placeholder:text-gray-400 text-gray-700'
                required
                onChange={(e) => setCity(e.target.value)}
                value={city}
                placeholder='New York'
              />
            </div>
            <div>
              <label htmlFor="landmark" className='block text-sm font-medium text-gray-700 mb-1.5 ml-1'>Landmark</label>
              <input
                type="text"
                id='landmark'
                className='w-full px-5 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-100 focus:outline-none transition-all duration-300 placeholder:text-gray-400 text-gray-700'
                required
                onChange={(e) => setLandmark(e.target.value)}
                value={landmark}
                placeholder='Near Central Park'
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button className='w-full md:w-auto px-16 py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold rounded-full shadow-lg hover:shadow-rose-500/30 transform hover:-translate-y-0.5 transition-all duration-200 text-lg tracking-wide'>
              Next Step
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default ListingPage1