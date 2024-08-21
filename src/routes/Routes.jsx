import { Route, Routes } from 'react-router-dom'
import { Landing, Building } from '@/views'

export const RoutesApp = () => {
  return (
    <Routes>
      <Route path='/' element={<Building />} />
    </Routes>
  )
}
