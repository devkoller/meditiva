import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { notifications } from "@mantine/notifications"
import { useParams } from "react-router-dom"
import { useFetch, usePost } from "@/hooks"
import { DatePickerInput } from "@mantine/dates"

import { Forms, FormInput, Button, MantineDataTable } from "@/components"

export const Reportes = () => {
	const [selectedDate, setSelectedDate] = useState()
	const [listData, setListData] = useState({
		tReporte: [
			{ value: 2, label: "Entradas" },
			{ value: 3, label: "Salidas" },
			{ value: 4, label: "Traspasos" },
			{ value: 5, label: "Devoluciones" },
			{ value: 6, label: "Ventas" },
			{ value: 7, label: "Compras" },
		],
		subAlmacenes: [],
	})
	const { execute, loading } = usePost()

	const { id } = useParams()

	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors },
	} = useForm({})

	const onSubmit = (data) => {}

	const onError = (errors) => {}

	const columns = [
		{ accessor: "id", title: "ID", hidden: true },
		{ accessor: "nombre", title: "Articulo", filter: "text" },
		{ accessor: "cantidad", title: "Cantidad", filter: "text" },
		{ accessor: "almacen", title: "Almacén", filter: "text" },
		{ accessor: "subalmacen", title: "Sub Almacén", filter: "text" },
	]
	return (
		<div>
			<Forms
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				onError={onError}
				register={register}
				control={control}
			>
				<div className="flex gap-3">
					<FormInput
						label="Tipo de reporte"
						type="select"
						options={listData.tReporte}
						name="almacenId"
					/>
					<div className="w-full">
						<span>
							Rango de fechas{" "}
							<sup className="text-gray-400 text-sm ">(Opcional)</sup>
						</span>
						<DatePickerInput
							placeholder="Selecciona una fecha"
							type="range"
							className="border border-gray-300 rounded-md px-3 bg-white w-full"
							value={selectedDate}
							onChange={(val) => {
								setSelectedDate(val)
							}}
						/>
					</div>
					<Button type="submit" disabled={loading}>
						Consultar
					</Button>
				</div>
			</Forms>
		</div>
	)
}
