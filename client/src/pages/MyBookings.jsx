// import React, { useState } from 'react'
// import { dummyMyBookingsData, assets } from '../assets/assets'
// import { useActionData, useNavigate } from 'react-router-dom'
// import { useAppContext } from '../context/AppContext'

// const MyBookings = () => {
//   const navigate = useNavigate()
//   // const currency = import.meta.env.VITE_CURRENCY || '$'
//  const {axios , user, currency} = useAppContext()
//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'confirmed':
//         return 'bg-green-100 text-green-700'
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-700'
//       case 'cancelled':
//         return 'bg-red-100 text-red-700'
//       default:
//         return 'bg-gray-100 text-gray-500'
//     }
//   }

//   return (
//     <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-16'>
//       {/* Header */}
//       <div className='mb-12'>
//         <h1 className='text-4xl font-bold text-gray-800 mb-3'>My Bookings</h1>
//         <p className='text-gray-600 text-lg'>View and manage your car rental bookings</p>
//       </div>

//       {/* Bookings List */}
//       {dummyMyBookingsData.length > 0 ? (
//         <div className='space-y-6'>
//           {dummyMyBookingsData.map((booking) => (
//             <div 
//               key={booking._id}
//               className='bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow'
//             >
//               <div className='flex flex-col md:flex-row gap-6'>
//                 {/* Car Image */}
//                 <div className='w-full md:w-48 h-32 flex-shrink-0'>
//                   <img 
//                     src={booking.car.image} 
//                     alt={`${booking.car.brand} ${booking.car.model}`}
//                     className='w-full h-full object-cover rounded-lg'
//                   />
//                 </div>

//                 {/* Booking Details */}
//                 <div className='flex-1'>
//                   <div className='flex flex-wrap items-start justify-between gap-4 mb-4'>
//                     <div>
//                       <h3 className='text-xl font-bold text-gray-800'>
//                         {booking.car.brand} {booking.car.model}
//                       </h3>
//                       <p className='text-gray-500 text-sm'>
//                         {booking.car.category} • {booking.car.year}
//                       </p>
//                     </div>
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
//                       {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
//                     </span>
//                   </div>

//                   <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
//                     {/* Pickup Date */}
//                     <div className='flex items-center gap-2 text-gray-600'>
//                       <img src={assets.calendar_icon_colored} alt="" className='h-5 w-5' />
//                       <div>
//                         <p className='text-xs text-gray-500'>Pick-up</p>
//                         <p className='font-medium'>{new Date(booking.pickupDate).toLocaleDateString()}</p>
//                       </div>
//                     </div>

//                     {/* Return Date */}
//                     <div className='flex items-center gap-2 text-gray-600'>
//                       <img src={assets.calendar_icon_colored} alt="" className='h-5 w-5' />
//                       <div>
//                         <p className='text-xs text-gray-500'>Return</p>
//                         <p className='font-medium'>{new Date(booking.returnDate).toLocaleDateString()}</p>
//                       </div>
//                     </div>

//                     {/* Location */}
//                     <div className='flex items-center gap-2 text-gray-600'>
//                       <img src={assets.location_icon_colored} alt="" className='h-5 w-5' />
//                       <div>
//                         <p className='text-xs text-gray-500'>Location</p>
//                         <p className='font-medium'>{booking.car.location}</p>
//                       </div>
//                     </div>

//                     {/* Price */}
//                     <div className='flex items-center gap-2 text-gray-600'>
//                       <div>
//                         <p className='text-xs text-gray-500'>Total Price</p>
//                         <p className='font-bold text-lg text-gray-800'>{currency}{booking.price}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className='flex flex-wrap gap-3'>
//                     <button 
//                       onClick={() => navigate(`/car-details/${booking.car._id}`)}
//                       className='px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium'
//                     >
//                       View Car Details
//                     </button>
//                     {booking.status === 'pending' && (
//                       <button className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium'>
//                         Cancel Booking
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className='text-center py-20'>
//           <p className='text-gray-500 text-lg mb-4'>You don't have any bookings yet</p>
//           <button 
//             onClick={() => navigate('/cars')}
//             className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
//           >
//             Browse Cars
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default MyBookings


// const {axios, user , currency} = useAppContext()
// const [bookings, setBookings] = useState([])
// const fetchMyBookings = async ()=>{
//   try{
//     const {data} = await axios.get('/api/bookings/user')
//     if(data.success){
//       setBookings(data.bookings)
//     }else{
//       toast.error(data.message)
//     }
//   }catch (error){
//     toast.error(error.message)
//   }
// }
// useEffect(()=>{
//  user && fetchMyBookings()
// },[user]) 
import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast' // ADD THIS IMPORT

