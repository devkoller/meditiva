import { useState } from 'react'
import { Menu } from './Header/Menu'
import Footer from './Footer/Footer'
import { RightPanel } from './RightPanel'
import { MenuApp } from './Header/MenuApp'

export const SubSection = ({ children, isPlaying }) => {
  const [ShowRightPanel, setShowRightPanel] = useState(false)

  const handleShowRightPanel = () => {
    setShowRightPanel(!ShowRightPanel)
  }

  return (
    <>
      <Menu isPlaying={isPlaying} handleShowRightPanel={handleShowRightPanel} />
      {children}
      <Footer />
      {ShowRightPanel && (
        <RightPanel
          show={ShowRightPanel}
          closePanel={handleShowRightPanel}
          title='Menu'
          containerCss='menu-container'
        >
          <MenuApp />
        </RightPanel>
      )}
    </>
  )
}
