import React, { useState, useRef } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import Select from "react-select"
import { Controller } from "react-hook-form"

const TextualInput = ({
	type,
	name,
	placeholder,
	register,
	errors,
	comp,
	rows,
	className,
	refCallback,
	viewPassword,
	toggleViewPassword,
	values,
	required,
	onChange = () => {},
	...otherProps
}) => {
	return (
		<div className="flex">
			{type === "textarea" ? (
				<textarea
					name={name}
					placeholder={placeholder}
					className={`border w-full border-neutral-950/25 focus-visible:border-sky-500 focus-visible:outline-none px-3 py-1 rounded-lg ${
						className ? className : ""
					} ${errors ? "border-red-600" : ""}`}
					rows={rows}
					{...register(name)}
					{...otherProps}
				/>
			) : (
				<>
					<input
						type={type === "password" && viewPassword ? "text" : type}
						placeholder={placeholder}
						name={name}
						id={name}
						value={values}
						{...register(name, { required: required })}
						onChange={onChange ? onChange : () => {}}
						className={`border w-full border-neutral-950/25 focus-visible:border-sky-500 focus-visible:outline-none px-3 py-1 ${
							type === "password" ? "rounded-sm" : "rounded-md"
						} ${className ? className : ""} ${errors ? "border-red-600" : ""} `}
						{...otherProps}
					/>
					{type === "password" && (
						<div
							className="bg-neutral-950/25 flex justify-center items-center rounded-r-lg p-2 cursor-pointer"
							onClick={toggleViewPassword}
						>
							<span>{viewPassword ? <FaRegEyeSlash /> : <FaRegEye />}</span>
						</div>
					)}
				</>
			)}
		</div>
	)
}

const PasswordInput = ({
	type,
	name,
	placeholder,
	register,
	errors,
	comp,
	rows,
	className,
	refCallback,
	viewPassword,
	toggleViewPassword,
	values,
	required,
	onChange = () => {},
	...otherProps
}) => {
	return (
		<div className="flex">
			{type === "textarea" ? (
				<textarea
					name={name}
					placeholder={placeholder}
					className={`border w-full border-neutral-950/25 focus-visible:border-sky-500 focus-visible:outline-none px-3 py-1 rounded-lg ${
						className ? className : ""
					} ${errors ? "border-red-600" : ""}`}
					rows={rows}
					{...register(name)}
					{...otherProps}
				/>
			) : (
				<>
					<input
						type={type === "password" && viewPassword ? "text" : type}
						placeholder={placeholder}
						name={name}
						id={name}
						value={values}
						{...register(name, { required: required })}
						// onChange={onChange ? onChange : () => {}}
						className={`border w-full border-neutral-950/25 focus-visible:border-sky-500 focus-visible:outline-none px-3 py-1 ${
							type === "password" ? "rounded-sm" : "rounded-md"
						} ${className ? className : ""} ${errors ? "border-red-600" : ""} `}
						{...otherProps}
					/>
					{type === "password" && (
						<div
							className="bg-neutral-950/25 flex justify-center items-center rounded-r-lg p-2 cursor-pointer"
							onClick={toggleViewPassword}
						>
							<span>{viewPassword ? <FaRegEyeSlash /> : <FaRegEye />}</span>
						</div>
					)}
				</>
			)}
		</div>
	)
}

const FileInput = ({
	type,
	name,
	placeholder,
	register,
	errors,
	comp,
	rows,
	className,
	refCallback,
	viewPassword,
	toggleViewPassword,
	values,
	form,
	setFiles,
	accept,
	...otherProps
}) => {
	const [Error, setError] = useState(false)
	return (
		<div className="flex flex-col">
			<label className="" htmlFor={name}>
				{"selectFile"}
			</label>
			<input
				{...otherProps}
				type={type}
				name={name}
				id={name}
				value={values}
				className="hidden"
				onChange={(e) => {
					if (accept && accept.includes(e.target.files[0].type)) {
						setFiles(name, e.target.files[0])
						setError(false)
					} else {
						e.target.value = ""
						setError(true)
					}
				}}
			/>
			{Error && (
				<span className="text-red-500 text-md">
					{"El archivo no es del tipo permitido"}
				</span>
			)}
		</div>
	)
}

