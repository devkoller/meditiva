import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { notifications } from "@mantine/notifications"
import { useParams } from "react-router-dom"
import { useFetch, usePost } from "@/hooks"

import { Forms, FormInput, Button, MantineDataTable } from "@/components"

export const Inventario = () => {
	const [listData, setListData] = useState({
		almacenes: [],
		subAlmacenes: [],
		dataTable: [],
	})
	const [AlmacenSelected, setAlmacenSelected] = useState(null)
	const { execute, loading } = usePost()

	const { response: almacenes } = useFetch({
		url: "/api/catalogue/warehouse",
		qs: {
			tipo: 1,
		},
	})
	const { response: subalmacenes } = useFetch({
		url: "/api/catalogue/warehouse",
		qs: {
			tipo: 2,
			padre: AlmacenSelected || 0,
		},
	})

	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors },
	} = useForm({})

	const onSubmit = (data) => {
		execute({
			url: "/api/inventory/inventory/get",
			method: "get",
			qs: data,
		}).then((res) => {
			if (res.status === 200) {
				const dataTable = res.data.map((inv) => {
					return {
						...inv,
						nombre: inv.catarticulo.nombre,
						almacen: inv.catalmacene.nombre,
					}
				})

				setListData((list) => ({ ...list, dataTable }))
			}
		})
	}

	const onError = (errors) => {}

	const columns = [
		{ accessor: "id", title: "ID", hidden: true },
		{ accessor: "nombre", title: "Articulo", filter: "text" },
		{ accessor: "cantidad", title: "Cantidad", filter: "text" },
		{ accessor: "almacen", title: "Almacén", filter: "text" },
		{ accessor: "subalmacen", title: "Sub Almacén", filter: "text" },
	]

	useEffect(() => {
		if (almacenes) {
			const alma = almacenes.data.map((alm) => {
				return {
					...alm,
					value: alm.id,
					label: alm.nombre,
				}
			})
			setListData((list) => ({ ...list, almacenes: alma }))
		}
	}, [almacenes])

	useEffect(() => {
		if (subalmacenes) {
			const subAlma = subalmacenes.data.map((alm) => {
				return {
					...alm,
					value: alm.id,
					label: alm.nombre,
				}
			})
			setListData((list) => ({ ...list, subAlmacenes: subAlma }))
		}
	}, [subalmacenes])

	return (
		<>
			<Forms
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				onError={onError}
				register={register}
				control={control}
			>
				<FormInput label="Articulo" name="articulo" />
				<div className="flex gap-3">
					<FormInput
						label="Almacén"
						type="select"
						options={listData.almacenes}
						name="almacenId"
						onchange={(e) => setAlmacenSelected(e)}
					/>
					{/* <FormInput
						label="Sub almacén"
						type="select"
						options={listData.subAlmacenes}
						name="subAlmacenId"
					/> */}
					<Button type="submit" disabled={loading}>
						Consultar
					</Button>
				</div>
			</Forms>
			<div className="my-5">
				<MantineDataTable
					columns={columns}
					data={listData.dataTable}
					KeyTable="inventario"
				/>
			</div>
		</>
	)
}
