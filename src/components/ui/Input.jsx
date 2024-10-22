import React from 'react'

export const Input = ({ label, onChange }) => {
  return (
    <div className='w-full'>
      <label>{label}</label>
      <input
        type='text'
        onChange={onChange ? onChange : () => {}}
        className={`border w-full border-neutral-950/25 focus-visible:border-sky-500 focus-visible:outline-none px-3 py-1 rounded-sm`}
      />
    </div>
  )
}
