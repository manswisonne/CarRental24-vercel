

import React from 'react'
import {  assets } from '../../assets/assets'  // ← Added 'assets' to the import
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext';

const NavbarOwner = () => {
  const {user} = useAppContext;

  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-gray-200 relative transition-all'>
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className='h-7' />
      </Link>
      <p className='text-gray-700 font-medium'>Welcome, {user ? .name || 'Owner'}</p>
    </div>
  )
}

export default NavbarOwner
