import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
    initial={{opacity: 0, y: 30}}
    whileInView={{opacity: 1, y: 0}}
    transition={{duration: 0.6}}
    
    
    className='px-6 md:px-16 lg:px-32 mt-60 text-sm text-gray-500'>
      <motion.div
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.6, delay: 0.2}}

      
      className='flex flex-wrap justify-between items-start gap-8 pb-6 border-gray-300 border-b'>
        
        {/* Company Info */}
        <div className='max-w-xs'>
          <motion.img 
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity:1}}
          transition={{duration:0.5, delay:0.3}}
          
          src={assets.logo} alt="CarRental Logo" className='h-8 md:h-9' />
          <motion.p 
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          transition={{duration: 0.5, delay: 0.4}}
          
          className='mt-3 leading-relaxed'>
            Premium car rental services with a wide selection
             of luxury and everyday vehicles to suit your needs.
          </motion.p>
          <motion.div
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          transition ={{duration:0.5 , delay:0.5}}
          
          
          className='flex items-center gap-3 mt-6'>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src={assets.facebook_logo} className='w-5 h-5 hover:opacity-70 transition-opacity' alt="Facebook" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src={assets.instagram_logo} className='w-5 h-5 hover:opacity-70 transition-opacity' alt="Instagram" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <img src={assets.twitter_logo} className='w-5 h-5 hover:opacity-70 transition-opacity' alt="Twitter" />
            </a>
            <a href="mailto:info@example.com" aria-label="Email">
              <img src={assets.gmail_logo} className='w-5 h-5 hover:opacity-70 transition-opacity' alt="Email" />
            </a>
          </motion.div>
        </div>
        <motion.div 
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.4}}

        className='flex flex-wrap justify-between w-1/2 gap-8'>
<div> 
          <h2 className='text-base font-medium text-gray-800 uppercase mb-3'>Quick Links</h2>
          <ul className='flex flex-col gap-2'>
            <li><a href="/" className='hover:text-gray-800 transition-colors'>Home</a></li>
            <li><a href="/cars" className='hover:text-gray-800 transition-colors'>Browse Cars</a></li>
            <li><a href="/list-car" className='hover:text-gray-800 transition-colors'>List your Car</a></li>
            <li><a href="/blog" className='hover:text-gray-800 transition-colors'>Blog</a></li>
            <li><a href="/partners" className='hover:text-gray-800 transition-colors'>Partners</a></li>
          </ul>
        </div>
        
 <div> 
          <h2 className='text-base font-medium text-gray-800 uppercase mb-3'>Resources</h2>
          <ul className='flex flex-col gap-2'>
            <li><a href="/help" className='hover:text-gray-800 transition-colors'>Help Center</a></li>
            <li><a href="/terms" className='hover:text-gray-800 transition-colors'>Terms of Service</a></li>
            <li><a href="/privacy" className='hover:text-gray-800 transition-colors'>Privacy Policy</a></li>
            <li><a href="/insurance" className='hover:text-gray-800 transition-colors'>Insurance</a></li>
          </ul>
        </div>
        <div> 
          <h2 className='text-base font-medium text-gray-800 uppercase mb-3'>Contact</h2>
          <ul className='flex flex-col gap-2'>
            <li>1234 Luxury Drive</li>
            <li>San Francisco, CA 94107</li>
            <li><a href="tel:+11234567890" className='hover:text-gray-800 transition-colors'>+1 (123) 456-7890</a></li>
            <li><a href="mailto:info@example.com" className='hover:text-gray-800 transition-colors'>info@example.com</a></li>
          </ul>
        </div>
        </motion.div>
        
        {/* Quick Links */}
        
        {/* Resources */}
       
        
        {/* Contact */}
        
      </motion.div>
      
      {/* Bottom Bar */}
      <motion.div
      initial={{opacity: 0, y: 10}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.6, delay: 0.6}}

      
      className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'> 
        <p>© {currentYear} CarRental. All rights reserved.</p>
        <ul className='flex items-center gap-1'>
          <li><a href="/privacy" className='hover:text-gray-800 transition-colors'>Privacy</a></li>
          <li className='text-gray-400'>|</li>
          <li><a href="/terms" className='hover:text-gray-800 transition-colors'>Terms</a></li>
          <li className='text-gray-400'>|</li>
          <li><a href="/cookies" className='hover:text-gray-800 transition-colors'>Cookies</a></li>
        </ul>
      </motion.div>
    </motion.footer>
  )
}

export default Footer