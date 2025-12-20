// import React, { useState } from 'react'
// import { cityList, assets } from '../assets/assets'
// import { useAppContext } from '../context/AppContext'
// import { motion } from 'motion/react'
// const Hero = () => {
//     const [pickupLocation, setPickupLocation] = useState('')
//    const {pickupDate, setPickupDate, returnDate, setReturnDate, navigate} = useAppContext()
    
//     const handleSearch = (e) => {
//         e.preventDefault()
//         console.log('Pickup Location:', pickupLocation)
//         console.log('Pickup Date:', pickupDate)
//         console.log('Return Date:', returnDate)
//         // Add your form submission logic here
//         navigate('/cars? pickupLocation='+pickupLocation + '&pickupDate='+pickupDate +'&returnDate'+ returnDate)
//     }

//     // Get today's date in YYYY-MM-DD format
//     const today = new Date().toISOString().split('T')[0]

//     return (
//         <motion.div 
//         intial ={{opacity:0 }}
//         animate ={{opacity:1}}
//         transition ={{duration:0.8 }}
//          className='min-h-screen flex flex-col items-center justify-center gap-14 bg-gray-50 text-center px-4 py-12'>
//             < motion.h1
//             intial ={{opacity:0, y: 50}}
//             animate ={{opacity:1, y:0}}
//             transition ={{duration:0.8, delay:0.2}}
//              className='text-4xl md:text-5xl font-semibold text-gray-800'>Luxury Cars on Rent</motion.h1>
            
//             <motion.form 
//             intial ={{scale: 0.95,opacity:0, y: 50}}
//             animate ={{scale:1, opacity:1, y:0}}
//             transition ={{duration:0.6, delay:0.4}}
//                 onSubmit={handleSearch}
//                 className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-sm md:max-w-5xl bg-white shadow-lg gap-6'
//             >
//                 <div className='flex flex-col md:flex-row items-start md:items-center gap-6 w-full'>
//                     {/* Pickup Location */}
//                     <div className='w-full md:w-auto flex flex-col items-start gap-2'>
//                         <label className='text-sm font-medium text-gray-700'>Pickup Location</label>
//                         <select 
//                             required 
//                             value={pickupLocation} 
//                             onChange={(e) => setPickupLocation(e.target.value)}
//                             className='w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-gray-700 bg-white'
//                         >
//                             <option value="">Select Location</option>
//                             {cityList.map((city) => (
//                                 <option key={city} value={city}>{city}</option>
//                             ))}
//                         </select>
//                     </div>
                    
//                     {/* Pickup Date */}
//                     <div className='w-full md:w-auto flex flex-col items-start gap-2'>
//                         <label htmlFor="pickup-date" className='text-sm font-medium text-gray-700'>Pick-up Date</label>
//                         <input 
//                             type="date" 
//                             id='pickup-date'
//                             value={pickupDate}
//                             onChange={(e) => setPickupDate(e.target.value)}
//                             min={new Date().toISOString().split('T')[0]}
//                             className='w-full md:w-auto px-4 py-2 border 
//                             border-gray-300 rounded-lg outline-none focus:border-blue-500 text-gray-700'
//                             required 
//                         />
//                     </div>

//                     {/* Return Date */}
//                     <div className='w-full md:w-auto flex flex-col items-start gap-2'>
//                         <label htmlFor="return-date" className='text-sm font-medium text-gray-700'>Return Date</label>
//                         <input 
//                             type="date" 
//                             id='return-date'
//                             value={returnDate}
//                             onChange={(e) => setReturnDate(e.target.value)}
//                             min={pickupDate || today}
//                             className='w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-gray-700'
//                             required 
//                         />
//                     </div>
//                 </div>
                
//                 {/* Search Button */}
//                 <motion.button 
//                 whileHover={{scale:1.05}}
//                 whileTap ={{scale:0.95}}
//                     type="submit"
//                     className='flex items-center justify-center gap-2 px-8 py-3 max-sm:mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full cursor-pointer transition-colors font-medium whitespace-nowrap'
//                 >
//                     <motion.img
//                     intial ={{opacity:0 , y:100}}
//                     animate ={{opacity:1 , y:0}}
//                     transition ={{duration:0.8 , delay:0.6}}
//                     src={assets.search_icon} alt="search" className='w-4 h-4' />
//                     Search
//                 </motion.button>
//             </motion.form>
            
//             <img src={assets.main_car} alt="car" className='max-h-96 w-auto object-contain' />
//         </motion.div>
//     )
// }

// export default Hero
import React, { useState } from 'react'
import { cityList, assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { motion } from 'motion/react'

const Hero = () => {
    const [pickupLocation, setPickupLocation] = useState('')
    const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } = useAppContext()
    
    const handleSearch = (e) => {
        e.preventDefault()
        console.log('Pickup Location:', pickupLocation)
        console.log('Pickup Date:', pickupDate)
        console.log('Return Date:', returnDate)
        // Fixed the URL - added missing = sign for returnDate
        navigate(`/cars?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`)
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0]

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className='min-h-screen flex flex-col items-center justify-center gap-14 bg-gray-50 text-center px-4 py-12'
        >
            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className='text-4xl md:text-5xl font-semibold text-gray-800'
            >
                Luxury Cars on Rent
            </motion.h1>
            
            <motion.form 
                initial={{ scale: 0.95, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                onSubmit={handleSearch}
                className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-sm md:max-w-5xl bg-white shadow-lg gap-6'
            >
                <div className='flex flex-col md:flex-row items-start md:items-center gap-6 w-full'>
                    {/* Pickup Location */}
                    <div className='w-full md:w-auto flex flex-col items-start gap-2'>
                        <label className='text-sm font-medium text-gray-700'>Pickup Location</label>
                        <select 
                            required 
                            value={pickupLocation} 
                            onChange={(e) => setPickupLocation(e.target.value)}
                            className='w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-gray-700 bg-white'
                        >
                            <option value="">Select Location</option>
                            {cityList.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Pickup Date */}
                    <div className='w-full md:w-auto flex flex-col items-start gap-2'>
                        <label htmlFor="pickup-date" className='text-sm font-medium text-gray-700'>Pick-up Date</label>
                        <input 
                            type="date" 
                            id='pickup-date'
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            min={today}
                            className='w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-gray-700'
                            required 
                        />
                    </div>

                    {/* Return Date */}
                    <div className='w-full md:w-auto flex flex-col items-start gap-2'>
                        <label htmlFor="return-date" className='text-sm font-medium text-gray-700'>Return Date</label>
                        <input 
                            type="date" 
                            id='return-date'
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            min={pickupDate || today}
                            className='w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-gray-700'
                            required 
                        />
                    </div>
                </div>
                
                {/* Search Button */}
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className='flex items-center justify-center gap-2 px-8 py-3 max-sm:mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full cursor-pointer transition-colors font-medium whitespace-nowrap'
                >
                    <motion.img
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        src={assets.search_icon} 
                        alt="search" 
                        className='w-4 h-4' 
                    />
                    Search
                </motion.button>
            </motion.form>
            
            <motion.img 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                src={assets.main_car} 
                alt="car" 
                className='max-h-96 w-auto object-contain' 
            />
        </motion.div>
    )
}

export default Hero
