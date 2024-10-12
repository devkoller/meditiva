// import { Store } from 'react-notifications-component'
import { loginService, updatePermissions } from '../service/authService'
import { useLocalStorage } from './useLocalStorage'
import { useSessionStorage } from './useSessionStorage'
import {
  clearErrorMessage,
  onCheckingCredentials,
  onLogin,
  onLogout
} from '../store/slice/authSlice'

import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

export const useAuthStore = () => {
  const dispatch = useDispatch()

  const [localStorage, setLocalStorage] = useLocalStorage({
    key: 'localStorage',
    defaultValue: ''
  })

  const [sessionStorage, setSessionStorage] = useSessionStorage({
    key: 'sessionStorage',
    defaultValue: ''
  })

  const {
    userCode,
    email,
    name,
    permisos,
    keepSessionOpen,
    token,
    isAuthenticated,
    errorMessage
  } = useSelector(state => state.auth)

  const startLogin = async body => {
    dispatch(onCheckingCredentials())

    // const body = {
    //   email,
    //   password,
    //   keepSessionOpen
    // }

    try {
      const result = await loginService(body)

      if (!result.ok) {
        dispatch(onLogout({}))
        // Store.addNotification({
        //   title: 'Error!',
        //   message: 'Usuario o contraseña incorrectos',
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
        return
      }

      let data = await result.json()
      data = data.data

      const session = {
        userCode: data.userCode,
        email: data.email,
        name: data.name,
        keepSessionOpen: data.keepSessionOpen,
        token: data.token,
        permisos: data.permisos
      }

      dispatch(onLogin(session))

      data.keepSessionOpen
        ? setLocalStorage(session)
        : setSessionStorage(session)

      // Store.addNotification({
      //   title: 'Bienvenido',
      //   type: 'success',
      //   insert: 'top',
      //   container: 'top-right',
      //   animationIn: ['animate__animated', 'animate__fadeIn'],
      //   animationOut: ['animate__animated', 'animate__fadeOut'],
      //   dismiss: {
      //     duration: 3000,
      //     onScreen: true
      //   }
      // })
    } catch (error) {
      dispatch(onLogout('Hubo un error al intentarse autenticar'))
      // Store.addNotification({
      //   title: 'Error!',
      //   message:
      //     'Hubo un durante el proceso de autenticación, intente de nuevo más tarde',
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
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  const startLogout = async () => {
    try {
      setSessionStorage('')
      setLocalStorage('')
      dispatch(onLogout({}))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const func = async datas => {
      // console.log(datas)

      // const result = await updatePermissions(datas.token)
      // const data = await result.json()

      dispatch(
        onLogin({
          ...datas
          // permisos: data.data.permisos
        })
      )
    }

    try {
      if (!localStorage && !sessionStorage) {
        dispatch(onLogout({}))
        return
      }
      if (isAuthenticated === 'Not Authenticated') return
      if (localStorage) {
        func(localStorage)
      }
      if (sessionStorage) {
        func(sessionStorage)
      }
    } catch (error) {
      dispatch(onLogout({}))
    }
  }, [])

  return {
    userCode,
    email,
    name,
    token,
    keepSessionOpen,
    permisos,
    isAuthenticated,
    errorMessage,
    startLogin,
    startLogout
  }
}
