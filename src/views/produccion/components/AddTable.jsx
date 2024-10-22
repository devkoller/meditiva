import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Forms, FormInput, Button, MantineDataTable } from "@/components"
import { useFetch, usePost } from "@/hooks"
import { notifications } from "@mantine/notifications"
import { CiTrash } from "react-icons/ci"
import { IoGitMerge } from "react-icons/io5"

export const AddTable = ({ listArticles, SetListTable }) => {
	const [item, setItem] = useState()
	const [barcode, setBarcode] = useState("")
	const { execute, loading } = usePost()
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
		setValue,
		formState: { errors },
	} = useForm({})

	const { response: articulos } = useFetch({
		url: "/api/catalogue/article",
	})

	const { response: lotes } = useFetch({
		url: "/api/catalogue/batch",
	})

	const columns = [
		{ accessor: "articulo", title: "Articulo" },
		{ accessor: "codigoBarras", title: "Código de barras", filter: "text" },
		{ accessor: "lote", title: "Lote", filter: "text" },
		{ accessor: "cantidad", title: "Cantidad", filter: "text" },
		{ accessor: "precioSImp", title: "Precio sin imp.", filter: "text" },
		{ accessor: "precioCimp", title: "Precio con imp.", filter: "text" },
		{ accessor: "precioTotal", title: "Precio Total", filter: "text" },
		{
			accessor: "actions",
			title: "Acciones",
			render: (row) => (
				<div className="flex gap-3 justify-center">
					<button
						className="text-red-500 duration-500 hover:text-red-800 text-xl"
						onClick={() => {
							deleteRow(row.id)
						}}
					>
						<CiTrash />
					</button>
				</div>
			),
		},
	]

	//funtion to delete a row
	const deleteRow = (id) => {
		SetListTable((list) => list.filter((item) => item.id !== id))
	}

	const onSubmit = (data) => {
		if (typeof parseInt(data.cantidad) !== "number") {
			notifications.show({
				title: "Error!",
				message: "La cantidad debe ser un número",
				color: "red",
			})
			return
		}

		if (typeof parseInt(data.precio) !== "number") {
			notifications.show({
				title: "Error!",
				message: "El precio debe ser un número",
				color: "red",
			})
			return
		}

		if (!item.id) {
			notifications.show({
				title: "Error!",
				message: "No se ha encontrado el código de barras valido",
				color: "red",
			})
			return
		}

		const arti = lists.articulos.find(
			(articulo) => articulo.value === data.articuloId
		)

		const lote = lists.lotes.find((lote) => lote.value === data.lote) || null

		SetListTable((list) => ({
			id: list.id + 1,
			articulos: [
				...list.articulos,
				{
					...data,
					id: list.id + 1,
					articulo: arti.label,
					codigoBarrasId: item.id || "",
					codigoBarras: data.codigoBarras,
					lote: lote ? lote.label : "",
					cantidad: data.cantidad,
					precioSImp: data.precioSImp,
					precioCimp: data.precioCimp,
					precioTotal: data.cantidad * data.precioCimp,
				},
			],
		}))

		reset()
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
				setItem(res.data)

				const lotesV = lists.lotes.filter(
					(articulo) => articulo.articuloId === res.data.articuloId
				)

				setLists((lists) => ({ ...lists, lotesView: [...lotesV] }))
			}
		})
	}

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
		if (lotes) {
			const lotesList = lotes.data.map((lote) => {
				return {
					...lote,
					value: lote.id,
					label: lote.lote,
				}
			})
			setLists((lists) => ({ ...lists, lotes: lotesList }))
		}
	}, [lotes])

	useEffect(() => {
		const delayDebounceFn = setTimeout(async () => {
			if (barcode) {
				getArticles()
			}
		}, 1000)

		return () => clearTimeout(delayDebounceFn)
	}, [barcode])

	return (
		<div>
			<Forms
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				register={register}
				onError={onError}
				control={control}
			>
				<div className="flex gap-3">
					<FormInput
						label="Código de barras"
						name="codigoBarras"
						onChange={(e) => {
							setBarcode(e.target.value)
						}}
						required
					/>
					<FormInput
						label="Articulo"
						type="select"
						options={lists.articulos}
						name="articuloId"
						onchange={(e) => {
							if (!e) {
								setLists((lists) => ({ ...lists, lotesView: [] }))
								return
							}

							const lotesV = lists.lotes.filter(
								(articulo) => articulo.articuloId === e
							)

							setLists((lists) => ({ ...lists, lotesView: [...lotesV] }))
						}}
						required
					/>
					<FormInput
						label="Lote"
						type="select"
						options={lists.lotesView}
						name="loteId"
					/>
				</div>
				<div className="flex gap-3 mt-3">
					<FormInput label="Cantidad" name="cantidad" required />
					<FormInput label="Precio sin imp." name="precioSImp" required />
					<FormInput label="Precio con imp." name="precioCimp" required />
					<Button type="submit">Agregar</Button>
				</div>
			</Forms>

			<div className="my-5">
				<MantineDataTable
					columns={columns}
					data={listArticles.articulos || []}
					keyTable="movTipos"
				/>
			</div>
		</div>
	)
}
