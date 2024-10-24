import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { MdEdit } from "react-icons/md"
import { FaBarcode } from "react-icons/fa"

import {
	AuthWrapper,
	Toolbar,
	MantineDataTable,
	Button,
	RightPanel,
	BarCode,
	Title,
} from "@/components"
import { useFetch } from "@/hooks"

export const Articulos = () => {
	const [articulos, setArticulos] = useState([])
	const [articleSelected, setArticleSelected] = useState({})
	const [showPanel, setShowPanel] = useState(false)

	const { response: articulosData } = useFetch({
		url: "/api/catalogue/article",
	})

	const handleShowPanel = () => {
		setShowPanel(!showPanel)
	}

	const columns = [
		{ accessor: "id", title: "ID", hidden: true },
		{ accessor: "nombre", title: "Articulo", filter: "text" },
		{ accessor: "descrip", title: "Description", filter: "text" },
		{ accessor: "tipoText", title: "Tipo", filter: "select" },
		{
			accessor: "actions",
			title: "Acciones",
			render: (row) => (
				<div className="flex justify-center gap-3">
					<Link
						to={`/articulos/modificar-articulo/${row.id}`}
						className="text-cyan-500 duration-500 hover:text-cyan-800 text-xl"
					>
						<MdEdit />
					</Link>

					<button
						onClick={() => {
							handleShowPanel()
							setArticleSelected(row)
						}}
					>
						<FaBarcode />
					</button>
				</div>
			),
		},
	]

	useEffect(() => {
		if (articulosData) {
			const arti = articulosData.data.map((articulo) => {
				return {
					...articulo,
					tipoText: articulo.tipo === 1 ? "Producto" : "Servicio",
				}
			})
			setArticulos(arti)
		}
	}, [articulosData])

	const print = () => {
		if (!articleSelected.articulos) {
			return <h1>No hay códigos de barra</h1>
		}

		return articleSelected.articulos.map((barcode, index) => {
			return (
				<div
					key={index}
					className="flex justify-center mb-3 border-b border-gray-500"
				>
					<BarCode value={barcode.codigoBarras} />
				</div>
			)
		})
	}
	return (
		<AuthWrapper>
			<Toolbar>
				{/* <div className="flex gap-3"> */}
				<Button color="indigo" link to="/articulos/crear-articulo">
					Agregar articulo
				</Button>
				<Button color="green">Exportar a excel</Button>
				{/* </div> */}
			</Toolbar>
			<MantineDataTable
				columns={columns}
				data={articulos}
				KeyTable="articulos"
			/>

			{showPanel && (
				<RightPanel title="Códigos de barra" closePanel={handleShowPanel}>
					<Title>{articleSelected.nombre}</Title>
					{print()}
				</RightPanel>
			)}
		</AuthWrapper>
	)
}
