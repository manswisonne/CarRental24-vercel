import React, { useState } from 'react'
import { motion } from 'motion/react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('') // 'success', 'error', or ''

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!email || !emailRegex.test(email)) {
      setStatus('error')
      setTimeout(() => setStatus(''), 3000)
      return
    }

    // Handle newsletter subscription here
    console.log('Subscribing email:', email)
    
    // Show success message
    setStatus('success')
    setEmail('')
    
    // Clear success message after 3 seconds
    setTimeout(() => setStatus(''), 3000)
  }

  return (
    <motion.div
    initial={{opacity: 0, y: 50}}
    whileInView={{opacity: 1, y: 0}}
    transition={{duration: 0.6, ease: "easeOut"}}

    viewport={{once:true , amount:0.3}}
    className='flex flex-col items-center justify-center space-y-2 max-md:px-4 my-10 mb-40'>
      <motion.h1 
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.5, delay: 0.2}}
      className='md:text-4xl text-2xl font-semibold text-gray-800'>Never Miss a Deal!</motion.h1>
      <motion.p
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.5, delay: 0.3}}
      
      className='md:text-lg text-md text-center mt-2 mb-4 text-gray-600'>
        Subscribe to get the latest offers, new arrivals, and exclusive discounts.
      </motion.p> 
      
      <div className='flex items-center justify-between max-w-2xl w-full md:h-14 h-12'>
        <input 
          className='border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-700 focus:border-blue-500 transition-colors'
          type='email'
          placeholder='Enter your Email id'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e)
            }
          }}
        />
        <button  
          onClick={handleSubmit}
          className='md:px-12 px-8 h-full text-white bg-blue-600
           hover:bg-blue-700 transition-all cursor-pointer rounded-md
            rounded-l-none font-medium whitespace-nowrap'
        >
          Subscribe
        </button>
      </div>

      {/* Success/Error Messages */}
      {status === 'success' && (
        <p className='text-green-600 text-sm mt-2'>
          ✓ Successfully subscribed! Check your email for confirmation.
        </p>
      )}
      {status === 'error' && (
        <p className='text-red-600 text-sm mt-2'>
          ✗ Please enter a valid email address.
        </p>
      )}
    </motion.div>
  )
}

export default Newsletter
