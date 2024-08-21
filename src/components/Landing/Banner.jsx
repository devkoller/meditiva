import React from 'react'

const data = {
  firstText: 'el mejor cuidado',
  secondText: 'equipamiento moderno',
  title1: 'reúnete con los',
  title2: 'mejores doctores'
}

export const Banner = () => {
  return <section className='mb-10'>{<_SingleBanner element={data} />}</section>
}

const _SingleBanner = ({ element }) => {
  return (
    <div className='min-h-[600px] h-screen w-screen flex justify-center items-center bg-slate-600'>
      <div className='w-screen text-center text-white uppercase whitespace-normal flex flex-col gap-5'>
        <span className='text-md lg:text-xl break-words'>
          {element.firstText} | {element.secondText}
        </span>
        <h1 className='text-3xl lg:text-8xl'>
          <span className='font-light'>{element.title1}</span> <br />
          <span className='font-bold'>{element.title2}</span>
        </h1>
        <div>
          <button className='bg-meditiva px-6 py-5'>
            <span>Descubre más</span>
          </button>
        </div>
      </div>
    </div>
  )
}
