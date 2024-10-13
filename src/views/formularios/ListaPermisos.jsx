import { useState, useEffect } from 'react'
import { useFetch } from '@/hooks'
import { useForm } from 'react-hook-form'
import { Forms, FormInput, Button, Title } from '@/components'

export const ListaPermisos = ({ idUser }) => {
  const [permisos, setPermisos] = useState([])
  const [userPermisos, setUserPermisos] = useState([])
  const { handleSubmit, register, control, setValue } = useForm({})

  const onSubmit = data => {
    notifications.show({
      title: 'Correcto',
      message: 'Se ha creado correctamente'
    })
  }

  const onError = errors => {
    notifications.show({
      title: 'Correcto',
      message: 'Se ha creado correctamente',
      color: 'red'
    })
  }

  const { response: permisosData } = useFetch({
    url: '/data/list-grants'
  })

  useEffect(() => {
    if (permisosData) {
      setPermisos(permisosData.data)
    }
  }, [permisosData])

  const printHeads = () => {
    return permisos.map((permiso, index) => {
      return (
        <div key={index}>
          <Title>{permiso.nombre}</Title>
          {printGrants(permiso.permisos, permiso.grant)}
        </div>
      )
    })
  }

  const printGrants = (list, grant) => {
    return list.map((permiso, index) => {
      return (
        <div key={index}>
          <FormInput
            type='checkbox'
            name={`#${grant}.${permiso.nombre}`}
            label={permiso.nombre}
          />
        </div>
      )
    })
  }
  return (
    <div>
      <Title type='h1'>Permisos del usuario</Title>
      <Forms
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        control={control}
      >
        {printHeads()}

        <div>
          <Button type='submit'> Enviar </Button>
        </div>
      </Forms>
    </div>
  )
}
