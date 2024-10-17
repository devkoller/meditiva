import React from 'react'

export const CardButton = ({ children, onClick, color }) => {
  return (
    <div
      className={`${
        color
          ? `bg-${color}-500 hover:bg-${color}-700`
          : 'bg-sky-500 hover:bg-sky-800'
      } text-white duration-500 py-2 px-4 rounded-lg cursor-pointer h-40 relative`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
