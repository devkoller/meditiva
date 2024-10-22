import { useEffect, useState } from "react"
import { DataTable, useDataTableColumns } from "mantine-datatable"
import { useDebouncedValue } from "@mantine/hooks"
import sortBy from "lodash/sortBy"
import { TextFilter } from "./TextFilter"
import { SelectFilter } from "./SelectFilter"

export function MantineDataTable({
	columns = [],
	data = [],
	rowSelected = () => {},
	rowExpansion = () => {},
	KeyTable = "ExampleTable",
}) {
	const [sortStatus, setSortStatus] = useState({
		columnAccessor: "id",
		direction: "asc",
	})

	const [records, setRecords] = useState(sortBy(data, "id"))

	const [query, setQuery] = useState({})
	const [selected, setSelected] = useState({})
	const [debouncedQuery] = useDebouncedValue(query, 200)

	const props = {
		resizable: true,
		sortable: true,
		toggleable: true,
		draggable: true,
	}

	const {
		effectiveColumns,
		resetColumnsWidth,
		resetColumnsOrder,
		resetColumnsToggle,
	} = useDataTableColumns({
		key: KeyTable,
		columns: columns.map((column) => {
			let col = {
				...column,
				...props,
				filter: column.filter ? (
					column.filter === "text" ? (
						<TextFilter
							title={column.title}
							setQuery={setQuery}
							accessor={column.accessor}
							query={query}
						/>
					) : (
						<SelectFilter
							title={column.title}
							accessor={column.accessor}
							selected={selected}
							setSelected={setSelected}
							data={data}
						/>
					)
				) : null,
				filterValue: query[column.accessor] || "",
			}

			return col
		}),
	})

	// const { effectiveColumns } = useDataTableColumns({
	//   key: KeyTable,
	//   columns: columns.map(column => {
	//     console.log(column)

	//     if (!column.filter) {
	//       return {
	//         ...column,
	//         ...props
	//       }
	//     }
	//     if (column.filter === 'text') {
	//       return {
	//         ...column,
	//         ...props
	// filter: (
	//   <TextFilter
	//     title={column.title}
	//     setQuery={setQuery}
	//     accessor={column.accessor}
	//     query={query}
	//   />
	// ),
	// filterValue: query[column.accessor] || ''
	//       }
	//     }
	//     if (column.filter === 'select') {
	//       return {
	//         ...column,
	//         ...props
	//         // filter: (

	//         //   <SelectFilter
	//         //     title={column.title}
	//         //     accessor={column.accessor}
	//         //     selected={selected}
	//         //     setSelected={setSelected}
	//         //     data={data}
	//         //   />
	//         // ),
	//         // filterValue: selected[column.accessor] || []
	//       }
	//     }
	//   })
	// })

	useEffect(() => {
		const newData = sortBy(data, sortStatus.columnAccessor)
		setRecords(sortStatus.direction === "desc" ? newData.reverse() : newData)
	}, [sortStatus])

	useEffect(() => {
		setRecords(
			data.filter((element) => {
				for (const key in debouncedQuery) {
					if (
						!element[key]
							.toLowerCase()
							.includes(debouncedQuery[key].trim().toLowerCase())
					)
						return false
				}

				for (const key in selected) {
					if (
						selected[key].length > 0 &&
						!selected[key].some((d) => d === element[key])
					)
						return false
				}

				return true
			})
		)
	}, [JSON.stringify(debouncedQuery), JSON.stringify(selected)])

	useEffect(() => {
		setRecords(sortBy(data, "id"))
	}, [data])

	return (
		<div className="max-w-full">
			<DataTable
				withTableBorder
				withColumnBorders
				borderRadius="sm"
				shadow="xs"
				striped
				highlightOnHover
				height={500}
				// provide data
				records={records}
				// define columns
				columns={effectiveColumns}
				// execute this callback when a row is clicked
				onRowClick={({ record }) => rowSelected(record)}
				storeColumnsKey={KeyTable}
				sortStatus={sortStatus}
				onSortStatusChange={setSortStatus}
				noRecordsText="No hay registros"
				rowExpansion={{
					content: rowExpansion,
				}}
			/>
			<div className="flex gap-3 justify-end my-3">
				<button
					onClick={resetColumnsWidth}
					className="bg-sky-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg duration-500 hover:bg-sky-800 flex gap-2 items-center"
				>
					Restaurar ancho
				</button>
				<button
					onClick={resetColumnsOrder}
					className="bg-sky-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg duration-500 hover:bg-sky-800 flex gap-2 items-center"
				>
					Restaurar orden
				</button>
				<button
					onClick={resetColumnsToggle}
					className="bg-sky-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg duration-500 hover:bg-sky-800 flex gap-2 items-center"
				>
					Restaurar columnas
				</button>
			</div>
		</div>
	)
}
