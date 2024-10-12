import { BrowserRouter } from 'react-router-dom'
import { RoutesApp } from '@/routes/Routes'

import { Provider } from 'react-redux'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import { store } from './store/store'

function App () {
  return (
    <>
      <MantineProvider>
        <Provider store={store}>
          <Notifications />
          <BrowserRouter>
            <RoutesApp />
          </BrowserRouter>
        </Provider>
      </MantineProvider>
    </>
  )
}

export default App
