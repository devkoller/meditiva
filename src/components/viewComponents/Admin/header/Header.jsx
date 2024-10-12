import icono from '@/assets/imgs/icono.svg'
import { HiDotsVertical } from 'react-icons/hi'
import { useComponentVisible } from '@/hooks'
import { FloatMenu } from './FloatMenu'
import { Link, useLocation } from 'react-router-dom'

export const Header = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false)

  const location = useLocation()

  const printBreadCrumbs = () => {
    let breadCrumbs = location.pathname.split('/')
    breadCrumbs = breadCrumbs.filter(item => item !== '')
    breadCrumbs = breadCrumbs.map(item => {
      let label = item.charAt(0).toUpperCase() + item.slice(1)

      return label.replaceAll('-', ' ')
    })
    breadCrumbs = breadCrumbs.join(' > ')
    return breadCrumbs
  }

  return (
    <div className='w-full p-3 bg-meditiva flex justify-between items-center'>
      <div className='flex gap-3 items-center text-white'>
        <div className='flex gap-3'>
          <Link className='flex gap-3 items-center w-fit' to='/'>
            <img src={icono} alt='logo' className='w-[2rem]' />
            <span className='text-xl lg:text-2xl text-white'>
              Meditiva Medical
            </span>
          </Link>
        </div>
        <span>|</span>
        <div className='text-white'>
          <span className='text-sm'>{printBreadCrumbs()}</span>
        </div>
      </div>
      <div className='text-white'>
        <button onClick={setIsComponentVisible}>
          <HiDotsVertical className='text-xl' />
        </button>
      </div>
      {isComponentVisible && <FloatMenu refs={ref} />}
    </div>
  )
}
