import { useLocation } from "react-router-dom"
import { AuthWrapper, Tabs } from "@/components"
import { CapturaCBarra } from "./CapturaCBarra"
import { CapturaLotes } from "./CapturaLotes"
import { CapturaMovimientos } from "./CapturaMovimientos"
import { RealizaVenta } from "./RealizaVenta"

const tabs = [
	{
		label: "Movimientos",
		to: "/produccion/movimientos",
		component: CapturaMovimientos,
	},
	{
		label: "Códigos barra",
		to: "/produccion/captura-codigos-barra",
		component: CapturaCBarra,
	},
	{
		label: "Captura lotes",
		to: "/produccion/captura-lotes",
		component: CapturaLotes,
	},
]

export const Produccion = () => {
	const location = useLocation()

	let Component =
		tabs.find((tab) => tab.to === location.pathname)?.component || null

	return (
		<AuthWrapper>
			<Tabs items={tabs} />

			<div className="w-full">{Component && <Component />}</div>
		</AuthWrapper>
	)
}
