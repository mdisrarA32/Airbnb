import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { toast } from 'react-toastify';
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../Context/AuthContext';
import { userDataContext } from '../Context/UserContext';
import { listingDataContext } from '../Context/ListingContext';

function Nav() {
    let [showpopup, setShowpopup] = useState(false)
    let { userData, logout } = useContext(userDataContext)
    let navigate = useNavigate()
    let [cate, setCate] = useState()
    let { listingData, setNewListData, searchData, handleSearch, handleViewCard } = useContext(listingDataContext)
    let [input, setInput] = useState("")

    const categories = [
        { id: "trending", label: "Trending", icon: MdWhatshot },
        { id: "villa", label: "Villa", icon: GiFamilyHouse },
        { id: "farmHouse", label: "Farm House", icon: FaTreeCity },
        { id: "poolHouse", label: "Pool House", icon: MdOutlinePool },
        { id: "rooms", label: "Rooms", icon: MdBedroomParent },
        { id: "flat", label: "Flat", icon: BiBuildingHouse },
        { id: "pg", label: "PG", icon: IoBedOutline },
        { id: "cabin", label: "Cabins", icon: GiWoodCabin },
        { id: "shops", label: "Shops", icon: SiHomeassistantcommunitystore },
    ];

    const handleLogOut = async () => {
        try {
            await logout()
            toast.success("Logged out successfully")
            navigate("/login")
        } catch (error) {
            console.log(error)
            toast.error("Logout failed")
        }
    }
    const handleCategory = (category) => {
        setCate(category)
        if (category === "trending") {
            setNewListData(listingData)
        }
        else {
            setNewListData(listingData?.filter((list) => list.category === category) || [])
        }
    }
    const handleClick = (id) => {
        if (userData) {
            handleViewCard(id)
        }
        else {
            navigate("/login")
        }
    }
    useEffect(() => {
        handleSearch(input)
    }, [input])

    return (

        <div className='fixed top-0 w-full bg-white z-40 border-b border-gray-100 shadow-sm'>
            <div className='max-w-[1600px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4'>
                {/* Logo */}
                <div onClick={() => navigate("/")} className="cursor-pointer">
                    <img src={logo} alt="Airbnb" className='h-8 md:h-10 w-auto object-contain' />
                </div>

                {/* Search Bar - Desktop */}
                <div className='hidden md:flex flex-1 max-w-2xl relative group'>
                    <input
                        type="text"
                        className='w-full pl-6 pr-14 py-3 rounded-full border border-gray-300 shadow-sm hover:shadow-md focus:shadow-md transition-all outline-none text-gray-700 font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-rose-100 focus:border-rose-400'
                        placeholder='Search destinations, cities, or landmarks...'
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                    <button className='absolute right-2 top-1.5 p-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white transition-colors shadow-sm'>
                        <FiSearch className='w-4 h-4' />
                    </button>

                    {/* Search Results Dropdown */}
                    {searchData?.length > 0 && input && (
                        <div className='absolute top-full mt-2 left-0 w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-h-[400px] overflow-y-auto z-50'>
                            <div className="py-2">
                                <h3 className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Top Results</h3>
                                {searchData.map((search) => (
                                    <div
                                        key={search._id}
                                        className='px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 last:border-0'
                                        onClick={() => handleClick(search._id)}
                                    >
                                        <div className="bg-gray-100 p-2 rounded-lg">
                                            <BiBuildingHouse className="text-gray-500" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-800">{search.title}</div>
                                            <div className="text-xs text-gray-500">{search.city}, {search.landMark}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Menu */}
                <div className='flex items-center gap-4 relative'>
                    <span
                        className='hidden md:block text-sm font-semibold text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer transition'
                        onClick={() => navigate("/listingpage1")}
                    >
                        Switch to Hosting
                    </span>

                    <button
                        className='flex items-center gap-3 border border-gray-300 rounded-full pl-3 pr-2 py-1.5 hover:shadow-md transition-shadow bg-white'
                        onClick={() => setShowpopup(prev => !prev)}
                    >
                        <GiHamburgerMenu className='w-4 h-4 text-gray-600' />
                        {userData ? (
                            <div className='w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white'>
                                {userData.name?.charAt(0).toUpperCase()}
                            </div>
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white ring-2 ring-white">
                                <CgProfile className='w-5 h-5' />
                            </div>
                        )}
                    </button>

                    {/* Popup Menu */}
                    {showpopup && (
                        <>
                            <div className='fixed inset-0 z-40' onClick={() => setShowpopup(false)}></div>
                            <div className='absolute top-14 right-0 w-64 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden py-2 z-50 animate-in fade-in zoom-in-95 duration-100'>
                                {userData ? (
                                    <>
                                        <div className="px-4 py-3 border-b border-gray-100 mb-2">
                                            <div className="font-semibold text-gray-900 truncated">Hi, {userData.name}</div>
                                            <div className="text-xs text-gray-500">Traveler</div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className='px-4 py-3 hover:bg-gray-50 cursor-pointer font-medium text-gray-700' onClick={() => { navigate("/listingpage1"); setShowpopup(false) }}>List your home</span>
                                            <span className='px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700' onClick={() => { navigate("/mylisting"); setShowpopup(false) }}>My Listings</span>
                                            <span className='px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700' onClick={() => { navigate("/mybooking"); setShowpopup(false) }}>My Trips</span>
                                            <div className='h-px bg-gray-100 my-2'></div>
                                            <span className='px-4 py-3 hover:bg-gray-50 cursor-pointer text-rose-600 font-medium' onClick={() => { handleLogOut(); setShowpopup(false) }}>Log out</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col">
                                        <span className='px-4 py-3 hover:bg-gray-50 cursor-pointer font-semibold text-gray-900' onClick={() => { navigate("/login"); setShowpopup(false) }}>Log in</span>
                                        <span className='px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-600' onClick={() => { navigate("/signup"); setShowpopup(false) }}>Sign up</span>
                                        <div className='h-px bg-gray-100 my-2'></div>
                                        <span className='px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-600 text-sm' onClick={() => { setShowpopup(false) }}>Help Center</span>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Search Bar */}
            <div className='md:hidden px-4 pb-4'>
                <div className='relative shadow-sm rounded-full'>
                    <input
                        type="text"
                        className='w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 shadow-sm outline-none text-sm font-medium focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                        placeholder='Search anywhere...'
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                    <div className='absolute left-1.5 top-1.5 p-2 bg-transparent'>
                        <FiSearch className='w-5 h-5 text-gray-800' />
                    </div>
                </div>
            </div>

            {/* Categories Bar */}
            {/* Categories Bar */}
            <div className='w-full flex justify-center'>
                <div className='max-w-[1600px] overflow-x-auto scrollbar-hide flex items-center gap-8 px-4 md:px-8 pb-0'>
                    {categories.map((cat) => {
                        const isActive = cat.id === "trending" ? !cate : cate === cat.id;
                        return (
                            <div
                                key={cat.id}
                                className={`flex flex-col items-center justify-center gap-3 min-w-[64px] cursor-pointer group transition-all duration-200 py-3 border-b-2
                                    ${isActive ? "border-gray-900 opacity-100" : "border-transparent opacity-60 hover:opacity-100 hover:border-gray-300"}
                                `}
                                onClick={() => {
                                    handleCategory(cat.id);
                                    if (cat.id === "trending") setCate("");
                                }}
                            >
                                <cat.icon className={`w-6 h-6 ${isActive ? "text-rose-500" : "text-gray-600"}`} />
                                <span className={`text-xs font-semibold whitespace-nowrap ${isActive ? "text-gray-900" : "text-gray-500"}`}>
                                    {cat.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Nav