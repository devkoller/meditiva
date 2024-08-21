import React from 'react'
import meditiva from '@/assets/imgs/meditiva.jpeg'

export const Building = () => {
  return (
    <div className='min-h-[800px] h-screen flex flex-col justify-center items-center gap-5'>
      <img src={meditiva} alt='logo' className='w-3/12' />
      <h1 className='text-4xl'>Página en construcción</h1>
    </div>
  )
}
