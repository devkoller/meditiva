import React from "react"
import { AuthWrapper, Forms, FormInput, Button } from "@/components"
import { useFetch, usePost } from "@/hooks"
import { useForm } from "react-hook-form"
import { useAuthStore } from "@/hooks"
import { notifications } from "@mantine/notifications"
import avatar from "@/assets/imgs/avatar.png"

export const Perfil = () => {
	const { id, username, name, correo, telefono } = useAuthStore()
	const { execute, loading } = usePost()
	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors },
	} = useForm({})

	const onSubmit = (data) => {
		if (data.newPassword !== data.newPasswordC) {
			notifications.show({
				title: "Error",
				message: "Las contraseñas no coinciden",
				color: "red",
			})
			return
		}

		execute({
			url: "/user/update-password",
			method: "put",
			body: data,
		}).then((res) => {
			if (res.status === 200) {
				notifications.show({
					title: "Correcto",
					message: `Se ha ${id ? "actualizado" : "creado"} correctamente`,
				})
				reset()
			}
		})
	}

	const onError = (errors) => {
		notifications.show({
			title: "Error!",
			message: "Complete los campos obligatorios",
			color: "red",
		})
	}

	return (
		<AuthWrapper>
			<div className="flex gap-3 flex-wrap">
				<section className="flex flex-col flex-wrap p-3 w-full lg:w-3/12 text-xl bg-white shadow-lg rounded-lg">
					<img src={avatar} alt="" className="self-center" />
					<p>
						Usuario: <span className="font-bold">{username}</span>
					</p>
					<p>
						Nombre: <span className="font-bold">{name}</span>
					</p>
					<p>
						Correo: <span className="font-bold">{correo}</span>
					</p>
					<p>
						Teléfono: <span className="font-bold">{telefono}</span>
					</p>
				</section>
				<section className="flex flex-col p-3 w-full lg:w-8/12 text-xl bg-white shadow-lg rounded-lg">
					<Forms
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						register={register}
						onError={onError}
						control={control}
					>
						<FormInput
							label="Contraseña actual"
							type="password"
							name="password"
							required
						/>
						<FormInput
							label="Nueva contraseña"
							type="password"
							name="newPassword"
							required
						/>
						<FormInput
							label="Confirma tu nueva contraseña"
							type="password"
							name="newPasswordC"
							required
						/>
						<div className="flex justify-end mt-3">
							<Button type="submit" disabled={loading}>
								Cambiar contraseña
							</Button>
						</div>
					</Forms>
				</section>
			</div>
		</AuthWrapper>
	)
}
