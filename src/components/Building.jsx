import build from '../assets/construccion_CIAM24.png'

export const Building = () => {
  return (
    <div className='my-5 d-flex flex-column gap-3 align-items-center'>
      <img src={build} alt='En construcción' />
      <h1>En construcción</h1>
    </div>
  )
}
