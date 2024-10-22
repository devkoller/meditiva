import React from 'react'

export const Title = ({ children, type = 'h3' }) => {
  const types = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-bold',
    h5: 'text-lg font-bold',
    h6: 'text-base font-bold'
  }

  return React.createElement(
    type,
    {
      className: `${types[type]}`
    },
    children
  )
}
