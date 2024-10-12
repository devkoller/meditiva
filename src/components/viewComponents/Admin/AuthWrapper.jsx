import React from 'react'
import { Header } from './header/Header'
import { SideMenu } from './sideMenu/SideMenu'
export const AuthWrapper = ({ children }) => {
  return (
    <div className='w-full h-screen overflow-hidden'>
      <Header />
      <div className='flex h-full'>
        <SideMenu />
        <div className='p-3 bg-slate-50 w-full'>{children}</div>
      </div>
    </div>
  )
}
