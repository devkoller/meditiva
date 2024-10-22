import { FaTimes } from 'react-icons/fa'
import { Portal } from './Portal'
import { Title } from './Title'

export const RightPanel = ({ children, closePanel, title }) => {
  return (
    <Portal idPortal='rightPannel'>
      <div className='fixed z-50 top-0 left-0 w-full h-full flex justify-end items-center overflow-hidden'>
        <div
          className='fixed top-0 left-0 w-full h-full bg-gray-800/75'
          onClick={closePanel}
        />
        <div className={`bg-white relative h-full w-4/12 `}>
          <div className='flex justify-between p-3 '>
            <Title>{title}</Title>
            <button onClick={closePanel} className='text-red-500 text-2xl'>
              <FaTimes />
            </button>
          </div>
          <div className='p-3'>{children}</div>
        </div>
      </div>
    </Portal>
  )
}
