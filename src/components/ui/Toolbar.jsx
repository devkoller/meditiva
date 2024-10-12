import React from 'react'

export const Toolbar = ({ children }) => {
  return (
    <div className='flex flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md mb-5'>
      {children}
    </div>
  )
}