const MyBookings = () => {
  const navigate = useNavigate()
  const { axios, user, currency } = useAppContext()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch bookings function
  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/user/bookings')
      console.log("Bookings API response:", data) // Debug log
      
      if (data.success) {
        setBookings(data.bookings || [])
      } else {
        toast.error(data.message || 'Failed to fetch bookings')
      }
    } catch (error) {
      console.error("Fetch bookings error:", error)
      toast.error(error.response?.data?.message || error.message || 'Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  // Fetch bookings when user is available
  useEffect(() => {
    if (user) {
      fetchMyBookings()
    } else {
      setLoading(false)
    }
  }, [user])

  // Get status color
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmed':
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'pending':
      case 'active':
        return 'bg-yellow-100 text-yellow-700'
      case 'cancelled':
      case 'rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-500'
    }
  }

  // Cancel booking function
  const cancelBooking = async (bookingId) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?")
    if (!confirm) return

    try {
      const { data } = await axios.post('/api/user/cancel-booking', { bookingId })
      if (data.success) {
        toast.success(data.message || 'Booking cancelled successfully')
        fetchMyBookings() // Refresh list
      } else {
        toast.error(data.message || 'Failed to cancel booking')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel booking')
    }
  }

  // Calculate total days
  const calculateDays = (pickupDate, returnDate) => {
    const start = new Date(pickupDate)
    const end = new Date(returnDate)
    const diffTime = Math.abs(end - start)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1
  }

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-16'>
      {/* Header */}
      <div className='mb-12'>
        <h1 className='text-4xl font-bold text-gray-800 mb-3'>My Bookings</h1>
        <p className='text-gray-600 text-lg'>View and manage your car rental bookings</p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-20">
          <div className="text-gray-500">Loading your bookings...</div>
        </div>
      ) : !user ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-4">Please login to view your bookings</p>
          <button 
            onClick={() => navigate('/login')}
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
          >
            Login Now
          </button>
        </div>
      ) : bookings.length > 0 ? (
        <div className='space-y-6'>
          {bookings.map((booking) => {
            const days = calculateDays(booking.pickupDate, booking.returnDate)
            const totalPrice = booking.price || (booking.car?.pricePerDay * days) || 0

            return (
              <div 
                key={booking._id || booking.id}
                className='bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow'
              >
                <div className='flex flex-col md:flex-row gap-6'>
                  {/* Car Image */}
                  <div className='w-full md:w-48 h-32 flex-shrink-0'>
                    <img 
                      src={booking.car?.image || assets.upload_icon} 
                      alt={`${booking.car?.brand} ${booking.car?.model}`}
                      className='w-full h-full object-cover rounded-lg'
                    />
                  </div>

                  {/* Booking Details */}
                  <div className='flex-1'>
                    <div className='flex flex-wrap items-start justify-between gap-4 mb-4'>
                      <div>
                        <h3 className='text-xl font-bold text-gray-800'>
                          {booking.car?.brand} {booking.car?.model}
                        </h3>
                        <p className='text-gray-500 text-sm'>
                          {booking.car?.category} • {booking.car?.year}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                      </span>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
                      {/* Pickup Date */}
                      <div className='flex items-center gap-2 text-gray-600'>
                        <img src={assets.calendar_icon_colored} alt="calendar" className='h-5 w-5' />
                        <div>
                          <p className='text-xs text-gray-500'>Pick-up</p>
                          <p className='font-medium'>
                            {booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      </div>

                      {/* Return Date */}
                      <div className='flex items-center gap-2 text-gray-600'>
                        <img src={assets.calendar_icon_colored} alt="calendar" className='h-5 w-5' />
                        <div>
                          <p className='text-xs text-gray-500'>Return</p>
                          <p className='font-medium'>
                            {booking.returnDate ? new Date(booking.returnDate).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className='flex items-center gap-2 text-gray-600'>
                        <img src={assets.location_icon_colored} alt="location" className='h-5 w-5' />
                        <div>
                          <p className='text-xs text-gray-500'>Location</p>
                          <p className='font-medium'>{booking.car?.location || 'N/A'}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className='flex items-center gap-2 text-gray-600'>
                        <div>
                          <p className='text-xs text-gray-500'>Total Price ({days} {days === 1 ? 'day' : 'days'})</p>
                          <p className='font-bold text-lg text-gray-800'>{currency}{totalPrice}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className='flex flex-wrap gap-3'>
                      {booking.car?._id && (
                        <button 
                          onClick={() => navigate(`/car-details/${booking.car._id}`)}
                          className='px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium'
                        >
                          View Car Details
                        </button>
                      )}
                      
                      {(booking.status === 'pending' || booking.status === 'active') && (
                        <button 
                          onClick={() => cancelBooking(booking._id)}
                          className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium'
                        >
                          Cancel Booking
                        </button>
                      )}
                      
                      {booking.status === 'cancelled' && (
                        <button 
                          disabled
                          className='px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed text-sm font-medium'
                        >
                          Cancelled
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className='text-center py-20'>
          <img 
            src={assets.upload_icon} 
            alt="No bookings" 
            className="h-20 w-20 mx-auto mb-4 opacity-30"
          />
          <p className='text-gray-500 text-lg mb-4'>You don't have any bookings yet</p>
          <p className="text-gray-400 text-sm mb-6">Start by renting a car for your next trip</p>
          <button 
            onClick={() => navigate('/cars')}
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
          >
            Browse Cars
          </button>
        </div>
      )}
    </div>
  )
}

export default MyBookings