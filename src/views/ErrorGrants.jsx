import { AuthWrapper, Button } from "@/components"
import { CiLock } from "react-icons/ci"
import { Link } from "react-router-dom"

export const ErrorGrants = () => {
	return (
		<AuthWrapper>
			<div className="flex flex-col gap-3 mt-10 items-center justify-center">
				<div>
					<CiLock className="text-9xl text-red-500" />
				</div>
				<h1 className="text-xl font-bold">
					No tienes permisos para acceder a esta sección
				</h1>
				<Link to="/main">
					<Button>Ir al inicio</Button>
				</Link>
			</div>
		</AuthWrapper>
	)
}
