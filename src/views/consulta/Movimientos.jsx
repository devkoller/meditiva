import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { notifications } from "@mantine/notifications"
import { useParams } from "react-router-dom"
import { useFetch, usePost } from "@/hooks"
import { DatePickerInput } from "@mantine/dates"

import { Forms, FormInput, Button, MantineDataTable } from "@/components"
import { parse } from "date-fns/parse"

export const Movimientos = () => {
	const [list, setList] = useState({
		tipoMov: [],
		tableData: [],
	})
	const [selectedDate, setSelectedDate] = useState()
	const { execute, loading } = usePost()

	const { response: tipoMov } = useFetch({
		url: "/api/catalogue/movement_types",
	})

	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors },
	} = useForm({})

	const onSubmit = (data) => {
		const body = {
			...data,
			fechaInicio: selectedDate ? selectedDate[0] : "",
			fechaFin: selectedDate ? selectedDate[1] : "",
		}

		execute({
			url: "/api/inventory/movement",
			method: "get",
			qs: body,
		}).then((res) => {
			if (res.status === 200) {
				const data = res.data.map((mov) => {
					console.log("🚀 > file: Movimientos.jsx:44 > data > mov:", mov)

					let totalSImp = 0
					let totalCImp = 0
					if (mov.movimientodetalles.length > 0) {
						mov.movimientodetalles.forEach((det) => {
							totalSImp += parseFloat(det.precioSImp) || 0
							totalCImp += parseFloat(det.precioCImp) || 0
						})
					}

					return {
						...mov,
						fecha: mov.createdAt ? mov.createdAt : "",
						movimiento: mov.cattipomovimiento.descripcion || "",
						totalsimp: totalSImp,
						totalcimp: totalCImp,
					}
				})
				setList((list) => ({ ...list, tableData: data }))
			}
		})
	}

	const onError = (errors) => {}

	const columns = [
		{ accessor: "id", title: "ID" },
		{ accessor: "movimiento", title: "Tipo de movimiento", filter: "text" },
		{ accessor: "fecha", title: "Fecha", filter: "text" },
		{ accessor: "totalsimp", title: "Total sin Imp.", filter: "text" },
		{ accessor: "totalcimp", title: "Total con Imp.", filter: "text" },
	]

	useEffect(() => {
		if (tipoMov) {
			const mov = tipoMov.data.map((mov) => {
				return {
					value: mov.id,
					label: mov.descripcion,
				}
			})
			setList((list) => ({ ...list, tipoMov: mov }))
		}
	}, [tipoMov])
	return (
		<>
			<Forms
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				onError={onError}
				register={register}
				control={control}
			>
				<div className="flex gap-3">
					<FormInput
						label="Tipo de movimiento"
						type="select"
						options={list.tipoMov}
						name="tipoMovimientoId"
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
			<div className="my-5">
				<MantineDataTable
					columns={columns}
					data={list.tableData}
					rowExpansion={rowExpanded}
					KeyTable="consulMov"
				/>
			</div>
		</>
	)
}

const rowExpanded = ({ record }) => {
	if (record.movimientodetalles.length === 0) {
		return (
			<div className="p-3">
				<span className="font-bold">
					No hay detalles por cargados en este movimiento
				</span>
			</div>
		)
	}

	const print = () => {
		return record.movimientodetalles.map((mov) => {
			return (
				<tr key={mov.id} className="text-center">
					<td>{mov?.catarticulo?.nombre || ""}</td>
					<td>{mov.cantidad}</td>
					<td>{mov?.catarticuloslote?.lote || "Sin lote"}</td>
					<td>
						{mov?.catarticuloslote?.caducidad
							? mov?.catarticuloslote?.caducidad
							: "Sin fecha de caducidad"}
					</td>
					<td>${mov.precioSImp}</td>
					<td>${mov.precioCImp}</td>
				</tr>
			)
		})
	}

	return (
		<div className="p-3">
			<table className="w-full text-center">
				<thead>
					<tr>
						<th>Articulo</th>
						<th>Cantidad</th>
						<th>Lote</th>
						<th>Fecha de caducidad</th>
						<th>Precio sin Imp.</th>
						<th>Precio con Imp.</th>
					</tr>
				</thead>
				<tbody>{print()}</tbody>
			</table>
		</div>
	)
}
