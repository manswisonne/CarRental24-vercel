import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'motion/react'

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } 
  = useAppContext()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const changeRole = async () => {
    try {
      const { data } = await axios.post('/api/owner/change-role')
      if (data.success) {
        setIsOwner(true)
        toast.success(data.message)
        navigate('/owner')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Failed to change role')
    }
  }

  // Auto-hide navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false)
        setOpen(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleDashboard = () => {
    if (isOwner) {
      navigate('/owner')
    } else {
      toast.info('You need to become an owner first!')
    }
  }

  const handleLogin = () => {
    if (user) {
      logout()
      toast.success('Logged out successfully')
    } else {
      setShowLogin(true)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`)
      setSearchQuery('')
    }
  }

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 flex items-center justify-between px-6 md:px-16 
        lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-gray-200 bg-white
        shadow-sm z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${location.pathname === "/" ? "bg-gray-50" : "bg-white"}`}
    >
      {/* Logo */}
      <Link to='/' className='flex-shrink-0'>
        <motion.img 
          whileHover={{ scale: 1.05 }}
          src={assets.logo} 
          alt="Logo" 
          className='h-8 object-contain'
        />
      </Link>
      
      {/* Desktop Navigation */}
      <div className='hidden lg:flex items-center gap-8'>
        {menuLinks.map((link, index) => (
          <Link 
            key={index} 
            to={link.path}
            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              location.pathname === link.path ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Search Bar - Desktop */}
      <form onSubmit={handleSearch} className='hidden lg:flex items-center text-sm gap-2 
        border border-gray-300 px-3 py-1 rounded-full max-w-xs'>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='py-1 w-full bg-transparent outline-none placeholder-gray-400' 
          placeholder='Search products' 
        />
        <button type="submit" className='flex-shrink-0'>
          <img src={assets.search_icon} alt="search" className='w-4 h-4' />
        </button>
      </form>

      {/* Dashboard & Login Buttons - Desktop */}
      <div className='hidden lg:flex items-center gap-4'>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDashboard} 
          className='text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors'
        >
          {isOwner ? 'Dashboard' : 'List Cars'}
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin} 
          className='px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm font-medium rounded-lg shadow-sm'
        >
          {user ? 'Logout' : 'Login'}
        </motion.button>
      </div>

      {/* Mobile Menu Button */}
      <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className='lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors'
        aria-label="Toggle menu"
      >
        <div className={`w-6 h-0.5 bg-gray-600 mb-1.5 transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-gray-600 mb-1.5 transition-opacity ${open ? 'opacity-0' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-gray-600 transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`}></div>
      </motion.button>

      {/* Mobile Menu */}
      <motion.div 
        initial={false}
        animate={open ? { x: 0 } : { x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className={`fixed top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg lg:hidden`}
      >
        <div className='flex flex-col p-6 gap-4 max-h-[calc(100vh-4rem)] overflow-y-auto'>
          {menuLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={link.path}
                onClick={handleLinkClick}
                className={`text-base font-medium py-2 transition-colors hover:text-blue-600 block ${
                  location.pathname === link.path ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}

          <form onSubmit={handleSearch} className='flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-lg mt-2'>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='flex-1 bg-transparent outline-none placeholder-gray-400 text-sm' 
              placeholder='Search products' 
            />
            <button type="submit">
              <img src={assets.search_icon} alt="search" className='w-4 h-4' />
            </button>
          </form>

          <div className='flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200'>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (isOwner) {
                  navigate('/owner')
                } else {
                  changeRole()
                }
                handleLinkClick()
              }} 
              className='w-full py-2.5 text-center text-gray-600 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
            >
              {isOwner ? 'Dashboard' : 'List Cars'}
            </motion.button>

            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => { 
                handleLogin()
                handleLinkClick()
              }} 
              className='w-full py-2.5 bg-blue-600 hover:bg-blue-700 transition-all text-white font-medium rounded-lg shadow-sm'
            >
              {user ? 'Logout' : 'Login'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar







// import { assets, menuLinks } from '../assets/assets'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { useAppContext } from '../context/AppContext'
// import { useState, useEffect } from 'react'
// import { toast } from 'react-toastify' // ADD THIS IMPORT
// import {motion} from 'motion/react'


// const Navbar = () => {
//   const { setShowLogin, user, logout, isOwner, axios, setIsOwner } 
//   = useAppContext()
//   const location = useLocation()
//   const navigate = useNavigate()
//   const [open, setOpen] = useState(false)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [isVisible, setIsVisible] = useState(true)
//   const [lastScrollY, setLastScrollY] = useState(0)

//   const changeRole = async () => {
//     try {
//       const { data } = await axios.post('/api/owner/change-role')
//       if (data.success) {
//         setIsOwner(true)
//         toast.success(data.message)
//         navigate('/owner') // Navigate after role change
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       // FIXED: Use error.response.data or error.message
//       toast.error(error.response?.data?.message || error.message || 'Failed to change role')
//     }
//   }

//   // Auto-hide navbar on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY

//       if (currentScrollY > lastScrollY && currentScrollY > 80) {
//         // Scrolling down & past 80px
//         setIsVisible(false)
//         setOpen(false) // Close mobile menu when hiding
//       } else {
//         // Scrolling up
//         setIsVisible(true)
//       }

//       setLastScrollY(currentScrollY)
//     }

//     window.addEventListener('scroll', handleScroll, { passive: true })
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [lastScrollY])

//   // Handle dashboard button click - UPDATED LOGIC
//   const handleDashboard = () => {
//     if (isOwner) {
//       navigate('/owner')
//     } else {
//       // If not owner, either:
//       // Option 1: Navigate to become owner page
//       // navigate('/become-owner')
      
//       // Option 2: Show modal/alert
//       toast.info('You need to become an owner first!')
      
//       // Option 3: Call changeRole (as in mobile version)
//       // changeRole()
//     }
//   }

//   // Handle login button click
//   const handleLogin = () => {
//     if (user) {
//       logout()
//       toast.success('Logged out successfully')
//     } else {
//       setShowLogin(true)
//     }
//   }

//   // Handle search
//   const handleSearch = (e) => {
//     e.preventDefault()
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${searchQuery}`)
//       setSearchQuery('')
//     }
//   }

//   // Close mobile menu when a link is clicked
//   const handleLinkClick = () => {
//     setOpen(false)
//   }

//   return (
//     < motion.nav 
//     intial ={{y:-20  , opacity:0}}
//     animate ={{y:0 , opacity:1}}
//     transition ={{duration:0.5}}
//     className={`fixed top-0 left-0 right-0 flex items-center justify-between px-6 md:px-16 
//       lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-gray-200 bg-white
//        shadow-sm z-50 transition-transform duration-300 ${
//       isVisible ? 'translate-y-0' : '-translate-y-full'
//     } ${location.pathname === "/" ? "bg-gray-50" : "bg-white"}`}>
//       {/* Logo */}
//       <Link to='/' className='flex-shrink-0'>
//         < motion.img  whileHover={{scale : 1.05} }src={assets.logo} alt="Logo" className='h-8 object-contain'/>
//       </Link>
      
//       {/* Desktop Navigation */}
//       <div className='hidden lg:flex items-center gap-8'>
//         {menuLinks.map((link, index) => (
//           <Link 
//             key={index} 
//             to={link.path}
//             className={`text-sm font-medium transition-colors hover:text-blue-600 ${
//               location.pathname === link.path ? 'text-blue-600' : 'text-gray-600'
//             }`}
//           >
//             {link.name}
//           </Link>
//         ))}
//       </div>

//       {/* Search Bar - Desktop */}
//       <form onSubmit={handleSearch} className='hidden lg:flex items-center text-sm gap-2 
//       border border-gray-300 px-3 py-1 rounded-full max-w-xs'>
//         <input 
//           type="text" 
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className='py-1 w-full bg-transparent outline-none placeholder-gray-400' 
//           placeholder='Search products' 
//         />
//         <button type="submit" className='flex-shrink-0'>
//           <img src={assets.search_icon} alt="search" className='w-4 h-4' />
//         </button>
//       </form>

//       {/* Dashboard & Login Buttons - Desktop */}
//       <div className='hidden lg:flex items-center gap-4'>
//         <button 
//           onClick={handleDashboard} 
//           className='text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors'
//         >
//           {/* FIXED: Dynamic button text */}
//           {isOwner ? 'Dashboard' : 'List Cars'}
//         </button>
//         <button 
//           onClick={handleLogin} 
//           className='px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm font-medium rounded-lg shadow-sm'
//         >
//           {/* FIXED: Dynamic button text */}
//           {user ? 'Logout' : 'Login'}
//         </button>
//       </div>

//       {/* Mobile Menu Button */}
//       <button 
//         onClick={() => setOpen(!open)}
//         className='lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors'
//         aria-label="Toggle menu"
//       >
//         <div className={`w-6 h-0.5 bg-gray-600 mb-1.5 transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`}></div>
//         <div className={`w-6 h-0.5 bg-gray-600 mb-1.5 transition-opacity ${open ? 'opacity-0' : ''}`}></div>
//         <div className={`w-6 h-0.5 bg-gray-600 transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`}></div>
//       </button>

//       {/* Mobile Menu */}
//       <div className={`fixed top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg lg:hidden transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
//         <div className='flex flex-col p-6 gap-4 max-h-[calc(100vh-4rem)] overflow-y-auto'>
//           {/* Mobile Menu Links */}
//           {menuLinks.map((link, index) => (
//             <Link 
//               key={index} 
//               to={link.path}
//               onClick={handleLinkClick}
//               className={`text-base font-medium py-2 transition-colors hover:text-blue-600 ${
//                 location.pathname === link.path ? 'text-blue-600' : 'text-gray-600'
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}

//           {/* Mobile Search */}
//           <form onSubmit={handleSearch} className='flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-lg mt-2'>
//             <input 
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className='flex-1 bg-transparent outline-none placeholder-gray-400 text-sm' 
//               placeholder='Search products' 
//             />
//             <button type="submit">
//               <img src={assets.search_icon} alt="search" className='w-4 h-4' />
//             </button>
//           </form>

//           {/* Mobile Buttons */}
//           <div className='flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200'>
//             <button 
//               onClick={() => {
//                 if (isOwner) {
//                   navigate('/owner')
//                 } else {
//                   changeRole() // Or navigate to become-owner page
//                 }
//                 handleLinkClick()
//               }} 
//               className='w-full py-2.5 text-center text-gray-600 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
//             >
//               {isOwner ? 'Dashboard' : 'List Cars'}
//             </button>

//             <button 
//               onClick={() => { 
//                 handleLogin()
//                 handleLinkClick()
//               }} 
//               className='w-full py-2.5 bg-blue-600 hover:bg-blue-700 transition-all text-white font-medium rounded-lg shadow-sm'
//             >
//               {user ? 'Logout' : 'Login'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </ motion.nav>
//   )
// }

// export default Navbar
// import { useState, useEffect } from 'react'
// import { assets, menuLinks } from '../assets/assets'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { useAppContext } from '../context/AppContext'
// import { toast } from 'react-hot-toast'

// const Navbar = () => {
//   const {
//     setShowLogin,
//     user,
//     logout,
//     isOwner,
//     axios,
//     setIsOwner
//   } = useAppContext()

//   const location = useLocation()
//   const navigate = useNavigate()

//   const [open, setOpen] = useState(false)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [isVisible, setIsVisible] = useState(true)
//   const [lastScrollY, setLastScrollY] = useState(0)

//   const changeRole = async () => {
//     try {
//       const { data } = await axios.post('/api/owner/change-role')
//       if (data.success) {
//         setIsOwner(true)
//         toast.success(data.message)
//         navigate('/owner')
//       } else {
//         toast.error(data.message)
//       }
//     } catch {
//       toast.error('Role change failed')
//     }
//   }

//   useEffect(() => {
//     const handleScroll = () => {
//       const current = window.scrollY
//       if (current > lastScrollY && current > 80) {
//         setIsVisible(false)
//         setOpen(false)
//       } else {
//         setIsVisible(true)
//       }
//       setLastScrollY(current)
//     }

//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [lastScrollY])

//   const handleSearch = (e) => {
//     e.preventDefault()
//     if (!searchQuery.trim()) return
//     navigate(`/search?q=${searchQuery}`)
//     setSearchQuery('')
//     setOpen(false)
//   }

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 bg-white border-b shadow transition-transform duration-300 ${
//         isVisible ? 'translate-y-0' : '-translate-y-full'
//       }`}
//     >
//       <div className="flex items-center justify-between px-6 py-4">
//         <Link to="/">
//           <img src={assets.logo} className="h-8" />
//         </Link>

//         <div className="hidden lg:flex gap-6">
//           {menuLinks.map((link) => (
//             <Link
//               key={link.path}
//               to={link.path}
//               className={
//                 location.pathname === link.path
//                   ? 'text-blue-600'
//                   : 'text-gray-600'
//               }
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>

//         <div className="hidden lg:flex gap-4">
//           {user && (
//             <button onClick={() => navigate('/owner')}>
//               Dashboard
//             </button>
//           )}

//           <button
//             onClick={() => (user ? logout() : setShowLogin(true))}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             {user ? 'Logout' : 'Login'}
//           </button>
//         </div>

//         <button
//           className="lg:hidden"
//           onClick={() => setOpen(!open)}
//         >
//           ☰
//         </button>
//       </div>

//       {open && (
//         <div className="lg:hidden p-4 border-t bg-white">
//           {menuLinks.map((link) => (
//             <Link
//               key={link.path}
//               to={link.path}
//               onClick={() => setOpen(false)}
//               className="block py-2"
//             >
//               {link.name}
//             </Link>
//           ))}

//           <form onSubmit={handleSearch} className="mt-3 flex gap-2">
//             <input
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="border p-2 flex-1"
//               placeholder="Search"
//             />
//             <button className="bg-blue-600 text-white px-3">
//               Go
//             </button>
//           </form>

//           <button
//             className="mt-4 w-full border p-2"
//             onClick={() => {
//               if (isOwner) navigate('/owner')
//               else changeRole()
//               setOpen(false)
//             }}
//           >
//             {isOwner ? 'Dashboard' : 'List Cars'}
//           </button>

//           <button
//             className="mt-2 w-full bg-blue-600 text-white p-2"
//             onClick={() => {
//               user ? logout() : setShowLogin(true)
//               setOpen(false)
//             }}
//           >
//             {user ? 'Logout' : 'Login'}
//           </button>
//         </div>
//       )}
//     </nav>
//   )
// }

// export default Navbar
