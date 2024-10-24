import { useState, useEffect } from "react"

import { completeRoutes } from "@/utils/routes"
import { NavLink } from "react-router-dom"
import { useAuthStore } from "@/hooks"

export const SideMenu = () => {
	const { permisos } = useAuthStore()

	const printMenu = (type) => {
		return completeRoutes.map((route, index) => {
			if (route.type != type) return
			if (route.grant && !permisos.Statement[0].Action.includes(route.grant)) {
				return
			}
			return (
				<li
					key={index}
					className="text-xl duration-500 text-gray-400 hover:text-sky-800 hover:bg-gray-100 rounded-lg mb-1"
				>
					<NavLink
						to={route.route}
						className="flex items-center gap-2 py-2 pl-3 pr-10 [&.active]:text-sky-500 [&.active]:bg-gray-100 rounded-lg"
					>
						<route.icon />
						<span>{route.title}</span>
					</NavLink>
				</li>
			)
		})
	}

	return (
		<aside className="px-3 bg-white min-h-screen pt-5 hidden w-2/12 xl:block">
			<h3 className="text-md text-gray-300 border-b mb-3 border-slate-300">
				Productivo
			</h3>
			<ul>{printMenu("Productivo")}</ul>
			<h3 className="text-md text-gray-300 border-b mb-3 border-slate-300">
				Catálogos
			</h3>
			<ul>{printMenu("Catálogos")}</ul>
			<h3 className="text-md text-gray-300 border-b mb-3 border-slate-300">
				Administración
			</h3>
			<ul>{printMenu("Administración")}</ul>
		</aside>
	)
}