// non-textual checkbox and radio controls
const CheckInput = ({
	type,
	label,
	name,
	placeholder,
	register,
	errors,
	comp,
	rows,
	className,
	refCallback,
	values,
	table,
	description,
	checked,
	onChange = () => {},
	...otherProps
}) => {
	let value
	return (
		<div
			className={`flex  mt-2 items-center ${
				table ? "border border-gray-500" : "gap-2"
			}`}
		>
			<div className={`${table ? "w-1/12 flex justify-center" : ""}`}>
				<input
					id={name}
					type="checkbox"
					name={name}
					className={className}
					checked={checked}
					value={value}
					{...otherProps}
					onChange={(e) => {
						values = e.target.checked
						onChange(values)
					}}
				/>
			</div>
			<div className={`${table ? "border-x w-5/12 border-gray-500" : ""}`}>
				<label htmlFor={name} className="ml-2">
					{label}
				</label>
			</div>
			{table && description && (
				<div className="border w-6/12 border-gray-500">
					<label htmlFor={name} className="ml-2">
						{description}
					</label>
				</div>
			)}
		</div>
	)
}

// handle select controls
const SelectInput = ({
	label,
	name,
	options = [],
	errorMessage,
	required,
	disabled,
	value,
	defaultValue = "",
	placeholder = "Selecciona...",
	onchange = () => {},
	inputChange = () => {},
	menuPlacement = "auto",
	containerClass,
	control,
	...otherProps
}) => {
	return (
		<Controller
			render={({ field }) => {
				const { value, ...rest } = field
				return (
					<Select
						menuPlacement={menuPlacement}
						options={options || []}
						{...rest}
						value={options.find((option) => option.value === value) || null}
						placeholder={placeholder}
						onInputChange={inputChange}
						setValue={(e) => {
							console.log("🚀 > file: FormInput.jsx:211 > e:", e)
						}}
						classNamePrefix="react-select"
						onChange={(val) => {
							if (!val) return
							field.onChange(val.value)
							onchange && onchange(val.value)
						}}
					/>
				)
			}}
			control={control}
			name={name}
			rules={{ required: required ? errorMessage : false }}
			defaultValue={defaultValue}
			{...otherProps}
		/>
	)
}

// extend textual form-controls with add-ons
const FormInputGroup = ({
	startIcon,
	type,
	name,
	placeholder,
	comp,
	register,
	errors,
	rows,
	className,
	textClassName,
	refCallback,
	viewPassword,
	toggleViewPassword,
	...otherProps
}) => {
	return (
		<div>
			<div className={`${textClassName}  border border-red-600`}>
				{startIcon}
			</div>
			{type === "select" ? (
				<input
					type={type}
					name={name}
					placeholder={placeholder}
					refCallback={refCallback}
					comp={comp}
					errors={errors}
					{...register(name)}
					className={className}
					rows={rows}
					{...otherProps}
				/>
			) : (
				<input
					type={type === "password" && viewPassword ? "text" : type}
					name={name}
					placeholder={placeholder}
					refCallback={refCallback}
					comp={comp}
					errors={errors}
					{...register(name)}
					className={className}
					rows={rows}
					{...otherProps}
				/>
			)}
		</div>
	)
}

