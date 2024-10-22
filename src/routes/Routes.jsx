import { Route, Routes, Navigate } from "react-router-dom"

import { completeRoutes } from "@/utils/routes"
import { useAuthStore } from "@/hooks"
import { Building, ErrorGrants } from "@/views"

export const RoutesApp = () => {
	const { isAuthenticated, permisos } = useAuthStore()

	const printRoutes = () => {
		return completeRoutes.map((route, index) => {
			if (route.auth === "Not Authenticated") {
				if (isAuthenticated === "Authenticated") {
					return (
						<Route
							key={index}
							path={route.route}
							element={<Navigate to="/main" />}
						/>
					)
				} else {
					return (
						<Route
							key={index}
							path={route.route}
							element={<route.component />}
						/>
					)
				}
			} else if (route.auth === "Authenticated") {
				if (isAuthenticated === "Not Authenticated") {
					return (
						<Route
							key={index}
							path={route.route}
							element={<Navigate to="/login" />}
						/>
					)
				} else {
					if (
						route.grant &&
						permisos.Statement[0].Action.includes(route.grant)
					) {
						return (
							<Route
								key={index}
								path={route.route}
								element={<route.component />}
							/>
						)
					}
					if (!route.grant) {
						return (
							<Route
								key={index}
								path={route.route}
								element={<route.component />}
							/>
						)
					} else {
						return (
							<Route
								key={index}
								path={route.route}
								element={<Navigate to="/error" />}
							/>
						)
					}
				}
			} else {
				return (
					<Route key={index} path={route.route} element={<route.component />} />
				)
			}
		})
	}

	if (isAuthenticated === "Checking") {
		return <Building />
	}

	return (
		<Routes>
			{printRoutes()}
			<Route path="/error" element={<ErrorGrants />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	)
}
