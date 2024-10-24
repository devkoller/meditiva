import { useState, useEffect } from "react"
import { AuthWrapper, Toolbar, MantineDataTable, Button } from "@/components"
import { Link } from "react-router-dom"
import { MdEdit } from "react-icons/md"
import { useFetch } from "@/hooks"

export const Almacenes = () => {
	const [almacenes, setAlmacenes] = useState([])

	const { response: almacenesData } = useFetch({
		url: "/api/catalogue/warehouse",
	})

	const columns = [
		{ accessor: "id", title: "ID", hidden: true },
		{ accessor: "nombre", title: "Nombre", filter: "text" },
		{ accessor: "descrip", title: "Description", filter: "text" },
		{ accessor: "tipoText", title: "Tipo", filter: "select" },
		{
			accessor: "actions",
			title: "Acciones",
			render: (row) => (
				<div className="flex justify-center">
					<Link
						to={`/almacenes/modificar-almacen/${row.id}`}
						className="text-cyan-500 duration-500 hover:text-cyan-800 text-xl"
					>
						<MdEdit />
					</Link>
				</div>
			),
		},
	]

	useEffect(() => {
		if (almacenesData) {
			const alma = almacenesData.data.map((almacen) => ({
				...almacen,
				tipoText: almacen.tipo === 1 ? "Almacén" : "Subalmacen",
			}))
			setAlmacenes(alma)
		}
	}, [almacenesData])

	return (
		<AuthWrapper>
			<Toolbar title="Almacenes">
				<Button color="cyan" link to="/almacenes/crear-almacen">
					Crear Almacén
				</Button>
			</Toolbar>
			<MantineDataTable
				columns={columns}
				data={almacenes}
				KeyTable="almacenes"
			/>
		</AuthWrapper>
	)
}
