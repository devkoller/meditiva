import React from 'react'
import banner1 from '@/assets/imgs/banner1.jpg'
import shape from '@/assets/imgs/shapes/7.png'

const data = {
  firstText: 'Material de Curación, Equipo Médico e Instrumental Quirúrgico',
  // secondText: 'equipamiento moderno',
  // title1: ' ',
  title2: 'de la más alta calidad'
}

export const Banner = () => {
  return <section className='mb-10'>{<_SingleBanner element={data} />}</section>
}

const _SingleBanner = ({ element }) => {
  return (
    <div
      className={`min-h-[600px] h-screen w-screen flex justify-center items-center relative
      before:content-[''] before:absolute before:z-10
      before:top-0
      before:w-full before:h-full
      before:bg-black before:opacity-30
      overflow-hidden
    `}
    >
      <img
        src={banner1}
        alt=''
        className='absolute z-0 w-full h-full animate-banner'
      />
      <div className='w-screen text-center text-white uppercase whitespace-normal flex flex-col gap-5 relative z-20'>
        <span className='text-md lg:text-6xl break-words'>
          {element.firstText} {element.secondText}
        </span>
        <h1 className='text-3xl lg:text-8xl'>
          {/* <span className='font-light'>{element.title1}</span> <br /> */}
          <span className='font-bold'>{element.title2}</span>
        </h1>
        {/* <div>
          <button className='bg-meditiva px-6 py-5'>
            <span>Descubre más</span>
          </button>
        </div> */}
      </div>
      <img
        src={shape}
        alt=''
        className='absolute bottom-0 left-0 w-full z-10'
      />
    </div>
  )
}
