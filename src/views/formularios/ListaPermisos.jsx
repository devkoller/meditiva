import { useState, useEffect } from 'react'
import { useFetch } from '@/hooks'
import { useForm } from 'react-hook-form'

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

  const print = () => {
    return permisos.map((permiso, index) => {
      return (
        <div key={index}>
          <h3>{permiso.name}</h3>
          {permiso.permisos.map((permiso, index2) => {
            return (
              <div key={`${index}-${index2}`}>
                <input
                  type='checkbox'
                  name={permiso.name}
                  value={permiso.id}
                  ref={register}
                />
                {permiso.name}
              </div>
            )
          })}
        </div>
      )
    })
  }
  return <div>ListaPermisos</div>
}
