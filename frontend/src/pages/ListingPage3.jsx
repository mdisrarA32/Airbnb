import React, { useContext } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { FaStar } from "react-icons/fa";

function ListingPage3() {
    let navigate = useNavigate()
    let { title,
        description,
        frontEndImage1,
        frontEndImage2,
        frontEndImage3,
        rent,
        city,
        landmark,
        category,
        handleAddListing,
        adding
    } = useContext(listingDataContext)

    return (
        <div className='min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-4 relative font-sans'>

            {/* Back Button */}
            <button
                onClick={() => navigate("/listingpage2")}
                className="absolute top-6 left-6 p-3 rounded-full bg-white/50 hover:bg-white shadow-sm transition-all duration-300 backdrop-blur-sm z-10 group"
            >
                <FaArrowLeftLong className='w-5 h-5 text-gray-600 group-hover:text-gray-900' />
            </button>


            {/* Glass Card */}
            <div className="w-full max-w-5xl bg-white/30 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] overflow-hidden p-8 relative my-10 flex flex-col">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Review & Publish</h1>
                    <p className="text-gray-500 mt-2 text-sm">Check everything before going live</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Preview Images */}
                    <div className="lg:w-1/2 space-y-4">
                        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-md">
                            <img src={frontEndImage1} alt="Main" className="w-full h-full object-cover" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-sm">
                                <img src={frontEndImage2} alt="Sec" className="w-full h-full object-cover" />
                            </div>
                            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-sm">
                                <img src={frontEndImage3} alt="Ter" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Preview Details */}
                    <div className="lg:w-1/2 flex flex-col justify-between">
                        <div className="space-y-4 bg-white/60 p-6 rounded-2xl border border-white/50">

                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">{category}</span>
                                    <h2 className="text-2xl font-bold text-gray-900 leading-tight mt-1">{title}</h2>
                                    <p className="text-gray-600 font-medium">{landmark}, {city}</p>
                                </div>
                                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded shadow-sm">
                                    <FaStar className="w-3 h-3 text-rose-500" />
                                    <span className="text-xs font-bold">New</span>
                                </div>
                            </div>

                            <div className="h-px bg-gray-200" />

                            <div>
                                <h3 className="text-sm font-bold text-gray-900 mb-1">Description</h3>
                                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line max-h-40 overflow-y-auto pr-2">
                                    {description}
                                </p>
                            </div>

                            <div className="h-px bg-gray-200" />

                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 font-medium">Rent per night</span>
                                <span className="text-2xl font-black text-gray-900">₹{rent}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8">
                            <button
                                className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-rose-500/30 transform hover:-translate-y-0.5 transition-all duration-200 text-lg flex items-center justify-center gap-2"
                                onClick={handleAddListing}
                                disabled={adding}
                            >
                                {adding ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Publishing...
                                    </>
                                ) : (
                                    "Confirm & Publish"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingPage3
