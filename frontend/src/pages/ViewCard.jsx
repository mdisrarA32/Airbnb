import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { userDataContext } from '../Context/UserContext';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import { FaStar } from "react-icons/fa";
import { bookingDataContext } from '../Context/BookingContext';
import { toast } from 'react-toastify';
import { CiLocationOn } from "react-icons/ci";
import { getConfidenceScore, getHostScore } from '../utils/calculations';

function ViewCard() {
    let navigate = useNavigate()
    let { cardDetails } = useContext(listingDataContext)
    let { userData } = useContext(userDataContext)
    let [updatePopUp, setUpdatePopUp] = useState(false)
    let [bookingPopUp, setBookingPopUp] = useState(false)
    let [title, setTitle] = useState(cardDetails.title)
    let [description, setDescription] = useState(cardDetails.description)
    let [backEndImage1, setBackEndImage1] = useState(null)
    let [backEndImage2, setBackEndImage2] = useState(null)
    let [backEndImage3, setBackEndImage3] = useState(null)
    let [rent, setRent] = useState(cardDetails.rent)
    let [city, setCity] = useState(cardDetails.city)
    let [landmark, setLandmark] = useState(cardDetails.landMark)
    let { serverUrl } = useContext(authDataContext)
    let { updating, setUpdating } = useContext(listingDataContext)
    let { deleting, setDeleting } = useContext(listingDataContext)
    let [minDate, setMinDate] = useState("")

    let { checkIn, setCheckIn,
        checkOut, setCheckOut,
        total, setTotal,
        night, setNight, handleBooking, booking } = useContext(bookingDataContext)

    useEffect(() => {
        if (checkIn && checkOut) {
            let inDate = new Date(checkIn)
            let OutDate = new Date(checkOut)
            let n = (OutDate - inDate) / (24 * 60 * 60 * 1000)
            setNight(n)
            let airBnbCharge = (cardDetails.rent * (7 / 100))
            let tax = (cardDetails.rent * (7 / 100))

            if (n > 0) {
                setTotal((cardDetails.rent * n) + airBnbCharge + tax)
            }
            else {
                setTotal(0)
            }

        }

    }, [checkIn, checkOut, cardDetails.rent, total])

    const confidence = getConfidenceScore(cardDetails);
    const hostScore = getHostScore(cardDetails);




    const handleUpdateListing = async () => {
        setUpdating(true)
        try {

            let formData = new FormData()
            formData.append("title", title)
            if (backEndImage1) { formData.append("image1", backEndImage1) }
            if (backEndImage2) { formData.append("image2", backEndImage2) }
            if (backEndImage3) { formData.append("image3", backEndImage3) }
            formData.append("description", description)
            formData.append("rent", rent)
            formData.append("city", city)
            formData.append("landMark", landmark)


            let result = await axios.post(serverUrl + `/api/listing/update/${cardDetails._id}`, formData, { withCredentials: true })
            setUpdating(false)
            console.log(result)
            toast.success("Lising Updated")
            navigate("/")
            setTitle("")
            setDescription("")

            setBackEndImage1(null)
            setBackEndImage2(null)
            setBackEndImage3(null)
            setRent("")
            setCity("")
            setLandmark("")


        } catch (error) {
            setUpdating(false)
            console.log(error)
            toast.error(error.response.data.message)
        }

    }
    const handleDeleteListing = async () => {
        setDeleting(true)
        try {
            let result = await axios.delete(serverUrl + `/api/listing/delete/${cardDetails._id}`, { withCredentials: true })
            console.log(result.data)
            navigate("/")
            toast.success("Listing Delete")
            setDeleting(false)
        } catch (error) {
            console.log(error)
            setDeleting(false)
            toast.error(error.response.data.message)
        }

    }
    const handleImage1 = (e) => {
        let file = e.target.files[0]
        setBackEndImage1(file)

    }
    const handleImage2 = (e) => {
        let file = e.target.files[0]
        setBackEndImage2(file)

    }
    const handleImage3 = (e) => {
        let file = e.target.files[0]
        setBackEndImage3(file)

    }

    useEffect(() => {
        let today = new Date().toISOString().split('T')[0]
        setMinDate(today)
    }, [])

    return (
        <div className='min-h-screen bg-gray-50 pb-20 pt-6 px-4 md:px-8'>

            {/* Navigation & Container */}
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/")}
                    className="mb-6 p-2 rounded-full hover:bg-gray-200 transition-colors inline-flex items-center gap-2 text-gray-600 font-medium"
                >
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200">
                        <FaArrowLeftLong className="w-4 h-4" />
                    </div>
                    Back to listings
                </button>

                {/* Main Content Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

                    {/* Image Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[500px] p-2 bg-gray-100">
                        <div className="md:col-span-2 h-full relative cursor-pointer group overflow-hidden rounded-l-2xl">
                            <img
                                src={cardDetails.image1}
                                alt="Main view"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="hidden md:flex flex-col gap-2 col-span-1">
                            <div className="h-1/2 relative cursor-pointer group overflow-hidden">
                                <img src={cardDetails.image2} alt="View 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="h-1/2 relative cursor-pointer group overflow-hidden">
                                <img src={cardDetails.image3} alt="View 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>
                        <div className="hidden md:flex flex-col gap-2 col-span-1">
                            <div className="h-1/2 relative cursor-pointer group overflow-hidden rounded-tr-2xl">
                                {/* Reusing image 2 for grid balance or we can duplicate logic if there were 4 images. Currently reusing logic for aesthetics */}
                                <img src={cardDetails.image2} alt="View 4" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="h-1/2 relative cursor-pointer group overflow-hidden rounded-br-2xl">
                                <img src={cardDetails.image3} alt="View 5" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                {/* Overlay to show 'Show all photos' style */}
                                <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors"></div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-10 flex flex-col lg:flex-row gap-12">

                        {/* Left Details */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <div className="flex items-center gap-2 text-rose-500 font-semibold text-sm uppercase tracking-wider mb-2">
                                    <CiLocationOn className="text-lg" />
                                    {cardDetails.city}, {cardDetails.landMark}
                                </div>
                                <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                                    {cardDetails.title}
                                </h1>
                                <div className="flex items-center gap-4 mt-4 text-gray-500 text-sm">
                                    <span>{cardDetails.category}</span>
                                    <span>•</span>
                                    <div className="flex items-center gap-1 text-black font-medium">
                                        <FaStar className="w-4 h-4" />
                                        <span>{cardDetails.ratings}</span>  ratings
                                    </div>
                                </div>
                            </div>

                            {/* Confidence & Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 border-y border-gray-100">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <h3 className="text-gray-900 font-bold mb-1 flex items-center gap-2">
                                        Booking Confidence
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${confidence > 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {confidence > 80 ? 'High' : 'Moderate'}
                                        </span>
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${confidence > 80 ? 'bg-green-500' : 'bg-yellow-500'}`}
                                                style={{ width: `${confidence}%` }}
                                            />
                                        </div>
                                        <span className="font-bold text-gray-700">{confidence}%</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Based on ratings & booking history</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <h3 className="text-gray-900 font-bold mb-1">Host Performance</h3>
                                    <div className="flex items-end gap-2">
                                        <span className="text-3xl font-black text-rose-500">{hostScore}</span>
                                        <div className="flex flex-col mb-1.5">
                                            <span className="text-sm font-bold text-gray-900">/ 5.0</span>
                                            <span className="text-xs text-gray-500">Superhost potential</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <h3 className="text-xl font-semibold mb-3">About this place</h3>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                                    {cardDetails.description}
                                </p>
                            </div>
                        </div>

                        {/* Right Action Card */}
                        <div className="lg:w-[400px]">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_6px_16px_rgba(0,0,0,0.12)] p-6 sticky top-8">
                                <div className="flex items-end justify-between mb-6 pb-6 border-b border-gray-100">
                                    <div>
                                        <span className="text-3xl font-bold text-gray-900">₹{cardDetails.rent}</span>
                                        <span className="text-gray-500 ml-1"> / night</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <FaStar className="w-3 h-3 text-rose-500" />
                                        <span className="font-semibold text-gray-900">{cardDetails.ratings}</span>
                                    </div>
                                </div>

                                {cardDetails.host === userData._id ? (
                                    <button
                                        className='w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-rose-200 transform hover:-translate-y-0.5 active:translate-y-0'
                                        onClick={() => setUpdatePopUp(prev => !prev)}
                                    >
                                        Edit Listing
                                    </button>
                                ) : (
                                    <button
                                        className='w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-rose-200 transform hover:-translate-y-0.5 active:translate-y-0'
                                        onClick={() => setBookingPopUp(prev => !prev)}
                                    >
                                        Reserve Now
                                    </button>
                                )}

                                <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-sm">
                                    <span>You won't be charged yet</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Update Modal */}
            {updatePopUp && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                            <h2 className="text-xl font-bold text-gray-800">Edit Listing</h2>
                            <button onClick={() => setUpdatePopUp(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <RxCross2 className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>

                        <form className="overflow-y-auto p-8 space-y-6 flex-1" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                                <input type="text" className="w-full p-4 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-50 outline-none transition" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                <textarea className="w-full p-4 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-50 outline-none transition h-32" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[1, 2, 3].map((num) => (
                                    <div key={num} className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-700">Image {num}</label>
                                        <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100" onChange={num === 1 ? handleImage1 : num === 2 ? handleImage2 : handleImage3} />
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Rent Price</label>
                                    <input type="number" className="w-full p-4 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-50 outline-none transition" value={rent} onChange={(e) => setRent(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                                    <input type="text" className="w-full p-4 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-50 outline-none transition" value={city} onChange={(e) => setCity(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Landmark</label>
                                <input type="text" className="w-full p-4 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-50 outline-none transition" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
                            </div>

                        </form>

                        <div className="p-6 border-t border-gray-100 flex gap-4 bg-gray-50">
                            <button className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition" onClick={handleUpdateListing} disabled={updating}>{updating ? "Saving..." : "Save Changes"}</button>
                            <button className="flex-1 py-3 bg-red-100 text-red-600 rounded-xl font-bold hover:bg-red-200 transition" onClick={handleDeleteListing} disabled={deleting}>{deleting ? "Deleting..." : "Delete Listing"}</button>
                        </div>
                    </div>
                </div>
            )}


            {/* Booking Modal */}
            {bookingPopUp && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[85vh] overflow-hidden flex flex-col md:flex-row">

                        {/* Left Form */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">Request to book</h2>
                                <button onClick={() => setBookingPopUp(false)} className="p-2 hover:bg-gray-100 rounded-full md:hidden">
                                    <RxCross2 className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-6 flex-1">
                                <div className="space-y-4">
                                    <label className="font-semibold text-gray-700">Your trip</label>
                                    <div className="flex flex-col gap-4">
                                        <div className="w-full">
                                            <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Check-in</span>
                                            <input type="date" min={minDate} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none" onChange={(e) => setCheckIn(e.target.value)} value={checkIn} />
                                        </div>
                                        <div className="w-full">
                                            <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Check-out</span>
                                            <input type="date" min={minDate} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none" onChange={(e) => setCheckOut(e.target.value)} value={checkOut} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <button className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform transition hover:-translate-y-0.5 disabled:opacity-50" onClick={() => { handleBooking(cardDetails._id) }} disabled={booking}>
                                    {booking ? "Processing..." : "Confirm & Pay"}
                                </button>
                            </div>
                        </div>

                        {/* Right Summary */}
                        <div className="hidden md:block w-1/2 bg-gray-50 p-12 border-l border-gray-200 overflow-y-auto relative">
                            <button onClick={() => setBookingPopUp(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-200 rounded-full transition">
                                <RxCross2 className="w-6 h-6 text-gray-500" />
                            </button>

                            <div className="flex gap-4 mb-8">
                                <img src={cardDetails.image1} className="w-32 h-24 object-cover rounded-xl shadow-md" alt="" />
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wide">Entire home</div>
                                    <h3 className="font-bold text-gray-900 mt-1">{cardDetails.title}</h3>
                                    <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                                        <FaStar className="w-3 h-3 text-rose-500" />
                                        <span>{cardDetails.ratings}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-gray-200 text-gray-600">
                                <h3 className="font-bold text-gray-900 text-lg mb-4">Price details</h3>
                                <div className="flex justify-between">
                                    <span className="underline">₹{cardDetails.rent} x {night} nights</span>
                                    <span>₹{cardDetails.rent * night}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="underline">Cleaning fee</span>
                                    <span>₹{cardDetails.rent * 7 / 100}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="underline">Service fee</span>
                                    <span>₹{cardDetails.rent * 7 / 100}</span>
                                </div>
                                <div className="flex justify-between pt-4 border-t border-gray-200 font-bold text-gray-900 text-xl">
                                    <span>Total (INR)</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}


        </div>
    )
}


export default ViewCard