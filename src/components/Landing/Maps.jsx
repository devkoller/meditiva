import React from 'react'

export const Maps = () => {
  return (
    <div>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.8638945212!2d-103.37078012549816!3d20.67511558088715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ae052ffecb89%3A0x4d5f9235c2513619!2sAv.%20Ignacio%20L%20Vallarta%201440%2C%20Col%20Americana%2C%20Americana%2C%2044600%20Guadalajara%2C%20Jal.!5e0!3m2!1sen!2smx!4v1724342264928!5m2!1sen!2smx'
        // style='border:0;'
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
        className='w-full h-96'
      ></iframe>
    </div>
  )
}
