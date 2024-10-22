import fetchApi from "../api/fetchApi"
import { useEffect, useState } from "react"
import { useAuthStore } from "./useAuthStore"
import { notifications } from "@mantine/notifications"

const useFetch = ({ url, qs }) => {
	const [response, setResponse] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const { token } = useAuthStore()

	useEffect(() => {
		const abortController = new AbortController()
		const signal = abortController.signal

		const fetchData = async () => {
			setLoading(true)
			try {
				const res = await fetchApi.get({ url, qs, signal, token })

				if (!res.ok) {
					// TODO: MANEJADOR DE ERRORES
					const error = new Error("Error fetching data")
					error.status = res.status || 500
					error.statusText = res.statusText || "Internal Server Error"
					notifications.show({
						title: "Error!",
						message:
							"El recurso solicitado no se encuentra disponible o no tiene permisos",
						color: "red",
					})
					throw error
				}

				const json = await res.json()

				if (!signal.aborted) {
					setResponse(json)
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
		}
		fetchData()

		return () => abortController.abort()
	}, [url, JSON.stringify(qs)])

	return {
		response,
		loading,
		error,
	}
}

export default useFetch
