import React from 'react'

export const OutlineButton = ({ children, onClick, type, ...otherProps }) => {
  return (
    <button
      className='bg-transparent border border-sky-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-sky-500 px-4 py-2 rounded-lg duration-500 hover:bg-sky-500 hover:text-white flex gap-2 items-center'
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  )
}
