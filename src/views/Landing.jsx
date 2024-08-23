import {
  Contact,
  Menu,
  Banner,
  About,
  Clients,
  Services,
  Numbers,
  Maps,
  Footer
} from '@/components'

export const Landing = () => {
  return (
    <>
      <Contact />
      <Menu />
      <Banner />
      <div className='py-10'>
        <About />
        <Clients />
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
