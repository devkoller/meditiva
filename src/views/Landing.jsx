import {
  Contact,
  Menu,
  Banner,
  About,
  Clients,
  Services,
  Numbers,
  Sponsors,
  Maps,
  Footer
} from '@/components'
import shape1 from '@/assets/imgs/shapes/3.svg'
import shape2 from '@/assets/imgs/shapes/3.svg'

import { ReactSVG } from 'react-svg'

export const Landing = () => {
  return (
    <>
      <Contact />
      <Menu />
      <Banner />
      <div className='pt-10 pb-20 lg:pb-40 relative bg-red overflow-hidden'>
        <About />
        <Clients />
        <ReactSVG
          src={shape1}
          className='absolute bottom-0 left-0 w-full h-auto z-0 overflow-hidden'
          beforeInjection={svg => {
            svg.classList.add('bg-transparent')
            svg.classList.add('text-slate-100')
            svg.classList.add('fill-current')
          }}
        />
      </div>
      <div className='bg-slate-100 py-5 overflow-hidden'>
        <Services />
      </div>
      <div className='py-10 relative'>
        <Numbers />
        <ReactSVG
          src={shape1}
          className='absolute top-0 left-0 w-full h-auto z-0 rotate-180 overflow-hidden'
          beforeInjection={svg => {
            svg.classList.add('bg-transparent')
            svg.classList.add('text-slate-100')
            svg.classList.add('fill-current')
          }}
        />
      </div>
      <Sponsors />
      <div className='py-10'>
        <Maps />
      </div>
      <Footer />
    </>
  )
}
