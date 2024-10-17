import { useState, useEffect } from "react"
import { AuthWrapper, CardButton, Toolbar, Tabs } from "@/components"
import { useNavigate } from "react-router-dom"
import { useFetch } from "@/hooks"

export const Produccion = () => {
	const navigate = useNavigate()

	const tabs = [
		{
			label: "Inventario",
			to: "/produccion",
		},
		{
			label: "Movimientos",
			to: "/produccion/movimientos",
		},
		{
			label: "Códigos barra",
			to: "/produccion/captura-codigos-barra",
		},
		{
			label: "Captura lotes",
			to: "/produccion/captura-lotes",
		},
	]

	const { response: data } = useFetch({
		url: "/api/inventory/movement",
	})

	useEffect(() => {
		if (data) {
			// console.log("🚀 > file: Produccion.jsx:33 > Produccion > data:", data)
		}
	}, [data])

	return (
		<AuthWrapper>
			<Tabs items={tabs} />
		</AuthWrapper>
	)
}
