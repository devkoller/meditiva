import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { notifications } from "@mantine/notifications"
import { useParams, useNavigate } from "react-router-dom"
import { IoMdArrowRoundBack } from "react-icons/io"
import { CiTrash } from "react-icons/ci"

import { useFetch, usePost } from "@/hooks"
import {
	AuthWrapper,
	Forms,
	FormInput,
	MantineDataTable,
	Button,
	Toolbar,
} from "@/components"

export const ProvArticulos = () => {
	const { id } = useParams()
	const { execute, loading } = usePost()
	const [barcode, setBarcode] = useState("")
	const [lists, setLists] = useState({
		articulos: [],
		lotes: [],
		lotesView: [],
	})
	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors },
	} = useForm({})

	const { response: articulos } = useFetch({
		url: "/api/catalogue/article",
	})

	const onSubmit = (data) => {
		console.log(data)
	}

	const onError = (errors) => {
		notifications.show({
			title: "Error!",
			message: "Complete los campos obligatorios",
			color: "red",
		})
	}

	const getArticles = async () => {
		execute({
			url: "/api/catalogue/barcodeArticle/" + barcode,
			method: "get",
		}).then((res) => {
			if (res.status === 200) {
				setValue("articuloId", res.data.articuloId)
			}
		})
	}

	const columns = [
		{ accessor: "id", title: "ID", hidden: true },
		{ accessor: "nombre", title: "Articulo", filter: "text" },
		{
			accessor: "actions",
			title: "Acciones",
			render: (row) => (
				<div className="flex gap-3 justify-center">
					<button className="text-cyan-500 duration-500 hover:text-cyan-800 text-xl">
						<CiTrash />
					</button>
				</div>
			),
		},
	]

	useEffect(() => {
		if (articulos) {
			const articulosList = articulos.data.map((articulo) => {
				return {
					value: articulo.id,
					label: articulo.nombre,
				}
			})
			setLists((lists) => ({ ...lists, articulos: articulosList }))
		}
	}, [articulos])

	useEffect(() => {
		const delayDebounceFn = setTimeout(async () => {
			if (barcode) {
				getArticles()
			}
		}, 1000)

		return () => clearTimeout(delayDebounceFn)
	}, [barcode])

	if (!id) {
	}

	return (
		<AuthWrapper>
			<Toolbar>
				<div className="flex gap-3">
					<Button color="cyan" link to="/proveedores" square>
						<IoMdArrowRoundBack />
					</Button>
				</div>
			</Toolbar>

			<Forms
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				onError={onError}
				register={register}
				control={control}
			>
				<div className="flex gap-3">
					<FormInput
						label="Código de barras"
						name="codigoBarras"
						onChange={(e) => {
							setBarcode(e.target.value)
						}}
					/>
					<FormInput
						label="Articulo"
						type="select"
						options={lists.articulos}
						name="articuloId"
						required
					/>
				</div>

				<div className="flex justify-end mt-3">
					<Button type="submit" disabled={loading}>
						Agregar
					</Button>
				</div>
			</Forms>

			<MantineDataTable columns={columns} keyTable="provArt" />
		</AuthWrapper>
	)
}
