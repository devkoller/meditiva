import { useLocation } from "react-router-dom"
import { AuthWrapper, Tabs } from "@/components"
import { Inventario } from "./Inventario"
import { Reportes } from "./Reportes"
import { Movimientos } from "./Movimientos"

const tabs = [
	{
		label: "Reportes",
		to: "/consulta/reportes",
		component: Reportes,
	},
	{
		label: "Inventario",
		to: "/consulta/inventario",
		component: Inventario,
	},
	{
		label: "Movimientos",
		to: "/consulta/movimientos",
		component: Movimientos,
	},
]

export const Consulta = () => {
	const location = useLocation()

	let Component =
		tabs.find((tab) => tab.to === location.pathname)?.component || null

	return (
		<AuthWrapper>
			<Tabs items={tabs} />

			{Component && <Component />}
		</AuthWrapper>
	)
}
