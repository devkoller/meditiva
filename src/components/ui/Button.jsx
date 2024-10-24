import React from "react"
import { Link } from "react-router-dom"

export const Button = ({
	children,
	onClick,
	type,
	color,
	square = false,
	link,
	...otherProps
}) => {
	if (link) {
		return (
			<Link
				className={`
      bg-sky-500 hover:bg-sky-800
      disabled:bg-gray-300 disabled:cursor-not-allowed 
      text-white ${!square ? "px-4 py-2" : "p-3"}  rounded-lg duration-500 
      flex gap-2 items-center
      `}
				onClick={onClick}
				{...otherProps}
			>
				{children}
			</Link>
		)
	}
	return (
		<button
			className={`
       bg-sky-500 hover:bg-sky-800
        disabled:bg-gray-300 disabled:cursor-not-allowed 
        text-white ${!square ? "px-4 py-2" : "p-3"} rounded-lg duration-500 
        flex gap-2 items-center
        `}
			onClick={onClick}
			{...otherProps}
		>
			{children}
		</button>
	)
}
