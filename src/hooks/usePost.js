import { useState } from 'react'
import { useAuthStore } from './useAuthStore'
import { notifications } from '@mantine/notifications'

import fetchApi from '../api/fetchApi'

const usePost = () => {
  const { token, startLogout } = useAuthStore()

  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = async ({
    url = '',
    body,
    method = 'post',
    hasFiles = false,
    qs = {}
  }) => {
    const abortController = new AbortController()
    const signal = abortController.signal
    let res, data, errors
    setLoading(true)

    try {
      res = await fetchApi[method]({
        url,
        body,
        headers: {},
        hasFiles,
        token,
        qs
      })
      data = await res.json()

      if (!res.ok && res.status !== 409) {
        errors = new Error('Error fetching data')
        errors.message = res.statusText || 'Internal Server Error'

        // notifications.show({
        //   title: 'Ha ocurrido un error inesperado',
        //   message: 'Error al realizar la petición',
        //   color: 'white',
        //   icon: '❌'
        // })
        // Store.addNotification({
        //   title: 'Ha ocurrido un error inesperado',
        //   message: data.message,
        //   type: 'danger',
        //   insert: 'top',
        //   container: 'top-right',
        //   animationIn: ['animate__animated', 'animate__fadeIn'],
        //   animationOut: ['animate__animated', 'animate__fadeOut'],
        //   dismiss: {
        //     duration: 3000,
        //     onScreen: true
        //   }
        // })

        if (data.hasOwnProperty('auth') && !data.auth) {
          startLogout()
        }

        throw errors
      }

      if (!signal.aborted) {
        setResponse(data)
        setError(null)
      }
    } catch (error) {
      if (!signal.aborted) {
        setResponse(null)
        setError(error)
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false)
      }
    }
    return {
      ...data,
      res,
      errors
    }
  }

  return {
    execute,
    response,
    loading,
    error
  }
}

export default usePost
