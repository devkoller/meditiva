import React from 'react'
import icono from '@/assets/imgs/icono.svg'
import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { useAuthStore } from '@/hooks'

export const Menu = () => {
  const { isAuthenticated } = useAuthStore()
  return (
    <>
      <header className='bg-meditiva py-5 w-screen'>
        <nav className='flex items-center justify-between mx-auto w-10/12 text-white'>
          <div className='flex gap-2'>
            <Link className='flex gap-3 items-center w-fit' to='/'>
              <img src={icono} alt='logo' className='w-[3rem]' />
              <span className='text-xl lg:text-4xl'>Meditiva Medical</span>
            </Link>
          </div>
          <div className=''>
            {isAuthenticated === 'Authenticated' ? (
              <Link to='/main'>
                <FaUser className='text-xl' />
              </Link>
            ) : (
              <Link to='/login'>
                <FaUser className='text-xl' />
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  )
}
