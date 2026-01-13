// 
import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast' // ADD THIS IMPORT
import {motion} from 'motion/react'

const Cars = () => {
  // Getting search params from url
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')
  
  const { cars, axios } = useAppContext()
  const [input, setInput] = useState('')
  const [filteredCars, setFilteredCars] = useState([])
  const [loading, setLoading] = useState(false)
  
  const isSearchData = pickupLocation && pickupDate && returnDate

  // Apply search filter based on input
  const applyFilter = () => {
    if (!cars || cars.length === 0) {
      setFilteredCars([])
      return
    }
    
    if (input === '') {
      setFilteredCars(cars)
      return
    }
    
    const searchTerm = input.toLowerCase().trim()
    const filtered = cars.filter((car) => {
      return (
        car.brand?.toLowerCase().includes(searchTerm) ||
        car.model?.toLowerCase().includes(searchTerm) ||
        car.category?.toLowerCase().includes(searchTerm) ||
        car.transmission?.toLowerCase().includes(searchTerm) ||
        car.fuel_type?.toLowerCase().includes(searchTerm) ||
        car.location?.toLowerCase().includes(searchTerm)
      )
    })
    
    setFilteredCars(filtered)
  }

  // Search availability based on dates/location
  const searchAvailability = async () => {
    if (!pickupLocation || !pickupDate || !returnDate) {
      toast.error('Missing search parameters')
      return
    }
    
    setLoading(true)
    try {
      const { data } = await axios.post('/api/bookings/check-availability', { // FIXED: Added `/`
        location: pickupLocation,
        pickupDate,
        returnDate
      })
      
      if (data.success) {
        setFilteredCars(data.availableCars || [])
        
        if (data.availableCars?.length === 0) {
          toast('No cars available for the selected dates')
        }
      } else {
        toast.error(data.message || 'Failed to check availability')
      }
    } catch (error) {
      console.error('Availability check error:', error)
      toast.error(error.response?.data?.message || 'Failed to check availability')
    } finally {
      setLoading(false)
    }
  }

  // Initial load: check availability if search params exist
  useEffect(() => {
    if (isSearchData) {
      searchAvailability()
    } else if (cars && cars.length > 0) {
      setFilteredCars(cars)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Apply filter when input changes or cars update
  useEffect(() => {
    if (!isSearchData) {
      applyFilter()
    }
  }, [input, cars, isSearchData])

  // Debug logs
  useEffect(() => {
    console.log('Cars from context:', cars)
    console.log('Filtered cars:', filteredCars)
    console.log('Search params:', { pickupLocation, pickupDate, returnDate })
  }, [cars, filteredCars])

  return (
    <div>
      <motion.div 
      initial={{opacity: 0, y: 30}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.6, ease: "easeOut"}}

      className='flex flex-col items-center py-20 bg-gray-50 max-md:px-4'>
        <Title 
          title='Available Cars' 
          subTitle='Browse our selection of premium vehicles available for your next adventure' 
        />
        <motion.div 
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay:0.3 }}
        
        
        className='flex items-center bg-white px-4 mt-6 max-w-xl w-full h-12 rounded-full shadow-md'>
          <img src={assets.search_icon} alt="" className='w-5 h-5 mr-2 opacity-60' />
          
          <input  
            onChange={(e) => setInput(e.target.value)} 
            value={input} 
            type="text" 
            placeholder='Search by make, model or features' 
            className='w-full h-full outline-none text-gray-700 placeholder-gray-400' 
          />
          
          <img 
            src={assets.filter_icon} 
            alt="" 
            className='w-5 h-5 ml-2 opacity-60 cursor-pointer hover:opacity-100 transition-opacity' 
            onClick={() => {
              // Optional: Add filter modal/functionality here
              toast.info('Filter functionality coming soon!')
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5,delay:0.6}}
      
      className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10 mb-20'>
        {/* Header with count */}
        <div className='mb-6 px-20 max-w-7xl mx-auto flex items-center justify-between'>
          <p className='text-gray-600'>
            Showing <span className='font-semibold text-gray-800'>{filteredCars.length}</span> Cars
            {isSearchData && (
              <span className='text-sm text-blue-600 ml-2'>
                (Filtered by dates)
              </span>
            )}
          </p>
          
          {input && (
            <button 
              onClick={() => setInput('')}
              className='px-4 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors'
            >
              Clear Search
            </button>
          )}
        </div>
        
        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="text-gray-500">Checking availability...</div>
          </div>
        ) : (
          <>
            {/* Results */}
            {filteredCars.length > 0 ? (
             <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 max-w-7xl mx-auto'>
  {filteredCars.map((car, index) => (
    <motion.div
      key={car._id || index}
      initial={{opacity: 0, y: 30}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.4, delay: 0.1 * index}}
    >
      <CarCard car={car} />
    </motion.div>
  ))}
</div>
            ) : (
              <div className='text-center py-20'>
                {input ? (
                  <>
                    <p className='text-gray-500 text-lg'>No cars found matching "{input}"</p>
                    <button 
                      onClick={() => setInput('')}
                      className='mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                    >
                      Clear Search
                    </button>
                  </>
                ) : isSearchData ? (
                  <>
                    <p className='text-gray-500 text-lg'>No cars available for the selected dates/location</p>
                    <button 
                      onClick={() => window.location.href = '/cars'}
                      className='mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                    >
                      View All Cars
                    </button>
                  </>
                ) : (
                  <p className='text-gray-500 text-lg'>No cars available at the moment</p>
                )}
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  )
}

export default Cars
