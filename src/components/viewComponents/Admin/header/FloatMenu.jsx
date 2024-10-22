import React from 'react'
import { FaRegUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Button } from '@/components'
import { useAuthStore } from '@/hooks'

export const FloatMenu = ({ refs }) => {
  const { startLogout } = useAuthStore()
  return (
    <div
      ref={refs}
      className='bg-white p-3 rounded-sm border absolute top-12 right-5'
    >
      <ul>
        <li className='border-b border-slate-700 p-2'>
          <span className='font-bold text-lg'>Bienvenid@</span>
        </li>
        <li className='border-b border-slate-700 p-2'>
          <Link to='/mi-perfil' className='text-lg flex items-center gap-2'>
            <FaRegUser />
            <span>Mi perfil</span>
          </Link>
        </li>
        <li className='p-2'>
          <Button onClick={startLogout}>Cerrar sesión</Button>
        </li>
      </ul>
    </div>
  )
}
