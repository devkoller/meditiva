import React from 'react'
import { LuMenu } from 'react-icons/lu'

export const Menu = () => {
  return (
    <>
      <header className='bg-meditiva py-5 w-screen'>
        <nav className='flex justify-between items-center mx-auto w-10/12 text-white'>
          <div className='flex gap-5'>
            <div className='flex gap-2'>
              <img src='' alt='logo' />
              <span className='text-xl lg:text-4xl'>Meditiva</span>
            </div>
            <ul className='ms-5 gap-5 items-center text-lg hidden lg:flex'>
              <li>
                <span>Inicio </span>
              </li>
              <li>
                <span>Nosotros</span>
              </li>
              <li>
                <span>Contacto</span>
              </li>
            </ul>
          </div>
          <div className='lg:hidden'>
            <LuMenu />
          </div>
        </nav>
      </header>
    </>
  )
}
