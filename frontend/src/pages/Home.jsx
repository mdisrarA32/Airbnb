import React, { useContext } from 'react'
import Nav from '../Component/Nav'


import Card from '../Component/Card';
import { listingDataContext } from '../Context/ListingContext';

function Home() {
  let { newListData } = useContext(listingDataContext)

  return (
    <div className="bg-gray-50 min-h-screen">
      <Nav />
      <div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-[250px] md:mt-[180px]'>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 px-2">Explore Listings</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 justify-items-center'>
          {newListData.map((list) => (
            <Card key={list._id} title={list.title} landMark={list.landMark} city={list.city} image1={list.image1} image2={list.image2} image3={list.image3} rent={list.rent} id={list._id} ratings={list.ratings} isBooked={list.isBooked} host={list.host} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
