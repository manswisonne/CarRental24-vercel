import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const CarCard = ({ car, onClick }) => {
    const currency = import.meta.env.VITE_CURRENCY || '$'
    const navigate = useNavigate()
    
    // Normalize availability check - handles boolean, string, or number
    const isAvailable = car.isAvailable === true || 
                       car.isAvailable === 'true' || 
                       car.isAvailable === 1 || 
                       car.isAvailable === '1'
    
    const handleCardClick = () => {
        navigate(`/car-details/${car._id}`)
        window.scrollTo(0, 0)
    }
    
    return (
        <div 
            className='group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 cursor-pointer'
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleCardClick()
                }
            }}
            aria-label={`View details for ${car.brand} ${car.model}`}
        >
            {/* Car Image Section */}
            <div className='relative h-48 overflow-hidden bg-gray-100'>
                <img 
                    src={car.image || '/placeholder-car.jpg'} 
                    alt={`${car.brand || 'Car'} ${car.model || ''}`} 
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = '/placeholder-car.jpg'
                    }}
                />
                
                {/* Availability Badge */}
                {isAvailable ? (
                    <div className='absolute top-4 left-4 bg-green-600 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-md'>
                        Available Now
                    </div>
                ) : (
                    <div className='absolute top-4 left-4 bg-red-600 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-md'>
                        Not Available
                    </div>
                )}

                {/* Price Badge */}
                <div className='absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-lg'>
                    <span className='font-semibold text-lg'>{currency}{car.pricePerDay || 'N/A'}</span>
                    <span className='text-sm text-white/80'> / Day</span>
                </div>
            </div>

            {/* Car Details Section */}
            <div className='p-4 sm:p-5 bg-white'>
                {/* Car Name and Category */}
                <div className='mb-4'>
                    <h3 className='text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors'>
                        {car.brand || 'Unknown'} {car.model || 'Model'}
                    </h3>
                    <p className='text-gray-500 text-sm'>
                        {car.category || 'Standard'}{car.year ? ` • ${car.year}` : ''}
                    </p>
                </div>

                {/* Car Features Grid */}
                <div className='grid grid-cols-2 gap-3 text-gray-600 mb-4'>
                    {/* Seating */}
                    {car.seating_capacity && (
                        <div className='flex items-center text-sm'>
                            <img src={assets.users_icon} alt="" className='h-4 w-4 mr-2 opacity-70' />
                            <span>{car.seating_capacity} Seats</span>
                        </div>
                    )}

                    {/* Fuel Type */}
                    {car.fuel_type && (
                        <div className='flex items-center text-sm'>
                            <img src={assets.fuel_icon} alt="" className='h-4 w-4 mr-2 opacity-70' />
                            <span>{car.fuel_type}</span>
                        </div>
                    )}

                    {/* Transmission */}
                    {car.transmission && (
                        <div className='flex items-center text-sm'>
                            <img src={assets.car_icon} alt="" className='h-4 w-4 mr-2 opacity-70' />
                            <span>{car.transmission}</span>
                        </div>
                    )}

                    {/* Location */}
                    {car.location && (
                        <div className='flex items-center text-sm'>
                            <img src={assets.location_icon} alt="" className='h-4 w-4 mr-2 opacity-70' />
                            <span>{car.location}</span>
                        </div>
                    )}
                </div>

                {/* Action Button */}
                <button 
                    className={`w-full py-2.5 rounded-lg font-medium transition-all duration-200 ${
                        isAvailable 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={(e) => {
                        e.stopPropagation()
                        if (isAvailable) {
                            // Handle booking action
                            navigate(`/booking/${car._id}`)
                            window.scrollTo(0, 0)
                        }
                    }}
                    disabled={!isAvailable}
                    aria-label={isAvailable ? `Book ${car.brand} ${car.model}` : 'Car not available'}
                >
                    {isAvailable ? 'Book Now' : 'Unavailable'}
                </button>
            </div>
        </div>
    )
}

export default CarCard