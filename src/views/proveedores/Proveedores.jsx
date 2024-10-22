import { useState, useEffect } from "react"
import { AuthWrapper, Toolbar, MantineDataTable, Button } from "@/components"
import { Link } from "react-router-dom"
import { MdEdit } from "react-icons/md"
import { useFetch } from "@/hooks"
import { IoMedical } from "react-icons/io5"

export const Proveedores = () => {
	const [proveedores, setProveedores] = useState([])

	const { response: proveedoresData } = useFetch({
		url: "/api/catalogue/provider",
	})

	const columns = [
		{ accessor: "id", title: "ID", hidden: true },
		{ accessor: "nombre", title: "Proveedor", filter: "text" },
		{ accessor: "rfc", title: "RFC", filter: "text" },
		{ accessor: "telefono", title: "Teléfono", filter: "text" },
		{
			accessor: "actions",
			title: "Acciones",
			render: (row) => (
				<div className="flex gap-3 justify-center">
					<Link
						to={`/proveedores/modificar-proveedor/${row.id}`}
						className="text-cyan-500 duration-500 hover:text-cyan-800 text-xl"
					>
						<MdEdit />
					</Link>
					<Link
						to={`/proveedores/agrega-articulos-proveedor/${row.id}`}
						className="text-cyan-500 duration-500 hover:text-cyan-800 text-xl"
					>
						<IoMedical />
					</Link>
				</div>
			),
		},
	]

	useEffect(() => {
		if (proveedoresData) {
			setProveedores(proveedoresData.data)
		}
	}, [proveedoresData])

	return (
		<AuthWrapper>
			<Toolbar>
				<div className="flex gap-3">
					<Button color="cyan" link to="/proveedores/crear-proveedor">
						Agregar proveedor
					</Button>
				</div>
			</Toolbar>
			<MantineDataTable
				columns={columns}
				data={proveedores}
				KeyTable="proveedores"
			/>
		</AuthWrapper>
	)
}
