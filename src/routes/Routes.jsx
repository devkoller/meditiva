import { Route, Routes } from 'react-router-dom'

import { completeRoutes } from '@/utils/routes'

export const RoutesApp = () => {
  const printRoutes = () => {
    return completeRoutes.map((route, index) => {
      return (
        <Route key={index} path={route.route} element={<route.component />} />
      )
    })
  }
  return <Routes>{printRoutes()}</Routes>
}
