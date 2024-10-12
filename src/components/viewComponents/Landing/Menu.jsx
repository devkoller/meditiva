import React from 'react'
import { LuMenu } from 'react-icons/lu'
import icono from '@/assets/imgs/icono.svg'
import { Link } from 'react-router-dom'

export const Menu = () => {
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
            <Link className='text-white' to='/login'>
              Iniciar sesión
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
}
