import { useCallback } from 'react'
import { Container } from 'reactstrap'
import Particles from 'react-particles'
import { loadSlim } from 'tsparticles-slim'
import { particlesOptions } from '../utilities/particles'

export const Banners = ({ bannerBg, heading }) => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine, {
      fullScreen: {
        enable: false
      }
    })
  }, [])

  const particlesLoaded = useCallback(async container => {}, [])

  return (
    <section className={`hero-banner ${bannerBg ? '' : 'bg-empty'}`}>
      {!bannerBg && (
        <Particles
          id='particles-js'
          init={particlesInit}
          loaded={particlesLoaded}
          options={particlesOptions}
          fullScreen={false}
          canvasClassName='particles-js-canvas-el'
          // style={{
          //   position: 'absolute',
          //   width: '100%',
          //   height: '100%',
          //   zIndex: 1
          // }}
        />
      )}
      {bannerBg && <img src={bannerBg} alt='' />}
      {heading && (
        <Container>
          <div className='page-heading text-white py-5'>
            <h1>{heading}</h1>
          </div>
        </Container>
      )}
    </section>
  )
}