export const FormInput = ({
	startIcon,
	label,
	type,
	name,
	placeholder,
	register,
	errors,
	control,
	className,
	labelClassName = "",
	containerClass = "",
	textClassName,
	refCallback,
	action,
	rows,
	values,
	required,
	options,
	setFiles,
	table,
	checked,
	...otherProps
}) => {
	const comp =
		type === "textarea" ? "textarea" : type === "select" ? "select" : "input"

	const [viewPassword, setViewPassword] = useState(false)

	const toggleViewPassword = () => {
		setViewPassword(!viewPassword)
	}

	return (
		<>
			{type === "hidden" ? (
				<input
					type={type}
					name={name}
					{...(register ? register(name) : {})}
					{...otherProps}
				/>
			) : (
				<>
					{type === "checkbox" ? (
						<div>
							<CheckInput
								type={type}
								label={label}
								name={name}
								refCallback={refCallback}
								errors={errors}
								register={register}
								comp={comp}
								className={className}
								rows={rows}
								table={table}
								checked={checked}
								{...otherProps}
							/>
						</div>
					) : type === "select" ? (
						<div className="flex flex-col mb-3 w-full">
							{label ? (
								<>
									<label className={labelClassName}>
										{label}
										{!required && (
											<sup className="text-gray-400 text-sm ">(Opcional)</sup>
										)}{" "}
									</label>
									{action && action}
								</>
							) : null}
							<SelectInput
								type={type}
								name={name}
								options={options}
								placeholder={placeholder || "Selecciona una opción"}
								refCallback={refCallback}
								errors={errors}
								comp={comp}
								className={className}
								rows={rows}
								control={control}
								{...otherProps}
							/>
						</div>
					) : type === "file" ? (
						<div>
							{label && (
								<>
									<label className={` ${labelClassName}`}>
										{label}{" "}
										{!required && (
											<sup className="text-gray-400 text-sm ">Opcional</sup>
										)}{" "}
									</label>
									{action && action}
								</>
							)}
							<FileInput
								type={type}
								name={name}
								errors={errors}
								className={className}
								values={values}
								setFiles={setFiles}
								{...otherProps}
							/>
						</div>
					) : type === "password" ? (
						<div
							className={`flex w-full gap-1 mb-2 ${
								containerClass ? containerClass : "flex-col"
							}`}
						>
							{label && (
								<>
									<label className={`${labelClassName}`}>
										{label}{" "}
										{!required && (
											<sup className="text-gray-400 text-sm ">(Opcional)</sup>
										)}{" "}
									</label>
									{action && action}
								</>
							)}
							<PasswordInput
								type={type}
								name={name}
								placeholder={placeholder}
								refCallback={refCallback}
								errors={errors}
								register={register}
								comp={comp}
								className={className}
								viewPassword={viewPassword}
								toggleViewPassword={toggleViewPassword}
								rows={rows}
								values={values}
								required={required}
								{...otherProps}
							/>
							{errors && (
								<span className="text-red-500 text-md">
									{label} {errors}
								</span>
							)}
						</div>
					) : (
						<div
							className={`flex w-full gap-1 mb-2 ${
								containerClass ? containerClass : "flex-col"
							}`}
						>
							{label && (
								<>
									<label className={`${labelClassName}`}>
										{label}{" "}
										{!required && (
											<sup className="text-gray-400 text-sm ">(Opcional)</sup>
										)}{" "}
									</label>
									{action && action}
								</>
							)}
							{startIcon ? (
								<FormInputGroup
									type={type}
									startIcon={startIcon}
									name={name}
									comp={comp}
									textClassName={textClassName}
									placeholder={placeholder}
									refCallback={refCallback}
									errors={errors}
									register={register}
									className={className}
									rows={rows}
									viewPassword={viewPassword}
									toggleViewPassword={toggleViewPassword}
									values={values}
									{...otherProps}
								/>
							) : (
								<TextualInput
									type={type}
									name={name}
									placeholder={placeholder}
									refCallback={refCallback}
									errors={errors}
									register={register}
									comp={comp}
									className={className}
									viewPassword={viewPassword}
									toggleViewPassword={toggleViewPassword}
									rows={rows}
									values={values}
									required={required}
									{...otherProps}
								/>
							)}
							{errors && (
								<span className="text-red-500 text-md">
									{label} {errors}
								</span>
							)}
						</div>
					)}
				</>
			)}
		</>
	)
}
