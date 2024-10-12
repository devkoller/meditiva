import React from 'react'
import colima from '@/assets/imgs/clientes/colima.png'
import gto from '@/assets/imgs/clientes/gto.png'
import hcg from '@/assets/imgs/clientes/hcg.png'
import michoacan from '@/assets/imgs/clientes/michoacan.png'
import sonora from '@/assets/imgs/clientes/sonora.png'
import ssrojo from '@/assets/imgs/clientes/ssrojo.png'
import imss from '@/assets/imgs/clientes/imss.png'
import bienestart from '@/assets/imgs/clientes/bienestart.svg'

import Carousel from 'react-multi-carousel'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
}

const data = [
  { img: colima, alt: 'Colima' },
  { img: hcg, alt: 'HCG' },
  { img: gto, alt: 'Guanajuato' },
  { img: michoacan, alt: 'Michoacán' },
  { img: sonora, alt: 'Sonora' },
  { img: ssrojo, alt: 'SS Rojo' },
  { img: imss, alt: 'IMSS' },
  { img: bienestart, alt: 'nBie' }
]

export const Clients = () => {
  const print = () => {
    return data.map((item, index) => {
      return <_SingleClient element={item} key={index} />
    })
  }

  return (
    <div className='w-10/12 mx-auto py-10 relative z-10' data-aos='zoom-in'>
      <div>
        <h2 className='text-3xl text-center mb-5'>
          <span className='font-light'>Nuestros principales</span> <br />
          <span className='text-meditiva text-6xl xl:text-8xl font-bold'>
            Clientes
          </span>
        </h2>
      </div>
      <Carousel
        className={`flex gap-3 items-center relative 
            before:content-[''] before:absolute before:z-10
            before:top-0 before:w-2/12 before:h-full before:bg-gradient-to-r before:from-white before:to-transparent
            after:content-[''] after:absolute after:z-10
            after:top-0 after:right-0 after:w-2/12 after:h-full after:bg-gradient-to-l after:from-white after:to-transparent
          `}
        responsive={responsive}
        autoPlay={true}
        infinite={true}
        autoPlaySpeed={3000}
        swipeable={true}
        draggable={true}
        removeArrowOnDeviceType={['tablet', 'mobile']}
      >
        {print()}
      </Carousel>
    </div>
  )
}

const _SingleClient = ({ element }) => {
  return (
    <div className='flex flex-col items-center gap-3 px-5 grayscale duration-500 hover:grayscale-0'>
      <div className='flex gap-3 items-center'>
        <img
          src={element.img}
          alt={element.alt}
          className='text-black w-12/12 aspect-3/2 object-contain mix-blend-color-burn'
        />
      </div>
    </div>
  )
}
