import Carousel from 'react-multi-carousel'

import atronix from '@/assets/imgs/socios/Artronix.png'
import bica from '@/assets/imgs/socios/bica.png'
import bonefix from '@/assets/imgs/socios/bonefix.webp'
import core from '@/assets/imgs/socios/core.png'
import exos from '@/assets/imgs/socios/exos.png'
import human from '@/assets/imgs/socios/human.jpg'
import kls from '@/assets/imgs/socios/kls.png'
import maxo from '@/assets/imgs/socios/maxo.jpg'
import medical from '@/assets/imgs/socios/medical.png'
import mindray from '@/assets/imgs/socios/mindray.png'
import newfix from '@/assets/imgs/socios/newfix.png'
import signus from '@/assets/imgs/socios/signus.jpg'
import spinart from '@/assets/imgs/socios/spineart.png'
import topspine from '@/assets/imgs/socios/topspine.jpg'
import trauma from '@/assets/imgs/socios/trauma.png'
import ulrich from '@/assets/imgs/socios/ulrich.png'
import varlix from '@/assets/imgs/socios/varlix.jpg'

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
  { img: atronix },
  { img: bica },
  { img: bonefix },
  { img: core },
  { img: exos },
  { img: human },
  { img: kls },
  { img: maxo },
  { img: medical },
  { img: mindray },
  { img: newfix },
  { img: signus },
  { img: spinart },
  { img: topspine },
  { img: trauma },
  { img: ulrich },
  { img: varlix }
]

export const Sponsors = () => {
  const print = () => {
    return data.map((item, index) => {
      return <_SingleClient element={item} key={index} />
    })
  }

  return (
    <div className='w-10/12 mx-auto py-10'>
      <div>
        <h2 className='text-3xl text-center mb-5'>
          {/* <span className='font-light'>Nuestros principales</span> <br /> */}
          <span className='text-meditiva text-4xl xl:text-8xl font-bold'>
            Socios comerciales
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
          alt=''
          className='text-black w-12/12 aspect-3/2 object-contain mix-blend-color-burn'
        />
      </div>
    </div>
  )
}
