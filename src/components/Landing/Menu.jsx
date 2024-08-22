import React from 'react'
import { LuMenu } from 'react-icons/lu'
import icono from '@/assets/imgs/icono.svg'

export const Menu = () => {
  return (
    <>
      <header className='bg-meditiva py-5 w-screen'>
        <nav className='flex items-center mx-auto w-10/12 text-white'>
          <div className='flex gap-2'>
            <div className='flex gap-3 items-center w-fit'>
              <img src={icono} alt='logo' className='w-[3rem]' />
              <span className='text-xl lg:text-4xl'>Meditiva</span>
            </div>
            <ul className='gap-5 items-center text-lg hidden lg:flex'>
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
