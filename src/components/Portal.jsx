import ReactDOM from 'react-dom'

export const Portal = ({ children, idPortal }) => {
  const modalRoot = document.getElementById(idPortal)

  return ReactDOM.createPortal(<>{children}</>, modalRoot)
}
