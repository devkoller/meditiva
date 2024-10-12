import { FaTimes } from 'react-icons/fa'
import { Portal } from './Portal'

export const RightPanel = ({
  children,
  closePanel,
  title,
  titleCss,
  containerCss
}) => {
  return (
    <Portal idPortal='rightPannel'>
      <div className='right-panel'>
        <div className='overlay' onClick={closePanel} />
        <div className={`panel ${containerCss}`}>
          <div className='d-flex justify-content-between gap-3 mb-3'>
            <h2 className={titleCss}>{title}</h2>
            <button onClick={closePanel} className='btn-table red'>
              <FaTimes />
            </button>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  )
}
