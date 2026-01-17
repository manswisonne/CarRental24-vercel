// import React from 'react'
// import Title from './Title'
// import { dummyCarData, assets } from '../assets/assets'
// import CarCard from './CarCard'
// import { useNavigate } from 'react-router-dom'
// import { useAppContext } from '../context/AppContext'

// const FeaturedSection = () => {
//   const navigate = useNavigate()
//   const {cars} = useAppContext()
  
//   return (
//     <div className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>
//       <div>
//         <Title 
//           title='Featured Vehicles' 
//           subTitle='Explore our selection of premium vehicles available for your next adventure'
//         />
//       </div>
      
//       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 w-full'>
//         {cars.slice(0 , 6).map((car) => (
//           <div key={car._id}>
//             <CarCard car={car} />
//           </div>
//         ))}
//       </div>

//       <button 
//         onClick={() => {
//           navigate('/car')
//           window.scrollTo(0, 0)
//         }} 
//         className='flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-300 hover:bg-gray-50 rounded-md mt-16 cursor-pointer transition-colors'
//       >
//         Explore All Cars 
//         <img src={assets.arrow_icon} alt="arrow" className='w-4 h-4' />
//       </button>
//     </div>
//   )
// }

// export default FeaturedSection
// import React from 'react'
// import Title from './Title'
// import { assets } from '../assets/assets'
// import CarCard from './CarCard'
// import { useNavigate } from 'react-router-dom'
// import { useAppContext } from '../context/AppContext'
// import { motion } from 'motion/react'

// const FeaturedSection = () => {
//   const navigate = useNavigate()
//   const { cars, fetchCars } = useAppContext() // Added fetchCars
  
//   // Debug: Log cars data
//   console.log("FeaturedSection - cars:", cars)
//   console.log("FeaturedSection - cars length:", cars?.length)
  
//   // If cars is undefined or empty, fetch cars
//   React.useEffect(() => {
//     if ((!cars || cars.length === 0) && fetchCars) {
//       console.log("Fetching cars...")
//       fetchCars()
//     }
//   }, [cars, fetchCars])

//   return (
//     <motion.div
//     initial ={{opacity:0 , y:50}}
//     whileInView={{opacity:1, y:0}}
//     transition={{duration:1 , ease:"easeOut"}}
//     className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>
//       <motion.div
//       initial ={{opacity:0 , y:20}}
//       whileInView={{opacity:1, y:0}}
//       transition={{duration:1 , delay:0.5}}
//       >
//         <Title 
//           title='Featured Vehicles' 
//           subTitle='Explore our selection of premium vehicles available for your next adventure'
//         />
//       </motion.div>
      
//       {/* Loading State */}
//       {!cars ? (
//         <div className="mt-16 w-full flex justify-center">
//           <div className="text-gray-500">Loading cars...</div>
//         </div>
//       ) : cars.length === 0 ? (
//         <div className="mt-16 w-full flex flex-col items-center justify-center">
//           <img 
//             src={assets.upload_icon} 
//             alt="No cars" 
//             className="h-20 w-20 opacity-30 mb-4"
//           />
//           <p className="text-gray-500">No cars available at the moment</p>
//           <p className="text-sm text-gray-400 mt-2">Check back later or contact support</p>
//         </div>
//       ) : (
//         <>
//           <motion.div
//           initial ={{opacity:0 , y:50}}
//           whileInView={{opacity:1, y:0}}
//           transition={{duration:1 , delay:0.5}}
//           className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 w-full'>
//             {cars.slice(0, 6).map((car) => (
//               <motion.div. motion.div
//               initial ={{opacity:0 ,scale:0.95}}
//               whileInView={{opacity:1,scale:1}}
//           transition={{duration:0.4 , delay:0.5, ease:"easeOut"}}
//               key={car._id || car.id}>
//                 <CarCard car={car} />
//               </motion.div.>
//             ))
//             }
//           </motion.div>

//           <motion.button
//           initial ={{opacity:0 , y:20}}
//           whileInView={{opacity:1, y:0}}
//           transition={{duration:0.4, delay:0.6}} 
//             onClick={() => {
//               navigate('/cars') // FIXED: Changed from '/car' to '/cars'
//               window.scrollTo(0, 0)
//             }} 
//             className='flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-300 hover:bg-gray-50 rounded-md mt-16 cursor-pointer transition-colors'
//           >
//             Explore All Cars 
//             <img src={assets.arrow_icon} alt="arrow" className='w-4 h-4' />
//           </motion.button>
//         </>
//       )}
//     </motion.div>
//   )
// }

// export default FeaturedSection
import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { motion } from 'motion/react'
import {useEffect} from 'react'
const FeaturedSection = () => {
  const navigate = useNavigate()
  const { cars, fetchCars } = useAppContext()
  
  // Debug: Log cars data
  console.log("FeaturedSection - cars:", cars)
  console.log("FeaturedSection - cars length:", cars?.length)
  
  // If cars is undefined or empty, fetch cars (with loading state)
  const [isLoading, setIsLoading] = React.useState(false)
  
  React.useEffect(() => {
    const loadCars = async () => {
      // Only fetch if cars is null/undefined or empty array
      if ((!cars || cars.length === 0) && fetchCars && !isLoading) {
        console.log("Fetching cars...")
        setIsLoading(true)
        try {
          await fetchCars()
        } catch (error) {
          console.error("Error fetching cars:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    
    loadCars()
  }, [cars, fetchCars, isLoading])

  return (
    <motion.div
      initial={{opacity: 0, y: 50}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 1, ease: "easeOut"}}
      className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'
    >
      <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 1, delay: 0.5}}
      >
        <Title 
          title='Featured Vehicles' 
          subTitle='Explore our selection of premium vehicles available for your next adventure'
        />
      </motion.div>
      
      {/* Loading State */}
      {isLoading || !cars ? (
        <div className="mt-16 w-full flex justify-center">
          <div className="text-gray-500">Loading cars...</div>
        </div>
      ) : (cars || []).length === 0 ? (
        <div className="mt-16 w-full flex flex-col items-center justify-center">
          <img 
            src={assets.upload_icon} 
            alt="No cars" 
            className="h-20 w-20 opacity-30 mb-4"
          />
          <p className="text-gray-500">No cars available at the moment</p>
          <p className="text-sm text-gray-400 mt-2">Check back later or contact support</p>
        </div>
      ) : (
        <>
          <motion.div
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 1, delay: 0.5}}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 w-full'
          >
            {cars.slice(0, 6).map((car) => (
              <motion.div
                initial={{opacity: 0, scale: 0.95}}
                whileInView={{opacity: 1, scale: 1}}
                transition={{duration: 0.4, delay: 0.5, ease: "easeOut"}}
                key={car._id || car.id}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.4, delay: 0.6}} 
            onClick={() => {
              navigate('/cars')
              window.scrollTo(0, 0)
            }} 
            className='flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-300 hover:bg-gray-50 rounded-md mt-16 cursor-pointer transition-colors'
          >
            Explore All Cars 
            <img src={assets.arrow_icon} alt="arrow" className='w-4 h-4' />
          </motion.button>
        </>
      )}
    </motion.div>
  )
}

export default FeaturedSection
