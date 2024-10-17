import { Portal } from './Portal'
import { FaTimes } from 'react-icons/fa'

export const Modal = ({ children, title, closeModal, fullscreen }) => {
  return (
    <Portal idPortal='modal'>
      <div
        className={`
          fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center overflow-hidden
        `}
      >
        <div
          className='fixed top-0 left-0 w-full h-full bg-gray-500/75'
          onClick={closeModal}
        />
        <div className='bg-white relative w-10/12 rounded-lg'>
          <div>
            <div className='flex justify-between p-3 border-b bg-gray-400'>
              <h2>{title}</h2>
              <button onClick={closeModal} className='btn-table red'>
                <FaTimes />
              </button>
            </div>
          </div>
          <div className='p-3'>{children}</div>
        </div>
      </div>
    </Portal>
  )
}
