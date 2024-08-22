import {
  Menu,
  Banner,
  About,
  Services,
  Numbers,
  Maps,
  Footer
} from '@/components'

export const Landing = () => {
  return (
    <>
      <Menu />
      <Banner />
      <div className='py-10'>
        <About />
      </div>
      <div className='bg-slate-100 py-5'>
        <Services />
      </div>
      <div className='py-10'>
        <Numbers />
      </div>
      <div className='py-10'>
        <Maps />
      </div>
      <Footer />
    </>
  )
}
