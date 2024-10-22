// import { Store } from 'react-notifications-component'
import { loginService, updatePermissions } from "../service/authService"
import { useLocalStorage } from "./useLocalStorage"
import { useSessionStorage } from "./useSessionStorage"
import {
	clearErrorMessage,
	onCheckingCredentials,
	onLogin,
	onLogout,
} from "../store/slice/authSlice"
import { notifications } from "@mantine/notifications"

import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"

export const useAuthStore = () => {
	const dispatch = useDispatch()

	const [localStorage, setLocalStorage] = useLocalStorage({
		key: "localStorage",
		defaultValue: "",
	})

	const [sessionStorage, setSessionStorage] = useSessionStorage({
		key: "sessionStorage",
		defaultValue: "",
	})

	const {
		id,
		username,
		name,
		correo,
		telefono,
		permisos,
		keepSessionOpen,
		token,
		isAuthenticated,
		errorMessage,
	} = useSelector((state) => state.auth)

	const startLogin = async (body) => {
		dispatch(onCheckingCredentials())

		try {
			const result = await loginService(body)

			if (!result.ok) {
				dispatch(onLogout({}))
				notifications.show({
					title: "Error!",
					message: "Hubo un error al intentarse autenticar",
					color: "red",
				})
				return
			}

			let data = await result.json()
			data = data.data

			const session = {
				id: data.id,
				username: data.username,
				name: data.name,
				correo: data.correo,
				telefono: data.telefono,
				keepSessionOpen: data.keepSessionOpen,
				token: data.token,
				permisos: data.permisos,
			}

			dispatch(onLogin(session))

			data.keepSessionOpen
				? setLocalStorage(session)
				: setSessionStorage(session)

			notifications.show({
				title: "Correcto!",
				message: "Bienvenid@ a la plataforma",
			})
		} catch (error) {
			dispatch(onLogout("Hubo un error al intentarse autenticar"))
			notifications.show({
				title: "Error!",
				message: "Hubo un error al intentarse autenticar, intente de nuevo",
				color: "red",
			})
			setTimeout(() => {
				dispatch(clearErrorMessage())
			}, 10)
		}
	}

	const startLogout = async () => {
		try {
			setSessionStorage("")
			setLocalStorage("")
			dispatch(onLogout({}))
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		const func = async (session) => {
			const result = await updatePermissions(session.token)
			const newGrants = await result.json()

			if (newGrants.status != 200) {
				startLogout()
				return
			}

			dispatch(
				onLogin({
					...session,
					permisos: newGrants.data,
				})
			)
		}

		try {
			if (!localStorage && !sessionStorage) {
				dispatch(onLogout({}))
				return
			}
			if (isAuthenticated === "Not Authenticated") return
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
		id,
		username,
		name,
		correo,
		telefono,
		token,
		keepSessionOpen,
		permisos,
		isAuthenticated,
		errorMessage,
		startLogin,
		startLogout,
	}
}
