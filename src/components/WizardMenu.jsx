import { Link } from 'react-router-dom'
import { IoTicketOutline, IoSearch } from 'react-icons/io5'
import { MdAttachMoney } from 'react-icons/md'

export const WizardMenu = ({ Active }) => {
  return (
    <div>
      <ul className='d-flex gap-4 my-3'>
        <li className='nav-item'>
          <Link
            aria-current='page'
            to='/inscripcion'
            className={`wizard ${Active === 1 ? 'active' : ''}`}
          >
            <IoSearch
              style={{
                fontSize: '30px'
              }}
            />
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/carrito'
            className={`wizard ${Active === 2 ? 'active' : ''}`}
          >
            <IoTicketOutline
              style={{
                fontSize: '30px'
              }}
            />
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/pago' className={`wizard ${Active === 3 ? 'active' : ''}`}>
            <MdAttachMoney
              style={{
                fontSize: '30px'
              }}
            />
          </Link>
        </li>
      </ul>
    </div>
  )
}
