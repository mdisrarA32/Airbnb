import React, { useContext } from 'react'
import { userDataContext } from '../Context/UserContext'
import { listingDataContext } from '../Context/ListingContext'
import { useNavigate } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { useState } from 'react';
import { bookingDataContext } from '../Context/BookingContext';

import { calculateDemand } from '../utils/calculations';

function Card({ title, landMark, image1, image2, image3, rent, city, id, ratings, isBooked, host }) {
    let navigate = useNavigate()
    let { userData } = useContext(userDataContext)
    let { handleViewCard } = useContext(listingDataContext)
    let [popUp, setPopUp] = useState(false)
    let { cancelBooking } = useContext(bookingDataContext)

    // Calculate demand
    const demand = calculateDemand({ _id: id, ratings });

    const handleClick = () => {
        if (userData) {
            handleViewCard(id)
        }
        else {
            navigate("/login")
        }
    }
    return (
        <div
            className='group w-full max-w-sm bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden border border-gray-100'
            onClick={() => !isBooked ? handleClick() : null}
        >
            {/* Badges/Actions */}
            <div className="absolute top-3 left-3 right-3 flex justify-between z-20 pointer-events-none gap-2">
                <div className="flex gap-2">
                    {isBooked && (
                        <div className='bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1 pointer-events-auto backdrop-blur-md bg-opacity-90'>
                            <GiConfirmed className='w-4 h-4' />
                            Booked
                        </div>
                    )}

                    {!isBooked && demand && (
                        <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1 pointer-events-auto backdrop-blur-md bg-opacity-90 border ${demand.color}`}>
                            <demand.icon className='w-4 h-4' />
                            {demand.text}
                        </div>
                    )}
                </div>

                {isBooked && host == userData?._id && (
                    <button
                        className='ml-auto bg-white border border-red-500 text-red-500 px-3 py-1 rounded-full text-xs font-bold shadow-sm hover:bg-red-50 transition-colors flex items-center gap-1 pointer-events-auto'
                        onClick={(e) => {
                            e.stopPropagation();
                            setPopUp(true);
                        }}
                    >
                        <FcCancel className='w-4 h-4' />
                        Cancel
                    </button>
                )}
            </div>

            {/* Cancel Booking Popup */}
            {popUp && (
                <div className='absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center p-4 text-center animate-in fade-in duration-200' onClick={(e) => e.stopPropagation()}>
                    <div className='text-gray-800 font-semibold text-lg mb-2'>Cancel Booking?</div>
                    <p className='text-gray-500 text-sm mb-4'>Are you sure you want to cancel this booking?</p>
                    <div className='flex gap-2'>
                        <button
                            className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium shadow-sm'
                            onClick={(e) => {
                                e.stopPropagation();
                                cancelBooking(id);
                                setPopUp(false);
                            }}
                        >
                            Yes, Cancel
                        </button>
                        <button
                            className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium'
                            onClick={(e) => {
                                e.stopPropagation();
                                setPopUp(false);
                            }}
                        >
                            No, Keep
                        </button>
                    </div>
                </div>
            )}

            {/* Image Slider */}
            <div className='relative w-full aspect-[4/3] overflow-hidden bg-gray-200'>
                {/* Flex container for scrolling images if needed, or just stacking them. 
                     Original code was a scrollable row. Keeping that behavior but observing constraints.
                     If we want "consistent aspect ratio", we should enforce the container size.
                 */}
                <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                    {[image1, image2, image3].map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={title}
                            className='w-full h-full object-cover flex-shrink-0 snap-center'
                        />
                    ))}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Content */}
            <div className='p-4'>
                <div className='flex items-start justify-between mb-1'>
                    <div className='flex flex-col overflow-hidden max-w-[70%]'>
                        <h3 className='font-semibold text-gray-900 truncate' title={title}>
                            {/* Clean formatting */}
                            {title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}
                        </h3>
                        <p className='text-gray-500 text-sm truncate'>
                            {landMark}, {city}
                        </p>
                    </div>
                    <div className='flex items-center gap-1 text-sm font-medium text-gray-800'>
                        <FaStar className='text-rose-500 w-3.5 h-3.5' />
                        {ratings}
                    </div>
                </div>

                <div className='mt-2 flex items-baseline gap-1'>
                    <span className='font-bold text-gray-900 text-lg'>₹{rent}</span>
                    <span className='text-gray-500 text-sm'>/ day</span>
                </div>
            </div>

        </div>
    )
}

export default Card
